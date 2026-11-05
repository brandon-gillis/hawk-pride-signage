export type DifficultyLevel = 'easy' | 'moderate' | 'difficult' | 'extreme' | 'access';
/**
 * Difficulty shape: green circle, blue square, red diamond, purple double diamond (access = gray road bar).
 * @startingPoint section="Symbols" subtitle="Trail difficulty shapes" viewport="700x220"
 */
export interface DifficultySymbolProps {
  level?: DifficultyLevel;
  /** Height in px. Double diamond renders 1.8x wide. Default 48. */
  size?: number;
  /** 'color' = difficulty color; 'white' for use on a colored sign face; 'black' for one-color output. */
  tone?: 'color' | 'white' | 'black';
  /** Adds a white keyline around the shape (use on dark or photo backgrounds). */
  keyline?: boolean;
  title?: string;
  style?: React.CSSProperties;
}
export declare function DifficultySymbol(props: DifficultySymbolProps): JSX.Element;
