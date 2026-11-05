/**
 * Official Hawk Pride trail difficulty legend (4 levels + access road).
 * @startingPoint section="Symbols" subtitle="Difficulty legend / map key" viewport="700x420"
 */
export interface DifficultyLegendProps {
  /** 'row' = symbols with labels; 'table' = symbol, label, terrain description. */
  variant?: 'row' | 'table';
  /** Include the gray access-road bar. Default true. */
  showAccess?: boolean;
  /** Table only: add vehicle guidance line (italic). */
  showDetails?: boolean;
  /** Symbol height in px. Default 48. */
  size?: number;
  style?: React.CSSProperties;
}
export declare function DifficultyLegend(props: DifficultyLegendProps): JSX.Element;
