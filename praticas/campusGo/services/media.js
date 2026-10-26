import { Alert, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const PICKER_OPTIONS = {
  allowsEditing: true,
  aspect: [1, 1],
  quality: 0.7,
};


export async function pickImage() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    ...PICKER_OPTIONS,
  });

  if (result.canceled) return null;
  return result.assets[0].uri;
}


export async function takePhoto() {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();

  if (status !== 'granted') {
    Alert.alert(
      'Permissão da câmera',
      'Para tirar a foto, permita o acesso à câmera nos ajustes do aparelho.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Abrir ajustes', onPress: () => Linking.openSettings() },
      ]
    );
    return null;
  }

  const result = await ImagePicker.launchCameraAsync(PICKER_OPTIONS);

  if (result.canceled) return null;
  return result.assets[0].uri;
}
