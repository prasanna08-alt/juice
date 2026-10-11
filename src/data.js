import { bottleSvg, juiceBottleSvg, fruitSvg } from './svgAssets';

// To use real images: set bottleImg / fruitImg / product.juiceImg to e.g. '/images/exotic-bottle.png'
const base = import.meta.env.BASE_URL;

const slides = [
  {
    id: 'exotic', word: 'Exotic', tag: 'Fruity', bg: '#bfb1f7',
    bottleImg: `${base}images/bottle-exotic.png`,
    fruitImg: fruitSvg('passion'),
    product: {
      name: 'Passion Pulse', subtitle: '100% Natural Organic Juice',
      alcohol: '0.0%', volume: '750ml', vintage: '2024',
      pairings: ['Soft Cheese', 'Vanilla Cake', 'Coconut Bites'],
      juiceImg: juiceBottleSvg({ juice: '#e8b23a', name: 'Passion' }),
    },
  },
  {
    id: 'velvet', word: 'Velvet', tag: 'Full-Bodied', bg: '#ee6f7f',
    bottleImg: `${base}images/bottle-velvet.png`,
    fruitImg: fruitSvg('berry'),
    product: {
      name: 'Berry Velvet', subtitle: '100% Natural Organic Juice',
      alcohol: '0.0%', volume: '750ml', vintage: '2024',
      pairings: ['Brie Cheese', 'Dark Chocolate', 'Berry Tart'],
      juiceImg: juiceBottleSvg({ juice: '#8a2340', name: 'Berry' }),
    },
  },
  {
    id: 'golden', word: 'Golden', tag: 'Classic White', bg: '#fbd98b',
    bottleImg: `${base}images/bottle-golden.png`,
    fruitImg: fruitSvg('lemon'),
    product: {
      name: 'Mango Surge', subtitle: '100% Natural Organic Juice',
      alcohol: '0.0%', volume: '750ml', vintage: '2024',
      pairings: ['Almond Cheese', 'Dark Chocolate Truffle', 'Fresh Tart'],
      juiceImg: juiceBottleSvg({ juice: '#f7a41d', name: 'Mango' }),
    },
  },
  {
    id: 'sparkling', word: 'Sparkling', tag: 'Festive Vintage', bg: '#f8bfa9',
    bottleImg: `${base}images/bottle-sparkling.png`,
    fruitImg: fruitSvg('strawberry'),
    product: {
      name: 'Strawberry Fizz', subtitle: '100% Natural Organic Juice',
      alcohol: '0.0%', volume: '750ml', vintage: '2024',
      pairings: ['Cream Cheese', 'Macarons', 'Fresh Fruit'],
      juiceImg: juiceBottleSvg({ juice: '#e5484d', name: 'Berry' }),
    },
  },
  {
    id: 'citrus', word: 'Citrus', tag: 'Zesty White', bg: '#94d2af',
    bottleImg: `${base}images/bottle-citrus.png`,
    fruitImg: fruitSvg('lime'),
    product: {
      name: 'Lime Zest', subtitle: '100% Natural Organic Juice',
      alcohol: '0.0%', volume: '750ml', vintage: '2024',
      pairings: ['Goat Cheese', 'Lemon Cake', 'Mint Salad'],
      juiceImg: juiceBottleSvg({ juice: '#9acd32', name: 'Lime' }),
    },
  },
];

export default slides;
