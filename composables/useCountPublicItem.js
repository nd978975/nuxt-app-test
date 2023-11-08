export const useCountPublicItem = (array, store) => {
  return JSON.parse(JSON.stringify(array.value)).filter(
    (item) => item.status === 1 && item.deleted_at === null
  ).length;
}