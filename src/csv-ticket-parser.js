
import { TYPES } from 'tedious'

import parse from './csv-parser.js';

export const convToParams = (line) => {
  let [assignedTo, serviceType, completed, securityCategory, priority, securitySystems,
    ip, additionalRecipient, created, status, secondaryAssignee, requestType,
    modifiedBy, id, createdBy, startDate, urgency, dueDate, dept, topic, description,
    referenceNumber, modified, subTopic, customer, securityResults, referenceURL,
    title, creationType] = parse(line.trim());

  if (startDate) startDate = new Date(startDate);
  if (completed) completed = new Date(completed);
  if (dueDate) dueDate = new Date(dueDate);
  if (created) created = new Date(created);
  if (modified) modified = new Date(modified);

  const r = {
    assignedTo, serviceType, completed, securityCategory, priority, securitySystems,
    ip, additionalRecipient, created, status, secondaryAssignee, requestType,
    modifiedBy, id, createdBy, startDate, urgency, dueDate, dept, topic, description,
    referenceNumber, modified, subTopic, customer, securityResults, referenceURL,
    title, creationType
  };

  return r;
}

/*
 * bulkLoader: BulkLoad instance: tedious (new Connection()).newBulkLoad() returns
 */
export const addColumns = (bulkLoader) => {
  bulkLoader.addColumn('id', TYPES.Int, { nullable: false });
  bulkLoader.addColumn('title', TYPES.NVarChar, { nullable: true, length: 1024 });
  bulkLoader.addColumn('additionalRecipient', TYPES.NVarChar, { nullable: true, length: 256 });
  bulkLoader.addColumn('assignedTo', TYPES.NVarChar, { nullable: true, length: 256 });
  bulkLoader.addColumn('customer', TYPES.NVarChar, { nullable: true, length: 256 });
  bulkLoader.addColumn('creationType', TYPES.NVarChar, { nullable: true, length: 32 });
  bulkLoader.addColumn('dept', TYPES.NVarChar, { nullable: true, length: 6 });
  bulkLoader.addColumn('description', TYPES.NVarChar, { nullable: true, length: 63999 });
  bulkLoader.addColumn('ip', TYPES.NVarChar, { nullable: true, length: 128 });
  bulkLoader.addColumn('priority', TYPES.NVarChar, { nullable: true, length: 10 });
  bulkLoader.addColumn('referenceNumber', TYPES.NVarChar, { nullable: true, length: 128 });
  bulkLoader.addColumn('referenceUrl', TYPES.NVarChar, { nullable: true, length: 1024 });
  bulkLoader.addColumn('requestType', TYPES.NVarChar, { nullable: true, length: 32 });
  bulkLoader.addColumn('secondaryAssignee', TYPES.NVarChar, { nullable: true, length: 256 });
  bulkLoader.addColumn('securityCategory', TYPES.NVarChar, { nullable: true, length: 64 });
  bulkLoader.addColumn('securityResults', TYPES.NVarChar, { nullable: true, length: 20 });
  bulkLoader.addColumn('securitySystems', TYPES.NVarChar, { nullable: true, length: 512 });
  bulkLoader.addColumn('serviceType', TYPES.NVarChar, { nullable: true, length: 256 });
  bulkLoader.addColumn('status', TYPES.NVarChar, { nullable: true, length: 10 });
  bulkLoader.addColumn('subTopic', TYPES.NVarChar, { nullable: true, length: 128 });
  bulkLoader.addColumn('topic', TYPES.NVarChar, { nullable: true, length: 128 });
  bulkLoader.addColumn('urgency', TYPES.NVarChar, { nullable: true, length: 10 });
  bulkLoader.addColumn('startDate', TYPES.Date, { nullable: true });
  bulkLoader.addColumn('completed', TYPES.Date, { nullable: true });
  bulkLoader.addColumn('dueDate', TYPES.DateTime, { nullable: true });
  bulkLoader.addColumn('createdBy', TYPES.NVarChar, { nullable: true, length: 256 });
  bulkLoader.addColumn('created', TYPES.DateTime, { nullable: true });
  bulkLoader.addColumn('modifiedBy', TYPES.NVarChar, { nullable: true, length: 256 });
  bulkLoader.addColumn('modified', TYPES.DateTime, { nullable: true });
};

