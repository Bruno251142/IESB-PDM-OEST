import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';


export default function FadeIn({ children, delay = 0, duration = 400, style }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  }, [opacity, duration, delay]);

  return <Animated.View style={[style, { opacity }]}>{children}</Animated.View>;
}
