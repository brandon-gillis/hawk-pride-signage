import type { BoardSignRowProps } from './BoardSignRow';
/**
 * Type 2 board sign — the Hawk Pride board standard. Printed Dibond (aluminum composite, 1/8″), 24″ wide; 24×6 (1 entry, no header), 24×12 (2), 24×16 (3), 24×20 (4), 24×24 (5).
 * Black full-bleed border + black header (white brandmark + HAWK PRIDE OFFROAD), fixed 4″ entry bands stacked below the header, gray rules between. One entry: no header.
 * Follow NEW_SIGN_INSTRUCTIONS.md. Inches × ppi.
 * @startingPoint section="Signs" subtitle="Type 2 — board sign (standard)" viewport="700x520"
 */
export interface BoardSignProps {
  /** Entries in any order — the component sorts them straight → left → right. Max 5. */
  rows: Omit<BoardSignRowProps, 'ppi' | 'showChecks' | 'style'>[];
  /** Printed in the bottom border, e.g. "GL-04". Matches the sign's GIS point. */
  signId?: string;
  /** Pixels per inch. Preview 12–18; print export 150+. Default 12. */
  ppi?: number;
  /** Override brandmark URL (defaults to assets/logo/brandmark-white.svg). */
  logoSrc?: string;
  /** Trim, 0.125″ bleed, 1″ margin and header guides. Never on print output. */
  showGuides?: boolean;
  /** Red outline on rows whose name doesn't fit at standard letter size. */
  showChecks?: boolean;
  style?: React.CSSProperties;
}
export declare function BoardSign(props: BoardSignProps): JSX.Element;
