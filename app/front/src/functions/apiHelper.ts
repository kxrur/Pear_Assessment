
export function encodeFormData(data: Record<string, string | number>): string {
  const encodedData = Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  return encodedData;
}
