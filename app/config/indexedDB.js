import Dexie from "dexie";

import settings from './settings';

  /*--------------------- Initiate IndexedDB Object Store ---------------------*/
  const version = settings?.indexedDBVersion;

  const currentUserScheme = settings?.UserDB;
  const transactionalDBScheme = settings?.TransactionalDB;
  const recordsDBScheme = settings?.RecordsDB;
  const logDBScheme = settings?.LogDB;
  const notificationsDBScheme = settings?.NotificationsDB;
/*------------------- END Initiate IndexedDB Object Store -------------------*/


/*----------------------- User DB Structure -----------------------*/
  const userDB = new Dexie('UserDB')

  userDB.version(version).stores({
  currentUser: currentUserScheme?.currentUser,
  userRelatedTier: currentUserScheme?.userRelatedTier,
  userRelatedSite: currentUserScheme?.userRelatedSite,
  siteRelatedCountries: currentUserScheme?.siteRelatedCountries,
  siteRelatedLocations: currentUserScheme?.siteRelatedLocations,
  siteRelatedArea: currentUserScheme?.siteRelatedArea,
  });
/*--------------------- END User DB Structure ---------------------*/

/*----------------------- Log DB Structure ------------------------*/
  const logDB = new Dexie('LogDB')

  logDB.version(version).stores({
    errLog: logDBScheme?.errLog
  });
/*--------------------- END Log DB Structure ----------------------*/

/*---------------------- Records DB Structure ---------------------*/
  const recordsDB = new Dexie('RecordsDB')

  recordsDB.version(version).stores({
      physicalStatus: recordsDBScheme?.physicalStatus,
      logicalStatus: recordsDBScheme?.logicalStatus,
      transactionStatus: recordsDBScheme?.transactionStatus,
      readingType: recordsDBScheme?.readingType,
      userProfile: recordsDBScheme?.userProfile,
      transactionType: recordsDBScheme?.transactionType,
      tierLevel: recordsDBScheme?.tierLevel
  });
/*-------------------- END Records DB Structure -------------------*/

/*------------------- Transactional DB Structure ------------------*/
  const transactionalDB = new Dexie('TransactionalDB')

  transactionalDB.version(version).stores({
    assignBales: transactionalDBScheme?.assignBales,
    acceptBales: transactionalDBScheme?.acceptBales,
    collectBales: transactionalDBScheme?.collectBales,
    rfid: transactionalDBScheme?.rfid
  });
/*----------------- END Transactional DB Structure ----------------*/

/*----------------------- Log DB Structure ------------------------*/
  const notificationsDB = new Dexie('NotificationsDB')

  notificationsDB.version(version).stores({
    assignmentNotifications: notificationsDBScheme?.assignmentNotifications,
    acceptanceConfirmations: notificationsDBScheme?.acceptanceConfirmations
  });
/*--------------------- END Log DB Structure ----------------------*/


export default {

  userDB: userDB,
  logDB: logDB,
  recordsDB: recordsDB,
  transactionalDB: transactionalDB,
  notificationsDB: notificationsDB 

};
