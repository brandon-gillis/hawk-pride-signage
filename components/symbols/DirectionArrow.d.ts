export type DirectionMove = 'straight' | 'up' | 'bear-right' | 'right' | 'back-right' | 'back' | 'down' | 'back-left' | 'left' | 'bear-left';
/**
 * A single move, or a compound route: 'straight-then-right', 'straight-then-right-then-down', or ['straight','right'].
 * Presets: ARROW_PRESETS.
 */
export type Direction = DirectionMove | `${DirectionMove}-then-${string}` | DirectionMove[];
/** Directional arrow; color = meaning of the destination it points to. */
export interface DirectionArrowProps {
  direction?: Direction;
  /** Colors the arrow by difficulty; 'destination' and 'access' give black. */
  level?: 'easy' | 'moderate' | 'difficult' | 'extreme' | 'access' | 'destination';
  /** Overrides level color (e.g. white on a colored face). */
  color?: string;
  size?: number;
  /** Default 3.25 (sign weight). */
  strokeWidth?: number;
  style?: React.CSSProperties;
}
export declare function DirectionArrow(props: DirectionArrowProps): JSX.Element;
