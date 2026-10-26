import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import { getTheme } from '../../constants/theme';

function DespesaSumario({ despesas, periodo }) {
  const theme = getTheme(useColorScheme());

  const total = despesas.reduce((soma, despesa) => soma + despesa.amount, 0);
  const quantidade = despesas.length;

  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      <View>
        <Text style={[styles.periodo, { color: theme.onPrimary }]}>{periodo}</Text>
        <Text style={[styles.quantidade, { color: theme.onPrimary }]}>
          {quantidade} {quantidade === 1 ? 'despesa' : 'despesas'}
        </Text>
      </View>
      <Text style={[styles.total, { color: theme.onPrimary }]}>
        R$ {total.toFixed(2).replace('.', ',')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    marginHorizontal: 8,
    marginTop: 8,
    marginBottom: 2,
    borderRadius: 12,
  },
  periodo: { fontSize: 15, fontWeight: '600' },
  quantidade: { fontSize: 13, marginTop: 2 },
  total: { fontSize: 20, fontWeight: '700' },
});

export default DespesaSumario;
