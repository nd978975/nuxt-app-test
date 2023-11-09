import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "backend" | "default"
declare module "D:/My Project/blog-nuxt/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}