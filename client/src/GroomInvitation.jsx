import { useEffect, useRef, useState } from "react";
import "./GroomInvitation.css";
import useCountdown from "./useCountdown";
import { WEDDING_DATE_ISO, MAPS_URL, trackVisit } from "./config";
import Reveal from "./Reveal";
import GroomEnvelopeIntro from "./GroomEnvelopeIntro";
import RsvpModal from "./RsvpModal";

function Divider() {
  return (
    <svg viewBox="0 0 200 20" className="g-divider">
      <line x1="0" y1="10" x2="80" y2="10" stroke="currentColor" strokeWidth="1" />
      <circle cx="100" cy="10" r="3" fill="currentColor" />
      <line x1="120" y1="10" x2="200" y2="10" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function CrestIcon() {
  return (
    <svg viewBox="0 0 120 130" className="crest" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M60 4 L112 28 V72 C112 100 90 118 60 126 C30 118 8 100 8 72 V28 Z" />
        <path
          d="M60 14 L102 33 V71 C102 94 84 109 60 116 C36 109 18 94 18 71 V33 Z"
          opacity="0.55"
        />
      </g>
      <text
        x="60"
        y="76"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', serif"
        fontStyle="italic"
        fontSize="34"
        fill="currentColor"
      >
        &amp;
      </text>
    </svg>
  );
}

function CornerMarks() {
  return (
    <>
      <span className="g-corner g-corner-tl" aria-hidden="true" />
      <span className="g-corner g-corner-tr" aria-hidden="true" />
      <span className="g-corner g-corner-bl" aria-hidden="true" />
      <span className="g-corner g-corner-br" aria-hidden="true" />
    </>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 100 130" className="g-map-pin">
      <path
        d="M50 0C22 0 0 22 0 50c0 38 50 80 50 80s50-42 50-80C100 22 78 0 50 0z"
        fill="var(--gold)"
      />
      <circle cx="50" cy="48" r="22" fill="var(--navy-deep)" />
    </svg>
  );
}

export default function GroomInvitation() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE_ISO);
  const [opened, setOpened] = useState(false);
  const [muted, setMuted] = useState(false);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    trackVisit("ahmed");
  }, []);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <div className="g-page">
      <audio ref={audioRef} src="/audio/wedding-song.mp3" loop preload="auto" />
      {!opened && (
        <GroomEnvelopeIntro
          onOpen={() => setOpened(true)}
          onPlayMusic={() => audioRef.current?.play().catch(() => {})}
        />
      )}
      {opened && (
        <button
          className="g-mute-toggle"
          onClick={() => {
            const next = !muted;
            setMuted(next);
            if (audioRef.current) audioRef.current.muted = next;
          }}
          aria-label={muted ? "Unmute music" : "Mute music"}
        >
          {muted ? "🔇" : "🔊"}
        </button>
      )}
      <div className="g-card">
        <CornerMarks />
        {/* Monogram + wedding concert label */}
        <Reveal as="section" className="g-monogram-section">
          <img className="g-monogram-img" src="/assets/monogram-as.png" alt="A & S monogram" />
          <h2 className="g-section-label">Wedding Concert</h2>
        </Reveal>

        {/* Intro line */}
        <Reveal as="section" className="g-intro-section">
          <Divider />
          <p className="g-intro-text">
            A NEW CHAPTER BEGINS...
            AND WE WOULD BE HONORED
            TO HAVE YOU WITH US
            ON OUR SPECIAL DAY.
          </p>
          <Divider />
        </Reveal>

        {/* Date */}
        <Reveal as="section" className="g-date-hero">
          <CrestIcon />
          <span className="g-date-day">31</span>
          <span className="g-date-month">AUG</span>
        </Reveal>

        {/* Names + details */}
        <Reveal as="section" className="g-names-section">
          <h1 className="g-names">
            AHMED <span className="g-amp">&amp;</span> SOHAILA
          </h1>
          <ul className="g-details-list">
            <li>
              <span className="g-detail-icon">📅</span> 31 August 2026
            </li>
            <li>
              <span className="g-detail-icon">🕖</span> 7:00 PM
            </li>
            <li>
              <span className="g-detail-icon">📍</span> Loutes Hall, Police Club
            </li>
          </ul>
        </Reveal>

        {/* Countdown (live) */}
        <Reveal as="section" className="g-countdown-section">
          <h3 className="g-section-title">Time Left Until Our Wedding</h3>
          <div className="g-countdown-grid">
            <div className="g-countdown-cell">
              <span className="g-countdown-frame">
                <span key={days} className="g-countdown-num g-pulse">{days}</span>
              </span>
              <span className="g-countdown-unit">Days</span>
            </div>
            <div className="g-countdown-cell">
              <span className="g-countdown-frame">
                <span key={hours} className="g-countdown-num g-pulse">{hours}</span>
              </span>
              <span className="g-countdown-unit">Hours</span>
            </div>
            <div className="g-countdown-cell">
              <span className="g-countdown-frame">
                <span key={minutes} className="g-countdown-num g-pulse">{minutes}</span>
              </span>
              <span className="g-countdown-unit">Minutes</span>
            </div>
            <div className="g-countdown-cell">
              <span className="g-countdown-frame">
                <span key={seconds} className="g-countdown-num g-pulse">{seconds}</span>
              </span>
              <span className="g-countdown-unit">Seconds</span>
            </div>
          </div>
        </Reveal>

        {/* Location */}
        <Reveal as="section" className="g-location-section">
          <h3 className="g-section-title">Where to Find Us</h3>
          <PinIcon />
          <p className="g-address">
            5WPQ+7CG, El Moaskar, Moharam Bek, Alexandria Governorate 5411450
          </p>
          <a className="g-view-location" href={MAPS_URL} target="_blank" rel="noreferrer">
            View Location <span className="g-arrow">→</span>
          </a>
        </Reveal>

        {/* RSVP */}
        <Reveal as="section" className="g-rsvp-section">
          <h3 className="g-section-title">RSVP</h3>
          <p className="g-section-sub">Kindly RSVP by 31 August 2026</p>
          <button className="g-rsvp-btn" onClick={() => setRsvpOpen(true)}>
            Confirm Your Presence
          </button>
        </Reveal>

        {rsvpOpen && <RsvpModal theme="groom" onClose={() => setRsvpOpen(false)} />}

        {/* Thank you */}
        <Reveal as="section" className="g-thankyou-section">
          <Divider />
          <p className="g-thankyou-text">
            Thank You
            <br />
            We can't wait to celebrate this special day with you.
          </p>
        </Reveal>

        {/* Footer */}
        <footer className="g-footer-band">
          <span className="g-footer-signature">A &amp; S</span>
        </footer>
      </div>
    </div>
  );
}
