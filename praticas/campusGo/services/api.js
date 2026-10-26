
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

async function request(path, options) {
  if (!BASE_URL) {
    throw new Error('EXPO_PUBLIC_API_URL não definida. Copie .env.example para .env e reinicie o Expo.');
  }

  const response = await fetch(`${BASE_URL}${path}`, options);

  if (!response.ok) {
    throw new Error(`Erro ${response.status} ao acessar o servidor.`);
  }

  return response.json();
}

export const api = {
 
  get(path) {
    return request(path);
  },


  create(resource, data) {
    return request(`/${resource}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(data),
    });
  },
};
