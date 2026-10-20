import { useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useExpenses } from '../store/expenses-context';
import useDebounce from '../hooks/useDebounce';
import { CATEGORIES, getTheme } from '../constants/theme';
import DespesaSaida from '../components/despesa/DespesaSaida';

const FILTROS = ['Todas', ...CATEGORIES];

function TodasDespesas() {
  const { expenses, clearExpenses } = useExpenses();
  const theme = getTheme(useColorScheme());

  const [busca, setBusca] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');
  const buscaDebounced = useDebounce(busca, 300);

  // Busca por descrição (sem diferenciar maiúsculas/minúsculas) combinada com a categoria.
  const despesasFiltradas = useMemo(() => {
    const termo = buscaDebounced.trim().toLowerCase();
    return expenses.filter(
      (despesa) =>
        (categoriaFiltro === 'Todas' || despesa.category === categoriaFiltro) &&
        despesa.description.toLowerCase().includes(termo)
    );
  }, [expenses, buscaDebounced, categoriaFiltro]);

  function limparTudo() {
    Alert.alert('Limpar tudo', 'Deseja remover todas as despesas?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Limpar', style: 'destructive', onPress: clearExpenses },
    ]);
  }

  const temFiltro = buscaDebounced.trim() !== '' || categoriaFiltro !== 'Todas';
  const semResultado = expenses.length > 0 && temFiltro;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.buscaLinha}>
        <View
          style={[
            styles.buscaCaixa,
            { backgroundColor: theme.inputBackground, borderColor: theme.border },
          ]}
        >
          <Ionicons name="search" size={18} color={theme.textMuted} />
          <TextInput
            style={[styles.buscaInput, { color: theme.text }]}
            placeholder="Buscar por descrição"
            placeholderTextColor={theme.textMuted}
            value={busca}
            onChangeText={setBusca}
            autoCorrect={false}
          />
        </View>
        {expenses.length > 0 && (
          <Pressable onPress={limparTudo} hitSlop={8} style={styles.limpar}>
            <Ionicons name="trash-outline" size={22} color={theme.error} />
          </Pressable>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipsScroll}
        contentContainerStyle={styles.chips}
      >
        {FILTROS.map((categoria) => {
          const ativo = categoriaFiltro === categoria;
          return (
            <Pressable
              key={categoria}
              onPress={() => setCategoriaFiltro(categoria)}
              style={[
                styles.chip,
                {
                  backgroundColor: ativo ? theme.primary : theme.chip,
                },
              ]}
            >
              <Text style={{ color: ativo ? theme.onPrimary : theme.text }}>{categoria}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <DespesaSaida
        despesas={despesasFiltradas}
        periodo={categoriaFiltro === 'Todas' ? 'Total' : categoriaFiltro}
        emptyTitle={semResultado ? 'Nenhum resultado' : 'Nenhuma despesa'}
        emptyHint={
          semResultado ? 'Tente outro termo ou remova os filtros.' : 'Toque em + para adicionar.'
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  buscaLinha: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingTop: 8 },
  buscaCaixa: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  buscaInput: { flex: 1, paddingVertical: 10, paddingHorizontal: 8, fontSize: 16 },
  limpar: { marginLeft: 10 },
  chipsScroll: { flexGrow: 0 },
  chips: { paddingHorizontal: 8, paddingVertical: 10 },
  chip: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
  },
});

export default TodasDespesas;
