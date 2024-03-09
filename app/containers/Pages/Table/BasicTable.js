import React, {useState, useRef} from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock, EmptyData } from 'dan-components';
import StrippedTable from './StrippedTable';
import TextField from '@mui/material/TextField';

import { Scanner } from '@yudiel/react-qr-scanner';
import { Visibility } from '@mui/icons-material';



function BasicTable() {

  const[enabled, setEnabled] = useState(true);
  const[visibility, setVisibility] = useState('block');
  const[hidden, setHidden] = useState('none');



  const handleResult = async (text, result) => {

    console.log(text);
    console.log(result);

   /* setEnabled(false); */

   setVisibility('none');
   setHidden('block');
   setEnabled(false);

   setTimeout(() => {
      setEnabled(true);
   }, 2000);

   setTimeout(() => {
      setVisibility('block');
      setHidden('none');
  }, 2500);

    
  }
  
  return (
    <div>
     
      <PapperBlock title="Table" whiteBg icon="ion-ios-menu-outline" desc="UI Table when no data to be shown">

        <div style={{display: hidden}}>
           ****demo demo demo****
        </div>
          
        <div style={{display: visibility}}>
        <Scanner constraints={{ video: { facingMode: "user" }}}
            onResult={(text, result) => handleResult(text, result)}
            onError={(error) => console.log(error?.message)}
            enabled={enabled}
            finderBorder={4}
            audio={false}
        /> 

        </div>

      </PapperBlock>


    </div>
  );
}

export default BasicTable;
