import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FadeIn from '../../components/FadeIn';
import useNotices from '../../hooks/useNotices';
import { api } from '../../services/api';

export default function Inicio() {
  const { notices, isLoading, error, reload } = useNotices();

  // Bônus: o JSONPlaceholder responde com um id, mas não grava de verdade.
  async function handleCreateNotice() {
    try {
      const created = await api.create('posts', {
        title: 'Novo aviso',
        body: 'Aviso criado pelo CampusGo.',
        userId: 1,
      });
      Alert.alert('Aviso criado', `O servidor devolveu o id ${created.id}.`);
    } catch (err) {
      Alert.alert('Erro ao criar aviso', err.message);
    }
  }

  // Estado 1: erro
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Não foi possível carregar os avisos.</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        <Button title="Tentar novamente" color="#4682B4" onPress={reload} />
      </View>
    );
  }

  // Estado 2: carregando (primeira busca ou nova tentativa)
  if (isLoading && notices.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4682B4" />
        <Text style={styles.loadingText}>Carregando avisos...</Text>
      </View>
    );
  }

  // Estado 3: sucesso
  return (
    <FlatList
      data={notices}
      keyExtractor={(item) => String(item.id)}
      refreshing={isLoading}
      onRefresh={reload}
      contentContainerStyle={styles.list}
      ListHeaderComponent={
        <View style={styles.header}>
          <Button title="Criar aviso" color="#4682B4" onPress={handleCreateNotice} />
        </View>
      }
      ListEmptyComponent={<Text style={styles.empty}>Nenhum aviso por enquanto.</Text>}
      renderItem={({ item, index }) => (
        <FadeIn delay={index * 60} style={styles.card}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardBody}>{item.body}</Text>
        </FadeIn>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  loadingText: { marginTop: 12, color: '#6B7280' },
  errorTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  errorMessage: { color: '#D32F2F', marginBottom: 16, textAlign: 'center' },
  list: { padding: 12, flexGrow: 1 },
  header: { marginBottom: 12 },
  empty: { textAlign: 'center', color: '#6B7280', marginTop: 32 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  cardBody: { color: '#374151' },
});
