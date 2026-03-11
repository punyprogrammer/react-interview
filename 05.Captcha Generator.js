import React, { useState } from "react";

const CHARACTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const generateCaptcha = (min = 5, max = 6) => {
  const length = Math.floor(Math.random() * (max - min + 1)) + min;

  return Array.from({ length }, () =>
    CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
  ).join("");
};

// Helper function to style each character
const getCharStyle = () => {
  const rotation = Math.floor(Math.random() * 31) - 15;
  const skew = Math.floor(Math.random() * 11) - 5;

  return {
    display: "inline-block",
    transform: `rotate(${rotation}deg) skew(${skew}deg)`,
    margin: "0 2px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#000",
    textShadow: "1px 1px #ccc",
  };
};

export default function CaptchaGenerator() {
  const [captcha, setCaptcha] = useState(() => generateCaptcha());
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (captcha === input.toUpperCase()) {
      setMessage("Correct");
    } else {
      setMessage("Incorrect");
    }
  };

  const resetCaptcha = () => {
    setCaptcha(generateCaptcha());
    setInput("");
    setMessage("");
  };

  return (
    <div className="container" style={{ fontFamily: "monospace" }}>
      <h2>Captcha Generator</h2>

      <div className="captcha-box">
        {captcha.split("").map((char, i) => (
          <span key={i} style={getCharStyle()}>
            {char}
          </span>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter captcha"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setMessage("");
          }}
        />

        <button type="submit">Submit</button>
        <button type="button" onClick={resetCaptcha}>
          Regenerate
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
