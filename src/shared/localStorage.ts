export const getItemFromLocalStorage = (key: string): string | undefined => {
  return localStorage.getItem(key)?.toString()
}
