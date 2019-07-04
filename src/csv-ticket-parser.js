
import { TYPES } from 'tedious'

const rgxTicketCsv = /("([^"]*)")*,?(.*)$/;

export const parse = (line) => {
  const columns = [];
  do {
    var match = rgxTicketCsv.exec(line);
    //console.log('----------------------------------------------');
    //console.log('>>>' + match[2] + '<<<');
    //console.log('----------------------------------------------');
    columns.push(match[2]);
    line = match[3];
    //console.log(line);
    //console.log(match);
  } while (!!line && line.length > 0)
  
  return columns;
}

export const convToParams = (line) => {
  let [assignedTo, serviceType, completed, securityCategory, priority, securitySystems,
    iP, additionalRecipient, created, status, secondaryAssignee, requestType,
    modifiedBy, id, createdBy, startDate, urgency, dueDate, dept, topic, description,
    referenceNumber, modified, subTopic, customer, securityResults, referenceURL,
    title, creationType] = parse(line.trim());

  const r = {
    assignedTo, serviceType, completed, securityCategory, priority, securitySystems,
    iP, additionalRecipient, created, status, secondaryAssignee, requestType,
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
  bulkLoader.addColumn('createdBy', TYPES.NVarChar, { nullable: true, length: 256 });
  bulkLoader.addColumn('modifiedBy', TYPES.NVarChar, { nullable: true, length: 256 });
};

