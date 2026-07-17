export async function getBaseUrl(callback: React.Dispatch<React.SetStateAction<string>>) {
  const response = await fetch('./config.json');
  const config = await response.json();
  const { BASE_URL } = config;
  callback(BASE_URL);
  return;
}
