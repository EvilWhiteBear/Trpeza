import React from 'react';
import Svg, { Path, Circle, Ellipse, Line, Polygon } from 'react-native-svg';
import { Motif } from '@/constants/dishes';

interface Props { motif: Motif; size?: number; color?: string; }

export function MotifSvg({ motif, size = 48, color = 'rgba(255,255,255,0.18)' }: Props) {
  switch (motif) {
    case 'leaf':
      return (
        <Svg width={size} height={size} viewBox="0 0 48 48">
          <Path d="M24 4 C10 14 8 32 24 44 C40 32 38 14 24 4Z" fill={color} />
          <Path d="M24 4 L24 44" stroke={color} strokeWidth="1.5" fill="none" opacity={0.6} />
          <Path d="M14 20 Q24 16 34 20" stroke={color} strokeWidth="1" fill="none" opacity={0.5} />
          <Path d="M12 30 Q24 26 36 30" stroke={color} strokeWidth="1" fill="none" opacity={0.4} />
        </Svg>
      );
    case 'wheat':
      return (
        <Svg width={size} height={size} viewBox="0 0 48 48">
          <Path d="M24 44 L24 10" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <Ellipse cx="24" cy="12" rx="5" ry="9" fill={color} />
          <Ellipse cx="17" cy="20" rx="4" ry="7" fill={color} transform="rotate(-25 17 20)" />
          <Ellipse cx="31" cy="20" rx="4" ry="7" fill={color} transform="rotate(25 31 20)" />
          <Ellipse cx="15" cy="30" rx="3" ry="5" fill={color} transform="rotate(-30 15 30)" opacity={0.8} />
          <Ellipse cx="33" cy="30" rx="3" ry="5" fill={color} transform="rotate(30 33 30)" opacity={0.8} />
        </Svg>
      );
    case 'flame':
      return (
        <Svg width={size} height={size} viewBox="0 0 48 48">
          <Path d="M24 44 C12 38 10 26 16 18 C16 26 20 28 22 24 C22 32 28 34 26 22 C32 26 36 34 30 42 C28 43.5 26 44 24 44Z" fill={color} />
          <Path d="M24 38 C20 34 20 28 24 24 C24 30 26 32 24 38Z" fill={color} opacity={0.5} />
        </Svg>
      );
    case 'drip':
      return (
        <Svg width={size} height={size} viewBox="0 0 48 48">
          <Path d="M24 8 C24 8 14 22 14 30 C14 38 18.7 44 24 44 C29.3 44 34 38 34 30 C34 22 24 8 24 8Z" fill={color} />
          <Ellipse cx="20" cy="30" rx="3" ry="5" fill={color} opacity={0.4} transform="rotate(-15 20 30)" />
        </Svg>
      );
    case 'grape':
      return (
        <Svg width={size} height={size} viewBox="0 0 48 48">
          <Circle cx="18" cy="24" r="6" fill={color} />
          <Circle cx="30" cy="24" r="6" fill={color} />
          <Circle cx="24" cy="33" r="6" fill={color} />
          <Circle cx="12" cy="33" r="5" fill={color} opacity={0.8} />
          <Circle cx="36" cy="33" r="5" fill={color} opacity={0.8} />
          <Circle cx="24" cy="42" r="5" fill={color} opacity={0.7} />
          <Path d="M24 18 C24 14 28 10 32 8" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
          <Path d="M24 14 C22 12 18 10 16 8" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </Svg>
      );
    case 'knife':
      return (
        <Svg width={size} height={size} viewBox="0 0 48 48">
          <Path d="M22 6 L26 6 L28 32 L24 36 L20 32 Z" fill={color} />
          <Path d="M20 32 L28 32 L28 44 L20 44 Z" fill={color} opacity={0.6} />
          <Path d="M23 6 L27 30" stroke={color} strokeWidth="0.8" opacity={0.4} />
        </Svg>
      );
    case 'oven':
      return (
        <Svg width={size} height={size} viewBox="0 0 48 48">
          <Path d="M8 16 Q8 10 14 10 L34 10 Q40 10 40 16 L40 38 Q40 44 34 44 L14 44 Q8 44 8 38 Z" fill={color} />
          <Path d="M14 22 L34 22 L34 38 L14 38 Z" fill="none" stroke={color} strokeWidth="1.5" opacity={0.6} />
          <Circle cx="16" cy="15" r="2.5" fill={color} opacity={0.7} />
          <Circle cx="24" cy="15" r="2.5" fill={color} opacity={0.7} />
          <Circle cx="32" cy="15" r="2.5" fill={color} opacity={0.7} />
        </Svg>
      );
    case 'fish':
      return (
        <Svg width={size} height={size} viewBox="0 0 48 48">
          <Path d="M8 24 C8 24 14 14 24 16 C34 18 42 24 42 24 C42 24 34 30 24 32 C14 34 8 24 8 24Z" fill={color} />
          <Path d="M6 18 L14 24 L6 30 Z" fill={color} opacity={0.7} />
          <Circle cx="36" cy="22" r="2" fill={color} opacity={0.5} />
          <Path d="M18 18 Q24 24 18 30" stroke={color} strokeWidth="1" fill="none" opacity={0.4} />
          <Path d="M22 17 Q28 24 22 31" stroke={color} strokeWidth="1" fill="none" opacity={0.4} />
        </Svg>
      );
    default:
      return null;
  }
}
