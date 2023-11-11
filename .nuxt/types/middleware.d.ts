import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "auth" | "edit-role"
declare module "C:/Users/MEOMUN/Downloads/Source code/blog-nuxt/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}