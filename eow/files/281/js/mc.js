(function(global) {

  // ### North_banner

  global.north_banner = function() {
    adNorth_banner = [
      "<div id='div-gpt-ad-1544172444986-0'>",
      "<script>",
      "googletag.cmd.push(function() {",
          "var slot = googletag.defineSlot('/62532913/p_alc_728x90_top01_21945', [728, 90], 'div-gpt-ad-1544172444986-0').addService(googletag.pubads());",
          "googletag.enableServices();",
          "flucttag.showDfpAd(slot);",
      "});",
      "</script>",
      "</div>"      
    ].join('\n');
    document.write(adNorth_banner);
  };

    
  // ### alc_eijiro_1st_300x250_48689
  //
  global.rectangle01 = function() {
    rectangle_ad = [
      '<!-- /21619764421/p_alc_eijiro_1st_rec_300x250 -->',
      '<div id="div-gpt-ad-1536119289905-0" style="height:250px; width:300px;">',
      '<script>',
      'googletag.cmd.push(function() {',
      'var slot = googletag.defineSlot("/21619764421/p_alc_eijiro_1st_rec_300x250", [300, 250], "div-gpt-ad-1536119289905-0").addService(googletag.pubads());',
      'googletag.enableServices();',
      'flucttag.showDfpAd(slot);',
      '});',
      '</script>',
      '</div>'
    ].join('\n');
    document.write(rectangle_ad);
  }

  // ### EOW_INT-205
  global.occasional = function() {
     var occ_tag = "";
    occ_tag = [
      "<!-- /62532913/p_alc_300x250_2ndrec2_21945 -->",
      "<div id='div-gpt-ad-1555311976881-0'>",
      "<script>",
      "googletag.cmd.push(function() {",
      "var slot = googletag.defineSlot('/62532913/p_alc_300x250_2ndrec2_21945', [300, 250], 'div-gpt-ad-1555311976881-0').setCollapseEmptyDiv(true, true).addService(googletag.pubads());",
      "googletag.enableServices();",
      "flucttag.showDfpAd(slot);",
      "});",
      "</script>",
      "</div>"
    ].join('\n');
    document.write(occ_tag);
  };


  // 記事枠
  global.article = function() {
    var tag = "";
    tag = [
      '<!--      fluct グループ名「アルク（レコメンド）_999x999_Web_インライン_右カラム」      -->',
      '<script type="text/javascript" src="https://cdn-fluct.sh.adingo.jp/f.js?G=1000106491"></script>',
      '<!--      fluct ユニット名「アルク（レコメンド）_999x999_Web_PC_インライン_右カラム」     -->',
      '<script type="text/javascript">',
      '//<![CDATA[',
      'if(typeof(adingoFluct)!="undefined") adingoFluct.showAd("1000166581");',
      '//]]>',
      '</script>'
    ].join('\n');
    document.write(tag);
  };

  
  // ### 2nd_300x250
  global.rectangle02 = function() {
    adov_adn = [
      "<!-- /62532913/p_alc_300x250_2ndrec_21945 -->",
      "<div id='div-gpt-ad-1544172541875-0'>",
      "<script>",
      "googletag.cmd.push(function() {",
          "var slot = googletag.defineSlot('/62532913/p_alc_300x250_2ndrec_21945', [300, 250], 'div-gpt-ad-1544172541875-0').addService(googletag.pubads());",
          "googletag.enableServices();",
          "flucttag.showDfpAd(slot);",
      "});",
      "</script>",
      "</div>"
    ].join('\n');
    document.write(adov_adn);
  };

  // ### alc_eijiro_4th_300x250_300x600
  //
  global.ace_ar = function() {
    adAce_ar = [
      "<!-- /62532913/p_alc_300x600_4threc_21945 -->",
      "<div id='div-gpt-ad-1544172600637-0'>",
      "<script>",
      "googletag.cmd.push(function() {",
          "var slot = googletag.defineSlot('/62532913/p_alc_300x600_4threc_21945', [[300, 600], [300, 250]], 'div-gpt-ad-1544172600637-0').addService(googletag.pubads());",
          "googletag.enableServices();",
          "flucttag.showDfpAd(slot);",
      "});",
      "</script>",
      "</div>"
    ].join('\n');
    document.write(adAce_ar);
  };


  // ### serp list
 
  global.result_list = function() {
    adresult_list = [
      "<!-- /62532913/p_alc_999x999_infeed_21945 -->",
      //バナーの面を上下と合わせるため、margin-leftを指定。
      "<style>#div-gpt-ad-1544175518588-0 iframe {margin-left: -80px; margin-bottom:10px; margin-top:5px;}</style>",
      "<div id='div-gpt-ad-1544175518588-0'>",
      "<script>",
      "googletag.cmd.push(function() {",
          "var slot = googletag.defineSlot('/62532913/p_alc_999x999_infeed_21945', ['fluid', [728, 90]], 'div-gpt-ad-1544175518588-0').addService(googletag.pubads());",
          "googletag.enableServices();",
          "flucttag.showDfpAd(slot);",
      "});",
      "</script>",
      "</div>"
    ].join('\n');
    document.write(adresult_list);
  };


  // ### infospace
  global.infospace = function() { 
    var infospace = [
      '<script language="javascript" src="//ds.advg.jp/adpds_deliver/js/pjs.js"></script>',
      '<script language="javascript">adpds_js("//ds.advg.jp/adpds_deliver", "adpds_site=alcad0505&adpds_frame=eow_sale_right_bn_01");</script>'
    ].join('\n');
    document.write(infospace);
  };

  // ### self-pr text
  global.announcement = function() {   
    var announcement = [
      '<script language="javascript" src="https://ds.advg.jp/adpds_deliver/js/pjs.js"></script>',
      '<script language="javascript">adpds_js("https://ds.advg.jp/adpds_deliver", "adpds_site=alcad0505&adpds_frame=eow_sale_pc_serp_topftxt");</script>',
    ].join('\n');
    document.write(announcement); 
  };

  // ### main culumn top 728*90
  global.main_top = function() {
    var main_top = [
      "<!-- /62532913/p_alc_728x90_top02_21945 -->",
      "<div id='div-gpt-ad-1544172479583-0'>",
      "<script>",
      "googletag.cmd.push(function() {",
          "var slot = googletag.defineSlot('/62532913/p_alc_728x90_top02_21945', [728, 90], 'div-gpt-ad-1544172479583-0').addService(googletag.pubads());",
          "googletag.enableServices();",
          "flucttag.showDfpAd(slot);",
      "});",
      "</script>",
      "</div>",
    ].join('\n');
    document.write(main_top);
  };

    // ### alc_eijiro_footer_728-90_48687
  global.spb_f_adn = function() {
    spb_f_adn_str = [
      '<ins id="yoneads35529"></ins>',
      '<script type="text/javascript" src="//img.ak.impact-ad.jp/ic/pone/tags/3276/035529_4.js"></script>'
      ].join('\n');
    document.write(spb_f_adn_str);
  };

  // ### bottom main column
  global.hs_f_adn = function() {
    var introduceEowp = [
      '<script language="javascript" src="https://ds.advg.jp/adpds_deliver/js/pjs.js"></script>',
      '<script language="javascript">adpds_js("https://ds.advg.jp/adpds_deliver", "adpds_site=alcad0505&adpds_frame=eow_sale_pc_serp_bottombn");</script>',
    ].join('\n');  
    document.write(introduceEowp);
  };
  
  // ### 0-match
  global.ad_com = function() {
    adAd_com = [
      '<!--      fluct グループ名「アルク：300x250（eijiro_pc_error_rec）」      -->',
      '<script type="text/javascript" src="https://cdn-fluct.sh.adingo.jp/f.js?G=1000098743"></script>',
      '<!--      fluct ユニット名「アルク：300x250（eijiro_pc_error_rec）」     -->',
      '<script type="text/javascript">',
      '//<![CDATA[',
      'if(typeof(adingoFluct)!="undefined") adingoFluct.showAd("1000149621");',
      '//]]>',
      '</script>'
    ].join('\n');
    document.write(adAd_com);
  };


}(window));
