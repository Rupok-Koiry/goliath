const fs = require('fs');
const utils = require('util');
const readFile = utils.promisify(fs.readFile);
const hb = require('handlebars');
const { PDFDocument } = require('pdf-lib');
const path = require('path');
const puppeteer = require('puppeteer');
const Scan = require('../models/scanModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Queue = require('../utils/queue');
const handlerFactory = require('./handlerFactory');

exports.getAllScans = handlerFactory.getAll(Scan);
exports.getScan = handlerFactory.getOne(Scan);
exports.deleteScan = handlerFactory.deleteOne(Scan);
exports.createScan = catchAsync(async (req, res) => {
  const newDoc = await Scan.create(req.body);
  const scanId = newDoc._id.toString();
  const queue = await Queue.create();
  await queue.send(scanId);

  res.status(201).json({
    status: 'success',
    data: {
      data: newDoc,
    },
  });
});
exports.updateScan = catchAsync(async (req, res, next) => {
  const doc = await Scan.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }
  if (req.body.rescan) {
    const queue = await Queue.create();
    await queue.send(doc._id.toString());
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});
// Function to generate HTML from template for each data item
const generateHtmlFromTemplate = async (pdfData) => {
  const pdfPath = path.resolve(`./views/pdf/index.html`);
  const staticPdf = await readFile(pdfPath, 'utf8');
  const template = hb.compile(staticPdf, { strict: true });
  return template(pdfData); // Returns HTML string for each PDF data item
};

// Function to create PDF from HTML and return as buffer
const createPdfBufferFromHtml = async (html) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setContent(html);
  const pdfBuffer = await page.pdf({ printBackground: true });
  await browser.close();
  return pdfBuffer;
};

// Main function to generate and merge PDFs
const generatePdf = async (pdfDataArray) => {
  try {
    // Convert PDF data to HTML
    const htmlPromises = pdfDataArray.map(generateHtmlFromTemplate);
    const htmlArray = await Promise.all(htmlPromises);

    // Convert HTML to PDF buffers
    const pdfBufferPromises = htmlArray.map(createPdfBufferFromHtml);
    const pdfBuffers = await Promise.all(pdfBufferPromises);

    // Merge PDF buffers into a single PDF
    const mergedPdf = await PDFDocument.create();

    // Sequentially load and add pages from each PDF buffer
    await pdfBuffers.reduce(async (previousPromise, pdfBuffer) => {
      await previousPromise; // Wait for the previous PDF to be processed
      const pdf = await PDFDocument.load(pdfBuffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }, Promise.resolve()); // Initial promise for starting the chain

    const mergedPdfBuffer = await mergedPdf.save();
    const outputPath = path.join(__dirname, `../views/pdf/mergedReport.pdf`);
    fs.writeFileSync(outputPath, mergedPdfBuffer);

    return outputPath; // Return the path of the merged PDF
  } catch (error) {
    console.log(error);
    throw new Error('Failed to generate or merge PDFs');
  }
};
exports.generateMultiplePdfs = catchAsync(async (req, res, next) => {
  // Assuming you're receiving an array of IDs in the request body
  const scans = await Scan.find({ _id: { $in: req.body.scanIds } }).populate(
    'user_id'
  );

  const pdfDataArray = scans.map((scan) => ({
    SCAN_NAME: scan.scan_name,
    SCAN_TARGETS: scan.scan_targets,
    SCAN_COUNT: scan.scan_count,
    SCANNED: scan.scanned,
    EMAIL: scan.user_id.email,
    STATUS: scan.status,
    SCORE: scan.score,
  }));

  const mergedPdfPath = await generatePdf(pdfDataArray);

  res.setHeader('Content-Type', 'application/pdf');
  res.sendFile(mergedPdfPath);
});
