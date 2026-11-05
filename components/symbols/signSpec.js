// Single source of truth for sign meaning and geometry. Mirrors tokens/colors.css + tokens/sign-dimensions.css.
// Rules for using these: NEW_SIGN_INSTRUCTIONS.md.
export const LEVELS = {
  easy:       { label: 'Easy',      color: 'var(--difficulty-easy)',      symbol: 'circle',         symbolName: 'Green circle',
                terrain: 'Maintained dirt, mild grades, small rocks and shallow ruts', vehicles: 'Most stock off-road vehicles' },
  moderate:   { label: 'Moderate',  color: 'var(--difficulty-moderate)',  symbol: 'square',         symbolName: 'Blue square',
                terrain: 'Rougher surfaces, steeper grades, rocks, deeper ruts and some technical features', vehicles: 'Capable 4WD / UTV \u2022 good clearance recommended' },
  difficult:  { label: 'Difficult', color: 'var(--difficulty-difficult)', symbol: 'diamond',        symbolName: 'Red diamond',
                terrain: 'Large obstacles, steep climbs, technical lines, deep ruts and off-camber terrain', vehicles: 'Modified vehicles and experienced drivers recommended' },
  extreme:    { label: 'Extreme',   color: 'var(--difficulty-extreme)',   symbol: 'double-diamond', symbolName: 'Purple double diamond',
                terrain: 'Severe climbs, major ledges, boulders and highly technical terrain', vehicles: 'Highly modified / purpose-built vehicles and experienced drivers' },
  access:     { label: 'Access Road', color: 'var(--access-road-sign)', arrowColor: 'var(--access-road-arrow)', lineColor: 'var(--access-road-line)', symbol: 'none', symbolName: 'None',
                terrain: 'General access routes, not part of the difficulty scale', vehicles: '' },
  destination:{ label: 'Destination', color: 'var(--wayfinding-destination)', symbol: 'icon', symbolName: 'Matching icon',
                terrain: 'Destination or general wayfinding', vehicles: '' },
};
// Primary navigation routes (Playbook Part 5). A route is a journey across several trails; it never replaces a trail's own name, number or difficulty.
export const ROUTES = {
  'green-line': { label: 'Green Line', color: 'var(--route-green-line)', ink: 'var(--hp-white)' },
};
// Route badge standard — every badge scales from its height H (inches on signs).
// Anton caps at 0.52 H cap height, 0.02 em tracking, 0.25 H side padding, 0.25 H clear space, square corners, no border. Minimum H = 1″.
export const BADGE_SPEC = { capRatio: 0.52, padX: 0.25, tracking: 0.02, clear: 0.25, minHeight: 1,
  heights: { board: 1, streetPlaque: 3, markerDecal: 1, routeMarker: 2.2 } };
// markerDecal = the 1″ minimum: a one-line GREEN LINE badge is ~2.96 H wide, so 1″ is the largest that keeps 0.25″ clear on a 3.5″ decal.

export const RATED_LEVELS = ['easy', 'moderate', 'difficult', 'extreme'];

export const CARTOTRACKS_CONVERSION = [
  { from: '1 \u2014 Paved or Dirt Road', to: 'access' },
  { from: '2 \u2014 Easy', to: 'easy' },
  { from: '3 \u2014 Moderate', to: 'moderate' },
  { from: '4 \u2014 Moderate Hard', to: 'difficult' },
  { from: '5 \u2014 Hard', to: 'difficult' },
  { from: '6 \u2014 Extreme', to: 'extreme' },
];

// Direction vocabulary -> Lucide arrow glyph
export const DIRECTIONS = {
  straight: 'arrow-up', up: 'arrow-up', down: 'arrow-down', 'bear-right': 'arrow-up-right', right: 'arrow-right', 'back-right': 'arrow-down-right',
  back: 'arrow-down', 'back-left': 'arrow-down-left', left: 'arrow-left', 'bear-left': 'arrow-up-left',
};

// Destination vocabulary -> Lucide icon
export const DESTINATION_ICONS = {
  campground: 'tent', 'check-in': 'house', parking: 'circle-parking', staging: 'car', fuel: 'fuel',
  food: 'utensils', 'first-aid': 'cross', viewpoint: 'binoculars', trailhead: 'flag', store: 'house',
  water: 'droplet', office: 'house' /* check-in, office and store are the same place — same icon */, info: 'info', caution: 'triangle-alert', exit: 'log-out',
  summit: 'mountain', 'rv-sites': 'caravan', 'group-area': 'users', 'emergency-phone': 'phone', cabins: 'building-cottage' /* Tabler */, woods: 'trees', 'you-are-here': 'map-pin',
};

// Physical geometry in inches
export const SIZES = {
  street: { heights: [6], widths: [24, 30], height: 6, width: 24, border: 0.375, inset: 0.25, corner: 0.75 },
  board:  { width: 24, margin: 1, border: 0.5, bleed: 0.125, headerHeight: 2.5, headerGap: 0, markHeight: 2.15, markTop: 1.1, wordmarkCap: 1.35, wordCapTop: 1.65, brandGap: 0.55, entryHeight: 4, bottomMargin: 0.5, rowRule: 0.1, nameCap: 1.5, corner: 0.5 },
  marker: { postWidth: 4, decal: 3.5, gap: 0.5 },
};
// Board sizes (inches): every entry is a fixed 4″ band, so height = 1″ top margin + 2.5″ header + 4″ × entries + 0.5″ bottom
// (one entry: no header, 1″ + 4″ + 1″). See NEW_SIGN_INSTRUCTIONS.md for the full board standard.
export const BOARD_SIZES = [
  { width: 24, height: 6, maxRows: 1 },
  { width: 24, height: 12, maxRows: 2 },
  { width: 24, height: 16, maxRows: 3 },
  { width: 24, height: 20, maxRows: 4 },
  { width: 24, height: 24, maxRows: 5 },
];
export const MAX_BOARD_ROWS = 5;
export function boardSizeFor(rows) { return BOARD_SIZES.find(b => rows <= b.maxRows) || null; }

export const DEFAULT_PPI = 12;
