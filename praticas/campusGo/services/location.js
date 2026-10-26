import * as Location from 'expo-location';


export async function getCurrentPlace() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return null;

  const position = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });
  const { latitude, longitude } = position.coords;

 
  let label = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;

  try {
    const [address] = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (address) {
      const street = [address.street, address.streetNumber].filter(Boolean).join(', ');
      const readable = [street, address.district, address.city].filter(Boolean).join(' - ');
      if (readable) label = readable;
    }
  } catch (error) {
    console.warn('Não foi possível obter o endereço:', error);
  }

  return { latitude, longitude, label };
}
