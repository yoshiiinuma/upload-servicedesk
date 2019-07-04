IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='TicketDetails' AND xtype='U')
  CREATE TABLE TicketDetails
  (
    id int NOT NULL UNIQUE,
    ticketId int NOT NULL FOREIGN KEY REFERENCES Tickets(id),
    detailNotes ntext,
    title nvarchar(1024),
    timeSpent int,
    createdBy nvarchar(128),
    createdAt datetime,
    modifiedBy nvarchar(128),
    modifiedAt datetime,
    CONSTRAINT PK_ticket_details PRIMARY KEY CLUSTERED (id)
  )
