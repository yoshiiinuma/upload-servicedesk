
import { expect } from 'chai';

import * as parser from '../src/csv-ticket-parser.js';

const line = '"Assigned, To","ServiceType","Completed","SecurityCategory","Priority","SecuritySystems","IP","AdditionalRecipient","Created","Status","Secondary, Assignee","RequestType","ModifiedBy","id","Created, By","StartDate","Urgency","DueDate","Dept","Topic","Desc, ript, ion","ReferenceNumber","Modified","SubTopic","Customer","SecurityResults","ReferenceURL","Ti, tle","CreationType"';

const expArray = [ 'Assigned, To', 'ServiceType', 'Completed', 'SecurityCategory', 'Priority', 'SecuritySystems', 'IP', 'AdditionalRecipient', 'Created', 'Status', 'Secondary, Assignee', 'RequestType', 'ModifiedBy', 'id', 'Created, By', 'StartDate', 'Urgency', 'DueDate', 'Dept', 'Topic', 'Desc, ript, ion', 'ReferenceNumber', 'Modified', 'SubTopic', 'Customer', 'SecurityResults', 'ReferenceURL', 'Ti, tle', 'CreationType' ];

const expObj = {
  assignedTo: 'Assigned, To',
  serviceType: 'ServiceType',
  completed: 'Completed',
  securityCategory: 'SecurityCategory',
  priority: 'Priority',
  securitySystems: 'SecuritySystems',
  iP: 'IP',
  additionalRecipient: 'AdditionalRecipient',
  created: 'Created',
  status: 'Status',
  secondaryAssignee: 'Secondary, Assignee',
  requestType: 'RequestType',
  modifiedBy: 'ModifiedBy',
  id: 'id',
  createdBy: 'Created, By',
  startDate: 'StartDate',
  urgency: 'Urgency',
  dueDate: 'DueDate',
  dept: 'Dept',
  topic: 'Topic',
  description: 'Desc, ript, ion',
  referenceNumber: 'ReferenceNumber',
  modified: 'Modified',
  subTopic: 'SubTopic',
  customer: 'Customer',
  securityResults: 'SecurityResults',
  referenceURL: 'ReferenceURL',
  title: 'Ti, tle',
  creationType: 'CreationType'
};

const expCols = {
  id: { type: 'INT4', opts: { nullable: false } },
  title: { type: 'NVARCHAR', opts: { nullable: true, length: 1024 } },
  additionalRecipient: { type: 'NVARCHAR', opts: { nullable: true, length: 256 } },
  assignedTo: { type: 'NVARCHAR', opts: { nullable: true, length: 256 } },
  customer: { type: 'NVARCHAR', opts: { nullable: true, length: 256 } },
  creationType: { type: 'NVARCHAR', opts: { nullable: true, length: 32 } },
  dept: { type: 'NVARCHAR', opts: { nullable: true, length: 6 } },
  description: { type: 'NVARCHAR', opts: { nullable: true, length: 63999 } },
  ip: { type: 'NVARCHAR', opts: { nullable: true, length: 128 } },
  referenceNumber: { type: 'NVARCHAR', opts: { nullable: true, length: 128 } },
  referenceUrl: { type: 'NVARCHAR', opts: { nullable: true, length: 1024 } },
  requestType: { type: 'NVARCHAR', opts: { nullable: true, length: 32 } },
  secondaryAssignee: { type: 'NVARCHAR', opts: { nullable: true, length: 256 } },
  securityCategory: { type: 'NVARCHAR', opts: { nullable: true, length: 64 } },
  securityResults: { type: 'NVARCHAR', opts: { nullable: true, length: 20 } },
  securitySystems: { type: 'NVARCHAR', opts: { nullable: true, length: 512 } },
  serviceType: { type: 'NVARCHAR', opts: { nullable: true, length: 256 } },
  status: { type: 'NVARCHAR', opts: { nullable: true, length: 10 } },
  subTopic: { type: 'NVARCHAR', opts: { nullable: true, length: 128 } },
  topic: { type: 'NVARCHAR', opts: { nullable: true, length: 128 } },
  urgency: { type: 'NVARCHAR', opts: { nullable: true, length: 10 } },
  createdBy: { type: 'NVARCHAR', opts: { nullable: true, length: 256 } },
  modifiedBy: { type: 'NVARCHAR', opts: { nullable: true, length: 256 } }
};

describe('#parse', () => {
  it('splits a comma-separated-string into array', () => {
    expect(parser.parse(line)).to.be.eql(expArray);
  });
});

describe('#convToParams', () => {
  it('splits a comma-separated-string into array', () => {
    expect(parser.convToParams(line)).to.be.eql(expObj);
  });
});

const createFakeBulkLoader = () => {
  let cols = {};

  return {
    getColumns: () => {
      return cols;
    },
    addColumn: (name, type, opts) => {
      cols[name] = { type: type.type, opts };
    }
  };
};

describe('#addColumns', () => {
  it('add columns to BulkLoader instance', () => {
    const r = createFakeBulkLoader();
    parser.addColumns(r);
    expect(r.getColumns()).to.eql(expCols);
  });
});
