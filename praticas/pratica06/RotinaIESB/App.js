import React, { useState, useEffect } from 'react';
import { View, Text, Image, Alert, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';


import {
  tituloApp,
  subtituloApp,
  placeholderCompromisso,
  botaoAdicionar,
  tituloLista,
  listaVazia,
  botaoRemover,
  alertaVazioTitulo,
  alertaVazioMensagem,
  erroCarregarTitulo,
  erroCarregarMensagem,
  erroSalvarTitulo,
  erroSalvarMensagem,
} from './labels';


import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';

const CHAVE_STORAGE = '@rotina_iesb_compromissos';

export default function App() {

  const [texto, setTexto] = useState('');
  const [compromissos, setCompromissos] = useState([]);
  const [carregando, setCarregando] = useState(true);

 
  useEffect(() => {
    const carregar = async () => {
      try {
        const dados = await AsyncStorage.getItem(CHAVE_STORAGE);
        if (dados !== null) {
          setCompromissos(JSON.parse(dados));
        }
      } catch (erro) {
        console.log('Erro ao carregar:', erro);
        Alert.alert(erroCarregarTitulo, erroCarregarMensagem);
      } finally {
        setCarregando(false);
      }
    };

    carregar();
  }, []);

  
  useEffect(() => {
   
    if (carregando) return;

    const salvar = async () => {
      try {
        await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(compromissos));
      } catch (erro) {
        console.log('Erro ao salvar:', erro);
        Alert.alert(erroSalvarTitulo, erroSalvarMensagem);
      }
    };

    salvar();
  }, [compromissos, carregando]);

 
  const adicionarCompromisso = () => {
    const limpo = texto.trim();

    if (limpo.length === 0) {
      Alert.alert(alertaVazioTitulo, alertaVazioMensagem);
      return;
    }

    const novo = {
      id: Date.now().toString(),      
      texto: limpo,
      criadoEm: new Date().toISOString(),
      concluido: false,             
    };

   
    setCompromissos((atuais) => [novo, ...atuais]);
    setTexto('');
  };

  const removerCompromisso = (id) => {
    setCompromissos((atuais) => atuais.filter((item) => item.id !== id));
  };

  const alternarConcluido = (id) => {
    setCompromissos((atuais) =>
      atuais.map((item) =>
        item.id === id ? { ...item, concluido: !item.concluido } : item
      )
    );
  };

  
  const pendentes = compromissos.filter((item) => !item.concluido).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="dark-content" />

        {/* CABEÇALHO — Image local + título, em linha */}
        <View style={styles.header}>
          <Image
            source={require('./assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.headerTextos}>
            <Text style={styles.titulo}>{tituloApp}</Text>
            <Text style={styles.subtitulo}>{subtituloApp}</Text>
            <Text style={styles.contador}>{pendentes} pendentes</Text>
          </View>
        </View>

        {/* FORMULÁRIO */}
        <CompromissoInput
          value={texto}
          onChangeText={setTexto}
          onAdd={adicionarCompromisso}
          labels={{
            placeholder: placeholderCompromisso,
            botao: botaoAdicionar,
          }}
        />

        {/* LISTA */}
        <CompromissoList
          itens={compromissos}
          onDelete={removerCompromisso}
          onToggle={alternarConcluido}
          tituloLista={tituloLista}
          listaVazia={listaVazia}
          labelRemover={botaoRemover}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,                      
    backgroundColor: '#f4f5f7',
  },
  header: {
    flexDirection: 'row',         
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: 10,
    marginRight: 12,
  },
  headerTextos: {
    flexDirection: 'column',      
    flex: 1,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0b6b3a',
  },
  subtitulo: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  contador: {
    fontSize: 12,
    color: '#0b6b3a',
    fontWeight: '600',
    marginTop: 4,
  },
});
