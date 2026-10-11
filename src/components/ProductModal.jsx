import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const chipVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export default function ProductModal({ product, onClose }) {
  const [confirmed, setConfirmed] = useState(false);

  // reset confirm state + ESC key + scroll lock
  useEffect(() => {
    if (!product) return;
    setConfirmed(false);
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  const handleConfirm = () => {
    if (confirmed) return;
    setConfirmed(true);
    setTimeout(onClose, 1600);
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-card"
            initial={{ opacity: 0, scale: 0.8, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: 'spring', damping: 22, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              className="modal-close"
              onClick={onClose}
              aria-label="Close"
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </motion.button>

            <div className="modal-media">
              <motion.img
                src={product.juiceImg}
                alt={product.name}
                initial={{ y: -90, rotate: -18, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring', damping: 14, stiffness: 120 }}
              />
            </div>

            <div className="modal-info">
              <motion.h2 initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                {product.name}
              </motion.h2>
              <motion.p className="modal-sub" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.22 }}>
                {product.subtitle}
              </motion.p>

              <motion.div className="modal-stats" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <div><span>ALCOHOL</span><b>{product.alcohol}</b></div>
                <div><span>VOLUME</span><b>{product.volume}</b></div>
                <div><span>VINTAGE</span><b>{product.vintage}</b></div>
              </motion.div>

              <p className="modal-label">RECOMMENDED PAIRINGS</p>
              <motion.div
                className="chips"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.45 } } }}
              >
                {product.pairings.map((p) => (
                  <motion.span key={p} className="chip" variants={chipVariants}>{p}</motion.span>
                ))}
              </motion.div>

              <motion.button
                className={`confirm-btn ${confirmed ? 'done' : ''}`}
                onClick={handleConfirm}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {confirmed ? '✓ ORDER CONFIRMED' : 'CONFIRM ORDER'}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
