import React, { useState, useCallback } from "react";
import "./styles.css";

export default function ChipsInput() {
  const [chips, setChips] = useState([]);
  const [text, setText] = useState("");

  const addChip = useCallback((value) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    // Prevent duplicates
    if (chips.some((c) => c.text === trimmed)) return;

    setChips((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: trimmed }
    ]);
  }, [chips]);

  const removeChip = useCallback((id) => {
    setChips((prev) => prev.filter((chip) => chip.id !== id));
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addChip(text);
      setText("");
    }

    // Backspace removes last chip when input empty
    if (e.key === "Backspace" && !text && chips.length) {
      setChips((prev) => prev.slice(0, -1));
    }
  };

  return (
    <div className="main-container">
      <h2>Chips Input</h2>

      <div className="chips-wrapper">
        {chips.map(({ id, text }) => (
          <div key={id} className="chip">
            <span>{text}</span>
            <button
              aria-label={`Remove ${text}`}
              onClick={() => removeChip(id)}
              className="chip-close"
            >
              ×
            </button>
          </div>
        ))}

        <input
          type="text"
          value={text}
          placeholder="Type a chip and press Enter"
          className="input"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
