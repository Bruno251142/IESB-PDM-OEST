import { useState } from 'react';
import { Alert, Button, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import DoneIcon from '../../components/DoneIcon';
import { getCurrentPlace } from '../../services/location';
import { scheduleReminder } from '../../services/notifications';

const TASKS = [
  { id: '42', title: 'Entregar o relatório de PDM' },
  { id: '7', title: 'Estudar para a prova' },
  { id: '15', title: 'Revisar os slides da aula' },
];

export default function Tarefas() {
  const [place, setPlace] = useState(null);
  const [doneCount, setDoneCount] = useState(0);

  async function handleCheckIn() {
    try {
      const found = await getCurrentPlace();
      if (!found) {
        Alert.alert(
          'Permissão de localização',
          'Sem a permissão não consigo registrar onde você estudou. Libere a localização nos ajustes.'
        );
        return;
      }
      setPlace(found);
    } catch (error) {
      Alert.alert(
        'Não foi possível obter o local',
        'Verifique se a localização do aparelho está ligada e tente de novo.'
      );
    }
  }

  async function handleReminder() {
    try {
      const id = await scheduleReminder('Hora de estudar!', 10);
      if (id === null) {
        Alert.alert('Permissão de notificações', 'Libere as notificações nos ajustes para receber o lembrete.');
        return;
      }
      Alert.alert('Lembrete agendado', 'Você será avisado em 10 segundos.');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível agendar o lembrete.');
    }
  }

  async function handleComplete() {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      // Em alguns emuladores não há vibração; o app segue normalmente.
    }
    setDoneCount((count) => count + 1);
    Alert.alert('Tarefa concluída');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.section}>Minhas tarefas</Text>
      {TASKS.map((task) => (
        <Link key={task.id} href={`/task/${task.id}`} asChild>
          <Pressable style={styles.row}>
            <Text style={styles.rowText}>{task.title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </Pressable>
        </Link>
      ))}
      <View style={styles.action}>
        <Button title="Nova tarefa" color="#4682B4" onPress={() => router.push('/new-task')} />
      </View>

      <Text style={styles.section}>Ações</Text>
      <View style={styles.action}>
        <Button title="Estudei aqui" color="#4682B4" onPress={handleCheckIn} />
      </View>
      {place && <Text style={styles.place}>Estudei em: {place.label}</Text>}

      <View style={styles.action}>
        <Button title="Lembrar em 10 s" color="#4682B4" onPress={handleReminder} />
      </View>

      <View style={styles.action}>
        <Button title="Concluir" color="#2E7D32" onPress={handleComplete} />
      </View>
      {doneCount > 0 && <DoneIcon trigger={doneCount} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40 },
  section: { fontSize: 18, fontWeight: '700', marginTop: 8, marginBottom: 10 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
  },
  rowText: { fontSize: 16, flex: 1, marginRight: 8 },
  action: { marginTop: 10 },
  place: { marginTop: 10, fontSize: 15, color: '#374151' },
});
