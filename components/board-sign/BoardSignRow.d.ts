/** One entry on a Type 2 board sign. Normally rendered by BoardSign; use alone only for previews. */
export interface BoardSignRowProps {
  /** Trail or destination name, as printed (use the inventory sign name). A leading "To" is dropped automatically. */
  name: string;
  /** NEW trail number from TRAIL_INVENTORY. Required for trails; omit for destinations. */
  number?: string | number;
  /** From TRAIL_INVENTORY. null/undefined = unrated (gray, not printable). 'destination' = black icon + black arrow. 'connector' = unnumbered, unrated link trail (e.g. Cut-through): no symbol, black arrow. */
  level?: 'easy' | 'moderate' | 'difficult' | 'extreme' | 'access' | 'destination' | 'connector' | null;
  /** Destination key from DESTINATION_ICONS (level='destination'). */
  destination?: string;
  /** Single move or compound route ('straight-then-right'). Arrow always sits in the right column. */
  direction?: import('../symbols/DirectionArrow').Direction;
  /** Adds the route badge beside the name (trail segment is on the route). */
  route?: 'green-line';
  /** Rare: color the arrow by a different level than the trail (e.g. the connector you take to reach it). */
  arrowLevel?: 'easy' | 'moderate' | 'difficult' | 'extreme' | 'access';
  ppi?: number;
  showChecks?: boolean;
  style?: React.CSSProperties;
}
export declare function BoardSignRow(props: BoardSignRowProps): JSX.Element;
