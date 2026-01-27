import React, { useState, useCallback } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./styles.css";

export default function Accordion({ items = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = useCallback((index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div className="accordion">
      {items.map(({ title, content }, index) => {
        const isOpen = activeIndex === index;

        return (
          <div className="accordion-item" key={index}>
            <button
              className="accordion-title"
              onClick={() => handleToggle(index)}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${index}`}
            >
              <h3>{title}</h3>
              {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {isOpen && (
              <div
                id={`accordion-content-${index}`}
                className="accordion-content"
                role="region"
              >
                {content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
