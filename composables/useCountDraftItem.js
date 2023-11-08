export const useCountDraftItem = (array, store) => {
  return JSON.parse(JSON.stringify(array.value)).filter(
    (item) => item.status === 0 && item.deleted_at === null
  ).length;
}