function goPage(pg) {
  var tag = document.fmManage.tag.value;
  document.location.href = WORDBOOK_JE_URI + "?page=" + pg
    + (tag.length > 0 ? "&tag=" + tag : "");
  return false;
};
