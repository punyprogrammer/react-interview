import { useState, useMemo } from "react";

function WordCounter() {
  const [text, setText] = useState("");

  const wordCounts = useMemo(() => {
    const words = text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (!words.length) return [];

    const wordMap = words.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(wordMap)
      .sort((a, b) => b[1] - a[1])
      .map(([word, count]) => ({ word, count }));
  }, [text]);

  return (
    <div className="wordCounter">
      <h1>Word Counter</h1>

      <div className="container">
        <textarea
          className="textarea"
          placeholder="Type your text here"
          data-testid="textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="results">
          <h3>Word Frequencies</h3>

          {wordCounts.length > 0 && (
            <ul data-testid="result-list">
              {wordCounts.map(({ word, count }) => (
                <li key={word} data-testid={`word-${word}`}>
                  <strong>{word} count</strong>: {count}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default WordCounter;
