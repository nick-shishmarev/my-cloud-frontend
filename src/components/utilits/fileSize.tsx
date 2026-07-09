export function fileSize(sizeBytes: number) {
  const units = ["байт", "Кбайт", "Мбайт", "Гбайт"];
  let size = sizeBytes;
  let i = 0;

  while (size > 1024 && i < 3) {
    size /= 1024.0;
    i++;
  }

  return `${size.toFixed(1)} ${units[i]}`;
}
