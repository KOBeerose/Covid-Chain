import React, {useState, useRef} from 'react';
import {Container, Card, CardContent, makeStyles, Grid, TextField, Button, responsiveFontSizes} from '@material-ui/core';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';
import { withThemeCreator } from '@material-ui/styles';


function App() { 
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] =  useState('');
  const classes = useStyles();
  const qrRef = useRef(null);
  const [status, setStatus] = useState("");
  const [status_live, setStatus_live] = useState("");
  
  
  const generateQrCode = async () => {
    try {
          const response = await QRCode.toDataURL(text);
          setImageUrl(response);
    }catch (error) {
      console.log(error);
    }
  }
  const handleErrorFile = (error) => {
    console.log(error);
  }
  const handleScanFile = (result) => {
      if (result) {
      scanForPass(result);
      }else{
        setStatus("Not a QR Code");
      }
  }
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  }
  const handleErrorWebCam = (error) => {
    console.log(error);
  }
  const handleScanWebCam = (result) => {
    if (result) {
      scanForPass1(result);
      }else{
        setStatus_live("Not a QR Code");
      }
   }
  function scanForPass1(qrCode) {
    debugger
    fetch(
      'http://localhost:5000',{
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({result:qrCode})
    }
    ).then(
      response =>{
        response.json().then(json =>{
          console.log(json)
          if(json.result){
            setStatus_live("this belongs to the blockchain");
          }else{
            setStatus_live("this does not belong to the blockchain");
          }
        });
      }
    )};
    function scanForPass(qrCode) {
      debugger
      fetch(
        'http://localhost:5000',{
         headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({result:qrCode})
      }
      ).then(
        response =>{
          response.json().then(json =>{
            console.log(json)
            if(json.result){
              setStatus("this belongs to the blockchain");
            }else{
              setStatus("this does not belong to the blockchain");
            }
          });
        }
      )}; 

  return (
    <Container className={classes.conatiner}>
      <img src="covidchain.png" className={classes.img} alt="logo"></img>
          <Card className={classes.card}>
              <h1 className={classes.title}>Fake Vaccination Pass Detection using BlockChain Technology</h1>
              <CardContent>
                  <Grid container spacing={2}>
                      <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                          <TextField className={classes.TextField} label="Pass Code" onChange={(e) => setText(e.target.value)}/>
                          <Button className={classes.btn} variant="contained" 
                            color="primary" onClick={() => generateQrCode()}>Generate QR</Button>
                            <br/>
                            <br/>
                            <br/>
                            {imageUrl ? (
                              <a href={imageUrl} download>
                                  <img src={imageUrl} alt="img"/>
                              </a>) : null}
                      </Grid>
                      <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <Button className={classes.btn} variant="contained" color="secondary" onClick={onScanFile}>Scan Qr Image</Button>
                        <QrReader
                          ref={qrRef}
                          delay={300}
                          style={{width: '100%'}}
                          onError={handleErrorFile}
                          onScan={handleScanFile}
                          legacyMode
                        />
                        <h3>Scanned Image's Code: {scanResultFile}</h3><br></br>
                        <h3> {status}</h3>
                      </Grid>
                      <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                         <h3>Qr Code Scan by Web Cam</h3>
                         <QrReader
                         delay={300}
                         style={{width: '100%'}}
                         onError={handleErrorWebCam}
                         onScan={handleScanWebCam}
                         />
                         <h3>Scanned By WebCam Code: {scanResultWebCam}</h3><br></br>
                         <h3> {status_live}</h3>
                      </Grid>
                  </Grid>
              </CardContent>
          </Card>
          <div className={classes.made}><h3>Made By &nbsp; <i>Taha</i> &nbsp; & &nbsp; <i>Badr-Eddine</i></h3></div> 
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
    conatiner: {
      marginTop: 10,
      width: '95%',
      '@media (min-width: 780px)' : {
        width: '100%',
      }
      
    },
    title: {
      display: 'flex',
      justifyContent: 'center',
      alignItems:  'center',
      textAlign: "center",
      color: '#black',
      padding: '1.5rem 1rem',
      textShadow: "2px 2px 10px #00CEAB",
      color: '#002c69', 
      overflow: 'hidden',
      fontSize: '1.5em',
      WebkitTextStroke: '0.05rem #000E20',
      '@media (min-width: 780px)' : {
        fontWeight: '3000',
        fontSize: '2.2em',
      }
    },  
    btn : {
      marginTop: 5,
      marginBottom: 25,
      '@media (min-width: 780px)' : {
        marginTop: 10,
        marginBottom: 20,
      }
    },
    made : {
      margin: "2rem 0rem",
      textAlign: "center",
      color: '#FFF7F7',
      '@media (min-width: 780px)' : {
        margin: "3rem 1rem"
      }
    },
    img : {
      width: '100%',  
      display: "block", 
      margin: "auto",
      '@media (min-width: 780px)' : {
        width: '40%'
      }

    },
    TextField : {
      margin: "1rem 0rem",
      '@media (min-width: 780px)' : {
        margin: "0rem 1rem",
      }
    },
    card : {
      boxShadow: "rgba(0, 0, 0, 0.5) 0px 30px 60px -15px",
      marginBottom: "5rem",
      padding: "0.5rem 1rem",
      '@media (min-width: 780px)' : {
        padding: "1rem 2rem",
      }
    },
    


}));
export default App;
