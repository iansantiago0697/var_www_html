function disp_alcom_ad(flag) {

// ==============================================================
//  誘導リンク用画像ファイル名
//  ※画像を変更する時は、新しい画像ファイル名をここに書きます↓
// ==============================================================

var fileName = "awpr201105.gif";

// ==============================================================

//
// 広告の数
//
  var ad_num = 10;

  var ad = new Array(ad_num);
  var url = new Array(ad_num);
//
//************************************
//
ad[0] = "<br>１位：テキストに書き込みしていますか？";
url[0] = "http://alcom.alc.co.jp/questions/show/14508/?utm_source=eijirou_201206&utm_medium=serps&utm_content=footer_text_00";

ad[1] = "<br>２位：娘の海外旅行。アドバイスください";
url[1] = "http://alcom.alc.co.jp/questions/show/14520/?utm_source=eijirou_201206&utm_medium=serps&utm_content=footer_text_01";

ad[2] = "<br>３位：have goneとhad goneの違い";
url[2] = "http://alcom.alc.co.jp/questions/show/14542/?utm_source=eijirou_201206&utm_medium=serps&utm_content=footer_text_02";

ad[3] = "<br>４位：なんでお母さんだめって言うんだろー";
url[3] = "http://alcom.alc.co.jp/users/7901/diary/show/254826/?utm_source=eijirou_201206&utm_medium=serps&utm_content=footer_text_03";

ad[4] = "<br>５位：「太っている」表現の使い分け";
url[4] = "http://alcom.alc.co.jp/users/182907/diary/show/255702/?utm_source=eijirou_201206&utm_medium=serps&utm_content=footer_text_04";

ad[5] = "<br>６位：スカイプで話したい方はこの掲示板に";
url[5] = "http://alcom.alc.co.jp/communities/1680/entries/show/254766/?utm_source=eijirou_201206&utm_medium=serps&utm_content=footer_text_05";

ad[6] = "<br>７位：オフ会の良さを知っていただきたいな";
url[6] = "http://alcom.alc.co.jp/communities/1689/entries/show/254562/?utm_source=eijirou_201206&utm_medium=serps&utm_content=footer_text_06";

ad[7] = "<br>８位：二重否定の答え方が分かりません";
url[7] = "http://alcom.alc.co.jp/questions/show/14514/?utm_source=eijirou_201206&utm_medium=serps&utm_content=footer_text_07";

ad[8] = "<br>９位：清水の舞台から飛び降りてみた";
url[8] = "http://alcom.alc.co.jp/users/39366/diary/show/255423/?utm_source=eijirou_201206&utm_medium=serps&utm_content=footer_text_08";

ad[9] = "<br>10位：アルコムワールドの活用法";
url[9] = "http://alcom.alc.co.jp/questions/show/14530/?utm_source=eijirou_201206&utm_medium=serps&utm_content=footer_text_09";


//
//************************************
//
  var n=Math.floor(Math.random()*ad_num);
  var path = String(document.location);
  var p = path.substr(0,5);


  //広告枠に表示するアルコム誘導リンク表示切り替え（isDisplayR -> 右カラム用 / isDisplayF -> フッタ用、表示する時：true 、非表示の時：falseを指定すること。）
  var isDisplayR = true;
  var isDisplayF = true;
  //文字列用変数
  var str = ""

  //右カラム用誘導リンク表示切り替え（isDisplayR）がtrueのときのみ
  if (isDisplayR == true && flag =="right" ) {

    //広告枠に表示するアルコム誘導リンク用の枠(開始タグ）
    str += "<tr><td align=left><div style='border:3px double Blue;padding-bottom:4px;'>";

    if ( p == 'file:' ) {
      for (n = 0; n < ad_num; n++ ) {
      str += "<br><a href='"+url[n]+"' target='_blank' ><img src='" + fileName + "' border=0 style='margin-bottom:4px;'></a>" + "<a href='"+url[n]+"' target='_blank' >" + ad[n] + "</a>";
      }
    } else {
      str += "<a href='"+url[n]+"' target='_blank' ><img src='//cdn2.alc.co.jp/eow/alcom/" + fileName + "' border=0 style='margin-bottom:4px;'></a>" + "<a href='"+url[n]+"' target='_blank' >" + ad[n] + "</a>";
    }

    //広告枠に表示するアルコム誘導リンク用の枠(閉じタグ）
    str += "</div></td></tr>";
  }

  //フッタ用誘導リンク（isDisplayF）表示切り替えがtrueのときのみ
  if (isDisplayF == true  && flag == "footer") {

    //画面下部の検索窓の直下に表示するアルコム誘導リンク用の枠(開始タグ）
    str += "<br><div style='text-align:center;'><div style='border:3px double Gray; width:350px; text-align: center; margin-left:auto;margin-right:auto; padding-bottom:4px;'>";
    
    if ( p == 'file:' ) {
      for (n = 0; n < ad_num; n++ ) {
       str += "<br><a href='"+url[n]+"' target='_blank' ><img src='" + fileName + "' border=0 style='margin-bottom:4px;'></a>" + "<a href='"+url[n]+"' target='_blank' >" + ad[n] + "</a>";
     }
    } else {
      str += "<a href='"+url[n]+"' target='_blank' ><img src='//cdn2.alc.co.jp/eow/alcom/" + fileName + "' border=0 style='margin-bottom:4px;'></a>" + "<a href='"+url[n]+"' target='_blank' >" + ad[n] + "</a>";
    }

    //画面下部の検索窓の直下に表示するアルコム誘導リンク用の枠(閉じタグ）
    str += "</div></div>";
  }


  document.write(str);

}
