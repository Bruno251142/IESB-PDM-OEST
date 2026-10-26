import { Button, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

export default function NewTask() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova tarefa</Text>
      <Text style={styles.text}>Esta tela abre como modal.</Text>
      <Button title="Fechar" color="#4682B4" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  text: { color: '#6B7280', marginBottom: 20 },
});
