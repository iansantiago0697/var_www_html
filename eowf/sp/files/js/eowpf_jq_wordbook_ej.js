function goPage(pg) {
  var alpha = document.fmManage.alpha.value;
  var tag = document.fmManage.tag.value;
  document.location.href = WORDBOOK_EJ_URI + "?page=" + pg
    + (alpha.length > 0 ? "&alpha=" + alpha : "")
    + (tag.length > 0 ? "&tag=" + tag : "");
  return false;
};
