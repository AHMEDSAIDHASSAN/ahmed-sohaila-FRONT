import { useEffect, useRef, useState } from "react";
import "./Invitation.css";
import useCountdown from "./useCountdown";
import { API_BASE, WEDDING_DATE_ISO, MAPS_URL } from "./config";
import Reveal from "./Reveal";
import EnvelopeIntro from "./EnvelopeIntro";
import RsvpModal from "./RsvpModal";

const DRESS_COLORS = [
  { name: "Olive Green", hex: "#7c7a4c" },
  { name: "Dusty Rose", hex: "#d8a2a4" },
  { name: "Champagne", hex: "#e3cba8" },
  { name: "Mauve", hex: "#9d7c86" },
];

function Divider() {
  return (
    <svg viewBox="0 0 200 20" className="divider">
      <line x1="0" y1="10" x2="80" y2="10" stroke="currentColor" strokeWidth="1" />
      <circle cx="100" cy="10" r="3" fill="currentColor" />
      <line x1="120" y1="10" x2="200" y2="10" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 100 130" className="map-pin">
      <path
        d="M50 0C22 0 0 22 0 50c0 38 50 80 50 80s50-42 50-80C100 22 78 0 50 0z"
        fill="#7a1f30"
      />
      <circle cx="50" cy="48" r="22" fill="#c6d3d6" />
    </svg>
  );
}

export default function Invitation() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE_ISO);
  const [opened, setOpened] = useState(false);
  const [muted, setMuted] = useState(false);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get("from") || "other";
    fetch(`${API_BASE}/api/visit?ref=${encodeURIComponent(ref)}`, { method: "POST" }).catch(
      () => {}
    );
  }, []);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <div className="page">
      <audio ref={audioRef} src="/audio/wedding-song.mp3" loop preload="auto" />
      {!opened && (
        <EnvelopeIntro
          onOpen={() => setOpened(true)}
          onPlayMusic={() => audioRef.current?.play().catch(() => {})}
        />
      )}
      {opened && (
        <button
          className="mute-toggle"
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
      <div className="card">
        {/* Monogram + wedding concert label */}
        <Reveal as="section" className="monogram-section">
          <img className="monogram-img" src="/assets/monogram-as.png" alt="A & S monogram" />
          <h2 className="section-label">Wedding Concert</h2>
        </Reveal>

        {/* Concert card */}
        <Reveal as="section" className="concert-section">
          <img className="art-full concert-img" src="/assets/concert-card.png" alt="A timeless blessing for our new beginning" />
          <img className="gramophone-img float" src="/assets/gramophone.png" alt="" aria-hidden="true" />
        </Reveal>

        {/* Intro line */}
        <Reveal as="section" className="intro-section">
          <Divider />
          <img className="floral-corner-left float" src="/assets/floral-corner.png" alt="" aria-hidden="true" />
          <p className="intro-text">
            A NEW CHAPTER BEGINS...
            AND WE WOULD BE HONORED
            TO HAVE YOU WITH US
            ON OUR SPECIAL DAY.
          </p>
          <Divider />
        </Reveal>

        {/* Date */}
        <Reveal as="section" className="date-hero">
          <img className="floral-side-right float" src="/assets/floral-divider.png" alt="" aria-hidden="true" />
          <span className="date-day">31</span>
          <span className="date-month">AUG</span>
        </Reveal>

        {/* Names + details */}
        <Reveal as="section" className="names-section">
          <h1 className="names">
            AHMED <span className="amp">&amp;</span> SOHAILA
          </h1>
          <ul className="details-list">
            <li>
              <span className="detail-icon">📅</span> 31 August 2026
            </li>
            <li>
              <span className="detail-icon">🕖</span> 7:00 PM
            </li>
            <li>
              <span className="detail-icon">📍</span> Loutes Hall, Police Club
            </li>
          </ul>
        </Reveal>

        {/* Countdown (live) */}
        <Reveal as="section" className="countdown-section">
          <img className="floral-side-right float" src="/assets/floral-corner.png" alt="" aria-hidden="true" />
          <h3 className="section-title">Time Left Until Our Wedding</h3>
          <div className="countdown-grid">
            <div className="countdown-cell">
              <span key={days} className="countdown-num pulse">{days}</span>
              <span className="countdown-unit">Days</span>
            </div>
            <div className="countdown-cell">
              <span key={hours} className="countdown-num pulse">{hours}</span>
              <span className="countdown-unit">Hours</span>
            </div>
            <div className="countdown-cell">
              <span key={minutes} className="countdown-num pulse">{minutes}</span>
              <span className="countdown-unit">Minutes</span>
            </div>
            <div className="countdown-cell">
              <span key={seconds} className="countdown-num pulse">{seconds}</span>
              <span className="countdown-unit">Seconds</span>
            </div>
          </div>
        </Reveal>

        {/* Dress code */}
        <Reveal as="section" className="dress-section">
          <h3 className="section-title">Dress Code</h3>
          <p className="section-sub">for girls guest</p>
          <div className="swatch-row">
            {DRESS_COLORS.map((c) => (
              <div className="swatch" key={c.name}>
                <span className="swatch-dot" style={{ background: c.hex }} />
                <span className="swatch-label">{c.name}</span>
              </div>
            ))}
          </div>
          <div className="swatch-row single">
            <div className="swatch">
              <span className="swatch-dot" style={{ background: "#6d1626" }} />
              <span className="swatch-label">
                Wine Red
                <br />
                <em>for bridesmaids</em>
              </span>
            </div>
          </div>
        </Reveal>

        {/* Location */}
        <Reveal as="section" className="location-section">
          <h3 className="section-title">Where to Find Us</h3>
          <PinIcon />
          <p className="address">
            5WPQ+7CG, El Moaskar, Moharam Bek, Alexandria Governorate 5411450
          </p>
          <a className="view-location" href={MAPS_URL} target="_blank" rel="noreferrer">
            View Location <span className="arrow">→</span>
          </a>
        </Reveal>

        {/* RSVP */}
        <Reveal as="section" className="rsvp-section">
          <h3 className="section-title">RSVP</h3>
          <p className="section-sub">Kindly RSVP by 31 August 2026</p>
          <button className="rsvp-btn" onClick={() => setRsvpOpen(true)}>
            Confirm Your Presence
          </button>
        </Reveal>

        {rsvpOpen && <RsvpModal onClose={() => setRsvpOpen(false)} />}

        {/* Thank you */}
        <Reveal as="section" className="thankyou-section">
          <Divider />
          <p className="thankyou-text">
            Thank You
            <br />
            We can't wait to celebrate this special day with you.
          </p>
        </Reveal>

        {/* Footer */}
        <Reveal as="img" className="art-full" src="/assets/footer-band.png" alt="S & A" />
      </div>
    </div>
  );
}
