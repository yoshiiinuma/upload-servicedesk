
import fs from 'fs';
import config from '../config/config.js';
import { getDetailUploader } from './uploader.js';

const usage = () => {
  console.log("USAGE: npm run upload-details -- <CSV> [<DATA-PER-REQ>]");
  console.log("USAGE: node dist/upload-details.js <CSV> [<DATA-PER-REQ>]");
  console.log("");
  console.log("   CSV: File contains Ticket detail data");
  console.log("   DATA-PER-REQ: Specifies the number of records that a BulkLoad sends in a request (default 1000)");
  console.log("");
  console.log("   OPTIONS:");
  console.log("   -h or --help:             Shows this usage");
  console.log("");
}

if (process.argv.length < 3 || process.argv.length > 4) {
  usage();
  process.exit();
}

//const file = 'ServiceDeskAdminDetails.csv';
const file = process.argv[2];

if (!fs.existsSync(file)) {
  console.log('CSV Not Found: ' + file + "\n");
  usage();
  process.exit();
}

const rgxNum = /^\d+$/;
let dpr = 1000;  //Data Per Request

if (process.argv.length == 4) {
  dpr = process.argv[3];
  if (!rgxNum.test(dpr)) {
    console.log('DATA-PER-REQ Not Number: ' + dpr + "\n");
    usage();
    process.exit();
  }
  dpr = parseInt(dpr);
}


const uploader = getDetailUploader(config);
uploader.uploadCsv(file, dpr);

