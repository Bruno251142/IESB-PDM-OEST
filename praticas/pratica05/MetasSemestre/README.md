
# MetasSemestre

App feito em React Native (Expo) pra atividade sobre useState, props,
componentização, Pressable, useEffect e AsyncStorage.

O app deixa o usuário cadastrar metas de estudo, marcar como concluída,
remover e os dados continuam salvos mesmo fechando o app (persistência
com AsyncStorage).

## Como rodar

```
npx create-expo-app@latest MetasSemestre --template blank
cd MetasSemestre
npx expo install @react-native-async-storage/async-storage react-native-safe-area-context
```

Depois é só colocar o App.js e a pasta components/ desse projeto dentro
da pasta gerada (substituindo o App.js que já vem por padrão) e rodar:

```
npx expo start
```

## Estrutura

- App.js -> tem os estados, os useEffect de carregar/salvar e o layout geral
- components/MetaInput.js -> input + botão de adicionar
- components/MetaList.js -> lista das metas (FlatList)
- components/MetaItem.js -> cada item da lista (concluir e excluir)

## Onde fica o useEffect

Os dois useEffect estão no App.js.

O primeiro carrega as metas salvas quando o app abre:

```js
useEffect(() => {
  async function carregarMetas() {
    try {
      const dados = await AsyncStorage.getItem(STORAGE_KEY);
      if (dados !== null) setMetas(JSON.parse(dados));
    } catch (erro) {
      console.log(erro);
    } finally {
      setCarregando(false);
    }
  }
  carregarMetas();
}, []);
```

O segundo salva toda vez que a lista de metas muda:

```js
useEffect(() => {
  if (carregando) return;
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(metas));
}, [metas, carregando]);
```

A chave usada no AsyncStorage é '@metas_semestre'.

Obs: coloquei aquele "if (carregando) return" pra não correr o risco de
salvar uma lista vazia no storage antes de terminar de carregar os dados
que já existiam.

## Funcionalidades

- Adicionar meta (não deixa adicionar vazio, mostra Alert)
- Remover meta (Pressable com android_ripple)
- Marcar meta como concluída (clicando em cima do texto)
- Contador de pendentes/concluídas no topo

## Prints

<img width="720" height="1600" alt="e5cd66d3-b0ff-4d34-858d-88c99f3e615b" src="https://github.com/user-attachments/assets/fecc5dce-b778-496f-a258-37b403927267" />
<img width="720" height="1600" alt="c6fd84af-b4ea-45f1-86e9-1fa5b1b6c8cc" src="https://github.com/user-attachments/assets/1b34d86c-07fc-40fb-b59e-4e8f3a6eb6c9" />
<img width="720" height="1600" alt="ae80033b-60a3-42ca-9217-70457be4abae" src="https://github.com/user-attachments/assets/09941e9a-078a-42dd-a625-6eeedce40dfc" />
<img width="720" height="1600" alt="3c9be9c6-80b7-4d7c-89f9-9d4991cdf1b4" src="https://github.com/user-attachments/assets/8e0b4133-4fca-4875-9c54-5d89e82bea81" />


