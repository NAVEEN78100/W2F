// src/components/SplitText.jsx
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function SplitText({
  text = "",
  className = "",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  duration = 0.8,
  delay = 0,
  ease = "easeOut",
  tag = "h1",
  textAlign = "center",
  rootMargin = "-100px",
  threshold = 0.1,
  onLetterAnimationComplete = () => {},
}) {
  const Tag = tag;
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: rootMargin, amount: threshold });

  const items =
    splitType === "chars"
      ? text.split("")
      : splitType === "words"
      ? text.split(" ")
      : [text];

  return (
    <Tag
      ref={ref}
      className={`${className} ${textAlign === "center" ? "text-center" : ""}`}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          initial={from}
          animate={isInView ? to : from}
          transition={{
            duration: duration,
            delay: delay / 1000 + index * 0.15, // stagger letters
            ease: ease,
          }}
          onAnimationComplete={index === items.length - 1 ? onLetterAnimationComplete : undefined}
          style={{ display: "inline-block" }}
        >
          {item === " " ? "\u00A0" : item}
        </motion.span>
      ))}
    </Tag>
  );
}
