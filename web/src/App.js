import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import React, { useEffect, useState } from 'react';
function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://108.46.212.16:3001`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <label for="customRange1" class="form-label">Move Servo</label>
<input min='.075' max = ".25" step ="0.005" type="range" class="form-range" id="customRange1" onChange={(e)=>{  console.log("updating");  socket.emit('modify', e.target.value);}}/>


      </header>
    </div>
  );
}

export default App;
