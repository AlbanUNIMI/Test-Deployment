import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { testService } from "../../../../services/test.service";
import Dexie from 'dexie'
import { useLiveQuery } from 'dexie-react-hooks'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import toast, {Toaster} from 'react-hot-toast';


/*--------------------- Initiate IndexedDB Object Store ---------------------*/

  const db = new Dexie('UserDB')

  db.version(1).stores({
    currentUser: '++id, name, email, userCode',
  })

  const { currentUser } = db

/*------------------- END Initiate IndexedDB Object Store -------------------*/


const ReduxForm = () => {

  // const allItems = useLiveQuery(() => todos.toArray(), [])
  // console.log(allItems);

  const[userName, setUserName] = useState('');

  const add = async (name, email, userCode) => {

    await currentUser.add({
      name: name,
      email: email,
      userCode: userCode,
    })

    retrieve();

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
      let res = await testService.test();

      if (res.error) {
        
      console.log("1°ERR");

      } else {

        setResponse(res.data);
        console.log(res.data);
        
        let name = res.data.user[0].name;
        let email = res.data.user[0].eMail;
        let userCode = res.data.user[0].userCod;

        toast.success("Hello "+ name, {duration: 5000});

        add(name, email, userCode);

      }
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

           <Button variant="outlined" style={{color: 'white', borderColor: 'white'}} onClick={() => onCall()}>Test API Call</Button>
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
