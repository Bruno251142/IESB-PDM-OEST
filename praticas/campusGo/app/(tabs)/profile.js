import { useEffect, useState } from 'react';
import { Alert, Button, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { pickImage, takePhoto } from '../../services/media';

const PHOTO_KEY = '@profile-photo';

export default function Perfil() {
  const [photoUri, setPhotoUri] = useState(null);

  // Relê a foto salva quando a tela abre.
  useEffect(() => {
    async function loadPhoto() {
      try {
        const saved = await AsyncStorage.getItem(PHOTO_KEY);
        if (saved) setPhotoUri(saved);
      } catch (error) {
        console.warn('Erro ao ler a foto salva:', error);
      }
    }

    loadPhoto();
  }, []);

  async function savePhoto(uri) {
    if (!uri) return; // cancelou ou a permissão foi negada
    setPhotoUri(uri);
    try {
      await AsyncStorage.setItem(PHOTO_KEY, uri);
    } catch (error) {
      console.warn('Erro ao salvar a foto:', error);
    }
  }

  async function handlePickImage() {
    try {
      await savePhoto(await pickImage());
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível abrir a galeria.');
    }
  }

  async function handleTakePhoto() {
    try {
      await savePhoto(await takePhoto());
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível abrir a câmera.');
    }
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePickImage}>
        {photoUri ? (
          <Image
            source={{ uri: photoUri }}
            style={styles.avatar}
            onError={() => setPhotoUri(null)}
          />
        ) : (
          <View style={[styles.avatar, styles.placeholder]}>
            <Ionicons name="person" size={64} color="#9CA3AF" />
          </View>
        )}
      </Pressable>
      <Text style={styles.hint}>Toque na foto para escolher da galeria</Text>

      <View style={styles.action}>
        <Button title="Tirar foto" color="#4682B4" onPress={handleTakePhoto} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 40 },
  avatar: { width: 140, height: 140, borderRadius: 70 },
  placeholder: { backgroundColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' },
  hint: { marginTop: 12, color: '#6B7280' },
  action: { marginTop: 20 },
});
