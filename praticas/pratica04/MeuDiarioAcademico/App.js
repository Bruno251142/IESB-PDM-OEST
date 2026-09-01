import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  APP_TITLE,
  INPUT_PLACEHOLDER,
  BUTTON_LABEL,
  LIST_TITLE,
  SWITCH_LABEL,
  EMPTY_LIST_MESSAGE,
} from './labels';

export default function App() {
  const [disciplina, setDisciplina] = useState('');
  const [disciplinas, setDisciplinas] = useState([]);
  const [somenteObrigatorias, setSomenteObrigatorias] = useState(false);
  const [botaoPressionado, setBotaoPressionado] = useState(false);

  function adicionarDisciplina() {
    const nome = disciplina.trim();
    if (nome.length === 0) return;

    setDisciplinas((atual) => [
      ...atual,
      { id: Date.now().toString(), nome, obrigatoria: true },
    ]);
    setDisciplina('');
  }

  const listaFiltrada = somenteObrigatorias
    ? disciplinas.filter((item) => item.obrigatoria)
    : disciplinas;

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{APP_TITLE}</Text>
      </View>

      {/* Formulário: input (~70%) + botão (~28%) em linha */}
      <View style={styles.formRow}>
        <TextInput
          style={styles.input}
          placeholder={INPUT_PLACEHOLDER}
          value={disciplina}
          onChangeText={setDisciplina}
        />
        <TouchableOpacity
          style={[styles.button, botaoPressionado && styles.buttonPressed]}
          onPressIn={() => setBotaoPressionado(true)}
          onPressOut={() => setBotaoPressionado(false)}
          onPress={adicionarDisciplina}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>{BUTTON_LABEL}</Text>
        </TouchableOpacity>
      </View>

      {/* Switch de filtro */}
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>{SWITCH_LABEL}</Text>
        <Switch
          value={somenteObrigatorias}
          onValueChange={setSomenteObrigatorias}
        />
      </View>

      {/* Lista de disciplinas */}
      <Text style={styles.listTitle}>{LIST_TITLE}</Text>
      <ScrollView style={styles.list}>
        {listaFiltrada.length === 0 ? (
          <Text style={styles.emptyMessage}>{EMPTY_LIST_MESSAGE}</Text>
        ) : (
          listaFiltrada.map((item) => (
            <View key={item.id} style={styles.listItem}>
              <Text style={styles.listItemText}>{item.nome}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Coluna geral: cabeçalho, formulário, switch e lista empilhados verticalmente
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  // Linha (row) para input + botão lado a lado
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flexBasis: '70%',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    marginRight: 8,
  },
  button: {
    flexBasis: '28%',
    backgroundColor: '#3498DB',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Cor muda ao pressionar (feedback visual exigido no passo 7)
  buttonPressed: {
    backgroundColor: '#1F6391',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 14,
    color: '#2C3E50',
    flexShrink: 1,
    marginRight: 8,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2C3E50',
  },
  list: {
    flex: 1,
  },
  listItem: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  listItemText: {
    fontSize: 15,
    color: '#333',
  },
  emptyMessage: {
    fontStyle: 'italic',
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});
