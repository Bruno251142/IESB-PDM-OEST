import { View } from 'react-native';
import DespesaSumario from './DespesaSumario';
import DespesaLista from './DespesaLista';

// Mostra quantidade + total e a lista, sempre a partir do mesmo array de despesas.
function DespesaSaida({ despesas, periodo, emptyTitle, emptyHint }) {
  return (
    <View style={{ flex: 1 }}>
      <DespesaSumario despesas={despesas} periodo={periodo} />
      <DespesaLista despesas={despesas} emptyTitle={emptyTitle} emptyHint={emptyHint} />
    </View>
  );
}

export default DespesaSaida;
