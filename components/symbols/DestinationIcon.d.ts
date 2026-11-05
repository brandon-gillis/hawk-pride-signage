export type Destination = 'campground' | 'check-in' | 'parking' | 'staging' | 'fuel' | 'food' | 'first-aid' | 'viewpoint' | 'trailhead' | 'store' | 'water' | 'office' | 'info' | 'caution' | 'exit' | 'summit' | 'rv-sites' | 'group-area' | 'emergency-phone' | 'cabins' | 'woods' | 'you-are-here';
/** Destination pictogram mapped from a controlled vocabulary. */
export interface DestinationIconProps {
  destination?: Destination;
  size?: number;
  /** Default var(--wayfinding-destination) — black. */
  color?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
}
export declare function DestinationIcon(props: DestinationIconProps): JSX.Element;
