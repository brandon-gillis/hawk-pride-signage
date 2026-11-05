import React from 'react';
import { Icon } from './Icon.jsx';
import { DESTINATION_ICONS } from './signSpec.js';

/** Pictogram for a named destination (campground, check-in, fuel…). */
export function DestinationIcon({ destination = 'campground', size = 48, color = 'var(--wayfinding-destination)', strokeWidth = 2.75, style }) {
  return <Icon name={DESTINATION_ICONS[destination] || destination} size={size} color={color} strokeWidth={strokeWidth} title={destination} style={style} />;
}
