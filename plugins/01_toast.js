import Vue3Toastify, { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, {
    autoClose: 300,
    position: toast.POSITION.TOP_CENTER,
    transition: toast.TRANSITIONS.FLIP,
  });

  return {
    provide: { toast },
  };
});
