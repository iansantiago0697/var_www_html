function setUserSetting2Cookie() {
  var d = $('#setting :input').serializeArray();
  var j = 1;
  for(var i=0;i<d.length;i++) {
    if (j < cookies.length-2) {
      cookies[j]=d[i].value;
    }
    j++;
  }
  setCookie();
};
function setUserSettingAll() {
  $('input[name="fontSize"]').val([cookies[1]]);
  $('input[name="lineHeight"]').val([cookies[2]]);
  $('input[name="font"]').val([cookies[3]]);
  $('input[name="kana"]').val([cookies[4]]);
  $('input[name="dblClick"]').val([cookies[5]]);
  $('input[name="refWindow"]').val([cookies[6]]);
  $('input[name="srchWord"]').val([cookies[7]]);
  $('input[name="suggest"]').val([cookies[8]]);
  $('input[name="reibun"]').val([cookies[9]]);
  $('input[name="srchExtension"]').val([cookies[10]]);
  $('#dispCnt').val([cookies[11]]);
  $('input[name="wordbook"]').val(['1']);
  $('input[name="history"]').val([cookies[13]]);
  $('#timezone').val([cookies[14]]);
};
function setUserSettingDisp() {
  $('#js_size').removeClass('large largest');
  $('#js_line').removeClass('normal wide');
  $('#js_font').removeClass('gothic mincho');
  switch($('input[name="fontSize"]:checked').val()){
    case "0":break;
    case "1":$('#js_size').addClass('large');break;
    case "2":$('#js_size').addClass('largest');break;
  }
  switch($('input[name="lineHeight"]:checked').val()){
    case "0":$('#js_line').addClass('normal');break;
    case "1":$('#js_line').addClass('wide');break;
  }
  switch($('input[name="font"]:checked').val()){
    case "0":$('#js_font').addClass('gothic');break;
    case "1":$('#js_font').addClass('mincho');break;
  }
};
function loadForm() {
  js_eowp();
  setUserSettingAll();
  setUserSettingDisp();
};
function params2json(d) {
  if (d.constructor != Array) {
    return d;
  }
  var data={};
  for(var i=0;i<d.length;i++) {
    if (typeof data[d[i].name] != 'undefined') {
      if (data[d[i].name].constructor!= Array) {
        data[d[i].name]=[data[d[i].name],d[i].value];
      } else {
        data[d[i].name].push(d[i].value);
      }
    } else {
      data[d[i].name]=d[i].value;
    }
  }
  return data;
};
function params2json_init(d) {
  if (d.constructor != Array) {
    return d;
  }
  var data={};
  for(var i=0;i<d.length;i++) {
    if (typeof data[d[i].name] != 'undefined') {
      if (data[d[i].name].constructor!= Array) {
        data[d[i].name]=[data[d[i].name],''];
      } else {
        data[d[i].name].push('');
      }
    } else {
      data[d[i].name]='';
    }
  }
  return data;
};
$(function(){
  $.ajaxSetup({ cache: false });
  $('input[name="fontSize"]:radio').change(function(){
    $('#js_size').removeClass('large largest');
    switch($('input[name="fontSize"]:checked').val()){
      case "0":break;
      case "1":$('#js_size').addClass('large');break;
      case "2":$('#js_size').addClass('largest');break;
    }
  });
  $('input[name="lineHeight"]:radio').change(function(){
    $('#js_line').removeClass('normal wide');
    switch($('input[name="lineHeight"]:checked').val()){
      case "0":$('#js_line').addClass('normal');break;
      case "1":$('#js_line').addClass('wide');break;
    }
  });
  $('input[name="font"]:radio').change(function(){
    $('#js_font').removeClass('gothic mincho');
    switch($('input[name="font"]:checked').val()){
      case "0":$('#js_font').addClass('gothic');break;
      case "1":$('#js_font').addClass('mincho');break;
    }
  });
  $('#js_setting_init').click(function(){
    $.getJSON(JSON_URI+'setUserSettingAll', params2json_init($('#setting :input').serializeArray()), function(json){
      if(json.ret == 0){
        $('input[name="fontSize"]').val(['0']);
        $('input[name="lineHeight"]').val(['0']);
        $('input[name="font"]').val(['0']);
        $('input[name="kana"]').val(['0']);
        $('input[name="dblClick"]').val(['1']);
        $('input[name="refWindow"]').val(['1']);
        $('input[name="srchWord"]').val(['0']);
        $('input[name="suggest"]').val(['1']);
        $('input[name="reibun"]').val(['2']);
        $('input[name="srchExtension"]').val(['1']);
        $('#dispCnt').val(['50']);
        $('input[name="wordbook"]').val(['1']);
        $('input[name="history"]').val(['1']);
        $('#timezone').val(['0']);
        setUserSetting2Cookie();
        setUserSettingDisp();
        ini_suggest();
      }
      dialogs_initsetting(json.ret);
    });
  });
  $('div.js_setting input').click(function(){
    $.getJSON(JSON_URI+'setUserSettingAll', params2json($('#setting :input').serializeArray()), function(json){
      if(json.ret == 0){
        setUserSetting2Cookie();
        ini_suggest();
      }
      dialogs_setting(json.ret);
    });
  });
});
