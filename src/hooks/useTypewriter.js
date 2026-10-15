import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to generate a smooth typewriter animation with a blinking cursor.
 * 
 * @param {Object} options
 * @param {string[]} options.words - List of phrases to cycle through
 * @param {string} [options.prefix=''] - Static prefix before the animated text
 * @param {string} [options.suffix=''] - Static suffix after the animated text
 * @param {number} [options.typeSpeed=65] - Milliseconds per character when typing
 * @param {number} [options.deleteSpeed=30] - Milliseconds per character when deleting
 * @param {number} [options.delayAfterWord=1800] - Pause at full word before deleting
 * @param {number} [options.delayAfterDelete=350] - Pause at empty word before next word
 * @param {number} [options.cursorBlinkSpeed=500] - Milliseconds for cursor blink toggle
 * @param {boolean} [options.pause=false] - Pause the animation (e.g., when user inputs text)
 * @returns {{ displayText: string, fullText: string, currentWord: string, isDeleting: boolean, cursorVisible: boolean, cursorChar: string }}
 */
export function useTypewriter({
  words = [],
  prefix = '',
  suffix = '',
  typeSpeed = 65,
  deleteSpeed = 30,
  delayAfterWord = 1800,
  delayAfterDelete = 350,
  cursorBlinkSpeed = 500,
  pause = false
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  const wordsRef = useRef(words);
  wordsRef.current = words;

  // Independent blinking cursor toggle
  useEffect(() => {
    if (pause) return;
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, cursorBlinkSpeed);
    return () => clearInterval(interval);
  }, [pause, cursorBlinkSpeed]);

  // Typewriter step logic
  useEffect(() => {
    if (pause) return;
    const list = wordsRef.current;
    if (!list || list.length === 0) return;

    const currentWord = list[wordIndex % list.length] || '';

    // Phase 1: Fully typed word -> wait, then begin deleting
    if (!isDeleting && subIndex === currentWord.length) {
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, delayAfterWord);
      return () => clearTimeout(timeout);
    }

    // Phase 2: Fully deleted word -> wait, then switch to next word
    if (isDeleting && subIndex === 0) {
      const timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % list.length);
      }, delayAfterDelete);
      return () => clearTimeout(timeout);
    }

    // Phase 3: Typing or backspacing next character
    const speed = isDeleting ? deleteSpeed : typeSpeed;
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
      setCursorVisible(true);
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, wordIndex, typeSpeed, deleteSpeed, delayAfterWord, delayAfterDelete, pause]);

  const list = wordsRef.current || words;
  const currentWord = list[wordIndex % (list.length || 1)] || '';
  const currentSlice = currentWord.substring(0, subIndex);
  
  // Show cursor: always on while typing/deleting, blinks when paused at full or empty
  const isTransitioning = (!isDeleting && subIndex === currentWord.length) || (isDeleting && subIndex === 0);
  const cursorChar = isTransitioning ? (cursorVisible ? '|' : ' ') : '|';

  const fullText = `${prefix}${currentSlice}${cursorChar}${suffix}`;

  return {
    displayText: currentSlice,
    fullText,
    currentWord,
    isDeleting,
    cursorVisible,
    cursorChar
  };
}

export default useTypewriter;
