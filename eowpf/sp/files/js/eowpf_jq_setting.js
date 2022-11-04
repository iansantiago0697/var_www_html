$(function(){
  $.ajaxSetup({ cache: false });
  $('input[name="kana"]').val([settings.kana]);
  $('input[name="fontSize"]').val([settings.fontSize]);
  $('input[name="suggest"]').val([settings.suggest]);
  $('input[name="reibun"]').val([settings.reibun]);
  $('input[name="kana"]').click(function(){
    settings.kana = $(this).val();
    setSpCookie();
//    setStorage(STORAGE_SETTINGS, settings);
  });
  $('input[name="fontSize"]').click(function(){
    settings.fontSize = $(this).val();
    setSpCookie();
//    setStorage(STORAGE_SETTINGS, settings);
  });
  $('input[name="suggest"]').click(function(){
    settings.suggest = $(this).val();
    setSpCookie();
//    setStorage(STORAGE_SETTINGS, settings);
  });
  $('input[name="reibun"]').click(function(){
    settings.reibun = $(this).val();
    setSpCookie();
//    setStorage(STORAGE_SETTINGS, settings);
  });
});
