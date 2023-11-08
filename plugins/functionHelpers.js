export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      useChangeAuthor: async (event, itemID, isDelete, $store, $toast) => {
        if (isDelete !== null) {
          $toast.warning("Không thể chỉ định quyền cho bài viết trong thùng rác!");
          return;
        }

        const user_role_edit_id = event.target.value
        const user_role_edit_name = event.target.options[event.target.options.selectedIndex].text

        await $store.setRoleEdit({
          user_role_edit_id: user_role_edit_id,
          user_role_edit_name: user_role_edit_name,
          id: itemID
        })
        
        $toast.success("Chỉ định quyền sửa item thành công!")
      },
      useCreateSlug: (string) => {
        function slugify(string) {
          const a =
            "àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;";
          const b =
            "aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------";
          const p = new RegExp(a.split("").join("|"), "g");
          return string
            .toString()
            .toLowerCase()
            .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a")
            .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e")
            .replace(/i|í|ì|ỉ|ĩ|ị/gi, "i")
            .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o")
            .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u")
            .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y")
            .replace(/đ/gi, "d")
            .replace(/\s+/g, "-")
            .replace(p, (c) => b.charAt(a.indexOf(c)))
            .replace(/&/g, "-and-")
            .replace(/[^\w\-]+/g, "")
            .replace(/\-\-+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, "");
        }

        return slugify(string);
      },
      usePublicItem: async (id, $store, $toast) => {
        if (
          confirm("Chuyển item sang chế độ công khai! Bạn có chắc không ?") == true
        ) {
          await $store.publicItem({ id: id });
          $toast.success("Đăng công khai item thành công!");
        }
      },
      useMoveToDraft: async (id, $store, $toast) => {
        if (confirm("Chuyển item vào thư mục nháp! Bạn có chắc không ?") == true) {
          await $store.moveToDraft({ id: id });
          $toast.success("Move to Draft success")
        }
      },
      useMoveToTrash: async (id, $store, $toast) => {
        if (confirm("Chuyển item vào thư mục thùng rác! Bạn có chắc không ?") === true) {
          await $store.moveToTrash({ id: id });
          $toast.success("Item đã được di chuyển vào thùng rác!");
        }
      },
      useRestoreItem: async (id, $store, $toast) => {
        if (confirm("Khôi phục item! Bạn có chắc không ?") === true) {
          await $store.restoreItem({ id: id });
          $toast.success("Khôi phục item thành công!");
        }
      },
      useDeleteItem: async (id, $store, $toast) => {
        if (confirm("Sẽ không thể khôi phục item, bạn có chắc không?") == true) {
          await $store.delelteItem({ id: id });
          $toast.success("Xóa vĩnh viễn item thành công!");
        }
      },
      useRemoveVietnameseTones: (str) => {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
        // Remove extra spaces
        // Bỏ các khoảng trắng liền nhau
        str = str.replace(/ + /g, " ");
        str = str.trim();
        // Remove punctuations
        // Bỏ dấu câu, kí tự đặc biệt
        str = str.replace(
          /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
          " "
        );
        return str;
      },
    },
  };
})