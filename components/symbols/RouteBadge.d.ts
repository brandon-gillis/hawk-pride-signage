/** Navigation Route Badge (Playbook Part 5): identifies membership in a primary navigation route. */
export interface RouteBadgeProps {
  /** Route key from ROUTES. Default 'green-line'. */
  route?: 'green-line';
  /** Badge height H in px (on signs: inches × ppi). Width follows the label. Standard heights (BADGE_SPEC.heights): board 1″, street plaque 3″, marker decal 1.75″, route marker 2.2″. Minimum 1″. Default 32. */
  height?: number;
  style?: React.CSSProperties;
}
export declare function RouteBadge(props: RouteBadgeProps): JSX.Element;
