<!--
// jQuery
var searchFlg = false;
$(function(){
  // SERP
  if(searchFlg){
  var param = '?q=' + encodeURL(document.f1.q.value) + '&pg=' + encodeURL(document.f1.pg.value);
  $.ajax({
    type: 'GET',
    dataType: 'jsonp',
    timeout: 60 * 1000,
    url: CONTEXT_PATH + 'api/search' + param + '&callback=?',
    success: function(json) {
      $('#results').empty();
      if(json.ret == 0){
//        document.title = document.title.replace(/検索結果：/g, '検索結果（' + json.sum + ' 件）：');
        $('#itemsNumber').html('該当件数 : <strong>' + json.sum + '</strong>件');
        // 検索結果
        if(json.sum == 0){
          $('.sas').empty();
          $('#sas_empty_tmpl').tmpl({linkword: json.linkword, gradable: json.gradable, suggest: json.suggest}).appendTo('.sas');
          $('#result_empty_tmpl').tmpl().appendTo('#results');
//          $('#ad_tmpl').tmpl().appendTo('#emptyad');
          $('#emptyad').css('display','block');
        }else{
          $('#reprint_top').css('display','block');
//          $('#sas_tmpl').tmpl({linkword: json.linkword, gradable: json.gradable, idiom: json.idiom}).appendTo('.sas');
          var text = '<ul>';
          for (var i in json.list){
            text += json.list[i] + '\n';
          }
          text += '</ul>';
          $('#result_tmpl').tmpl({result: text}).appendTo('#results');
          label_icon();
          show_refVocabLink();
        }
      } else {
        $('#resultsMain').empty();
        $('#error_tmpl').tmpl().appendTo('#resultsMain');
      }
    },
    error: function(XMLHttpRequest, status, errorThrown) {
      $('#resultsMain').empty();
      $('#error_tmpl').tmpl().appendTo('#resultsMain');
    }
  });
  }
  // infobar
  var tipsImg = '/content/img/arrow_orange2.gif';
  var tipsTxt = '広告非表示、検索履歴、音声…さらに便利な「英辞郎 on the WEB Pro」とは？';
  var tipsUrl = '//home.alc.co.jp/db/owa/sp_sacd_redir_pt?code=c_eow_infob_01';
  $('#box').html("<table style='table-layout: fixed; width: 100%; margin-top: 2px; padding: 2px; border: 3px solid #D0D0D0;'><tr><td style='overflow: hidden; white-space: nowrap; width: 100%; text-overflow: ellipsis; -o-text-overflow: ellipsis;' width='535'><a target='_blank' href='" + tipsUrl + "' style='font-size:12px; text-decoration:none;' title='" + tipsTxt + "'><img src='" + tipsImg + "' border='0' hspace='5'>" + tipsTxt + "</a></td><td width='15' valign='top'></td></tr></table>");
});
// -->
