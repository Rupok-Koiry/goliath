const Target = require('../models/targetModel');
const catchAsync = require('../utils/catchAsync');
const handlerFactory = require('./handlerFactory');
exports.getTargetStats = catchAsync(async (req, res, next) => {
  const {
    ip = '',
    ports = [],
    asn = '',
    freeText = '',
    isUpOnly = false,
    isVulnOnly = false,
    scanId = '',
    limit = 300,
    offset = 0,
  } = req.query;

  // Build the base query
  const query = {
    ip: new RegExp(`^${ip}`),
    'whois.asn': new RegExp(`^${asn}`),
    ...(scanId && { scan_id: scanId }),
    ...(isUpOnly && { is_up: true }),
  };

  // Free text search conditions
  if (freeText) {
    query.$or = [
      { ip: { $regex: freeText, $options: 'i' } },
      { hostname: { $regex: freeText, $options: 'i' } },
      { 'vuln.ports.banner': { $regex: freeText, $options: 'i' } },
    ];
  }
  // Ports filter
  if (ports.length > 0) {
    query['vuln.ports'] = {
      $elemMatch: { state: 'open', port: { $in: ports.map(Number) } },
    };
  }

  // Vulnerability filter
  if (isVulnOnly) {
    query['vuln.vuln'] = true;
  }

  const targets = await Target.find(query).limit(limit).skip(offset);
  const total = await Target.countDocuments(query);
  const hostsUp = await Target.countDocuments({ ...query, is_up: true });
  const hostsDown = await Target.countDocuments({ ...query, is_up: false });
  const hostsVuln = await Target.countDocuments({
    ...query,
    'vuln.vuln': true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      targets,
      stats: {
        total,
        hosts_up: hostsUp,
        hosts_down: hostsDown,
        hosts_vuln: hostsVuln,
      },
    },
  });
});

exports.getAllTargets = handlerFactory.getAll(Target);
exports.getTarget = handlerFactory.getOne(Target);
exports.updateTarget = handlerFactory.updateOne(Target);
exports.deleteTarget = handlerFactory.deleteOne(Target);
exports.createTarget = handlerFactory.createOne(Target);
