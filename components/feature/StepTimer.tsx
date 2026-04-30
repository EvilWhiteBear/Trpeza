import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Play, Pause, RotateCcw } from 'lucide-react-native';
import { Colors, Fonts, Radius } from '@/constants/theme';

interface Props {
  totalSeconds: number;
  label: string;
}

export function StepTimer({ totalSeconds, label }: Props) {
  const [remaining, setRemaining] = useState(totalSeconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setRemaining(r => {
          if (r <= 1) { setRunning(false); clearInterval(intervalRef.current); return 0; }
          return r - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const reset = () => { setRunning(false); setRemaining(totalSeconds); };

  const progress = totalSeconds > 0 ? (totalSeconds - remaining) / totalSeconds : 0;
  const r = 24;
  const circumference = 2 * Math.PI * r;
  const strokeDashoffset = circumference * (1 - progress);

  const mm = Math.floor(remaining / 60).toString().padStart(2, '0');
  const ss = (remaining % 60).toString().padStart(2, '0');

  const done = remaining === 0;

  return (
    <View style={styles.container}>
      {/* Ring */}
      <View style={styles.ring}>
        <Svg width={60} height={60}>
          <Circle cx={30} cy={30} r={r} stroke={Colors.border} strokeWidth={4} fill="none" />
          <Circle
            cx={30} cy={30} r={r}
            stroke={done ? Colors.olive : Colors.primary}
            strokeWidth={4}
            fill="none"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            origin="30,30"
          />
        </Svg>
        <View style={styles.timeOverlay}>
          <Text style={[styles.time, done && { color: Colors.olive }]}>{mm}:{ss}</Text>
        </View>
      </View>
      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.playBtn, done && { backgroundColor: Colors.olive }]}
          onPress={() => done ? reset() : setRunning(r => !r)}
        >
          {done
            ? <RotateCcw size={14} color={Colors.white} />
            : running
              ? <Pause size={14} color={Colors.white} />
              : <Play size={14} color={Colors.white} />
          }
        </TouchableOpacity>
        {!done && (
          <TouchableOpacity onPress={reset} style={styles.resetBtn}>
            <RotateCcw size={12} color={Colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
    backgroundColor: Colors.bgDark,
    borderRadius: Radius.md,
    padding: 10,
  },
  ring: {
    width: 60,
    height: 60,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    fontFamily: Fonts.jetbrains,
    fontSize: 11,
    color: Colors.textDark,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  playBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
