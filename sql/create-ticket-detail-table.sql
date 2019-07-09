IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='TicketDetails' AND xtype='U')
  CREATE TABLE TicketDetails
  (
    id int NOT NULL UNIQUE,
    ticketId int NOT NULL FOREIGN KEY REFERENCES Tickets(id),
    title nvarchar(1024),
    timeSpent int,
    detailNotes nvarchar(max),
    createdBy nvarchar(256),
    created datetime,
    modifiedBy nvarchar(256),
    modified datetime,
    CONSTRAINT PK_ticket_details PRIMARY KEY CLUSTERED (id)
  )
