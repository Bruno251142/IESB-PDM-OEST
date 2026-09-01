# Meu Diário Acadêmico

Atividade 01 — Programação para Dispositivos Móveis (React Native / Expo).

Um app simples para cadastrar disciplinas, com campo de texto, botão de
adicionar, switch de filtro e lista dinâmica.

## Comando usado para criar o projeto

```bash
npx create-expo-app@latest MeuDiarioAcademico --template blank
```

SDK escolhido: **"For learning with Expo Go (SDK 54)"**.

## Como rodar

```bash
npm install
npx expo start
```

Escaneie o QR code exibido no terminal com o app **Expo Go** (Android/iOS).
Se o celular não conectar, use `npx expo start --tunnel`.

## Estrutura de arquivos

```
MeuDiarioAcademico/
├── App.js              # Tela principal do app
├── labels.js           # Textos/rótulos usados na tela
├── screenshots/        # Prints da tela em funcionamento
│   ├── tela-inicial.jpeg
│   ├── campo-preenchido.jpeg
│   └── switch-ativado.jpeg
├── package.json
└── README.md
```

## Decisões de layout

- **Coluna geral (`flexDirection: 'column'`, padrão do `View`):** o
  container principal organiza cabeçalho, formulário, switch e lista
  empilhados verticalmente.
- **Linha do formulário (`flexDirection: 'row'`):** o `TextInput` ocupa
  cerca de 70% da largura (`flexBasis: '70%'`) e o botão cerca de 28%
  (`flexBasis: '28%'`), lado a lado, com um pequeno espaçamento entre eles.
- **Feedback visual do botão:** o botão muda de cor (`buttonPressed`)
  enquanto está sendo pressionado, usando os eventos `onPressIn` /
  `onPressOut` do `TouchableOpacity`.
- **`SafeAreaView`:** envolve toda a tela para respeitar as áreas seguras
  do dispositivo (notch, barra de status, etc.).
- **`StyleSheet.create`:** todos os estilos ficam centralizados em um
  único objeto, com comentários indicando o papel de cada bloco (linha
  do formulário, coluna geral, item de lista, etc.).

## Prints da tela

![Tela inicial](screenshots/tela-inicial.jpeg)

![Campo de texto preenchido](screenshots/campo-preenchido.jpeg)

![Switch ativado](screenshots/switch-ativado.jpeg)

> Substitua os arquivos em `screenshots/` pelos seus próprios prints antes
> de commitar. Confira o resultado com `Ctrl+Shift+V` no VS Code para
> garantir que as imagens aparecem corretamente.
