import { useState } from "react";
import "./RsvpModal.css";
import { API_BASE } from "./config";

export default function RsvpModal({ onClose, theme = "bride" }) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState("yes");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle -> sending -> sent -> error

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch(`${API_BASE}/api/rsvp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, attending, message }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="rsvp-overlay" onClick={onClose}>
      <div className={`rsvp-modal ${theme === "groom" ? "groom" : ""}`} dir="rtl" onClick={(e) => e.stopPropagation()}>
        <button className="rsvp-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        {status === "sent" ? (
          <div className="rsvp-thanks">
            <p className="rsvp-title">تم الإرسال 🌸</p>
            <p className="rsvp-thanks-text">شكرًا ليك، ردك وصلنا.</p>
          </div>
        ) : (
          <form onSubmit={submit}>
            <h3 className="rsvp-title">سيبولنا كلمة حلوة</h3>

            <input
              className="rsvp-input"
              type="text"
              placeholder="اسمك"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <div className="rsvp-radios">
              <label className="rsvp-radio">
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  checked={attending === "yes"}
                  onChange={() => setAttending("yes")}
                />
                هحضر إن شاء الله
              </label>
              <label className="rsvp-radio">
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  checked={attending === "no"}
                  onChange={() => setAttending("no")}
                />
                معلش مش هقدر
              </label>
            </div>

            <textarea
              className="rsvp-textarea"
              placeholder="اكتب رسالتك أو تهنئتك هنا..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {status === "error" && (
              <p className="rsvp-error">حصل خطأ، حاول تاني.</p>
            )}

            <button className="rsvp-submit" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "بيتبعت..." : "ابعت"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
