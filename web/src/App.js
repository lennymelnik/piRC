import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import React, { useEffect, useState } from 'react';
function App() {
  const [socket, setSocket] = useState(null);
  const [ourOrientation, setOrientation] = useState('null');

  function handleOrientation(event) {
    var absolute = event.absolute;
    var alpha    = event.alpha;
    var beta     = event.beta;
    var gamma    = event.gamma;
    
    alert(beta)
    // Do stuff with the new orientation data
    setOrientation(beta)
  }
  function getPermission(){

    if(typeof DeviceMotionEvent.requestPermission === 'function'){
     DeviceMotionEvent.requestPermission()
       .then(ourRequest=>{
         alert(ourRequest)
         if(ourRequest === 'granted'){
           window.addEventListener('devicemotion',handleOrientation);
         } else{
           alert("You will have to use the drag")
         }
       })
     }else{
       window.addEventListener('devicemotion', handleOrientation)
     }
   } 
  
  useEffect(() => {
    const newSocket = io(`http://108.46.212.16:3001`);
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
