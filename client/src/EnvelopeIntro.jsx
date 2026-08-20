import { useState } from "react";
import "./EnvelopeIntro.css";

export default function EnvelopeIntro({ onOpen, onPlayMusic }) {
  const [phase, setPhase] = useState("idle"); // idle -> opening -> leaving

  const handleClick = () => {
    if (phase !== "idle") return;
    onPlayMusic?.();
    setPhase("opening");
    setTimeout(() => setPhase("leaving"), 900);
    setTimeout(() => onOpen(), 1450);
  };

  return (
    <div className={`envelope-overlay ${phase === "leaving" ? "leaving" : ""}`}>
      <button className="envelope-trigger" onClick={handleClick} aria-label="Open invitation">
        <p className="invite-tag">you're invited to...</p>
        <div className={`envelope ${phase !== "idle" ? "open" : ""}`}>
          <div className="envelope-letter">
            <span className="envelope-letter-mono">A&nbsp;&amp;&nbsp;S</span>
          </div>
          <div className="envelope-flap" />
          <div className="envelope-body" />
          <div className="envelope-heart">♥</div>
        </div>
        <p className="tap-hint">tap to open</p>
      </button>
    </div>
  );
}
