import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';


export default function MetaItem({ meta, onDelete, onToggle }) {
  const dataFormatada = new Date(meta.criadaEm).toLocaleDateString('pt-BR');

  return (
    <View style={styles.card}>
      <Pressable
        style={styles.textArea}
        onPress={() => onToggle(meta.id)}
        android_ripple={{ color: '#e5e5e5' }}
      >
        <Text style={[styles.texto, meta.concluida && styles.textoConcluido]}>
          {meta.concluida ? '✅ ' : '⬜ '}
          {meta.texto}
        </Text>
        <Text style={styles.data}>Criada em {dataFormatada}</Text>
      </Pressable>

      <Pressable
        onPress={() => onDelete(meta.id)}
        style={({ pressed }) => [
          styles.deleteButton,
          pressed && styles.deleteButtonPressed,
        ]}
        android_ripple={{ color: '#ffffff55', borderless: false }}
      >
        <Text style={styles.deleteButtonText}>Excluir</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  textArea: {
    flex: 1,
    paddingRight: 8,
  },
  texto: {
    fontSize: 15,
    color: '#1f2937',
    fontWeight: '500',
  },
  textoConcluido: {
    textDecorationLine: 'line-through',
    color: '#9aa0a6',
  },
  data: {
    fontSize: 11,
    color: '#9aa0a6',
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  deleteButtonPressed: {
    opacity: 0.8,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
