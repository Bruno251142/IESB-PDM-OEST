import { Pressable, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { ExpensesContextProvider } from './src/store/expenses-context';
import TodasDespesas from './src/screens/TodasDespesas';
import DespesasRecentes from './src/screens/DespesasRecentes';
import GerenciarDespesa from './src/screens/GerenciarDespesa';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarLabelStyle: { fontSize: 12 },
        headerRight: ({ tintColor }) => (
          <Pressable
            onPress={() => navigation.navigate('GerenciarDespesa')}
            hitSlop={10}
            style={({ pressed }) => [{ marginRight: 16 }, pressed && { opacity: 0.5 }]}
          >
            <Ionicons name="add" size={28} color={tintColor} />
          </Pressable>
        ),
      })}
    >
      <Tab.Screen
        name="DespesasRecentes"
        component={DespesasRecentes}
        options={{
          title: 'Despesas Recentes',
          tabBarLabel: 'Recentes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TodasDespesas"
        component={TodasDespesas}
        options={{
          title: 'Todas as Despesas',
          tabBarLabel: 'Todas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const scheme = useColorScheme();

  return (
    <ExpensesContextProvider>
      <StatusBar style="auto" />
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Despesas"
            component={BottomTabScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="GerenciarDespesa" component={GerenciarDespesa} />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpensesContextProvider>
  );
}
