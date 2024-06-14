// const mongoose = require('mongoose');

// const targetSchema = new mongoose.Schema(
//   {},
//   { strict: false, timestamps: true }
// );

// const Target = mongoose.model('Target', targetSchema);

// module.exports = Target;
const mongoose = require('mongoose');

const screenshotSchema = new mongoose.Schema({
  port: Number,
  screenshot: String,
});

const portSchema = new mongoose.Schema({
  state: String,
  service: String,
  software: String,
  version: String,
  cpe: String,
  banner: String,
  vuln: Boolean,
  score: Number,
  port: String,
});

const netSchema = new mongoose.Schema({
  cidr: String,
  name: String,
  handle: String,
  range: String,
  description: String,
  country: String,
  state: String,
  city: String,
  address: String,
  postal_code: String,
  emails: [String],
  created: String,
  updated: String,
});

const webScanDetailSchema = new mongoose.Schema({
  method: String,
  path: String,
  info: String,
  level: Number,
  parameter: String,
  http_request: String,
  curl_command: String,
});

const webScanCategorySchema = new mongoose.Schema({
  'Backup file': [String],
  'Weak credentials': [String],
  'CRLF Injection': [String],
  'Content Security Policy Configuration': [webScanDetailSchema],
  'Cross Site Request Forgery': [String],
  'Potentially dangerous file': [String],
  'Command execution': [String],
  'Path Traversal': [String],
  'Fingerprint web application framework': [String],
  'Fingerprint web server': [String],
  'Htaccess Bypass': [String],
  'HTTP Secure Headers': [webScanDetailSchema],
  'HttpOnly Flag cookie': [String],
  'Open Redirect': [String],
  'Secure Flag cookie': [String],
  'SQL Injection': [String],
  'Server Side Request Forgery': [String],
  'Blind SQL Injection': [String],
  'Cross Site Scripting': [String],
  'XML External Entity': [String],
});

const whoisSchema = new mongoose.Schema({
  nir: String,
  asn_registry: String,
  asn: String,
  asn_cidr: String,
  asn_country_code: String,
  asn_date: String,
  asn_description: String,
  query: String,
  nets: [netSchema],
  raw: String,
  referral: String,
  raw_referral: String,
});

const targetSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ip: String,
  services: [String],
  ports: [Number],
  port_mapping: mongoose.Schema.Types.Mixed,
  timestamp: Number,
  status: String,
  scan_id: String,
  is_up: Boolean,
  final_score: Number,
  screenshots: [screenshotSchema],
  vuln: {
    ports: [portSchema],
    vuln: Boolean,
    source: String,
  },
  vulnerable: Boolean,
  hostname: String,
  whois: whoisSchema,
  web_scan: webScanCategorySchema,
});

const Target = mongoose.model('Target', targetSchema);
module.exports = Target;
