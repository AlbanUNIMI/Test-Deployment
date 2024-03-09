import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Dexie from 'dexie'
import { useLiveQuery } from 'dexie-react-hooks'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import toast, {Toaster} from 'react-hot-toast';
import { id } from 'date-fns/locale';


/*--------------------- Initiate IndexedDB Object Store ---------------------*/

  const db = new Dexie('Transactional')

  db.version(1).stores({
    assignBales: 'transactionID, statusCode, headerNode, *bales',
  })

  const { assignBales } = db

/*------------------- END Initiate IndexedDB Object Store -------------------*/


const ReduxForm = () => {

  // const allItems = useLiveQuery(() => todos.toArray(), [])
  // console.log(allItems);

  const[userName, setUserName] = useState('');

  const add = async (transactionID, statusCode, headerNode) => {

    await assignBales.add({
     
      transactionID: transactionID,
      statusCode: statusCode,
      headerNode: headerNode,
      bales: [

        { 
            baleNumber: '1747488',
            physicalStatus: "01"
          }
        ]
    })
     
    /* Add More Bales: 
    db.transaction("rw", db.assignBales, async () => {

      /* Modify Bales: */
/*
      const currentStatus = await db.assignBales?.get('F451410793919EE0E05334345F0AD700');
      const currentBales = currentStatus.bales;
      console.log(currentBales);
      const updatedBales = currentBales.push({"baleNumber": "17222200", "physicalStatus": "01" })

    
    await db.assignBales
        .where("transactionID").equals('F451410793919EE0E05334345F0AD700')
        .modify({"bales": [updatedBales]});
    

    /*
      await db.assignBales
      .where("transactionID").equals('F451410793919EE0E05334345F0AD700')
      .add({"bales": [{"baleNumber": "17222207", "physicalStatus": "02" }]});
     

      }); 

      */

      // db.assignBales.add('F451410793919EE0E05334345F0AD700', {"bales": { 17222218: {"baleNumber": "17222218", "physicalStatus": "01" }}});
 
      // db.assignBales.where('transactionID').equals('F451410793919EE0E05334345F0AD700').modify(x => x.bales[0].push({'11111111' : {"baleNumber":'11111111', "physicalStatus": "02"}}) );
 
 
      /*
      const pathObject = {};
      const fullPath = bales[3];
      pathObject[fullPath] = {baleNumber:'47488'};
      db.assignBales.update('F451410793919EE0E05334345F0AD700', pathObject);
  */

    toast.success("Transaction Successfull", {duration: 5000});

  }

  const addBales = async () => {
   
         const currentStatus = await db.assignBales?.get('F451410793919EE0E05334345F0AD700');
         const currentBales = currentStatus.bales;
         console.log(currentBales);
         
         currentBales.push({baleNumber: "1722220", physicalStatus: "01" })
         console.log(currentBales);
   
       
       await db.assignBales
           .where("transactionID").equals('F451410793919EE0E05334345F0AD700')
           .modify({"bales": currentBales});
     
   
       toast.success("Transaction Successfull", {duration: 5000});
   
     }

  const retrieve = async () => {

    const userName = await db.currentUser?.get(1);

    let name = userName.name;

    console.log(name);

    setUserName(name);

  }

  const[response, setResponse] = useState('');

  const onCall = async () => {

    try {
        
        let transactionID= 'F451410793919EE0E05334345F0AD700';
        let statusCode= '02';
        let headerNode= 'Something';

        add(transactionID, statusCode, headerNode);

    } catch (err) {

      await console.log("3° ERR");;

    }
  };

  /*
    we can use the where method to filter the items:
    - db.todos.where('completed').equals(true).toArray()

    but booleans, null, undefined and Object are not valid keys in IndexedDb
    so we can either use strings or numbers for the completed status
    or in our case, use the Array.filter method to filter completed/not-completed items
  */

  // const completedItems = allItems?.filter((item) => item.completed === true)

  const addTask = async () => {

    await todos.add({
      task: 'something',
      completed: false,
    })

    taskField['value'] = ''
  }

  const deleteTask = async (id) => todos.delete(id);

  const toggleStatus = async (id, event) => {
    await todos.update(id, { completed: !!event.target.checked })
  }

  return (
    <div>
    <Grid container height="50vh" alignItems="center">
         <Grid xs={12} item textAlign='center'> 

           <Button variant="outlined" style={{color: 'white', borderColor: 'white'}} onClick={() => onCall()}>Test API Call</Button> <br /><br />
           <Button variant="outlined" style={{color: 'white', borderColor: 'white'}} onClick={() => addBales()}>ADD BALES</Button>

           <Toaster position="top-center" reverseOrder="false"/>

           { userName && (

           <Typography mt={2} color='white'>The current username is: <strong> {userName} </strong></Typography>

           )}
        </Grid>
      </Grid>
   </div>
  )
}

export default ReduxForm;
