import { FlatList, StyleSheet, Text, View, useColorScheme, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getTheme } from '../../constants/theme';
import DespesaItem from './DespesaItem';

function DespesaLista({
  despesas,
  emptyTitle = 'Nenhuma despesa',
  emptyHint = 'Toque em + para adicionar.',
}) {
  const theme = getTheme(useColorScheme());
  const { width } = useWindowDimensions();
  const numColumns = width > 600 ? 2 : 1; // bônus: 2 colunas em tablet / celular deitado

  function renderEmpty() {
    return (
      <View style={styles.empty}>
        <Ionicons name="receipt-outline" size={64} color={theme.textMuted} />
        <Text style={[styles.emptyTitle, { color: theme.text }]}>{emptyTitle}</Text>
        <Text style={[styles.emptyHint, { color: theme.textMuted }]}>{emptyHint}</Text>
      </View>
    );
  }

  return (
    <FlatList
      // key força recriar a lista quando o número de colunas muda
      key={numColumns}
      data={despesas}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      renderItem={({ item }) => (
        <View style={numColumns > 1 ? styles.cell : undefined}>
          <DespesaItem despesa={item} />
        </View>
      )}
      ListEmptyComponent={renderEmpty}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, paddingBottom: 24 },
  cell: { flex: 1, maxWidth: '50%' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  emptyTitle: { fontSize: 18, fontWeight: '600', marginTop: 12 },
  emptyHint: { fontSize: 14, marginTop: 4, textAlign: 'center' },
});

export default DespesaLista;
