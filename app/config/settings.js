export default {

  version: 0.2,                  // DEPLOYED APP VERSION
  date: '18/01/2024',            // DEPLOYED APP DATE

  jwtTemp: 'M2JjM2NlZTgzMzk5NGU0OTk1MzIzNWYxMjE2YTJjMjM6ZWU2QUYyM2U1YTRDNDJBODlhNzY5YUE1MjE4RDE2QUY=',

/*----------------------------------- Client Side DB ----------------------------------- */
  indexedDBVersion: 1,          // INDEXED DB CURRENT VERSION

  UserDB: {
    currentUser: '++id, userCode, name, eMail, userProfileCode, tierCode, langCode, active, RFIDActive, AssignmentActive, AcceptanceActive, CollectingActive, GPSActive, logActive, CollaborationActive',
    userRelatedTier: '++id, userCode, tierCode, tierLevelCode, locationCode, nameOriginal, nameReference, active, *site',
    userRelatedSite: '++id, locationCode, countryCode, areaCode, sitecode, ZIP, *GPS',
    siteRelatedCountries: '++id, recordCode, description, languageCode',
    siteRelatedLocations: '++id, recordCode, description, languageCode',
    siteRelatedArea: '++id, recordCode, description, languageCode',  
  },

  RecordsDB: {
    physicalStatus: '++id, recordCode, description, languageCode',
    logicalStatus: '++id, recordCode, description, languageCode',
    transactionStatus: '++id, recordCode, description, languageCode',
    readingType: '++id, recordCode, description, languageCode',
    userProfile: '++id, recordCode, description, languageCode',
    transactionType: '++id, recordCode, description, languageCode',
    tierLevel: '++id, recordCode, description, languageCode'
  },

  LogDB: {
    errLog: '++id, userCode, typeLog, source, dexLog, timeStamp'
  },

  TransactionalDB: {
    assignBales: 'transactionID, transactionTypeCode, transactionStatusCode, acceptanceStatusCode, tierCode, siteCode, date, GPSLongitude, GPSLatitude, headerNote, *balesList',
    acceptBales: 'transactionID, tierCod, transactionStatusCod, acceptanceStatusCod, transactionTypeCod, GPSLongitude, GPSLatitude, *bale',
    collectBales: 'transactionID, tierCod, transactionStatusCod, acceptanceStatusCod, transactionTypeCod, GPSLongitude, GPSLatitude, *bale',
    rfid: '++id, number'
  },

  NotificationsDB: {
    assignmentNotifications: '++id, userCode',
    acceptanceConfirmations: '++id, userCode'
  }
};
