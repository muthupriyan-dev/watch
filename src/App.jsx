import { useState, useEffect } from "react";
import "./App.css";

// ---------- DIGITAL CLOCK ----------
function Clock() {
  // "time" oda current value-a store pannum
  const [time, setTime] = useState(new Date());

  // Page load aana odane, 1 second-ku oru thadava time-a update pannum
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Component close aana timer-a nirutthum (cleanup)
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="box">
      <h1 className="display">{time.toLocaleTimeString()}</h1>
      <p>{time.toDateString()}</p>
    </div>
  );
}

// ---------- STOPWATCH ----------
function Stopwatch() {
  const [ms, setMs] = useState(0); // ethana millisecond aachu
  const [running, setRunning] = useState(false); // odudha illaya

  // "running" true aana mattum, every 10 millisecond-ku time-a update pannum
  useEffect(() => {
    if (running === false) return; // nikkuthu na onnum pannaadha

    // Start pannina neram - munnadi odina time (Resume work aagum)
    const startTime = Date.now() - ms;

    const timer = setInterval(() => {
      // Real time-la irundhu calculate pannurathaala slow aagaadhu
      setMs(Date.now() - startTime);
    }, 10);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  // Millisecond-a MM:SS.CC format-ku maathrom
  const mins = String(Math.floor(ms / 60000)).padStart(2, "0");
  const secs = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
  const centis = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");

  return (
    <div className="box">
      <h1 className="display">
        {mins}:{secs}.{centis}
      </h1>

      <button onClick={() => setRunning(true)}>Start</button>
      <button onClick={() => setRunning(false)}>Stop</button>
      <button
        onClick={() => {
          setRunning(false);
          setMs(0);
        }}
      >
        Reset
      </button>
    </div>
  );
}

// ---------- MAIN APP ----------
export default function App() {
  return (
    <div className="app">
      <h2>Digital Clock</h2>
      <Clock />

      <h2>Stopwatch</h2>
      <Stopwatch />
    </div>
  );
}