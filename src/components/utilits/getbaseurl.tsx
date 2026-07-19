import type { IbaseUrls } from "../config/types";

export async function getBaseUrl(callback: React.Dispatch<React.SetStateAction<IbaseUrls | null>>) {
  const response = await fetch('./config.json');
  const config = await response.json();
  const { BASE_URL: baseUrl, BASE_URL_MEDIA: baseUrlMedia } = config;
  callback({ baseUrl, baseUrlMedia });
  return;
}
