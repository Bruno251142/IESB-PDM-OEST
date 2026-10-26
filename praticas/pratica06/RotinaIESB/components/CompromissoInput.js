import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

export default function CompromissoInput({ value, onChangeText, onAdd, labels }) {
  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder={labels.placeholder}
        placeholderTextColor="#9aa0a6"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onAdd}
        returnKeyType="done"
      />

      <Pressable
        onPress={onAdd}
        style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]}
        android_ripple={{ color: '#ffffff55' }}
      >
        <Text style={styles.botaoTexto}>{labels.botao}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flexDirection: 'row',         
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  input: {
    width: '68%',                  
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dfe1e5',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: '#1f2937',
  },
  botao: {
    width: '29%',                  
    backgroundColor: '#0b6b3a',
    borderRadius: 10,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  botaoPressionado: {
    opacity: 0.8,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
