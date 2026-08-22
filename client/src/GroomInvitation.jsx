import { useEffect, useRef, useState } from "react";
import "./GroomInvitation.css";
import useCountdown from "./useCountdown";
import { WEDDING_DATE_ISO, MAPS_URL, trackVisit } from "./config";
import Reveal from "./Reveal";
import GroomEnvelopeIntro from "./GroomEnvelopeIntro";
import RsvpModal from "./RsvpModal";

const DRESS_COLORS = [
  { name: "Navy", hex: "#1b2a4a" },
  { name: "Charcoal", hex: "#33363d" },
  { name: "Black", hex: "#141416" },
  { name: "Beige", hex: "#c8b28c" },
];

function Divider() {
  return (
    <svg viewBox="0 0 200 20" className="g-divider">
      <line x1="0" y1="10" x2="80" y2="10" stroke="currentColor" strokeWidth="1" />
      <circle cx="100" cy="10" r="3" fill="currentColor" />
      <line x1="120" y1="10" x2="200" y2="10" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function LaurelIcon() {
  return (
    <svg viewBox="0 0 140 90" className="laurel" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.85">
        <path d="M6 10 C 40 10, 60 40, 60 80" />
        <path d="M134 10 C 100 10, 80 40, 80 80" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={`l${i}`}>
            <path d={`M${10 + i * 9} ${16 + i * 10} q 14 -4 10 -16`} />
            <path d={`M${130 - i * 9} ${16 + i * 10} q -14 -4 -10 -16`} />
          </g>
        ))}
      </g>
    </svg>
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
        {/* Monogram + wedding concert label */}
        <Reveal as="section" className="g-monogram-section">
          <img className="g-monogram-img" src="/assets/monogram-as.png" alt="A & S monogram" />
          <h2 className="g-section-label">Wedding Concert</h2>
        </Reveal>

        {/* Concert card */}
        <Reveal as="section" className="g-concert-section">
          <img className="g-art-full g-concert-img" src="/assets/concert-card.png" alt="A timeless blessing for our new beginning" />
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
          <LaurelIcon />
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
              <span key={days} className="g-countdown-num g-pulse">{days}</span>
              <span className="g-countdown-unit">Days</span>
            </div>
            <div className="g-countdown-cell">
              <span key={hours} className="g-countdown-num g-pulse">{hours}</span>
              <span className="g-countdown-unit">Hours</span>
            </div>
            <div className="g-countdown-cell">
              <span key={minutes} className="g-countdown-num g-pulse">{minutes}</span>
              <span className="g-countdown-unit">Minutes</span>
            </div>
            <div className="g-countdown-cell">
              <span key={seconds} className="g-countdown-num g-pulse">{seconds}</span>
              <span className="g-countdown-unit">Seconds</span>
            </div>
          </div>
        </Reveal>

        {/* Dress code */}
        <Reveal as="section" className="g-dress-section">
          <h3 className="g-section-title">Dress Code</h3>
          <p className="g-section-sub">for guys guest</p>
          <div className="g-swatch-row">
            {DRESS_COLORS.map((c) => (
              <div className="g-swatch" key={c.name}>
                <span className="g-swatch-dot" style={{ background: c.hex }} />
                <span className="g-swatch-label">{c.name}</span>
              </div>
            ))}
          </div>
          <div className="g-swatch-row single">
            <div className="g-swatch">
              <span className="g-swatch-dot" style={{ background: "var(--gold)" }} />
              <span className="g-swatch-label">
                Gold Tie
                <br />
                <em>for groomsmen</em>
              </span>
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
