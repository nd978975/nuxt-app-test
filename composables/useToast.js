const { $toast } = useNuxtApp()

export const useToast = {
  add: (name) => {
    return $toast.success(`Bạn đã thêm ${name} thành công!`)
  },
  edit: (name) => {
    return $toast.success(`Bạn đã sửa ${name} thành công!`)
  },
  delete: (name) => {
    return $toast.error(`Bạn đã xoá ${name} thành công!`)
  }
} 