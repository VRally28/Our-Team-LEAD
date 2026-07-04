/**
 * StationCard.jsx
 *
 * One executive's position in the ring. Two nested layers:
 *   .station-slot  → static 3D placement (rotateY + translateZ), never
 *                    animated directly — this is "where in the chamber"
 *   .station-card  → the motion layer (opacity/scale entrance, hover,
 *                    counter-rotated so the card always faces the camera
 *                    regardless of its position in the ring — the
 *                    classic "billboard" trick for CSS 3D rings)
 *
 * Entrance timing is driven by a MotionValue (`appear`) passed down from
 * ExecutiveSection — derived from scrollYProgress, so it costs nothing
 * extra: no per-card scroll listeners, just one shared transform.
 */

import { motion } from 'framer-motion'

export default function StationCard({
  exec,
  angle,
  radius,
  appearOpacity,
  appearScale,
  isActive,
  isDimmed,
  onHoverStart,
  onHoverEnd,
  onSelect,
}) {
  return (
    <div
      className="station-slot"
      style={{ transform: `rotateY(${angle}deg) translateZ(${radius}px)` }}
    >
      <motion.div
        className={`station-card ${isActive ? 'is-active' : ''} ${isDimmed ? 'is-dimmed' : ''}`}
        style={{
          transform: `rotateY(${-angle}deg)`,
          opacity: appearOpacity,
          scale: appearScale,
        }}
        whileHover={{ y: -10, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
        onClick={onSelect}
        layoutId={`station-${exec.id}`}
      >
        <div className="station-card-glow" />
        {exec.silhouette ? (
          <img src={exec.silhouette} alt="" className="station-silhouette" />
        ) : null}
        <p className="station-role">{exec.role}</p>
        <h3 className="station-name">{exec.name}</h3>
      </motion.div>
    </div>
  )
}
