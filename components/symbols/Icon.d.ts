/** Bundled Lucide glyph (see assets/icons/lucide). */
export interface IconProps {
  /** Lucide icon name, e.g. 'tent', 'fuel', 'arrow-right'. Prefer DESTINATION_ICONS keys via DestinationIcon. */
  name: string;
  size?: number;
  color?: string;
  /** Default 2.25. Use 2.75–3.25 on signs. */
  strokeWidth?: number;
  title?: string;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): JSX.Element;
