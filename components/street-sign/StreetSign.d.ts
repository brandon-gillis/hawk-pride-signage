/**
 * Type 1 street sign: reflective metal blade for PRIMARY NAVIGATION routes only. Full background = difficulty.
 * Dimensions are inches; rendered px = inches × ppi.
 * @startingPoint section="Signs" subtitle="Type 1 — street-sign blade" viewport="700x360"
 */
export interface StreetSignProps {
  /** Trail name. Rendered uppercase, auto-shrinks to fit on one line. */
  name: string;
  /** Existing trail ID number (optional on street signs). */
  number?: string | number;
  /** 'access' renders a brown access-road blade without a symbol. */
  level?: 'easy' | 'moderate' | 'difficult' | 'extreme' | 'access';
  /** Adds a 3in-tall route badge plaque below the blade (Green Line trails). Blade color still = trail difficulty. */
  route?: 'green-line';
  /** Inches. 'auto' (default) = 24″ if the name fits at full letter height, else 30″. Or force 24 | 30. */
  width?: 'auto' | 24 | 30;
  /** Inches. Standard: 6. */
  height?: number;
  /** Pixels per inch. Preview 8–16; print export 150+. Default 12. */
  ppi?: number;
  /** White difficulty symbol at right. Not required by the Playbook (background color = difficulty). Default false. */
  showSymbol?: boolean;
  style?: React.CSSProperties;
}
export declare function StreetSign(props: StreetSignProps): JSX.Element;
