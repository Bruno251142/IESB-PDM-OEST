# RotinaIESB

App feito em React Native com Expo pra atividade integradora das aulas 02 a 06.

É um organizador da rotina acadêmica: o aluno cadastra os compromissos do dia,
vê a lista, pode marcar como concluído, remover, e os dados continuam salvos
mesmo depois de fechar o app.

## Comando usado pra criar o projeto

```
npx create-expo-app@latest RotinaIESB --template blank
cd RotinaIESB
npx expo install @react-native-async-storage/async-storage react-native-safe-area-context
npx expo start
```

## Arquivos que eu criei

- labels.js -> guarda os textos do app (tituloApp, placeholderCompromisso,
  botaoAdicionar, tituloLista, listaVazia e as mensagens de erro), tudo com
  export nomeado e importado no App.js
- components/CompromissoInput.js -> o TextInput e o botão de adicionar
- components/CompromissoList.js -> a lista dos compromissos (FlatList)
- App.js -> junta tudo, tem os estados e a persistência
- assets/logo.png -> imagem do cabeçalho

## Onde está o useEffect de carga e o de salvamento

Os dois estão no App.js.

O de CARGA fica logo depois dos useState. Ele roda só uma vez (array de
dependência vazio) e busca o que estava salvo no AsyncStorage:

```js
useEffect(() => {
  const carregar = async () => {
    try {
      const dados = await AsyncStorage.getItem(CHAVE_STORAGE);
      if (dados !== null) setCompromissos(JSON.parse(dados));
    } catch (erro) {
      Alert.alert(...)
    } finally {
      setCarregando(false);
    }
  };
  carregar();
}, []);
```

O de SALVAMENTO vem logo abaixo e roda toda vez que a lista muda:

```js
useEffect(() => {
  if (carregando) return;
  const salvar = async () => {
    try {
      await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(compromissos));
    } catch (erro) {
      Alert.alert(...)
    }
  };
  salvar();
}, [compromissos, carregando]);
```

A chave do AsyncStorage é '@rotina_iesb_compromissos'.

Obs: aquele `if (carregando) return` é pra não salvar uma lista vazia por cima
dos dados antes do carregamento terminar. Sem isso o app apagava tudo ao abrir.

## Flexbox

- Cabeçalho: flexDirection row (logo do lado do título)
- Formulário: flexDirection row, o input com width 68% e o botão com 29%
- Lista: flex 1 pra ocupar o resto da tela
- Quando a lista tá vazia usei justifyContent e alignItems center pra
  centralizar a mensagem

## Desafios opcionais que eu fiz

- O2: marcar compromisso como concluído (clica no texto e ele fica riscado)
- O3: contador de "X pendentes" no cabeçalho

Também usei FlatList com ListEmptyComponent no lugar do map com ScrollView.

## Prints

<img width="720" height="1600" alt="f9276007-bc98-4687-91aa-be1531320763" src="https://github.com/user-attachments/assets/73b59e5c-a295-4049-9cb1-7a3fa002d894" />
<img width="720" height="1600" alt="fa5e9870-5a1a-4a20-beef-60e8a1700cb0" src="https://github.com/user-attachments/assets/b85d4ae8-7fd5-4639-8727-5e715edce0d8" />
<img width="720" height="1600" alt="a3b9cf4b-39af-4f0d-b7eb-9164c13a05c3" src="https://github.com/user-attachments/assets/af987a2b-1532-4251-b007-aa458b64a94f" />
<img width="720" height="1600" alt="2b164478-677e-4144-a3d6-abfb66f34d32" src="https://github.com/user-attachments/assets/c21d248a-2e1e-48e0-9de7-bd3ad65b3b73" />



