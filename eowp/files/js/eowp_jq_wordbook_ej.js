function loadForm() {
  js_eowp();
  label_icon();
  show_refVocabLink();
  document.f1.dk.value = "EJ";
};
function goPage(pg) {
  var alpha = document.fmManage.alpha.value;
  var tag = document.fmManage.tag.value;
  var col = document.fmManage.col.value;
  var sort = document.fmManage.sort.value;
  document.location.href = WORDBOOK_EJ_URI + "?page=" + pg
    + (alpha.length > 0 ? "&alpha=" + alpha : "")
    + (tag.length > 0 ? "&tag=" + tag : "")
    + (col.length > 0 ? "&col=" + col : "")
    + (sort.length > 0 ? "&sort=" + sort : "")
  return false;
};
