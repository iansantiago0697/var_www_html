<!--
function validateQuery(word) {
  var ngWord = "<,>,■,□,◆,◇,▲,△,▼,▽,★,☆";
  var validwd = ngWord.split(",");
  var chk;
  if (!(word instanceof Array)) {
    chk = new Array(1);
    chk[0] = word;
  } else {
    chk = word;
  }
  for (var i=0; i<chk.length; i++) {
    if (chk[i]) {
      // *のみの入力チェック
      var s = replaceAll(chk[i], "*", "");
      if (!s) {
        alert("* 以外の検索語が入力されていません");
        return false;
      }
      // NGワードチェック
      for (var j = 0; j < validwd.length; j++) {
        if (chk[i].toLowerCase().indexOf(validwd[j]) != -1) {
          alert("< , > , ■ , □ , ◆ , ◇ , ▲ , △ , ▼ , ▽ , ★ , ☆ 　の文字は使用できません。");
          return false;
        }
      }
    }
  }
  return true;
};
function validateOption(word) {
  //  [ ] { } " ( ) | ^- 　\s-　記号は使用できない
  var validwd = "\[|\]|\{|\}|\"|\(|\)|\||^-|\s-";
  var chk;
  if (!word instanceof Array) {
    chk = new Array(1);
    chk[0] = word;
  } else {
    chk = word;
  }
  for (var i = 0; i < chk.length; i++) {
    if (chk[i]) {
      if (chk[i].match(/\[|\]|\{|\}|\"|\(|\)|\||^\-|\s\-/)) {
        alert("「条件を詳細に指定して検索」では、 [ ] { } \" ( ) | - を用いた検索式は使用できません");
        return false;
      }
    }
  }
  return true;
};
// 対象文字列全置換
function replaceAll(text, sText, rText) {
  return text.split(sText).join(rText);
};
// 連続する半角、全角スペースを1個に
function spaces2space(text) {
  var s = text.replace(/　+/g," "); // 全角⇒半角
  return s.replace(/\s+/g," ");
};
// 前後の半角、全角スペース除去
function trim(text) {
  return text.replace(/^\s+|^　+|\s+$|　+$/g, "");
};
// 変化形記号埋め
function padGradableMark(text) {
  // [!-~]で英数字記号
  // マルチバイト文字には変化形記号を付与しない
  return text.replace(/([!-~ａ-ｚＡ-ｚ]+)/g, "["+"$1"+"]");
//	return text.replace(/([!-~]+)/g, "["+"$1"+"]");
//	return "[" + text.replace(/\s/g, "] [") + "]";
};
// バリデーション
function checkWord(obj) {
  var ck = document.forms[obj].q.value;
  ck = trim(ck);
  if (!ck) {
//  alert("検索語が入力されていません");
    alert("検索語を入力してください。");
    return false;
  }
  if (!validateQuery(ck)) {
    return false;
  }
  ck = replaceAll(ck, "'", "\'");
//  ck = replaceAll(ck, "　", " ");
  ck = spaces2space(ck);
  document.forms[obj].q.value = ck;
  return true;
};
// 全角チェック
function checkMultiByte(obj) {
  var ck = document.forms[obj].q.value;
  for (i = 0; i < ck.length; i++) {
    var c = ck.charCodeAt(i);
    if (c > 0xff) {
      // 全角英数字以外
      if (!((c >= 0xff10 && c <= 0xff19) || (c >= 0xff41 && c <= 0xff5a) || (c >= 0xff21 && c <= 0xff3a))) {
        alert("英数字で入力してください。");
        return false;
      }
    }
  }
  return true;
};
// 文字数チェック
function checkLength(obj,length) {
  var ck = document.forms[obj].q.value;
  // ?文字以上チェック
  if (length < ck.length) {
    alert("検索語は"+length+"文字以内で入力してください。");
    return false;
  }
  return true;
};
// 英和・和英ボタンクリック
function goSearch() {
  var url = SEARCH_URI;
  var a = goSearch.arguments;
  var obj = "";
  var wname = "";
  var ref = REF_SEARCH;
  if (a.length > 0) {obj = a[0];}
  if (a.length > 1) {wname = a[1];}
  if (obj != "") {
    if (!checkWord(obj)) return false;
    if (a.length > 2) {
      if (!checkMultiByte(obj)) return false;
      if (!checkLength(obj,50)) return false;
      if (a[2] == "kwic") {
//        REF_SEARCH = REF_SEARCH_KWIC;
        ref = REF_SEARCH_KWIC;
        url = KWIC_URI;
      }
      if (a[2] == "collocation") {
//        REF_SEARCH = REF_SEARCH_COLLOCATION;
        ref = REF_SEARCH_COLLOCATION;
        url = COLLOCATION_URI;
      }
    }

    //20180514 かな1文字(半角カナを含む)だけの検索の場合、ref="vl"を設定
    if(document.forms[obj].q.value.match(/^([\u3040-\u309f\u30a0-\u30ff]{1}|[\uff65-\uff9f]{1}[\uff9e\uff9f]?)$/)) {
      ref = "vl";
      alert("該当件数が多すぎるため、完全一致する見出し語が存在する場合のみ結果を表示します");
    }
    
//    var ref = "";
//    if (REF_SEARCH != "") {ref = "&ref=" + REF_SEARCH;}
    if (ref != "") {ref = "&ref=" + ref;}
    if (wname != "") {
      window.open(url + "?q=" + encodeURL(document.forms[obj].q.value) + ref, wname);
    } else {
      document.location.href = url + "?q=" + encodeURL(document.forms[obj].q.value) + ref;
    }
  }
  return false;
};
// エンコード
function encodeURL(str){
  var s0, i, s, u;
  s0 = "";
  for (i = 0; i < str.length; i++){
    s = str.charAt(i);
    u = str.charCodeAt(i);
    if (s == " ") {
      s0 += "+";
//      s0 += " ";
    }
    else {
      if ( u == 0x2a || u == 0x2d || u == 0x2e || u == 0x5f || ((u >= 0x30) && (u <= 0x39)) || ((u >= 0x41) && (u <= 0x5a)) || ((u >= 0x61) && (u <= 0x7a))){
        s0 = s0 + s;
      }
      else if (u == 0xa5) {
        s0 = s0 + "%5c";
      }
      else {
        if ((u >= 0x0) && (u <= 0x7f)){
          s = "0"+u.toString(16);
          s0 += "%"+ s.substr(s.length-2);
        }
        else if (u > 0x1fffff){
          s0 += "%" + (oxf0 + ((u & 0x1c0000) >> 18)).toString(16);
          s0 += "%" + (0x80 + ((u & 0x3f000) >> 12)).toString(16);
          s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
          s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
        }
        else if (u > 0x7ff){
          s0 += "%" + (0xe0 + ((u & 0xf000) >> 12)).toString(16);
          s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
          s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
        }
        else {
          s0 += "%" + (0xc0 + ((u & 0x7c0) >> 6)).toString(16);
          s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
        }
      }
    }
  }
  return s0;
};
// デコード
function decodeURL(str){
  var s0, i, j, s, ss, u, n, f;
  s0 = "";
  for (i = 0; i < str.length; i++){
    s = str.charAt(i);
    if (s == "+"){s0 += " ";}
    else {
      if (s != "%"){s0 += s;}
      else{
        u = 0;
        f = 1;
        while (true) {
          ss = "";
          for (j = 0; j < 2; j++ ) {
            sss = str.charAt(++i);
            if (((sss >= "0") && (sss <= "9")) || ((sss >= "a") && (sss <= "f"))  || ((sss >= "A") && (sss <= "F"))) {
              ss += sss;
            } else {--i; break;}
          }
          n = parseInt(ss, 16);
          if (n <= 0x7f){u = n; f = 1;}
          if ((n >= 0xc0) && (n <= 0xdf)){u = n & 0x1f; f = 2;}
          if ((n >= 0xe0) && (n <= 0xef)){u = n & 0x0f; f = 3;}
          if ((n >= 0xf0) && (n <= 0xf7)){u = n & 0x07; f = 4;}
          if ((n >= 0x80) && (n <= 0xbf)){u = (u << 6) + (n & 0x3f); --f;}
          if (f <= 1){break;}
          if (str.charAt(i + 1) == "%"){ i++ ;}
          else {break;}
        }
        s0 += String.fromCharCode(u);
      }
    }
  }
  return s0;
};
// 変化形検索
function goGradable(value) {
  document.location.href = SEARCH_URI + "?q=%22" + encodeURL(value) + "%22&ref=" + REF_HK;
  return false;
};
// もしかして検索
function goFairWord(value) {
  document.location.href = SEARCH_URI + "?q=" + encodeURL(value) + "&ref=" + REF_SP;
  return false;
};
// ワードリンク検索
function goWordLink(value) {
//  document.location.href = SEARCH_URI + "?q=" + encodeURL(value) + "&ref=" + REF_WL;
  document.location.href = SEARCH_URI + "?q=" + value + "&ref=" + REF_WL;
  return false;
};
// 別サービスで検索
function goService(sid,dc,q) {
  var wn = "_blank";
  var url = "";
  if (sid == 1) {
    if (dc == "EJ") {
      url = WIKI_URL_EJ + decodeURL(q);
    } else {
      url = WIKI_URL_JE + q;
    }
  // } else if (sid == 2) {
  //   if (dc == "EJ") {
  //     url = YAHOO_URL_EJ + "?p=" + q + "&ei=UTF-8";
  //   } else {
  //     url = YAHOO_URL_JE + "?p=" + q + "&ei=UTF-8";
  //   }
  } else if (sid == 3) {
    if (dc == "EJ") {
      url = GOOGLE_URL_EJ + "?hl=en&q=%22" + q + "%22&ie=UTF-8";
    } else {
      url = GOOGLE_URL_JE + "?hl=ja&q=" + q + "&ie=UTF-8";
    }
  } else if (sid == 4) {
    if (dc == "EJ") {
      url = GOOGLE_URL_EJ + "?hl=en&q=%22" + q + "%22&tbm=bks&ie=UTF-8";
    } else {
      url = GOOGLE_URL_JE + "?hl=ja&q=" + q + "&tbm=bks&ie=UTF-8";
    }
  } else if (sid == 5) {
    if (dc == "EJ") {
      url = GOOGLE_URL_EJ + "?hl=en&q=%22" + q + "%22&tbm=isch&ie=UTF-8";
    } else {
      url = GOOGLE_URL_JE + "?hl=ja&q=" + q + "&tbm=isch&ie=UTF-8";
    }
  } else {
    close_mag();
    void(0);
  }
  close_mag();
  void(window.open(url,wn));
  return false;
};
// 全文表示検索
function goFullText() {
  var a = goFullText.arguments;
  var value = "";
  var dicno = "";
  if (a.length > 0) value = a[0];
  if (a.length > 1) dicno = a[1];
  if (document.f1.fn.value != "") {
    document.location.href = EXAMPLE_URI + "?q=" + encodeURL(document.f1.q.value) + "&ref=" + REF_EX + "&exp=" + value + "&dn=" + dicno + "&dk=" + document.f1.dk.value + "&fn=" + document.f1.fn.value;
  } else {
    document.location.href = EXAMPLE_URI + "?q=" + encodeURL(document.f1.q.value) + "&ref=" + REF_EX + "&exp=" + value + "&dn=" + dicno + "&dk=" + document.f1.dk.value;
  }
  return false;
};
// 戻る処理(例文全文表示からの戻り)
function goBack() {
  var url = SEARCH_URI + "?q=" + encodeURL(document.f1.q.value);
  if (document.f1.fn.value != "") {
    var fns = getRoute(document.f1.fn.value);
    if (fns.length > 1) {
      url = url + "&ref=" + fns[0] + "&fn=" + fns[1];
    } else {
      url = url + "&ref=" + fns[0];
    }
  }
  document.location.href = url;
  return false;
};
function getRoute(fn) {
  var tmp = fn.split("-");
  if (tmp.length > 1) {
    var fns = new Array(2);
    fns[0] = tmp[0];
    fns[1] = "";
    for(i = 1; i < tmp.length; i++) {
      if (i == tmp.length -1) {
        fns[1] += tmp[i];
      } else {
        fns[1] += tmp[i] + "-";
      }
    }
    return fns;
  } else {
    var fns = new Array(1);
    fns[0] = tmp[0];
    return fns;
  }
};
// イディオムの表示切替
function changeIdiomDisplay(id1, id2) {
  var elm = document.getElementById(id1);
  if (elm.style.display == "none") {
    elm.style.display = "";
  } else {
    elm.style.display = "none";
  }
  elm = document.getElementById(id2);
  if (elm.style.display == "none") {
    elm.style.display = "";
    } else {
    elm.style.display = "none";
  }
};
// インクリメンタルの表示非表示
function changeSuggestDisplay(flg) {
  if (flg == "on") {
    if (items[8] != "1") {
      items[8] = "1";
//      setCookie();
    }
  } else {
    if(document.getElementById){
      document.getElementById("suggest").style.display  = 'none';
    }
    if (items[8] != "0") {
      items[8] = "0";
//      setCookie();
    }
  }
};
// インクリメンタル窓Close
function closeSuggestDisplay() {
  if(document.getElementById){
    document.getElementById("suggest").style.display  = 'none';
  }
};
// 対象語強調色つけ(全文表示に使用)
function highlightExample(text, wd) {
  var fulltext = text;
  var fulltext = replaceAll(text, "　", " ");
  var wk = replaceAll(wd, "　", " ");
  var spanJumpS = "<span id='jump'>";
  var spanJumpE = "</span>";
  var fontJumpS = "<strong><font class='expwordfont' color='#BF0000'>";
  var fontJumpE = "</font></strong>";
  var midashis = new Array(2);
  midashis[0] = wk;
  if (wk.lastIndexOf("。") == wk.length - 1) {
    midashis[1] = wk.substring(0, wk.length - 1);
  } else {
    midashis[1] = replaceAll(wk, "。", "");
  }
  for (var i = 0; i < midashis.length; i++ ) {
    if ( fulltext.indexOf(midashis[i]) >= 0 ) {
      var rep = spanJumpS + fontJumpS + midashis[i] + fontJumpE + spanJumpE;
      fulltext = fulltext.replace(midashis[i], rep);
      break;
    }
  }
  return fulltext;
};
// 対象語強調色つけ(全文表示でアイコン使用の場合)
function highlightExampleIcon(text, wd) {
  var fulltext = replaceAll(text, "　", " ");
  fulltext = replaceAll(fulltext, "http://<domain>", "");
  var wk = replaceAll(wd, "　", " ");
  var spanJumpS = "<span id='jump'>";
  var spanJumpE = "</span>";
  var fontJumpS = "<strong><font class='expwordfont' color='#BF0000'>";
  var fontJumpE = "</font></strong>";
  var midashis = new Array(2);
  midashis[0] = wk;
  if (wk.lastIndexOf("。") == wk.length - 1) {
    midashis[1] = wk.substring(0, wk.length - 1);
  } else {
    midashis[1] = replaceAll(wk, "。", "");
  }
  var iStart = fulltext.indexOf('■');
  var iEnd = -1;
  if (iStart == 0) {
    iEnd = fulltext.indexOf("<br />", 1);
    fulltext = "<span style='font-size: 115%; font-weight: bold;'>【 " + fulltext.substring(1, iEnd) + " 】</span>" + fulltext.substring(iEnd);
  }
  for (var i = 0; i < midashis.length; i++ ) {
    if ( fulltext.indexOf(midashis[i]) >= 0 ) {
      var rep = spanJumpS + fontJumpS + midashis[i] + fontJumpE + spanJumpE;
      fulltext = fulltext.replace(midashis[i], rep);
      break;
    }
  }
  return fulltext;
};
// 例文全文コンテンツ表示
function expText_disp(midashi) {
//  var wd = midashi;
  var wd = decodeURL(midashi);
  if (!!window.fulltext) {
    var jmp = "";
    if (imgflg) {
      fulltext = highlightExampleIcon(fulltext, wd);
    } else {
      fulltext = highlightExample(fulltext, wd);
    }
    if (fulltext.match(/<span id='jump'[^>]*>/)) {
      jmp = "（<strong><a href=\"#jump\">▼該当箇所へ</a></strong>）";
    }
//    document.write("<strong><font class='expmidashi' color='#BF0000'>“" + wd + "”</font></strong><br />");
    document.write("<strong><font class='expmidashi' color='#BF0000'>“" + escapeHTML(wd) + "”</font></strong><br />");
    document.write("を含む例文全文" + jmp);
    if (!!window.linktext) {
      document.write("<br /><br />");
      document.write(linktext);
    }
//  document.write("<ul class='mt_10'>");
    document.write("<ul class='mt_10' style='margin-left: 0px;'>");
    document.write("<div>");
//  document.write(fulltext);
//    document.write(replaceAll(fulltext,'\\','&yen;'));
    document.write(escapeHTML(fulltext));
    document.write("</div>");
    document.write("</ul>");
  } else {
//    document.write("<strong><font class='expmidashi' color='#BF0000'>“" + wd + "”</font></strong><br />");
    document.write("<strong><font class='expmidashi' color='#BF0000'>“" + escapeHTML(wd) + "”</font></strong><br />");
    document.write("を含む例文全文");
    document.write("<ul>");
    document.write("<div><strong><font color=\"#BF0000\">Sorry...</font></strong><br /><br />");
    document.write("<font color=\"#BF0000\">該当する情報は見つかりませんでした。</font><br /><br /></div>");
    document.write("</ul>");
  }
};
// 参照語彙リンク
function show_refVocabLink() {
  var display_tag = document.getElementsByTagName("span");
  for (var i = 0; i < display_tag.length; i++) {
    if ( display_tag[i].className == "refvocab" ) {
      var ele = display_tag.item(i);
      var linkStr = ele.innerHTML;
      var the = "";
      var pel = ele.previousSibling;  // 直前のエレメント
      if (!linkStr.match(/^<a/)) {
    	if (pel != null) {
          while ((pel != null) && (pel.className != "label")) {
            pel = pel.previousSibling;
          }
          if ((pel != null) && (pel.innerHTML != null)) {
            if (linkStr.match("^[Tt]he ")) {
              the = linkStr.substring(0, 4);
              linkStr = linkStr.substring(4);
            }
          }
    	}
        ele.innerHTML = "<a href='javascript:void(0);' onclick='return goWordLink(\"" + encodeURL(stripTags(linkStr)) + "\");'>" + the + linkStr + "</a>";
      }
    }
  }
};
// 内部アンカーへジャンプ(OnLoad時使用)
function jumpT(anc){
  var s = "#" + anc;
  if(location.hash != s) {
    location.href = s;
  }
};
// フォーカス移動
function moveFocus() {
  if (TEXTOBOX_STATUS == "1") {
    document.fm1.q.value = "";
    document.fm1.q.focus();
  } else {
    var elm = document.fm1.q; // テキストエリアのelement取得
    elm.focus();
    // 入力文字の最後にフォーカスを移動
    if (elm.createTextRange) {
      var range = elm.createTextRange();
      if (TEXTOBOX_STATUS == "0") {
        range.move('character', elm.value.length);
      }
      range.select();
    } else if (elm.setSelectionRange) {
      elm.setSelectionRange(elm.value.length, elm.value.length);
      if (TEXTOBOX_STATUS == "2") {
        elm.setSelectionRange(0, elm.value.length);
      }
    }
  }
};
// ラベルアイコン化
function label_icon() {
  var icon = new Array(9);
  for(i = 0; i < 9; i++){
    icon[i] = new Array(2);
  }
// ラベルの CSS 化
  icon[0][0] = "【URL】";
  icon[0][1] = "<span class='ls_normal'>URL</span>";
  icon[1][0] = "【発音】";
  icon[1][1] = "<span class='ls_normal'>発音</span>";
  icon[2][0] = "【発音！】";
  icon[2][1] = "<span class='ls_alert'>発音</span>";
  icon[3][0] = "【＠】";
  icon[3][1] = "<span class='ls_normal'>カナ</span>";
  icon[4][0] = "【変化】";
  icon[4][1] = "<span class='ls_normal'>変化</span>";
  icon[5][0] = "【レベル】";
  icon[5][1] = "<span class='ls_normal'>レベル</span>";
  icon[6][0] = "【分節】";
  icon[6][1] = "<span class='ls_normal'>分節</span>";
  icon[7][0] = "【表現パターン】";
  icon[7][1] = "<span class='ls_normal'>表現パターン</span>";
  icon[8][0] = "【音声を聞く】";
  icon[8][1] = "<span class='ls_normal'>音声を聞く</span>";

// 全文表示のアイコン変更
  var display_tag = document.getElementsByTagName("span");
  for (var i = 0; i < display_tag.length; i++) {
    if ( display_tag[i].className == "exp" ) {
      var ele = display_tag.item(i);
      var label = ele.innerHTML;
      // ラベルの CSS 化
      if (label.match(/^\".+\", \".+\"$/)) {
        ele.innerHTML = "<span class='vat'><a href='javascript:goFullText(" + stripTags(label) + ")' title='全文を表示する'><img src='" + IMG_URI + "ic_read.png' border='0' align='absbottom' width='17' height='12'> <u>全文表示</u></a></span>";
      }
      continue;
    }
    if (display_tag[i].className == "sound") {
      var ele = display_tag.item(i);
      var onseiFile = ele.innerHTML;
      if (!onseiFile.match(/^<a/)) {
        var onseiId = "svl" + i;
        var onseiHTML = "<a href='' title='クリックして音声を聞く' onclick='return playSound(\"" + onseiFile + "\", \"" + onseiId + "\")'>";
        onseiHTML += "<img class='play' src='" + IMG_URI + "sound.png' alt='クリックして音声を聞く' width='20' height='20'/>";
        onseiHTML += "</a>";
        onseiHTML += "<span id='" + onseiId + "'></span>";
        ele.innerHTML = onseiHTML;
        ele.style.display = "inline";
      }
      continue;
    }
    
    //2014.10.28 EOWPF-56 制限機能処理
    if (display_tag[i].className == "sp_eowf_sound") {
      var ele = display_tag.item(i);
      var onseiFile = ele.innerHTML;
      if (!onseiFile.match(/^<a/)) {
        var onseiId = "svl" + i;
        //クリック不可
        var onseiHTML = "<a href='javascript:void(0)' title='クリックして音声を聞く' >";
        onseiHTML += "<img class='play' src='" + IMG_URI + "sound.png' alt='クリックして音声を聞く' width='20' height='20'/>";
        onseiHTML += "</a>";
        onseiHTML += "<span id='" + onseiId + "'></span>";
        ele.innerHTML = onseiHTML;
        ele.style.display = "inline";
      }
      continue;
    }
    
    if ( display_tag[i].className == "label" ) {
      var ele = display_tag.item(i);
      var label = ele.innerHTML;
      for(j = 0; j < 9; j++){
        if (label.indexOf(icon[j][0]) != -1) {
          ele.innerHTML = icon[j][1];
          break;
        }
      }
    }
  }
};
// 音声再生
var ele_play = null;
function playSound(file, id) {
  if (swfobject && (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"]) ? navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin : 0) {
    var vars = {
       u : SOUND_URL + file
    };
    var prms = {
      scale : "noScale",
      menu : "false",
      allowFullscreen : "true",
      allowScriptAccess : "always",
      bgcolor : "#FFFFFF"
    };
    var atts = {};
    swfobject.embedSWF(SOUND_URL + "eowp.swf", id, "0", "0", "9.0.0", SOUND_URL + "expressInstall.swf", vars, prms, atts);
    return false;
  }
  try {
    var ele = document.createElement("audio");
    if (ele && ele.canPlayType("audio/mp3")) {
      ele.setAttribute("src", SOUND_URL + file);
      ele.play();
      return false;
    }
  } catch (e) {}
  return false;
}
// (function(global) {
//     global.degitalice = function() {
//       valDegitalice = [
//         '<script type="text/javascript">',
//         'var DIGITALICE_CID = "ev1xzIGCbPmd";',
//         'var DIGITALICE_SID = "0pkuBNcAAV7_";',
//         '(function() {',
//         'var io = document.createElement(\'script\');',
//         'io.type = \'text/javascript\';',
//         'io.src = (\'https:\' == document.location.protocol ? \'https://\' : \'http://\') + \'c.iogous.com/js/banner/DIGITALICE_REC.js\';',
//         'var s = document.getElementsByTagName(\'script\')[0];',
//         's.parentNode.insertBefore(io, s);',
//         '})();',
//         '</script>'
//       ].join('\n');
//     document.write(valDegitalice);
//     }
// }(window));
// -->
