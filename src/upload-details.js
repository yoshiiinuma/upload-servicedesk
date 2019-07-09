
import config from '../config/config.js';
import { getDetailUploader } from './uploader.js';

const file = 'ServiceDeskAdminDetails.csv';
const PER = 1000; // Send a BulkLoad Request per this number
//const PER = 5; // Send a BulkLoad Request per this number

const uploader = getDetailUploader(config);
uploader.uploadCsv(file, PER);

