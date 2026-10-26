import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';


export default function DoneIcon({ trigger }) {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSequence(withSpring(1.6), withSpring(1));
  }, [trigger, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Ionicons name="checkmark-circle" size={48} color="#2E7D32" />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { alignSelf: 'center', marginTop: 12 },
});
