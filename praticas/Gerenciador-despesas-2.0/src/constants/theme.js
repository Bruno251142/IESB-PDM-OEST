// Categorias disponíveis (usadas no Modal do formulário e nos chips de filtro).
export const CATEGORIES = ['Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Saúde', 'Contas', 'Outros'];

export const themes = {
  light: {
    background: '#F4F5F7',
    card: '#FFFFFF',
    text: '#1F2430',
    textMuted: '#6B7280',
    primary: '#4682B4',
    onPrimary: '#FFFFFF',
    border: '#D1D5DB',
    inputBackground: '#FFFFFF',
    chip: '#E5E7EB',
    error: '#D32F2F',
    overlay: 'rgba(0, 0, 0, 0.4)',
    shadow: '#000000',
  },
  dark: {
    background: '#0F1115',
    card: '#1B1F27',
    text: '#F3F4F6',
    textMuted: '#9CA3AF',
    primary: '#6FA8DC',
    onPrimary: '#0F1115',
    border: '#374151',
    inputBackground: '#1B1F27',
    chip: '#2A2F3A',
    error: '#FF6B6B',
    overlay: 'rgba(0, 0, 0, 0.6)',
    shadow: '#000000',
  },
};

// scheme vem de useColorScheme(): 'light' | 'dark' | null
export function getTheme(scheme) {
  return scheme === 'dark' ? themes.dark : themes.light;
}
