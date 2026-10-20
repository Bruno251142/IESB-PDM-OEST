import { Platform, Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getTheme } from '../../constants/theme';

function DespesaItem({ despesa }) {
  const navigation = useNavigation();
  const theme = getTheme(useColorScheme());

  return (
    <Pressable
      onPress={() => navigation.navigate('GerenciarDespesa', { expenseId: despesa.id })}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.card, shadowColor: theme.shadow },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.info}>
        <Text style={[styles.description, { color: theme.text }]} numberOfLines={1}>
          {despesa.description}
        </Text>
        <View style={styles.meta}>
          <Text style={[styles.category, { backgroundColor: theme.chip, color: theme.text }]}>
            {despesa.category}
          </Text>
          <Text style={[styles.date, { color: theme.textMuted }]}>
            {new Date(despesa.date).toLocaleDateString('pt-BR')}
          </Text>
        </View>
      </View>
      <Text style={[styles.amount, { color: theme.text }]}>
        R$ {despesa.amount.toFixed(2).replace('.', ',')}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 8,
    marginVertical: 6,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.18,
        shadowRadius: 4,
      },
      android: { elevation: 3 },
      default: { boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.18)' },
    }),
  },
  pressed: { opacity: 0.8 },
  info: { flex: 1, marginRight: 8 },
  description: { fontSize: 16, fontWeight: '600' },
  meta: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  category: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 8,
  },
  date: { fontSize: 13 },
  amount: { fontSize: 16, fontWeight: '700' },
});

export default DespesaItem;
