
import { expect } from 'chai';

import * as Helper from './helper.js';
import * as parser from '../src/csv-ticket-parser.js';

const line = '"Assigned, To","ServiceType","05/05/2019","SecurityCategory","Priority","SecuritySystems","IP","AdditionalRecipient","01/01/2019 01:01:01","Status","Secondary, Assignee","RequestType","ModifiedBy","id","Created, By","02/02/2019","Urgency","04/04/2019 04:04:04","Dept","Topic","Desc, ript, ion","ReferenceNumber","03/03/2019 03:03:03","SubTopic","Customer","SecurityResults","ReferenceURL","Ti, tle","CreationType"';

const expObj = {
  assignedTo: 'Assigned, To',
  serviceType: 'ServiceType',
  completed: new Date('05/05/2019'),
  securityCategory: 'SecurityCategory',
  priority: 'Priority',
  securitySystems: 'SecuritySystems',
  ip: 'IP',
  additionalRecipient: 'AdditionalRecipient',
  created: new Date('01/01/2019 01:01:01'),
  status: 'Status',
  secondaryAssignee: 'Secondary, Assignee',
  requestType: 'RequestType',
  modifiedBy: 'ModifiedBy',
  id: 'id',
  createdBy: 'Created, By',
  startDate: new Date('02/02/2019'),
  urgency: 'Urgency',
  dueDate: new Date('04/04/2019 04:04:04'),
  dept: 'Dept',
  topic: 'Topic',
  description: 'Desc, ript, ion',
  referenceNumber: 'ReferenceNumber',
  modified: new Date('03/03/2019 03:03:03'),
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
  priority: { type: 'NVARCHAR', opts: { nullable: true, length: 10 } },
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
  startDate: { type: 'DATEN', opts: { nullable: true } },
  completed: { type: 'DATEN', opts: { nullable: true } },
  dueDate: { type: 'DATETIME', opts: { nullable: true } },
  created: { type: 'DATETIME', opts: { nullable: true } },
  modified: { type: 'DATETIME', opts: { nullable: true } },
  createdBy: { type: 'NVARCHAR', opts: { nullable: true, length: 256 } },
  modifiedBy: { type: 'NVARCHAR', opts: { nullable: true, length: 256 } }
};

describe('#convToParams', () => {
  it('splits a comma-separated-string into array', () => {
    expect(parser.convToParams(line)).to.be.eql(expObj);
  });
});

describe('#addColumns', () => {
  it('add columns to BulkLoader instance', () => {
    const r = Helper.createFakeBulkLoader();
    parser.addColumns(r);
    expect(r.getColumns()).to.eql(expCols);
  });
});
