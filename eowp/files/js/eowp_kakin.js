// 課金状態表示
$(function(){
  $.jsonrpc.defaultUrl = '/api/';
  $.jsonrpc({
    method: 'get_charge_status',
    params: {},
  })
  .done(function(result){
    // 戻り値判定
    if (result['chargeType'] == 0) {
      // 無課金
      $('#chargeType').html('「英辞郎 on the WEB Pro Lite」');
      $('#expiredatediv').html('&nbsp;');
    } else if (result['chargeType'] == 1) {
      // Web課金
      $('#chargeType').html('「英辞郎 on the WEB Pro」');
      $('#expiredatediv').html('&nbsp;');
    } else if (result['chargeType'] == 2) {
      // Apple課金
      $('#chargeType').html('「英辞郎 on the WEB Pro」アプリ内購入');
      $('#expiredatediv').html('&nbsp;');
    } else if (result['chargeType'] == 3) {
      // Google課金
      $('#chargeType').html('「英辞郎 on the WEB Pro」アプリ内購入');
      $('#expiredatediv').html('&nbsp;');
    } else if (result['chargeType'] == 4) {
      // バルク課金
      $('#chargeType').html('「英辞郎 on the WEB Pro」団体申し込み');
      $('#expiredate').html(decreaseDate(result['expireDate']));
    } else {
      // 不明
      // Web課金
      $('#chargeType').html('「英辞郎 on the WEB Pro」');
      $('#expiredatediv').html('&nbsp;');
    }
  })
  .fail(function(error){
      // Web課金
      $('#chargeType').html('「英辞郎 on the WEB Pro」');
      $('#expiredatediv').html('&nbsp;');
  })
});
//継続申し込みの締切日に変換
function decreaseDate(expiredate) {
    var deadlineDate = new Date(expiredate);
    //課金期間 終了日から1日減算
    deadlineDate.setDate(deadlineDate.getDate() - Number(1));
    return (deadlineDate.getFullYear() + '年' + (deadlineDate.getMonth() + 1) + '月' + deadlineDate.getDate() + '日');
}

