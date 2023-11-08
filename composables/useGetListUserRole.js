export const useGetListUserRole = (array) => {
  return JSON.parse(JSON.stringify(array)).filter(
    (item) => item.role.split(",").includes("is_admin") === false
  );
}