export default function serviceHandlerSearch(url, value, parametrs) {
  const params = new URLSearchParams({ ...parametrs, q: value });

  return fetch(`${url}?${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
