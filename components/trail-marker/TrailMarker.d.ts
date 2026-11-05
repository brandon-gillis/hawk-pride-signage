/**
 * Type 3 trail marker: inexpensive post + decals confirming which trail a rider is on. Inches × ppi.
 * @startingPoint section="Signs" subtitle="Type 3 — trail marker post" viewport="700x420"
 */
export interface TrailMarkerProps {
  /** Existing trail ID number. */
  number?: string | number;
  level?: 'easy' | 'moderate' | 'difficult' | 'extreme' | 'access';
  /** Adds a route badge decal (trail is on the Green Line). */
  route?: 'green-line';
  /** Optional directional decal. */
  direction?: import('../symbols/DirectionArrow').Direction;
  /** Multiple trails sharing one post (stacked top-to-bottom). Overrides number/level/direction. */
  routes?: { number: string | number; level: TrailMarkerProps['level']; direction?: TrailMarkerProps['direction']; route?: 'green-line' }[];
  ppi?: number;
  /** Inches of post shown below the last decal. Default 8. */
  postBelow?: number;
  /** false = decals only (print sheet). */
  showPost?: boolean;
  style?: React.CSSProperties;
}
export declare function TrailMarker(props: TrailMarkerProps): JSX.Element;
