import { useEffect, useRef, useState } from "react";

export default function Reveal({ as: Tag = "div", className = "", delay = 0, children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let io;
    // Wait a frame so the browser paints the hidden state first — otherwise
    // elements already in view on load flip to visible before ever rendering
    // hidden, and the transition never gets a chance to play.
    const raf = requestAnimationFrame(() => {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      io.observe(el);
    });
    return () => {
      cancelAnimationFrame(raf);
      if (io) io.disconnect();
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
