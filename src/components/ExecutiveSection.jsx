import { useEffect, useRef, useState } from "react";
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  motion,
  AnimatePresence,
} from "framer-motion";
import { executives } from "../data/executives";
import ProfilePanel from "./ProfilePanel";
import "../ExecutiveSection.css";

export default function ExecutiveSection({ execSignalRef }) {
  const sectionRef = useRef(null);
  const [activeExec, setActiveExec] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [phaseLabel, setPhaseLabel] = useState("THE ORB GUIDES YOU FORWARD");
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 20%"],
  });

  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.8, 1],
    [0, 1, 1, 0],
  );

  const rowGroups = [
    executives.slice(0, 4),
    executives.slice(4, 7),
    executives.slice(7, 10),
    executives.slice(10, 12),
  ];

  const [visibleRows, setVisibleRows] = useState([false, false, false, false]);
  const [headingVisible, setHeadingVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < 0.3) setPhaseLabel("CONVERGENCE INITIATED");
    else if (v < 0.7) setPhaseLabel("12 MINDS • ONE SIGNAL");
    else setPhaseLabel("LEADERSHIP SYNCHRONIZED");
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setHeadingVisible(v > 0.04);

    setVisibleRows([v > 0.06, v > 0.18, v > 0.3, v > 0.42]);

    
  });

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveExec(null);
        if (execSignalRef?.current) execSignalRef.current.activeIndex = -1;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [execSignalRef]);

  const handleHoverStart = (id, index) => {
    setHoveredId(id);
    if (execSignalRef?.current) execSignalRef.current.hoverIndex = index;
  };

  const handleHoverEnd = () => {
    setHoveredId(null);
    if (execSignalRef?.current) execSignalRef.current.hoverIndex = -1;
  };

  const handleSelect = (exec, index) => {
    setActiveExec(exec);
    if (execSignalRef?.current) execSignalRef.current.activeIndex = index;
  };

  const handleClose = () => {
    setActiveExec(null);
    if (execSignalRef?.current) execSignalRef.current.activeIndex = -1;
  };

  return (
    <section ref={sectionRef} id="exec-board" className="exec-board-section">
      <div className="exec-sticky-stage">
        <motion.p
          className="exec-phase-label"
          style={{ opacity: headingOpacity }}
        >
          {phaseLabel}
        </motion.p>

        <motion.h1
          className="exec-main-heading"
          initial={{
            opacity: 0,
            y: 28,
            scale: 1.05,
            filter: "blur(12px)",
          }}
          animate={{
            opacity: headingVisible ? 1 : 0,
            y: headingVisible ? 0 : 28,
            scale: headingVisible ? 1 : 1.05,
            filter: headingVisible ? "blur(0px)" : "blur(12px)",
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {" "}
          Executive Board{" "}
        </motion.h1>

        <div className="exec-orb-anchor" aria-hidden="true" />

        <div className="exec-formation">
          <AnimatePresence initial={false}>
            {rowGroups.map((row, rowIndex) => {
              const isVisible = visibleRows[rowIndex];

              return (
                <motion.div
                  key={`row-${rowIndex}`}
                  className={`exec-row exec-row-${rowIndex + 1}`}
                  initial={{
                    opacity: 0,
                    y: 70,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {row.map((exec, cardIndex) => {
                    const absoluteIndex =
                      rowIndex === 0
                        ? cardIndex
                        : rowIndex === 1
                          ? 4 + cardIndex
                          : rowIndex === 2
                            ? 7 + cardIndex
                            : 10 + cardIndex;
                    const isActive = activeExec?.id === exec.id;
                    const isDimmed = !!activeExec && !isActive;
                    const isHovered = hoveredId === exec.id;

                    return (
                      <motion.button
                        key={exec.id}
                        type="button"
                        className={`exec-card ${isActive ? "is-active" : ""} ${isDimmed ? "is-dimmed" : ""} ${isHovered ? "is-hovered" : ""}`}
                        onHoverStart={() =>
                          handleHoverStart(exec.id, absoluteIndex)
                        }
                        initial={{
                          opacity: 0,
                          y: 30,
                          scale: 0.96,
                        }}
                        animate={{
                          opacity: isVisible ? 1 : 0,
                          y: isVisible ? 0 : 20,
                          scale: isVisible ? 1 : 0.98,
                        }}
                        transition={{
                          duration: isVisible ? 0.35 : 0.3,
                          delay: isVisible ? cardIndex * 0.03 : 0,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        onHoverEnd={handleHoverEnd}
                        onClick={() => handleSelect(exec, absoluteIndex)}
                        whileHover={{
                          y: -14,
                          scale: 1.035,
                          transition: {
                            duration: 0.22,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        }}
                      >
                        <div className="exec-card-glow" />
                        <motion.div
                          className="exec-card-portrait"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: isVisible ? 1 : 0,
                          }}
                          transition={{
                            duration: 0.35,
                            delay: 0.08 + cardIndex * 0.03,
                          }}
                        >
                          <img src={exec.portrait} alt={exec.name} />
                        </motion.div>
                        <div className="exec-card-body">
                          <p className="exec-card-role">{exec.role}</p>
                          <h3 className="exec-card-name">{exec.name}</h3>
                          <p className="exec-card-meta">
                            Executive board ·{" "}
                            {String(absoluteIndex + 1).padStart(2, "0")}
                          </p>
                        </div>
                      </motion.button>
                    );
                  })}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {activeExec && (
            <ProfilePanel exec={activeExec} onClose={handleClose} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
