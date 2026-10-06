import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import DespesaSaida from '../components/despesa/DespesaSaida';

const CATEGORIAS = ['Todas', 'Alimentação', 'Transporte', 'Lazer', 'Contas'];

function TodasDespesas() {
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');

  const DUMMY_DESPESAS = [
    { id: '1', descricao: 'Conta de luz', valor: 100.99, categoria: 'Contas', data: new Date(2025, 2, 11) },
    { id: '2', descricao: 'Conta de Agua', valor: 40.99, categoria: 'Contas', data: new Date(2025, 4, 10) },
    { id: '3', descricao: 'Almoço', valor: 35.5, categoria: 'Alimentação', data: new Date(2025, 5, 2) },
    { id: '4', descricao: 'Uber', valor: 22.9, categoria: 'Transporte', data: new Date(2025, 5, 5) },
    { id: '5', descricao: 'Cinema', valor: 48, categoria: 'Lazer', data: new Date(2025, 5, 8) },
    { id: '6', descricao: 'Mercado', valor: 120.35, categoria: 'Alimentação', data: new Date(2025, 5, 12) },
  ];

  function filtrarPorCategoria(despesas, categoria) {
    if (categoria === 'Todas') {
      return despesas;
    }
    return despesas.filter(despesa => despesa.categoria === categoria);
  }

  const despesasFiltradas = filtrarPorCategoria(DUMMY_DESPESAS, categoriaFiltro);

  return (
    <View style={styles.container}>
      <View style={styles.filtro}>
        {CATEGORIAS.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => setCategoriaFiltro(cat)}
            style={[styles.botao, categoriaFiltro === cat && styles.botaoAtivo]}
          >
            <Text style={categoriaFiltro === cat && styles.textoAtivo}>{cat}</Text>
          </Pressable>
        ))}
      </View>
      <DespesaSaida despesas={despesasFiltradas} periodo={categoriaFiltro === 'Todas' ? 'Total' : categoriaFiltro} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filtro: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  botao: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 6,
    marginBottom: 6,
    borderRadius: 15,
    backgroundColor: 'lightgray',
  },
  botaoAtivo: {
    backgroundColor: 'steelblue',
  },
  textoAtivo: {
    color: 'white',
  },
});

export default TodasDespesas;