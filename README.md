# Fresh Juice Collection (React + GSAP + Framer Motion + Swiper)

## Run
```
npm install
npm run dev
```
Open the URL Vite prints (http://localhost:5173).

## How it works
- **Swiper** (fade effect) = the carousel; arrows, keyboard and mouse-wheel all work.
- **GSAP** (`App.jsx`, `useLayoutEffect`) = on every slide change the label, big word letters, bottle (3D flip-in), fruits and button animate in.
- **Framer Motion** (`components/ProductModal.jsx`) = "Order Fresh Juice" modal: spring open, bottle drop-in, staggered pairing chips, Confirm Order -> "ORDER CONFIRMED".
- Your sample CSS is in `src/styles.css` (`.bottle-wrap`, `.main-bottle-img`, `floatBottle`).

## Use your real images
Put PNGs in `public/images/` and edit `src/data.js`:
`
