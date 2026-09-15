import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';

export default function CompromissoList({
  itens,
  onDelete,
  onToggle,
  tituloLista,
  listaVazia,
  labelRemover,
}) {
 
  const renderItem = ({ item }) => {
    const hora = new Date(item.criadoEm).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <View style={styles.item}>
        <Pressable
          style={styles.itemTextoArea}
          onPress={() => onToggle(item.id)}
          android_ripple={{ color: '#e8e8e8' }}
        >
          <Text style={[styles.itemTexto, item.concluido && styles.itemConcluido]}>
            {item.concluido ? '☑ ' : '☐ '}
            {item.texto}
          </Text>
          <Text style={styles.itemHora}>Adicionado às {hora}</Text>
        </Pressable>

        <Pressable
          onPress={() => onDelete(item.id)}
          style={({ pressed }) => [styles.botaoRemover, pressed && styles.pressionado]}
          android_ripple={{ color: '#ffffff55' }}
        >
          <Text style={styles.botaoRemoverTexto}>{labelRemover}</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.area}>
      <Text style={styles.titulo}>{tituloLista}</Text>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}   
        renderItem={renderItem}
        contentContainerStyle={
          itens.length === 0 ? styles.vaziaContainer : styles.listaContainer
        }
        ListEmptyComponent={<Text style={styles.vaziaTexto}>{listaVazia}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,                    
    paddingHorizontal: 16,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 10,
  },
  listaContainer: {
    paddingBottom: 24,
  },
  vaziaContainer: {
    flexGrow: 1,
    justifyContent: 'center',   
    alignItems: 'center',
  },
  vaziaTexto: {
    textAlign: 'center',
    color: '#9aa0a6',
    fontSize: 15,
    lineHeight: 22,
  },
  item: {
    flexDirection: 'row',       
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ececec',
    padding: 12,
    marginBottom: 10,
  },
  itemTextoArea: {
    flex: 1,                   
    paddingRight: 10,
  },
  itemTexto: {
    fontSize: 15,
    color: '#1f2937',
    fontWeight: '500',
  },
  itemConcluido: {
    textDecorationLine: 'line-through',
    color: '#9aa0a6',
  },
  itemHora: {
    fontSize: 11,
    color: '#9aa0a6',
    marginTop: 4,
  },
  botaoRemover: {
    backgroundColor: '#c62828',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    overflow: 'hidden',
  },
  pressionado: {
    opacity: 0.8,
  },
  botaoRemoverTexto: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
