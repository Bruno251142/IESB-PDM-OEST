import { useMemo } from 'react';
import { View, useColorScheme } from 'react-native';
import { useExpenses } from '../store/expenses-context';
import { getTheme } from '../constants/theme';
import DespesaSaida from '../components/despesa/DespesaSaida';

function DespesasRecentes() {
  const { expenses } = useExpenses();
  const theme = getTheme(useColorScheme());

  // Últimos 7 dias, calculados a partir de expenses.
  const despesasRecentes = useMemo(() => {
    const fimDeHoje = new Date();
    fimDeHoje.setHours(23, 59, 59, 999);

    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);
    seteDiasAtras.setHours(0, 0, 0, 0);

    return expenses.filter((despesa) => {
      const data = new Date(despesa.date);
      return data >= seteDiasAtras && data <= fimDeHoje;
    });
  }, [expenses]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <DespesaSaida
        despesas={despesasRecentes}
        periodo="Últimos 7 dias"
        emptyTitle="Nenhuma despesa nos últimos 7 dias"
        emptyHint="Toque em + para adicionar."
      />
    </View>
  );
}

export default DespesasRecentes;
