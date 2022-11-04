var historyIdList = new Array();
$(function(){
  $.ajaxSetup({ cache: false });
  $('.del_hist').click(function(){
    var id = this.id.substring(5);
    if (confirm($('#hist_text_'+id).text() + ' を削除しますか？')) {
      lock_screen();
      $('#histId').val(id);
      $('#fmManage').submit();
    }
    return false;
  });
  // 検索履歴全選択/全解除
  $('#word_chk_all').click(function(){
    $('.word_chk').each(function(){
      $(this).prop('checked', $('#word_chk_all').is(':checked'));
    });
  });
  // 検索履歴選択/解除
  $('.word_chk').click(function(){
    var allCheck = true;
    $('.word_chk').each(function(){
      if(!$(this).is(':checked')){
        allCheck = false;
        return false;
      }
    });
    $('#word_chk_all').prop('checked', allCheck);
  });
  $('#js_s_history_part').click(function(){
    var res=confirm('選択した検索履歴を削除します。よろしいですか？');
    if(res){
      historyIdList = new Array();
      $('.word_chk').each(function(){
        if($(this).is(':checked')){
          var historyId = $(this).attr('id');
          historyId = historyId.substring(historyId.lastIndexOf('_')+1);
          historyIdList.push(historyId);
        }
      });
      if(historyIdList.length <= 0){
        alert('検索履歴が選択されていません。');
        return false;
      }
      $.getJSON(JSON_URI+'history/deleteSelectedHistory', {'idList': historyIdList.toString()}, function(json){
        if(json.ret == 0){
          location.reload(true);
        }else{
          alert('検索履歴削除でエラーが発生いたしました。時間をおいてもう一度お試しください。(' + json.ret + ')');
        }
      });
    }
  });
});
