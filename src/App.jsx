import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Keyboard, Mousewheel } from 'swiper/modules';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/effect-fade';

import slides from './data';
import ProductModal from './components/ProductModal';

const FRUIT_SLOTS = ['f-tl', 'f-tr', 'f-bl', 'f-br'];

export default function App() {
  const rootRef = useRef(null);
  const swiperRef = useRef(null);
  const [active, setActive] = useState(0);
  const dirRef = useRef(1);   //  1 = next (enter from right), -1 = prev (enter from left)
  const prevIndex = useRef(0);
  const [product, setProduct] = useState(null);

  // STEP 1 — animate name and small fruit images sideways (the bottle stays centered, it only changes) whenever the slide changes (GSAP)
  // next button -> everything comes from the RIGHT, prev button -> everything comes from the LEFT
  useLayoutEffect(() => {
    const dir = dirRef.current;
    const w = window.innerWidth;
    const ctx = gsap.context(() => {
      const s = `.slide-${active}`;
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(`${s} .tag`, { x: dir * 80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, 0)
        .fromTo(`${s} .ch`, { x: dir * w * 0.7, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, stagger: { each: 0.06, from: dir > 0 ? 'start' : 'end' } }, 0.05)
        .fromTo(`${s} .fruit`, { x: dir * w * 0.6, rotate: dir * 120, opacity: 0 },
          { x: 0, rotate: 0, opacity: 1, duration: 1, stagger: 0.08, ease: 'power3.out' }, 0.2)
        .fromTo(`${s} .order-btn`, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.7);
    }, rootRef);
    return () => ctx.revert();
  }, [active]);

  // work out the direction (also handles swipe / keyboard / wheel and the wrap-around from last to first)
  const handleSlideChange = (sw) => {
    let d = sw.activeIndex - prevIndex.current;
    if (Math.abs(d) > 1) d = -Math.sign(d);
    if (d !== 0) dirRef.current = d > 0 ? 1 : -1;
    prevIndex.current = sw.activeIndex;
    setActive(sw.activeIndex);
  };

  const closeModal = useCallback(() => setProduct(null), []);

  return (
    <div className="app" ref={rootRef}>
      <Swiper
        modules={[EffectFade, Keyboard, Mousewheel]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={900}
        rewind
        keyboard
        mousewheel={{ thresholdDelta: 40, forceToAxis: true }}
        onSwiper={(sw) => (swiperRef.current = sw)}
        onSlideChange={handleSlideChange}
      >
        {slides.map((s, i) => (
          <SwiperSlide key={s.id}>
            <section className={`slide slide-${i}`} style={{ background: s.bg }}>
              <span className="tag">{s.tag}</span>

              <div className="hero">
                <h1 className="hero-word">
                  {s.word.split('').map((c, k) => <span className="ch" key={k}>{c}</span>)}
                  <span className="ch dot">.</span>
                </h1>
              </div>

              {FRUIT_SLOTS.map((slot, k) => (
                <div className={`fruit ${slot}`} key={slot}>
                  <img src={s.fruitImg} alt="" style={{ animationDelay: `${k * 0.6}s` }} />
                  <i className="fruit-shadow" />
                </div>
              ))}

              <div className="bottle-wrap">
                <div className="bottle-anim">
                  <img className="main-bottle-img" src={s.bottleImg} alt={s.word} />
                </div>
              </div>

              <div className="order-wrap">
                {/* STEP 2 — opens the product modal on every slide */}
                <motion.button
                  className="order-btn"
                  style={{ color: s.bg }}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setProduct(s.product)}
                >
                  Order Fresh Juice
                </motion.button>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="nav-btn prev" onClick={() => swiperRef.current?.slidePrev()} aria-label="Previous">‹</button>
      <button className="nav-btn next" onClick={() => swiperRef.current?.slideNext()} aria-label="Next">›</button>

      <ProductModal product={product} onClose={closeModal} />
    </div>
  );
}
