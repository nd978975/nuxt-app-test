import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "auth" | "edit-role"
declare module "D:/My Project/blog-nuxt/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}