import React, { useState, useEffect } from 'react';

function App() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60); // in seconds
  const [currentLabel, setCurrentLabel] = useState("Session"); // Session or Break

  const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
      let interval;
      if (isRunning && timeLeft > 0) {
          interval = setInterval(() => {
              setTimeLeft(prev => prev - 1);
          }, 1000);
      } else if (isRunning && timeLeft === 0) {
          document.getElementById('beep').play();
          setCurrentLabel(prev => (prev === "Session" ? "Break" : "Session"));
          setTimeLeft(currentLabel === "Session" ? breakLength * 60 : sessionLength * 60);
      } else {
          clearInterval(interval);
      }

      return () => clearInterval(interval);
  }, [isRunning, timeLeft, breakLength, sessionLength, currentLabel]);

  const resetTimer = () => {
      setIsRunning(false);
      setSessionLength(25);
      setBreakLength(5);
      setTimeLeft(25 * 60);
      setCurrentLabel("Session");
      const audio = document.getElementById('beep');
      audio.pause();
      audio.currentTime = 0;
  }

  return (
    <div id="container">
      <div id="app">
          <div>
              <div className="main-title">25 + 5 Clock</div>

              <div className="controls-container">
                <div className="length-control">
                    <div id="break-label">Break Length</div>
                    <div className="controls-row">
                        <button id="break-decrement" onClick={() => setBreakLength(prev => Math.max(1, prev - 1))}>
                            <i className="fa fa-arrow-down fa-2x"></i>
                        </button>
                        {breakLength}
                        <button id="break-increment" onClick={() => setBreakLength(prev => Math.min(60, prev + 1))}>
                            <i className="fa fa-arrow-up fa-2x"></i>
                        </button>
                    </div>
                </div>

                <div className="length-control">
                  <div id="session-label">Session Length</div>
                    <div className="controls-row">
                      <button id="session-decrement" onClick={() => setSessionLength(prev => Math.max(1, prev - 1))}>
                          <i className="fa fa-arrow-down fa-2x"></i>
                        </button>
                        {sessionLength}
                        <button id="session-increment" onClick={() => setSessionLength(prev => Math.min(60, prev + 1))}>
                          <i className="fa fa-arrow-up fa-2x"></i>
                        </button>
                    </div>
                </div>
              </div>

    
                
              <div className="timer" style={{ color: 'white' }}>
                  <div className="timer-wrapper">
                      <div id="timer-label">{currentLabel}</div>
                      <div id="time-left">{formatTime(timeLeft)}</div>
                  </div>
              </div>

              <div className="timer-control">
                  <button id="start_stop" onClick={() => setIsRunning(!isRunning)}>
                      {isRunning ? 
                          <i className="fa fa-pause fa-2x"></i> :
                          <i className="fa fa-play fa-2x"></i>
                      }
                  </button>
                  <button id="reset" onClick={resetTimer}>
                      <i className="fa fa-refresh fa-2x"></i>
                  </button>
              </div>

              <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
          </div>
      </div>
  </div>
  );
}

export default App;
