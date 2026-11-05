import React from 'react';
import { ICONS } from './iconData.js';

/** Lucide glyph from the bundled set. */
export function Icon({ name, size = 24, color = 'currentColor', strokeWidth = 2.25, style, title }) {
  const body = ICONS[name];
  if (!body) return null;
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}
    strokeLinecap="round" strokeLinejoin="round" role="img" aria-label={title || name}
    style={{ display: 'block', flex: 'none', ...style }} dangerouslySetInnerHTML={{ __html: body }} />;
}
