export const useCountTrashItem = (array, store) => {
  return JSON.parse(JSON.stringify(array.value)).filter(
    (item) => item.deleted_at !== null
  ).length;
}