import React, { useEffect, useState } from "react";
import "../styles/App.css";

const WelcomeAnimation = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2500 + 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;
  return (
    <div className="welcome-animation">
      <div className="welcome-graphic">
        <span className="welcome-hand">👋</span>
        <span className="welcome-text">Hola</span>
      </div>
    </div>
  );
};

export default WelcomeAnimation;
