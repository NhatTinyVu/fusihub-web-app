"use client";

import { useState } from "react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { SITE_DESCRIPTION } from "@/libs/constants";

const variants = {
  initial: {
    y: 40,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
};

const useFecthApi = () => {
  const [backendMessage, setBackendMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/hello");
      const data = await res.json();

      if (res.ok) {
        setBackendMessage(data.message);
      } else {
        console.error("Error fetching data:", data);
      }
    };

    fetchData();
  }, []);

  return backendMessage;
};

const AboutMe = () => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardsRef, { once: true, margin: "-100px" });
  const backendMessage = useFecthApi();

  return (
    <motion.div
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={variants}
      ref={cardsRef}
      transition={{
        duration: 0.5,
      }}
      className="relative content-center items-center"
    >
      <div className="my-8 flex items-center justify-center font-semibold">
        {SITE_DESCRIPTION}
      </div>
      <motion.h2
        className="text-center text-3xl font-semibold"
        initial={{
          y: 30,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        I'm Nhat Tiny Vu, a Full Stack Engineer building Attractive websites
        using Rust and React
      </motion.h2>
      <motion.div
        className="text-center my-8"
        initial={{
          y: 40,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        {backendMessage}
      </motion.div>
    </motion.div>
  );
};

export default AboutMe;
