import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import React, { useEffect, useState } from 'react';
function App() {
  const [socket, setSocket] = useState(null);
  const [ourOrientation, setOrientation] = useState('null');
  var beta
  function handleOrientation(event) {
    var absolute = event.absolute;
    var alpha    = event.alpha;
    beta     = (((event.beta+50)/100)*.2).toFixed(4);
    var gamma    = event.gamma;
    
    // Do stuff with the new orientation data
  
    setOrientation(beta)
  }
  

  function getPermission(){

    if(typeof DeviceOrientationEvent.requestPermission === 'function'){
      DeviceOrientationEvent.requestPermission()
       .then((state)=>{
         if(state === 'granted'){
           window.addEventListener('deviceorientation',handleOrientation);
         } else{
           alert("You will have to use the drag")
         }
       })
     }else{
       window.addEventListener('deviceorientation', handleOrientation)
     }
   } 
   useEffect(()=>{

    (function(){
      // do some stuff
      if(socket){
        setTimeout(socket.emit('modify', beta), 500);

      }
  })();
     
   })
  
  useEffect(() => {
    const newSocket = io(`https://rc.hackerslab.ml`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);



  return (
    <div className="App">
      <header className="App-header">
        <h1>{ourOrientation}</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <a onClick={()=>{getPermission()}}>Move with rotation</a>
        <label for="customRange1" class="form-label">Move Servo</label>
<input min='.075' max = ".25" step ="0.005" type="range" class="form-range" id="customRange1" onChange={(e)=>{  socket.emit('modify', e.target.value);}}/>


      </header>
    </div>
  );
}

export default App;
