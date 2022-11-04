var disps = 20;// 1ページ内件数
var disp_page_max = 9;// 表示ページングMAX
var npg = 1;
var p_cnt = 1;
function voa_disp() {
  var args = voa_disp.arguments;
  // 指定ページ取得
  if (args.length > 0) {
    if (isNum(args[0])) npg = parseInt(args[0]);
  }
  if (npg <= 0) npg = 1;
//  var p_cnt = getPageCnt();// 総ページ数算出
  // 総ページ数よりカレントページ番号が大きい場合、最終ページへ誘導
  if (p_cnt < npg) {
    npg = p_cnt;
  }
  // ページナビ作成
  var pageNavi = getPageNavi(npg, p_cnt);
  replaceInnerHtml("paging", pageNavi);

  var content = getContent(npg);
  replaceInnerHtml("resultlist", content);
  return;
};
// コンテンツ取得
function getContent(pg_no) {
  var roopStart = disps * (pg_no-1);
  var roopEnd = disps * pg_no;
  if (roopEnd >= voa.length) roopEnd = voa.length;
  var content = "<ul>";
  var olno = (disps * (pg_no - 1)) + 1;
  for (var i = roopStart; i < roopEnd; i++) {
    content += "<li>" + replaceVoaTag(voa[i]) + "</li>";
  }
  content += "</ul>";
  return content;
};
function replaceVoaTag(s) {
  var voa = s;
  var cid = "0";

  if (voa.match(/(<VF>.+<\/VF>)/i)) {
    cid = RegExp.$1;
    cid = cid.replace("<VF>","");
    cid = cid.replace("</VF>","");
  }
  voa = voa.replace("<VT>","<span class='midashi' id='" + cid + "'>");
  voa = voa.replace("</VT>","</span><br />");
  voa = voa.replace("<VF>","<div><span class='vat'><a href='javascript:goVoaText(\"");
  voa = voa.replace("</VF>","\")' title='全文を表示する'><img src='" + IMG_URI + "zenbun.png' border='0' align='absbottom' width='19' height='17'> <u>全文表示</u></a></span></div>");
  return voa;
};
function isNum(num){
  if(num.match(/[\D]/g)){
    return false;
  }else{
    return true;
  }
};
// GETパラメータ取得
function getRequestParameter(){
// npg: （カレントページNO）
  var reqParams = new Array();
  if(window.location.search){
    var query = window.location.search;
    query = query.substring(1,query.length);
    var querys = new Array();
    querys = query.split("&");
    for(i=0;i<querys.length;i++){
      var works = new Array();
      works = querys[i].split("=");
      var name = works[0];
      var value = works[1];
      reqParams[name] = value;
    }
  }
  return reqParams;
};
// 総ページ数算出
function getPageCnt() {
  var remainder = pgs % disps;	// pgs defined voa_content.js
  var p = 1;
  if (0 == remainder) {
    p = pgs / disps;
  } else {
    p = parseInt(pgs / disps) + 1;
  }
  return p;
};
// ページナビ
function getPageNavi(p_no, p_cnt) {
  // 全ページ番号にページング処理タグ付け
  var arrPageHTML = new Array(p_cnt);
  for (i=1; i <= arrPageHTML.length; i++) {
    if (p_no == i) {
      // カレントページ番号
      arrPageHTML[i-1] = "<span class='cur'>" + i + "</span>&nbsp;";
    } else {
      // その他のページ番号
      arrPageHTML[i-1] = "<a href='javascript:goVoaPage(\""+ i + "\")'>" + i + "</a>&nbsp;";
    }
  }

  // 前へと次への表示制御フラグ
  var preNo = "";
  var nextNo = "";
  var p = 1;
  if (p_no > 1 && p_cnt > 1) {
    p = p_no - 1;
    preNo = "<a href='javascript:goVoaPage(\"" + p + "\")' class='noborder'>&#x25C0;</a>&nbsp;";
  }
  if (p_no < p_cnt && p_cnt > 1) {
    p = p_no + 1;
    nextNo = "<a href='javascript:goVoaPage(\"" + p + "\")' class='noborder'>&#x25B6;</a>";
  }

  // 表示するページ番号決定
  var startPage = 1;
  if ((p_no - parseInt(disp_page_max / 2)) < 1 || p_cnt <= disp_page_max) {
    startPage = 1;
  } else {
    startPage = p_no - parseInt(disp_page_max / 2);
  }
  endPage = 1;
  if ((startPage + (disp_page_max - 1)) > p_cnt) {
    endPage = p_cnt;
    startPage = p_cnt - (disp_page_max - 1);
    if ( 1 > startPage ) startPage = 1;
  } else {
    endPage = startPage + (disp_page_max - 1);
  }

  // ページナビ作成
  var page = "";
  if (preNo.length != "") page = preNo;
  if (p_cnt > 1) {
    for (i = startPage-1; i < endPage; i++) {
      page += arrPageHTML[i];
    }
  }
  if (nextNo != "") page += nextNo;
  return page;
};
// ページング処理
function goVoaPage(pg) {
  document.location.href = VOA_URI + "?npg=" + pg;
  return false;
};
// VOA全文表示検索
function goVoaText(fileNo) {
  document.location.href = VOA_EXAMPLE_URI + "?ref=ex&exp=" + fileNo + "&npg=" + npg;
  return false;
};
function voaText_disp() {
  var wd = "";
  var content = "";
  var refer = VOA_URI + "?npg=" + npg + "#" + exp; // exp defined voa_exp.html
  var hist = "<p class=\"mt_10\"><strong><a href=\""+ refer + "\">≪ 索引ページに戻る</a></strong></p>";
  content += hist;
  content += "<ul>";
  if (!!window.fulltext) {
    wd = "";
    if (imgflg) {
      fulltext = highlightExampleIcon(fulltext, wd);
    } else {
      fulltext = highlightExample(fulltext, wd);
    }
    if (!!window.linktext) {
      content += "<br /><br />";
      content += linktext;
    }
    content += "<ul class='mt_10' style='margin-left: 0px;'>";
    content += "<div>";
    content += replaceAll(fulltext,'\\','&yen;');
    content += "</div>";
    content += "</ul>";
  } else {
    content += "<br /><br />";
    content += "<ul>";
    content += "<div><strong><font color=\"#BF0000\">Sorry...</font></strong><br /><br />";
    content += "<font color=\"#BF0000\">該当する情報は見つかりませんでした。</font><br /><br /></div>";
    content += "</ul>";
  }
  content += "</ul>";
  content += hist;
  document.write(content);
};
// 矢印を利用するページ移動
var isPgFlg = false;
function changePage(act) {
//  var p_cnt = getPageCnt();// 総ページ数算出
  if (false == isPgFlg) {
    if (act == "back" && 0 < npg) {
      if (1 == npg) {
//        return false;
      } else {
        goVoaPage(npg-1);
        isPgFlg = true;
      }
    } else if (act == "next" && parseInt(p_cnt) > npg) {
      goVoaPage(npg+1);
      isPgFlg = true;
    } else {
//      return false;
    }
  } else {
//    return false;
  }
};
