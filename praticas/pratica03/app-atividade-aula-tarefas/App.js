import { StyleSheet, View,} from 'react-native';
import { useState } from 'react';
import MetaList from './components/MetaLists';
import MetaInput from './components/MetaInput';

export default function App() {

  const [metas, setMetas] = useState([]);

  function adicionarMetaHandler(inputMeta) {
    setMetas([...metas, inputMeta]);
  }

  return (
    <View style={styles.mainContainer}>
      <MetaInput onAddMeta={adicionarMetaHandler} />
      <View style={styles.metaContainer}>
        <MetaList array={metas} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    padding: 30,
    flex: 1,
    flexDirection: 'column'
  },

  metaContainer: {
    flex: 10
  }
});
