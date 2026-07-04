/**
 * ProfilePanel.jsx
 *
 * Replaces the old centered modal. Slides in from the right edge of the
 * chamber as a glass panel — the ring stays visible and dimmed behind it
 * (selection feels like focusing within the chamber, not leaving it for
 * a popup). Shares a layoutId with the StationCard so Framer Motion
 * morphs the clicked card directly into the panel's portrait slot.
 */

import { motion } from 'framer-motion'

export default function ProfilePanel({ exec, onClose }) {
  return (
    <motion.div
      className="profile-panel-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClose}
    >
      <motion.div
        className="profile-panel"
        layoutId={`station-${exec.id}`}
        onClick={(e) => e.stopPropagation()}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="profile-portrait"
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <img src={exec.portrait} alt={exec.name} />
        </motion.div>

        <motion.div
          className="profile-info"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
          }}
        >
          <motion.p
            className="profile-role"
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          >
            {exec.role}
          </motion.p>
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          >
            {exec.name}
          </motion.h2>
          <motion.p
            className="profile-statement"
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          >
            {exec.statement}
          </motion.p>

          <motion.button
            className="profile-close"
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            onClick={onClose}
          >
            Back to the board
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
