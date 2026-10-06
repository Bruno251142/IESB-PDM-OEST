import { View, Text, TextInput, StyleSheet, Pressable, Button } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const CATEGORIAS = ['Alimentação', 'Transporte', 'Lazer', 'Contas'];

function GerenciarDespesa({ navigation }) {
  const [data, setData] = useState(new Date());
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [erro, setErro] = useState('');

  const [showPicker, setShowPicker] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    setShowPicker(false);
    setData(currentDate);
  };

  const handleChangeValor = (text) => {
    const cleanText = text.replace(',', '.');

    // aceita apenas números com até 2 casas decimais
    const match = cleanText.match(/^\d*\.?\d{0,2}$/);

    if (match) {
      setValor(cleanText);
    }
  };

  function enviar() {
    if (descricao.trim() === '' || !(Number(valor) > 0) || categoria === '') {
      setErro('Preencha descrição, valor e categoria.');
      return;
    }

    setErro('');

    const novaDespesa = {
      id: Date.now().toString(),
      descricao: descricao,
      valor: Number(valor),
      categoria: categoria,
      data: data,
    };
    console.log(novaDespesa);

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          maxLength={20}
          value={descricao}
          onChangeText={setDescricao}
        ></TextInput>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Valor da Despesa</Text>
        <TextInput
          style={styles.input}
          keyboardType={'decimal-pad'}
          value={valor}
          onChangeText={handleChangeValor}
        ></TextInput>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Categoria</Text>
        <View style={styles.categorias}>
          {CATEGORIAS.map((cat) => (
            <Pressable
              key={cat}
              onPress={() => setCategoria(cat)}
              style={[styles.botaoCategoria, categoria === cat && styles.botaoAtivo]}
            >
              <Text style={categoria === cat && styles.textoAtivo}>{cat}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Data da Despesa</Text>
        <Pressable onPress={() => setShowPicker(true)} style={styles.input}>
          <Text>{data.toLocaleDateString('pt-BR')}</Text>
        </Pressable>
        {showPicker && (
          <DateTimePicker
            value={data}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
      </View>

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      <Button title="Salvar" onPress={enviar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    borderWidth: 2,
    borderColor: 'lightgray',
    padding: 10,
  },
  categorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  botaoCategoria: {
    paddingHorizontal: 12,
    paddingVertical: 8,
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
  erro: {
    color: 'red',
    marginBottom: 10,
  },
});

export default GerenciarDespesa;