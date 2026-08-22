import { useState } from "react";
import "./GroomEnvelopeIntro.css";

export default function GroomEnvelopeIntro({ onOpen, onPlayMusic }) {
  const [phase, setPhase] = useState("idle"); // idle -> opening -> leaving

  const handleClick = () => {
    if (phase !== "idle") return;
    onPlayMusic?.();
    setPhase("opening");
    setTimeout(() => setPhase("leaving"), 900);
    setTimeout(() => onOpen(), 1450);
  };

  return (
    <div className={`g-envelope-overlay ${phase === "leaving" ? "leaving" : ""}`}>
      <button className="g-envelope-trigger" onClick={handleClick} aria-label="Open invitation">
        <p className="g-invite-tag">you're invited to...</p>
        <div className={`g-envelope ${phase !== "idle" ? "open" : ""}`}>
          <div className="g-envelope-letter">
            <span className="g-envelope-letter-mono">A&nbsp;&amp;&nbsp;S</span>
          </div>
          <div className="g-envelope-flap" />
          <div className="g-envelope-body" />
          <div className="g-envelope-seal">⚜</div>
        </div>
        <p className="g-tap-hint">tap to open</p>
      </button>
    </div>
  );
}
