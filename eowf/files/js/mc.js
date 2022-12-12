(function(global) {

  // tag template
  // ### 728x90
  var superBanner = [
    "<!-- /62532913/p_alc_728x90_litetop01_21945 -->",
    "<div id='div-gpt-ad-1544172660620-0'>",
    "<script>",
    "googletag.cmd.push(function() {",
        "var slot = googletag.defineSlot('/62532913/p_alc_728x90_litetop01_21945', [728, 90], 'div-gpt-ad-1544172660620-0').addService(googletag.pubads());",
        "googletag.enableServices();",
        "flucttag.showDfpAd(slot);",
    "});",
    "</script>",
    "</div>"
  ].join('\n');

  // ### 300x250 (top right & serp right 1st)
  var rect1 = [
    "<!-- /21619764421/p_alc_eijiro_pro_lite_1st_rec -->",
    "<div id='div-gpt-ad-1538629852889-0'>",
    "<script>",
    "googletag.cmd.push(function() {",
        "var slot = googletag.defineSlot('/21619764421/p_alc_eijiro_pro_lite_1st_rec', [300, 250], 'div-gpt-ad-1538629852889-0').addService(googletag.pubads());",
        "googletag.enableServices();",
        "flucttag.showDfpAd(slot);",
    "});",
    "</script>",
    "</div>"      
  ].join('\n');

  var rect02 = [
    "<!-- /62532913/p_alc_300x250_lite2ndrec_21945 -->",
    "<div id='div-gpt-ad-1544172719097-0'>",
    "<script>",
    "googletag.cmd.push(function() {",
        "var slot = googletag.defineSlot('/62532913/p_alc_300x250_lite2ndrec_21945', [[300, 250], [300, 600]], 'div-gpt-ad-1544172719097-0').addService(googletag.pubads());",
        "googletag.enableServices();",
        "flucttag.showDfpAd(slot);",
    "});",
    "</script>",
    "</div>"
  ].join('\n');

  // ### 300x250 or 300x600(serp 2nd)
  var rect03 = [
    "<!-- /62532913/p_alc_300x250_lite3rdrec_21945 -->",
    "<div id='div-gpt-ad-1544172743894-0'>",
    "<script>",
    "googletag.cmd.push(function() {",
        "var slot = googletag.defineSlot('/62532913/p_alc_300x250_lite3rdrec_21945', [300, 250], 'div-gpt-ad-1544172743894-0').addService(googletag.pubads());",
        "googletag.enableServices();",
        "flucttag.showDfpAd(slot);",
    "});",
    "</script>",
    "</div>"
  ].join('\n');

  var rect04 = [
    "<!-- /62532913/p_alc_300x250_litefooter01_21945 -->",
    "<div id='div-gpt-ad-1544172774316-0'>",
    "<script>",
    "googletag.cmd.push(function() {",
        "var slot = googletag.defineSlot('/62532913/p_alc_300x250_litefooter01_21945', [300, 250], 'div-gpt-ad-1544172774316-0').addService(googletag.pubads());",
        "googletag.enableServices();",
        "flucttag.showDfpAd(slot);",
    "});",
    "</script>",
    "</div>"
  ].join('\n');

  var rect05 = [
    "<!-- /62532913/p_alc_300x250_litefooter02_21945 -->",
    "<div id='div-gpt-ad-1544172802580-0'>",
    "<script>",
    "googletag.cmd.push(function() {",
        "var slot = googletag.defineSlot('/62532913/p_alc_300x250_litefooter02_21945', [300, 250], 'div-gpt-ad-1544172802580-0').addService(googletag.pubads());",
        "googletag.enableServices();",
        "flucttag.showDfpAd(slot);",
    "});",
    "</script>",
    "</div>"
  ].join('\n');

  // render function
  // ### serp 728x90

  global.ad_superbanner = function() {
    document.write(superBanner);
  };
    
  // ### 1st_300x250
  //
  global.ad_result_rct1st = function() {
    document.write(rect1);
  }

  // ### 2rd
  global.ad_result_rct3rd = function() {
    document.write(rect02);
};

  // ### 3nd_300x250 or 300x600
  global.ad_result_rct5th = function() {
    document.write(rect03);
  };

  // // ### 3rd_300x250
  // global.info_disp_r = function() {
  //   document.write(adInfoDisp_r);
  // };

  // ### bottom_300x250_left
  //
  global.ad_result_btm_l = function() {
    document.write(rect04);
  };

  // ### bottom_300x250_right
  //
  global.ad_result_btm_r = function() {
    document.write(rect05);
  };
 
  //0件時に出力される広告
  global.ad_zeroMatch = function() {                         
    // document.write(adZeroMatch);
};






  global.hs_left_disp = function() {
   		document.write(rect1);
  };

  global.infospace = function() { 
    document.write(infospaceTag);
  };


  //Topページ　superbanner
  global.north_banner = function() { 
    document.write(superBanner); 
  };

  global.ad_top_center = function() {

    document.write('<div style="margin-bottom: 40px; margin-left: 10px;">');
      //TOP右広告
      adInfoTopRight = [
        "<!-- /21619764421/p_alc_eijiro_pro_lite_1st_rec -->",
        "<div id='div-gpt-ad-1538629852889-0'>",
        "<script>",
        "googletag.cmd.push(function() {",
            "var slot = googletag.defineSlot('/21619764421/p_alc_eijiro_pro_lite_1st_rec', [300, 250], 'div-gpt-ad-1538629852889-0').addService(googletag.pubads());",
            "googletag.enableServices();",
            "flucttag.showDfpAd(slot);",
        "});",
        "</script>",
        "</div>"
      ].join('\n');
      document.write(adInfoTopRight);
    document.write('</div>');
    document.write('</div>');
  };   //TOP部分の広告

}(window));
