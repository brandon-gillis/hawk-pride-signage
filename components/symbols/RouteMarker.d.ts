/** Directional route marker (Playbook Part 5): badge + arrow showing which way to stay on the route. */
export interface RouteMarkerProps {
  route?: 'green-line';
  /** Any DirectionArrow direction, including compound ('straight-then-right'). */
  direction?: import('./DirectionArrow').Direction;
  ppi?: number;
  style?: React.CSSProperties;
}
export declare function RouteMarker(props: RouteMarkerProps): JSX.Element;
