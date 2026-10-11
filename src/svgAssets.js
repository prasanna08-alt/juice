// Placeholder artwork generated as SVG data-URIs.
// To use your own PNG/JPG, put it in /public/images and set `bottleImg` / `fruitImg` / `juiceImg` in data.js.
const uri = (svg) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

const SHAPES = {
  wine: 'M42 20 H58 V95 C58 115 80 125 80 150 V280 Q80 290 70 290 H30 Q20 290 20 280 V150 C20 125 42 115 42 95 Z',
  sparkling: 'M41 20 H59 V110 C59 135 84 150 84 180 V280 Q84 290 74 290 H26 Q16 290 16 280 V180 C16 150 41 135 41 110 Z',
  juice: 'M43 28 H57 V80 C57 98 78 106 78 132 V280 Q78 290 68 290 H32 Q22 290 22 280 V132 C22 106 43 98 43 80 Z',
};

export function bottleSvg({
  shape = 'wine', glass = '#d9c24a', liquid = '#f0dc8a', cap = '#b9922f',
  label = '#f7f2e6', ink = '#3a3a3a', lines = ['ESTATE', 'RESERVE'], capH = 40,
}) {
  const id = `c${Math.random().toString(36).slice(2, 8)}`;
  const d = SHAPES[shape];
  const text = lines
    .map((t, i) => `<text x="50" y="${196 + i * 11}" font-size="${i === 0 ? 9 : 6.5}" font-family="Georgia,serif" font-weight="${i === 0 ? 700 : 400}" text-anchor="middle" fill="${ink}">${t}</text>`)
    .join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 300">
  <defs><clipPath id="${id}"><path d="${d}"/></clipPath></defs>
  <path d="${d}" fill="${glass}"/>
  <g clip-path="url(#${id})"><rect x="0" y="105" width="100" height="190" fill="${liquid}" opacity=".92"/>
  <rect x="25" y="120" width="6" height="165" fill="#fff" opacity=".28"/>
  <rect x="68" y="150" width="3" height="130" fill="#fff" opacity=".15"/></g>
  <rect x="40" y="6" width="20" height="${capH}" rx="3" fill="${cap}"/>
  <rect x="40" y="${capH - 6}" width="20" height="3" fill="#000" opacity=".15"/>
  <rect x="27" y="170" width="46" height="84" rx="3" fill="${label}"/>
  <rect x="31" y="176" width="38" height="2" fill="${ink}" opacity=".4"/>
  ${text}
  <rect x="35" y="228" width="30" height="14" rx="2" fill="${cap}" opacity=".85"/>
  </svg>`;
  return uri(svg);
}

export function juiceBottleSvg({ juice = '#f7a41d', name = 'Mango' }) {
  const d = SHAPES.juice;
  const id = `j${Math.random().toString(36).slice(2, 8)}`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 300">
  <defs><clipPath id="${id}"><path d="${d}"/></clipPath>
  <linearGradient id="g${id}" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".15"/></linearGradient></defs>
  <path d="${d}" fill="${juice}"/>
  <g clip-path="url(#${id})"><rect width="100" height="300" fill="url(#g${id})"/></g>
  <rect x="42" y="10" width="16" height="20" rx="3" fill="#c9ccd2"/>
  <rect x="42" y="10" width="16" height="6" rx="2" fill="#e9ebef"/>
  <rect x="40" y="26" width="20" height="46" fill="#fff" opacity=".9" clip-path="url(#${id})"/>
  <rect x="26" y="150" width="48" height="100" rx="24" fill="#fff"/>
  <rect x="29" y="153" width="42" height="94" rx="21" fill="none" stroke="#b5392b" stroke-width="2"/>
  <text x="50" y="200" font-size="16" font-family="Georgia,serif" font-style="italic" font-weight="700" text-anchor="middle" fill="#b5392b">${name}</text>
  <circle cx="50" cy="226" r="9" fill="${juice}"/>
  </svg>`;
  return uri(svg);
}

const spokes = (n, r, color) =>
  Array.from({ length: n }, (_, i) => {
    const a = (i * 2 * Math.PI) / n;
    return `<line x1="50" y1="50" x2="${50 + r * Math.cos(a)}" y2="${50 + r * Math.sin(a)}" stroke="${color}" stroke-width="3"/>`;
  }).join('');

export function fruitSvg(type) {
  let body = '';
  if (type === 'passion') {
    const seeds = [[40,45],[55,40],[62,55],[48,60],[38,60],[52,50]]
      .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="3" ry="4.5" fill="#3b2a12"/>`).join('');
    body = `<circle cx="50" cy="50" r="44" fill="#d98a1f" stroke="#8a4b12" stroke-width="4"/>
      <circle cx="50" cy="50" r="31" fill="#f6d36b"/>${seeds}<ellipse cx="30" cy="28" rx="9" ry="5" fill="#fff" opacity=".35"/>`;
  } else if (type === 'berry') {
    const berries = [[22,60],[34,52],[22,44],[34,68],[46,60],[10,52],[22,76],[46,44]]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="#3a1840"/><circle cx="${x - 3}" cy="${y - 3}" r="2.5" fill="#fff" opacity=".35"/>`).join('');
    body = `${berries}<circle cx="72" cy="58" r="22" fill="#b8344b"/><circle cx="72" cy="58" r="15" fill="#f4a3ac"/>
      <path d="M72 46 L72 70 M60 58 L84 58" stroke="#d9667a" stroke-width="2"/><path d="M44 30 q10 -10 18 0" stroke="#4d7a2a" stroke-width="4" fill="none"/>`;
  } else if (type === 'strawberry') {
    const seeds = [[35,40],[50,38],[65,40],[40,55],[58,55],[48,70],[30,52],[70,52]]
      .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1.8" ry="2.8" fill="#ffe27a"/>`).join('');
    body = `<path d="M50 94 C20 72 8 46 18 30 C26 17 42 20 50 28 C58 20 74 17 82 30 C92 46 80 72 50 94Z" fill="#e0302f"/>${seeds}
      <path d="M50 28 L36 14 L46 22 L50 8 L54 22 L64 14Z" fill="#3f8f2f"/>
      <ellipse cx="30" cy="40" rx="6" ry="12" fill="#fff" opacity=".22"/>`;
  } else {
    const [rind, flesh, line] = type === 'lime' ? ['#4f9d2d', '#c5e86c', '#eaf7a8'] : ['#7fb842', '#f9efb8', '#f2d46a'];
    body = `<circle cx="50" cy="50" r="44" fill="${rind}"/><circle cx="50" cy="50" r="38" fill="${flesh}"/>${spokes(9, 36, line)}
      <circle cx="50" cy="50" r="5" fill="${line}"/>`;
  }
  return uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${body}</svg>`);
}
