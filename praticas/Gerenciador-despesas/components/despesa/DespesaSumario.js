import { View, Text, StyleSheet } from 'react-native';

function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce((total, despesa) => {
    return total + despesa.valor;
  }, 0);

  return (
    <View style={styles.container}>
      <Text>{periodo}</Text>
      <Text style={[styles.valor, somaDespesas > 200 && styles.valorAlto]}>
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginHorizontal: 5,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  valor: {
    fontWeight: 'bold',
  },
  valorAlto: {
    color: 'red',
  },
});

export default DespesaSumario;