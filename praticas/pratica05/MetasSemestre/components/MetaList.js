import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import MetaItem from './MetaItem';

export default function MetaList({ metas, onDelete, onToggle }) {
  if (metas.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Nenhuma meta cadastrada ainda.{'\n'}Adicione a primeira acima! 🎯
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <MetaItem meta={item} onDelete={onDelete} onToggle={onToggle} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    textAlign: 'center',
    color: '#9aa0a6',
    fontSize: 15,
    lineHeight: 22,
  },
});
