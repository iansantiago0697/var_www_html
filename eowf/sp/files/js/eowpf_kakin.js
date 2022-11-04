// 課金状態表示
$(function(){
  $.jsonrpc.defaultUrl = '/api/';
  $.jsonrpc({
    method: 'get_charge_status',
    params: {},
  })
  .done(function(result){
    // 戻り値判定
    var nowDate = Date.now();
    if (result['chargeType'] == 0 || Date.parse(result['expireDate']) <= nowDate) {
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
      var exdate = result['expireDate'].match(/(\d{4})\/(\d{2})\/(\d{2})/);
      $('#expiredate').html(exdate[1] + '年'+ exdate[2] + '月' + exdate[3] + '日');
    } else if (result['chargeType'] == 3) {
      // Google課金
      $('#chargeType').html('「英辞郎 on the WEB Pro」アプリ内購入');
      var exdate = result['expireDate'].match(/(\d{4})\/(\d{2})\/(\d{2})/);
      $('#expiredate').html(exdate[1] + '年'+ exdate[2] + '月' + exdate[3] + '日');
    } else if (result['chargeType'] == 4) {
      // バルク課金
      $('#chargeType').html('「英辞郎 on the WEB Pro」団体申し込み');
      var exdate = result['expireDate'].match(/(\d{4})\/(\d{2})\/(\d{2})/);
      $('#expiredate').html(exdate[1] + '年'+ exdate[2] + '月' + exdate[3] + '日');
    } else {
      // 不明
      // Web課金
      $('#chargeType').html('「英辞郎 on the WEB Pro Lite」');
      $('#expiredatediv').html('&nbsp;');
    }
  })
  .fail(function(error){
      // Web課金
      $('#chargeType').html('「英辞郎 on the WEB Pro Lite」');
      $('#expiredatediv').html('&nbsp;');
  })
});
