import { useLayoutEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useExpenses } from '../store/expenses-context';
import { CATEGORIES, getTheme } from '../constants/theme';

// Retorna um objeto errors com uma mensagem para cada campo inválido.
function validate(values) {
  const errors = {};

  if (values.description.trim().length < 3) {
    errors.description = 'A descrição deve ter no mínimo 3 caracteres.';
  }

  const amount = parseFloat(values.amount);
  if (isNaN(amount) || amount <= 0) {
    errors.amount = 'O valor deve ser maior que zero.';
  }

  const fimDeHoje = new Date();
  fimDeHoje.setHours(23, 59, 59, 999);
  if (values.date > fimDeHoje) {
    errors.date = 'A data não pode ser futura.';
  }

  if (!values.category) {
    errors.category = 'Selecione uma categoria.';
  }

  return errors;
}

function GerenciarDespesa({ route, navigation }) {
  const expenseId = route.params?.expenseId;
  const isEditing = Boolean(expenseId);

  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const scheme = useColorScheme();
  const theme = getTheme(scheme);

  // Estado único do formulário (já abre preenchido no modo edição).
  const [form, setForm] = useState(() => {
    const expense = expenses.find((item) => item.id === expenseId);
    return expense
      ? {
          description: expense.description,
          amount: String(expense.amount),
          date: new Date(expense.date),
          category: expense.category,
        }
      : { description: '', amount: '', date: new Date(), category: '' };
  });
  const [errors, setErrors] = useState({});
  const [showPicker, setShowPicker] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ title: isEditing ? 'Editar despesa' : 'Nova despesa' });
  }, [navigation, isEditing]);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));

    // Se o campo estava com erro, revalida só ele: a mensagem some quando for corrigido.
    if (errors[field]) {
      const fieldError = validate({ ...form, [field]: value })[field];
      setErrors((prev) => {
        const next = { ...prev };
        if (fieldError) next[field] = fieldError;
        else delete next[field];
        return next;
      });
    }
  }

  function handleAmountChange(text) {
    const cleanText = text.replace(',', '.');
    // aceita apenas números com até 2 casas decimais
    if (/^\d*\.?\d{0,2}$/.test(cleanText)) {
      handleChange('amount', cleanText);
    }
  }

  function handleDateChange(event, selectedDate) {
    setShowPicker(false);
    if (event.type === 'set' && selectedDate) {
      handleChange('date', selectedDate);
    }
  }

  function handleSelectCategory(category) {
    handleChange('category', category);
    setCategoryModalVisible(false);
  }

  function handleSave() {
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const data = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date.toISOString(),
      category: form.category,
    };

    if (isEditing) updateExpense(expenseId, data);
    else addExpense(data);

    navigation.goBack();
  }

  function handleDelete() {
    Alert.alert('Excluir despesa', 'Tem certeza que deseja excluir esta despesa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deleteExpense(expenseId);
          navigation.goBack();
        },
      },
    ]);
  }

  const fieldStyle = (field) => [
    styles.input,
    {
      backgroundColor: theme.inputBackground,
      borderColor: errors[field] ? theme.error : theme.border,
    },
  ];

  const renderError = (field) =>
    errors[field] ? (
      <Text style={[styles.error, { color: theme.error }]}>{errors[field]}</Text>
    ) : null;

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.text }]}>Descrição</Text>
          <TextInput
            style={[fieldStyle('description'), { color: theme.text }]}
            placeholder="Ex.: Almoço"
            placeholderTextColor={theme.textMuted}
            value={form.description}
            onChangeText={(text) => handleChange('description', text)}
          />
          {renderError('description')}
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.text }]}>Valor (R$)</Text>
          <TextInput
            style={[fieldStyle('amount'), { color: theme.text }]}
            placeholder="0.00"
            placeholderTextColor={theme.textMuted}
            keyboardType="decimal-pad"
            value={form.amount}
            onChangeText={handleAmountChange}
          />
          {renderError('amount')}
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.text }]}>Data</Text>
          {Platform.OS === 'ios' ? (
            <View style={[fieldStyle('date'), styles.iosDate]}>
              <DateTimePicker
                value={form.date}
                mode="date"
                display="compact"
                themeVariant={scheme === 'dark' ? 'dark' : 'light'}
                onChange={handleDateChange}
              />
            </View>
          ) : (
            <>
              <Pressable
                style={[fieldStyle('date'), styles.selector]}
                onPress={() => setShowPicker(true)}
              >
                <Text style={[styles.selectorText, { color: theme.text }]}>
                  {form.date.toLocaleDateString('pt-BR')}
                </Text>
                <Ionicons name="calendar-outline" size={20} color={theme.textMuted} />
              </Pressable>
              {showPicker && (
                <DateTimePicker
                  value={form.date}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </>
          )}
          {renderError('date')}
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.text }]}>Categoria</Text>
          <Pressable
            style={[fieldStyle('category'), styles.selector]}
            onPress={() => setCategoryModalVisible(true)}
          >
            <Text
              style={[
                styles.selectorText,
                { color: form.category ? theme.text : theme.textMuted },
              ]}
            >
              {form.category || 'Selecione uma categoria'}
            </Text>
            <Ionicons name="chevron-down" size={20} color={theme.textMuted} />
          </Pressable>
          {renderError('category')}
        </View>

        <Pressable style={[styles.button, { backgroundColor: theme.primary }]} onPress={handleSave}>
          <Text style={[styles.buttonText, { color: theme.onPrimary }]}>Salvar</Text>
        </Pressable>

        {isEditing && (
          <Pressable
            style={[styles.button, styles.deleteButton, { borderColor: theme.error }]}
            onPress={handleDelete}
          >
            <Ionicons name="trash-outline" size={18} color={theme.error} />
            <Text style={[styles.buttonText, styles.deleteText, { color: theme.error }]}>
              Excluir despesa
            </Text>
          </Pressable>
        )}
      </ScrollView>

      <Modal
        visible={categoryModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCategoryModalVisible(false)}
      >
        <View style={[styles.overlay, { backgroundColor: theme.overlay }]}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setCategoryModalVisible(false)}
          />
          <View style={[styles.sheet, { backgroundColor: theme.card }]}>
            <Text style={[styles.sheetTitle, { color: theme.text }]}>Categoria</Text>
            <FlatList
              data={CATEGORIES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable style={styles.option} onPress={() => handleSelectCategory(item)}>
                  <Text style={[styles.optionText, { color: theme.text }]}>{item}</Text>
                  {form.category === item && (
                    <Ionicons name="checkmark" size={20} color={theme.primary} />
                  )}
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  field: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  input: {
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  iosDate: { alignItems: 'flex-start', paddingVertical: 6 },
  selector: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  selectorText: { fontSize: 16 },
  error: { fontSize: 13, marginTop: 4 },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: 8,
  },
  buttonText: { fontSize: 16, fontWeight: '700' },
  deleteButton: { backgroundColor: 'transparent', borderWidth: 1 },
  deleteText: { marginLeft: 6 },
  overlay: { flex: 1, justifyContent: 'flex-end' },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    paddingBottom: 32,
    maxHeight: '70%',
  },
  sheetTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  option: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
  optionText: { flex: 1, fontSize: 16 },
});

export default GerenciarDespesa;
