import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@expenses';

const ExpensesContext = createContext(null);

// Sempre devolve um novo array: sem push, splice ou alteração direta do estado.
function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'UPDATE':
      return state.map((expense) =>
        expense.id === action.payload.id
          ? { ...expense, ...action.payload.data }
          : expense
      );
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    case 'SET':
      return action.payload;
    default:
      return state;
  }
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  // Ao iniciar: carrega os dados salvos e dispara SET.
  useEffect(() => {
    let active = true;

    async function loadExpenses() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored && active) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            dispatch({ type: 'SET', payload: parsed });
          }
        }
      } catch (error) {
        console.warn('Erro ao ler as despesas salvas:', error);
      } finally {
        if (active) setIsLoaded(true);
      }
    }

    loadExpenses();
    return () => {
      active = false;
    };
  }, []);

  // A cada alteração: salva. isLoaded evita sobrescrever os dados salvos com a lista vazia inicial.
  useEffect(() => {
    if (!isLoaded) return;

    async function saveExpenses() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch (error) {
        console.warn('Erro ao salvar as despesas:', error);
      }
    }

    saveExpenses();
  }, [expenses, isLoaded]);

  const addExpense = useCallback((data) => {
    dispatch({ type: 'ADD', payload: { id: generateId(), ...data } });
  }, []);

  const updateExpense = useCallback((id, data) => {
    dispatch({ type: 'UPDATE', payload: { id, data } });
  }, []);

  const deleteExpense = useCallback((id) => {
    dispatch({ type: 'DELETE', payload: id });
  }, []);

  // Bônus "limpar tudo": SET com lista vazia.
  const clearExpenses = useCallback(() => {
    dispatch({ type: 'SET', payload: [] });
  }, []);

  const value = useMemo(
    () => ({ expenses, addExpense, updateExpense, deleteExpense, clearExpenses }),
    [expenses, addExpense, updateExpense, deleteExpense, clearExpenses]
  );

  // Evita mostrar o estado vazio enquanto os dados ainda estão sendo lidos.
  if (!isLoaded) return null;

  return (
    <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses deve ser usado dentro de um ExpensesContextProvider.');
  }
  return context;
}
