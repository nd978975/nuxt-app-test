export const useCountAllItem = (array, store) => {
  return JSON.parse(JSON.stringify(array.value)).length;
}