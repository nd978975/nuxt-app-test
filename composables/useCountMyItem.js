export const useCountMyItem = (array, store) => {
  return JSON.parse(JSON.stringify(array.value)).filter((item) => item.user_id === store.user.id && item.deleted_at === null).length;
}