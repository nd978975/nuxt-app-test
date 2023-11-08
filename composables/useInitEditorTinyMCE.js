export const useInitEditorTinyMCE = (height = 600) => {
    return {
        menubar: false,
        plugins: 'a11ychecker advcode advlist advtable autocorrect autolink autoresize autosave casechange charmap checklist code codesample directionality editimage emoticons export footnotes formatpainter fullscreen help image importcss inlinecss insertdatetime link linkchecker lists media mediaembed mentions mergetags pageembed permanentpen powerpaste preview quickbars save searchreplace table tableofcontents template tinycomments tinydrive tinymcespellchecker typography visualblocks visualchars wordcount',
        min_height: height,
        toolbar1:
            'alignleft aligncenter alignright alignjustify alignnone| blockquote blocks | backcolor | bold italic fontselect | copy paste pastetext | cut | fontfamily fontsize forecolor h1 h2 h3 h4 h5 h6 hr indent outdent | language | lineheight | undo redo | remove removeformat | selectall | strikethrough | styles | subscript superscript underline | a11ycheck | advtablerownumbering typopgraphy restoredraft casechange charmap checklist code codesample addcomment showcomments ltr rtl editimage fliph flipv imageoptions rotateleft rotateright emoticons export footnotes footnotesupdate | formatpainter fullscreen help image insertdatetime link openlink unlink bullist numlist media mergetags mergetags_list pageembed permanentpen preview quickimage quicklink quicktable searchreplace spellcheckdialog spellchecker insertfile |',
    }
}