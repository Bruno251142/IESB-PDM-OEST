import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function IconButton({ icon, size, color, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && { opacity: 0.5 }}>
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
}