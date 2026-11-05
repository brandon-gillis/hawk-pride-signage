/**
 * Standardized numbered trail symbol (Playbook Part 1): trail identity + difficulty in one graphic.
 * Easy/Moderate/Difficult: white number centered in the shape, auto-sized to fit (1–3 digits + letter suffix).
 * Extreme: white number on a purple plate beside the double diamond.
 * @startingPoint section="Symbols" subtitle="Numbered trail symbol" viewport="700x240"
 */
export interface TrailSymbolProps {
  /** 'access' = black-outlined number box (no difficulty). Omit / null = unrated (dashed gray). */
  level?: 'easy' | 'moderate' | 'difficult' | 'extreme' | 'access' | null;
  /** Trail number as printed: '7', '149', '23a', '149b'. Use the NEW number from TRAIL_INVENTORY. */
  number: string | number;
  /** Height in px. Square shapes; Extreme row layout is ~2.6× wide. Default 64. */
  size?: number;
  /** Extreme only. 'row' = plate beside the double diamond (boards, maps). 'stack' = diamonds over plate in a square (marker decals). */
  layout?: 'row' | 'stack';
  /** White keyline for dark or photo backgrounds. */
  keyline?: boolean;
  title?: string;
  style?: React.CSSProperties;
}
export declare function TrailSymbol(props: TrailSymbolProps): JSX.Element;
