"use client";
import { useLayoutEffect, useRef, useState, type ChangeEvent } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";

const Slider = () => {
  const minSliderValue = 0;
  const maxSliderValue = 100;

  const sliderRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);

  const [inputValue, setInputValue] = useState(maxSliderValue / 2);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [textFit, setTextFit] = useState(true);

  const progress = useMotionValue(maxSliderValue / 2);
  const leftWidth = useTransform(
    progress,
    [minSliderValue, maxSliderValue],
    ["0%", "100%"],
  );
  const rightWidth = useTransform(
    progress,
    [minSliderValue, maxSliderValue],
    ["100%", "0%"],
  );

  const leftWidthCalc = (inputValue / maxSliderValue) * sliderWidth;
  const rightWidthCalc = sliderWidth - leftWidthCalc;

  const costPercent = Math.round((inputValue / maxSliderValue) * 100);
  const qualityPercent = 100 - costPercent;

  const containerHeight = textFit ? 72 : 25;
  const textUp = textFit ? 0 : -containerHeight;

  useLayoutEffect(() => {
    const updateWidth = () => {
      if (sliderRef.current) {
        setSliderWidth(sliderRef.current.getBoundingClientRect().width);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useLayoutEffect(() => {
    const leftW = leftTextRef.current?.getBoundingClientRect().width ?? 0;
    const rightW = rightTextRef.current?.getBoundingClientRect().width ?? 0;
    setTextFit(leftW <= leftWidthCalc && rightW <= rightWidthCalc);
  }, [leftWidthCalc, rightWidthCalc]);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = Number(e.target.value);
    setInputValue(currentValue);
    animate(progress, currentValue, {
      type: "spring",
      stiffness: 280,
      damping: 28,
    });
  };

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center">
      <motion.div
        ref={sliderRef}
        initial={{ height: 72 }}
        animate={{ height: containerHeight }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-120 flex items-center"
      >
        <div className="absolute inset-0 flex items-center">
          {/* Left — Cost */}
          <motion.div
            style={{ width: leftWidth }}
            className={`h-full rounded-2xl flex justify-start items-center transition-colors duration-250 ${
              inputValue >= maxSliderValue / 2
                ? "bg-[#4B2206]"
                : "bg-[#4B2206]/80"
            }`}
          >
            <motion.div
              ref={leftTextRef}
              animate={{ y: textUp }}
              className="px-5 whitespace-nowrap text-xl select-none text-[#ea6f0a]"
            >
              <span className="text-[#ea6f0a]/50">COST </span>
              {costPercent}%
            </motion.div>
          </motion.div>

          <div className="h-3/4 w-1.5 bg-white rounded-full mx-1.5 shrink-0" />

          {/* Right — Quality */}
          <motion.div
            style={{ width: rightWidth }}
            className={`h-full rounded-2xl flex justify-end items-center transition-colors duration-250 ${
              inputValue < maxSliderValue / 2 ? "bg-white/25" : "bg-white/20"
            }`}
          >
            <motion.div
              ref={rightTextRef}
              animate={{ y: textUp }}
              className="text-white px-5 whitespace-nowrap text-xl select-none"
            >
              {qualityPercent}%<span className="text-white/30"> QUALITY</span>
            </motion.div>
          </motion.div>
        </div>

        <input
          type="range"
          min={minSliderValue}
          max={maxSliderValue}
          step={0.01}
          value={inputValue}
          onChange={inputChangeHandler}
          aria-label="Cost to Quality ratio"
          className="
            w-full h-full absolute cursor-ew-resize opacity-0
            [&::-webkit-slider-runnable-track]:h-full
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-3
            [&::-webkit-slider-thumb]:h-18
            [&::-webkit-slider-thumb]:rounded-sm
          "
        />
      </motion.div>
    </div>
  );
};

export default Slider;
