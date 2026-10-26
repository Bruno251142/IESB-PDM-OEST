import { Alert, Button, FlatList, Share, StyleSheet, Text, View } from 'react-native';
import { useExpenses } from '../../store/expenses-context';

export default function Bolso() {
  const { expenses, addExpense, clearExpenses } = useExpenses();

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  async function handleShare() {
    try {
      await Share.share({ message: `Gastei R$ ${total.toFixed(2)} neste semestre.` });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível abrir o compartilhamento.');
    }
  }

  // Apoio para testar: o CampusGo não tem formulário de despesas.
  function handleAddSample() {
    addExpense({
      description: 'Despesa de exemplo',
      amount: 10.5,
      date: new Date().toISOString(),
      category: 'Outros',
    });
  }

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <View>
          <View style={styles.totalCard}>
            <Text style={styles.totalLabel}>Total gasto</Text>
            <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
          </View>

          <View style={styles.action}>
            <Button title="Compartilhar resumo" color="#4682B4" onPress={handleShare} />
          </View>
          <View style={styles.action}>
            <Button title="Adicionar despesa de exemplo" color="#6B7280" onPress={handleAddSample} />
          </View>
          {expenses.length > 0 && (
            <View style={styles.action}>
              <Button title="Limpar despesas" color="#D32F2F" onPress={clearExpenses} />
            </View>
          )}

          <Text style={styles.section}>Despesas</Text>
        </View>
      }
      ListEmptyComponent={<Text style={styles.empty}>Nenhuma despesa cadastrada.</Text>}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Text style={styles.rowText}>{item.description}</Text>
          <Text style={styles.rowAmount}>R$ {item.amount.toFixed(2)}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40 },
  totalCard: {
    backgroundColor: '#4682B4',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  totalLabel: { color: '#FFFFFF', fontSize: 14 },
  totalValue: { color: '#FFFFFF', fontSize: 32, fontWeight: '700', marginTop: 4 },
  action: { marginTop: 10 },
  section: { fontSize: 18, fontWeight: '700', marginTop: 20, marginBottom: 8 },
  empty: { color: '#6B7280' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  rowText: { fontSize: 15 },
  rowAmount: { fontSize: 15, fontWeight: '700' },
});
