import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Filter, FeTurbulence, FeColorMatrix, Rect } from 'react-native-svg';

interface Props {
  style?: any;
}

export function FilmGrain({ style }: Props) {
  return (
    <View style={[StyleSheet.absoluteFill, { opacity: 0.06 }, style]} pointerEvents="none">
      <Svg width="100%" height="100%">
        <Filter id="grain">
          <FeTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <FeColorMatrix type="saturate" values="0" />
        </Filter>
        <Rect width="100%" height="100%" filter="url(#grain)" opacity={1} />
      </Svg>
    </View>
  );
}
