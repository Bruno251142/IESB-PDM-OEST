import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';

const STORAGE_KEY = '@metas_semestre';


export default function App() {

  const [texto, setTexto] = useState('');
  const [metas, setMetas] = useState([]);
  const [carregando, setCarregando] = useState(true);


  useEffect(() => {
    async function carregarMetas() {
      try {
        const dados = await AsyncStorage.getItem(STORAGE_KEY);
        if (dados !== null) {
          setMetas(JSON.parse(dados));
        }
      } catch (erro) {
        console.log('Erro ao carregar metas:', erro);
        Alert.alert(
          'Ops!',
          'Não foi possível carregar suas metas salvas. Tente novamente.'
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarMetas();
  }, []);


  useEffect(() => {

    if (carregando) return;

    async function salvarMetas() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(metas));
      } catch (erro) {
        console.log('Erro ao salvar metas:', erro);
        Alert.alert(
          'Ops!',
          'Não foi possível salvar suas metas. Verifique o espaço do dispositivo.'
        );
      }
    }

    salvarMetas();
  }, [metas, carregando]);


  function handleAdicionar() {
    const textoLimpo = texto.trim();

    if (textoLimpo.length === 0) {
      Alert.alert('Campo vazio', 'Digite uma meta antes de adicionar.');
      return;
    }

    const novaMeta = {
      id: Date.now().toString(),
      texto: textoLimpo,
      criadaEm: new Date().toISOString(),
      concluida: false,
    };


    setMetas((metasAtuais) => [novaMeta, ...metasAtuais]);
    setTexto('');
  }

  function handleRemover(id) {
    setMetas((metasAtuais) => metasAtuais.filter((meta) => meta.id !== id));
  }

  function handleToggleConcluida(id) {
    setMetas((metasAtuais) =>
      metasAtuais.map((meta) =>
        meta.id === id ? { ...meta, concluida: !meta.concluida } : meta
      )
    );
  }


  const pendentes = metas.filter((m) => !m.concluida).length;
  const concluidas = metas.filter((m) => m.concluida).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.header}>
          <Image
            source={require('./assets/icon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.titulo}>Metas do Semestre</Text>
            <Text style={styles.contador}>
              {pendentes} pendentes / {concluidas} concluídas
            </Text>
          </View>
        </View>

        <MetaInput value={texto} onChangeText={setTexto} onAdd={handleAdicionar} />

        <MetaList
          metas={metas}
          onDelete={handleRemover}
          onToggle={handleToggleConcluida}
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
    gap: 12,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 10,
  },
  titulo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
  },
  contador: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
});
