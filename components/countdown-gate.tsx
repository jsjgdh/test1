"use client";
import React, { useEffect, useState } from "react";

export default function CountdownGate({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(3);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let current = 3;
    const interval = setInterval(() => {
      current -= 1;
      if (current >= 0) {
        setCount(current);
      }
      if (current === 0) {
        setTimeout(() => setDone(true), 1000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {!done && (
        <div className="splash-overlay">
          <div key={count} className="countdown-number">
            {count === 0 ? "WELCOME" : count}
          </div>
        </div>
      )}
      <div style={{ visibility: done ? "visible" : "hidden" }}>{children}</div>
    </>
  );
}