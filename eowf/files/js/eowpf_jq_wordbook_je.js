function loadForm() {
  js_eowpf();
  label_icon();
  show_refVocabLink();
  document.f1.dk.value = "JE";
};
function goPage(pg) {
  var tag = document.fmManage.tag.value;
  var col = document.fmManage.col.value;
  var sort = document.fmManage.sort.value;
  document.location.href = WORDBOOK_JE_URI + "?page=" + pg
    + (tag.length > 0 ? "&tag=" + tag : "")
    + (col.length > 0 ? "&col=" + col : "")
    + (sort.length > 0 ? "&sort=" + sort : "")
  return false;
};
