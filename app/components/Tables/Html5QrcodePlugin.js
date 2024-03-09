import React from 'react';

import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';

const qrcodeRegionId = "html5qr-code-full-region";


// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props) => {
    let config = {
        qrbox: {width: 200, height: 200},
        rememberLastUsedCamera: true,
        showTorchButtonIfSupported: true, // TEST

        /* Force Camera Choice */  
        videoConstraints: {
            facingMode: { exact: "environment" } // "user"
       }, 
    };
    if (props.fps) {
        config.fps = props.fps;
    }
    if (props.qrbox) {
        config.qrbox = props.qrbox;
    }
    if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio;
    }
    if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip;
    }

    return config;
};

/*--------------------------- Mounted Component Post-Styling ------------------------*/
const styledQRComponent = () => {

    document.getElementById('html5-qrcode-anchor-scan-type-change') ? 
    document.getElementById('html5-qrcode-anchor-scan-type-change').style = 'visibility: hidden' : null;

    document.querySelector('img[alt="Info icon"]') ? 
    document.querySelector('img[alt="Info icon"]').style = 'display: none' : null;
    
    document.getElementById('html5qr-code-full-region__dashboard_section')?
    document.getElementById('html5qr-code-full-region__dashboard_section').style = 'display: none' : null; // _csr

    /*

    setTimeout(() => {


        document.getElementById('html5qr-code-full-region__scan_region')?
        document.getElementById('html5qr-code-full-region__scan_region').style = 'max-height: 300px' : null;

        document.getElementById('qr-shaded-region')?
        document.getElementById('qr-shaded-region').style = 'max-height: 300px' : null;
        
        document.getElementsByTagName('video')[0]?  
        document.getElementsByTagName('video')[0].style = 'max-height: 270px' : null;
            
    }, 2000);

    */
 }
/*------------------------- END Mounted Component Post-Styling ----------------------*/

const Html5QrcodePlugin = (props) => {

    useEffect(() => {
        // when component mounts
        const config = createConfig(props);
        const verbose = props.verbose === true;
        // Suceess callback is required.
        if (!(props.qrCodeSuccessCallback)) {
            throw "qrCodeSuccessCallback is required callback.";
        }
        const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
        html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);

        styledQRComponent();     

        // cleanup function when component will unmount
        return () => {
            html5QrcodeScanner.clear().catch(error => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };
        
    }, []);

    return (
        <div id={qrcodeRegionId} />
    );
};

export default Html5QrcodePlugin;