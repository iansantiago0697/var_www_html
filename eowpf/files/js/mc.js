//
// **英辞郎 on the WEB** の広告運用用スクリプト
//
// * 運用マニュアルは Pukiwiki の DevAdMc ページを参照して下さい。
// * [docco](https://jashkenas.github.com/docco/) を使ってドキュメントを生成できます。
//     もし、今ドキュメントを見ているなら、それはソースコードコメントを元に docco で生成されたものです ;)

//
(function(global) {

  // ライブラリのインポート
  // --------------------

  // **SaCoT**: "Settings and Contents on Templates"
  //
  // コンテンツを設定と内容とテンプレートに分けて記述するためのフレームワーク
  //
  // * オリジナルソースは gitolite にあります
  //
  var SaCoT=function(){function b(a){a=a?a:{},this.settings=a.settings?a.settings:{},this.contents=a.contents?a.contents:{},this.templates=a.templates?a.templates:{},this.css=a.css?a.css:{},this.categoryDepth=a.categoryDepth?a.categoryDepth:0}function c(a,b){var c=new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+a.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');");return b?c(b):c}function d(a,b,c){return!a||!b.length||!c?a:d(a[b.shift()],b,--c)}var a=function(a,b){return function(){return b.apply(a,arguments)}};return b.prototype.helpers=function(){function a(a){return Array.prototype.slice.call(a)}function b(a){return a.concat()}function c(c){var d=b(a(c)),e=d.length,f=0;return{hasNext:function(){return f<e?!0:!1},next:function(){return e>f?d[f++]:null},getIndex:function(){return f}}}function d(a,b){var d=[],e=c(a);while(e.hasNext())d.push(b(e.next(),e.getIndex()));return d}function e(a,b){var d=[],e=c(a),f;while(e.hasNext())f=e.next(),b(f,e.getIndex())&&d.push(f);return d}function f(a,b){var d=c(a);while(d.hasNext())b(d.next(),d.getIndex())}function g(a,b){return d(b,function(b){return a[b]})}function h(c){var d=b(a(c)),e=d.length;return{hasNext:function(){return e?!0:!1},next:function(){if(!e)return null;var a=Math.floor(Math.random()*e--);return d.splice(a,1)[0]}}}function i(a,b){var c=h(a),d=[];while(c.hasNext()&&(typeof b=="undefined"||0<b--))d.push(c.next());return d}function k(a,b){return a[j(b)]}var j=function(){function a(a){var b=a.length,c=0,d=[],e;for(e=0;e<b;++e)c+=a[e],d.push(e,c);return d.pop(),{tree:d,parameter:c}}function b(a,b){var c=a.length;if(c<1)return null;if(c===1)return a[0];var d=1,e=c-2,f=Math.ceil;do{var g=f((d+e)/2);g&1||++g;if(a[g]>b){e=g-2;if(e<d)return a[g-1]}else{d=g+2;if(d>e)return a[g+1]}}while(!0)}function c(a,b){return Math.floor(Math.random()*(b-a+1))+a}return function(d){var e=a(d);return b(e.tree,c(0,e.parameter-1))}}();return{arrayIterator:c,map:d,filter:e,selectByIndexes:g,forEach:f,shuffleArray:i,selectOneByWeights:k}}(),b.prototype.compileFunc=c,b.prototype.CSSCompileFunc=c,b.prototype.makeGetCategory=function(a){var b=a.split("."),c=this;return function(a){var e=d(a,b.concat(),c.categoryDepth);return e?e:a}},b.prototype.compile=function e(b,c){var e,f,g;return e=d(this.templates,b.split("."),-1),f=b,e||(e=b,f=""),this.helpers.compile=a(this,this.compile),g=this.makeGetCategory(f),this.compileFunc(e,{S:g(this.settings),gS:this.settings,C:g(this.contents),gC:this.contents,H:this.helpers,O:c})},b.prototype.addCSS=function(){function a(a,b){var c,d,e,f,g=document;d=g.getElementById(b);if(!d||d.tagName.toLowerCase()!=="style")c=g.getElementsByTagName("head").item(0),c||(c=g.docElement),d=g.createElement("style"),d.type="text/css",d.id=b,c.appendChild(d);f=d.innerHTML;if(f.indexOf(a)!==-1)return;e=f+"\n"+a,d.styleSheet?d.styleSheet.cssText=e:d.innerHTML=e}function b(a,d){if(typeof a=="string")c.apply(this,[a,d]);else for(var e in a)a.hasOwnProperty(e)&&b.apply(this,[a[e],d])}function c(){var c,e,f,g,h;typeof arguments[0]=="string"?(c=arguments[0],e=arguments[1],f=d(this.css,c.split("."),-1),g=c,f||(f=c,g=""),h=this.makeGetCategory(g),a(this.CSSCompileFunc(f,{S:h(this.settings),gS:this.settings,O:e}),"SaCot_added_style")):b.apply(this,[this.css,arguments[0]])}return c}(),b}()

  // SaCoT オブジェクトを作成
  // -----------------------
  //
  // **mc オブジェクト** に広告表示のための **設定**、**コンテンツ**、**テンプレート** が格納される。
  //
  // `mc.settings`
  // : 設定
  //
  // `mc.contents`
  // : コンテンツ
  //
  // `mc.templates`
  // : テンプレート
  //
  // `mc.helpers`
  // : テンプレート内で使うヘルパー関数
  //
  //
  // **カテゴリ** (`settings`, `contents`, `templates` の一つ下の名前空間)について
  //
  // * **ホットスポット**（スポンサーサイト検索）: `hotSpot`
  // * **インタレストマッチ**:  `interestMatch` (内容は外部JSから読み込むので contents は無し) 2013.08.16 で終了
  //    * **メインカラム**:      `mainColumn`
  //    * **右カラム**:          `rightColumn`
  // * **Yahoo!アドパートナー(YDN)**:  `ydn` (内容は外部JSから読み込むので contents は無し) 2013.08.16 からインタレストマッチに代わり開始
  //    * **メインカラム**:      `mainColumn`
  //    * **右カラム**:          `rightColumn`
  // * **ゼロマッチ画面**:      `zeroMatchAd`
  // * **EOWP誘導**:            `introduceEowp`
  // * **infospace**:           `infospace`
  // * **他枠**（2012/01 現在は、主にGMOスピード翻訳の広告に利用）
  //           （2013/06 現在は、Criteoからの広告配信-Criteo, YDN, 自社稿）
  //    * **メインカラム**:      `mainColumn`
  //    * **右カラム**:          `rightColumn`
  //
  var mc = new SaCoT({ categoryDepth: 1});

  // ヘルパー関数の拡張
  // -----------------
  // SaCoTにデフォルトで用意されているもの以外のヘルパー関数を作成

  // デザイン用画像のURLを取得
  //
  // `window.IMG_URI` が正しく設定されているときはその値を基準にURLを返す。
  // 正しく設定されていないときはURIの値を良きに計らって返す。
  // Opera で `window.IMG_URI` が空文字列となり、EOW のトップ階層に画像のリクエスト(404となる)
  // が来ていることに対処。
  //
  //     @param {String} fileName Image file Name
  //     @return {String} URL of Image
  //
  mc.helpers.getUIImgUrl = function mc_getUIImgUrl(fileName) {
    var baseUrl = window.IMG_URI;
    if(typeof baseUrl === 'undefined' || !/^http/.test(baseUrl)) {
      /* window.IMG_URI が不正なときは常に本番環境のURLとなる。
       * 本番が落ちている時もテストしたいならテスト環境では
       * テスト環境のURLを返すように変更する。
       */
      baseUrl = 'https://eow.alc.co.jp/content/img/';
    }
    return baseUrl + fileName;
  };

  // ドメインまでのURL(Context Path)を取得
  //
  //     @return {String} URL
  //
  mc.helpers.getContextPath = function mc_getContextPath() {
    return window.CONTEXT_PATH ? window.CONTEXT_PATH : 'https://eowf.alc.co.jp/';
  };

  // 広告の設定
  // ---------

  // ### ホットスポット(スポンサーサイト検索)の設定
  //
  mc.settings.hotSpot = {

    // スポンサー検索 の SERP の列数
    serpCols: '3',

    // メインカラム ホットスポットの設定
    mainColumn: {
      wordNum: 9, // ワード数
      cols: 3,    // 列数
      width: 181  // 一列の幅 (px)
    },

    // 右カラム ホットスポットの設定
    rightColumn: {
      wordNum: 10, // ワード数
      cols: 2,     // 列数
      width: 148   // 一列の幅 (px)
    }

  };

  // ### メインカラム広告の設定
  //
  mc.settings.mainColumn = {

    // ヘッダ部分の要素を設定
    //
    // **weight** について :
    // **特定の要素の `weight` / 各要素の `weight`** の合計 が特定の要素が選択される割合となる。特定の一つの要素しか表示しない場合は、表示する要素の `weight` を `1` とし、他の要素の `weight` をすべて `0` とする
    //
    header: {
      weights: [0, 1]
    },

    // カラム広告の種類を設定
    type: 'text', // `text`: テキスト広告 `banner`: バナー広告

    // 表示する広告のインデックスを配列で指定する。指定した広告がすべて順に表示される
    selections: [0]

  };


  // ### インタレストマッチの設定
  //
  mc.settings.interestMatch = {

    // 表示する広告の数
    numberOfAds: 4

  };

  // ### ゼロマッチ画面の設定
  mc.settings.zeroMatchAd = {

    // バナー画像が置かれるURL
    imgBaseUrl: 'https://t1.hitomedia.jp/GT/uploads/banner/contents/GTA-2-15/',

    // バナー画像の出現頻度設定
    weights: [2, 1, 1]

  };

  // ### EOWP誘導広告の設定
  //
  mc.settings.introduceEowp = {
    // EOWP案内URL
    infoUrl: 'https://home.alc.co.jp/db/owa/sp_sacd_redir_pt?code=c_eow_compare_eowp_01',
    // EOWP誘導テキストの出現頻度設定
    weights: [
        1 /*"particularly critical"*/
      , 1 /*軒を連ねる*/
      , 1 /*original key drawings*/
      , 1 /*"[be] flooded with"*/
      , 1 /*curator*/
      , 1 /*目が離せない*/

    ]
  };

  // ### infospaceの設定
  //
  mc.settings.infospace = {
    weights: [
        5 // 申込月無料
      , 2 // 151015_EOWSerp_hojin_300_74
      , 2 // EOWP_hojin_6
      , 5 // eowios_300-72_1606
      , 5 // eowandroid_300-74_1606
      , 0 // Androidアプリリリース記念
    ]
  };

  // 広告の内容
  // ---------


  // ### EOWP誘導広告内容を設定
  //
  mc.contents.introduceEowp = {
    // `q`
    // : 検索クエリ
    //
    // `keywords`
    // : 表示キーワード( 、区切りで複数キーワード指定可能)
    //
    // `eowCnt`
    // : EOW 検索結果件数
    //
    // `eowpCnt`
    // : EOWP 検索結果件数
    //
    // `url`
    // : EOWP検索結果URL
    //
    texts: [{
      q: '\"particularly critical\"',
      keywords: '\"particularly critical\"、particularly critical、particulaly、critical、重要',
      eowCnt: '1',
      eowpCnt: '5',
      url: 'https://eowp.in/mdKuJB'
    },{
      q: '軒を連ねる',
      keywords: '軒を連ねる、軒、連ねる',
      eowCnt: '0',
      eowpCnt: '4',
      url: 'https://eowp.in/QAsvUM'
    },{
      q: 'original key drawings',
      keywords: '\"original key drawings\"、original key drawings、key drawing、drawing、original drawing、原画',
      eowCnt: '0',
      eowpCnt: '5',
      url: 'https://eowp.in/oFxLJr'
    },{
      q: '"[be] flooded with"',
      keywords: 'flood、flooded、flood with',
      eowCnt: '2',
      eowpCnt: '20',
      url: 'https://eowp.in/WzW1FJ'
    },{
      q: 'curator',
      keywords: 'curator、museum、キュレーター、学芸員',
      eowCnt: '20',
      eowpCnt: '87',
      url: 'https://eowp.in/JGrCm5'
    },{
      q: '目が離せない',
      keywords: '目、離す、注目、熱中',
      eowCnt: '5',
      eowpCnt: '11',
      url: 'https://eowp.in/Y3iV5l'
   }]
  };

  // ### ゼロマッチ画面の広告内容を設定
  //
//  mc.contents.zeroMatchAd = {

    // **バナー広告を設定**
    //
    // `title`
    // : バナー画像のタイトル
    //
    // `imgUrl`
    // : バナー画像のURL
    //
    // `url`
    // : ランディングURL
    //
//    banners: [{
//      title: 'Yahoo! &times; アルクツールバーで「英辞郎 on the WEB」を検索！',
//      imgUrl: 'banner_toolbar300_400.gif',
//      url: 'https://eow.alc.co.jp/content/ytb/index.html?utm_source=eow&utm_medium=serp&utm_content=unmatchquery_ytb'
//    },{
//      title: 'SPACE ALC &times; GMO スピード翻訳に翻訳をアウトソーシング',
//      imgUrl: 'banner01.jpg',
//      url: 'https://www.speedhonyaku.com/alc/index.php?utm_source=eowserp&utm_medium=img&utm_content=zeromatch_speed01'
//    },{
//      title: 'SPACE ALC &times; GMO スピード翻訳に翻訳をアウトソーシング',
//      imgUrl: 'banner02.gif',
//      url: 'https://www.speedhonyaku.com/alc/index.php?utm_source=eowserp&utm_medium=img&utm_content=zeromatch_speed02'
//    }]
//  };

  // ### infospaceの内容を設定
  //
  mc.contents.infospace = {
    banners: [{
      // ▼▼▼ 申込月無料 ▼▼▼
      url: 'https://eowp.alc.co.jp/info2?utm_source=eowf_pc&utm_medium=banner&utm_campaign=newbanner1',
      img: 'newbanner1.jpg',
      alt: '英辞郎 on the WEB Pro'
    },{
      // ▼▼▼ 151015_EOWSerp_hojin_300_74 ▼▼▼
      url: 'https://eowp.alc.co.jp/info-business/?utm_source=serpf_pc&utm_medium=banner&utm_content=151015_EOWSerp_hojin_300_74&utm_campaign=151015_EOWSerp_hojin_300_74',
      img: '151015_EOWSerp_hojin_300_74.jpg',
      alt: '複数アカウントの一括決済対応'
    },{
      // ▼▼▼ EOWP_hojin_6_300_72 ▼▼▼
      url: 'https://eowp.alc.co.jp/info-business/?utm_source=serpf_pc&utm_medium=banner&utm_content=EOWP_hojin_6_300_74.jpg&utm_campaign=EOWP_hojin_6&iref=serpf_pc_hojin6_300_74',
      img: 'EOWP_hojin_6_300_74.jpg',
      alt: '複数アカウントの一括決済対応'
    },{
      // ▼▼▼ eowios_300-74_1606 ▼▼▼
      url: 'https://s.alc.jp/eowapple',
      img: 'eowios_300-74_1606.jpg',
      alt: 'iOSアプリ「英辞郎 on the WEB」'
    },{
      // ▼▼▼ eowandroid_300-74_201604 ▼▼▼
      url: 'https://s.alc.jp/eowggl',
      img: 'eowandroid_300-74_1606.jpg',
      alt: 'Androidアプリ「英辞郎 on the WEB」'
    },{
      // ▼▼▼ Androidアプリリリース記念 ▼▼▼
      url: 'https://eowp.alc.co.jp/info/cp2016spring/?utm_source=serpf_pc&utm_medium=banner&utm_content=eowpcp2016sp_300_74&utm_campaign=EOWP_cp2016spring_300_74_201604',
      img: 'EOWP_cp2016spring_300_74_201604.jpg',
      alt: 'Amazonギフト券が当たるチャンス　締め切り迫る'
    }]
  };

  // 広告のテンプレート
  // -----------------
  //
  // テンプレートの記述について
  //
  //  * `<%` と `%>` に囲まれた部分は JavaScript コードとして解釈されます。
  //
  //  * `<%=` と `%>` に囲まれた部分は JavaScript コードとして解釈され、さらにその結果が出力されます。
  //
  //  * 上記のタグに囲まれていない部分は通常の文字列として出力されます。
  //
  //  * `<%` または `<%=` と `%>` に囲まれた部分は複数の部分に渡って記述されても JavaScript の一連の手続きとみなされます。例えば
  //        `<ul><% for(var i=0,len=3; i<len; i++) { %><li>id:<%= i %></li><% } %><ul>`
  //    は
  //        `<ul><li>id:0</li><li>id:1</li><li>id:2</li></ul>`
  //    とコンパイルされます。ここで、forからブロック最初の `{` の書かれた部分と、ブロックの最後の `}` は別々の `<% %>` のセグメントに分かれていますが、連携して一連の JavaScript コードを成しています。
  //
  //  * 各テンプレートからは次のショートカットにアクセスできます。
  //    * `S` : 同じカテゴリの `settings` オブジェクト
  //    * `C` : 同じカテゴリの `contents` オブジェクト
  //    * `H` : `helpers` オブジェクト
  //    * `O` : `option` 引数 (compile メソッドの第二引数)
  //
  //  * `mc.templates.hotSpot.mainColumn` のように名前空間を定義して、同じカテゴリの `S` : settings, `C` : contents を読み込む。 トップレベルのオブジェクトには `gS`, `gC` でアクセスできます。
  //


  // ### メインカラム広告のテンプレートを設定
  //
  mc.templates.mainColumn = [
    '<div id="AD_mainColumn" class="adArea mb_10">',
      '<% var hText = H.selectOneByWeights(C.header.texts, S.header.weights); %>',
      // ヘッダー部分
      '<div class="ss_head">',
        '<table>',
          '<tr><td width="20"><img src="<%=H.getUIImgUrl(\'gmo_ec.png\')%>" width="20" height="20" alt="" /></td>',
            '<td width="450" align="left" valign="center" style="padding-left: 5px;">',
              '<a href="<%= hText.linkUrl %>" target="_blank">',
                '<span style="font-size: 11pt;"><%= hText.linkText %></span>',
              '</a>&nbsp;&nbsp;<span style="font-weight: normal;"><%= hText.byText %></span>',
            '</td>',
          '</tr>',
          '<tr>',
            '<td></td><td style="color: #DC143C;"><%= hText.prText %></td>',
          '</tr>',
        '</table>',
      '</div>',  // header end

      // テキスト部分
      '<% var texts = H.selectByIndexes(C.texts, S.selections); %>',
      '<% for (var i = 0, len = texts.length; i < len; i++) { %>',
        '<a href="<%=texts[i].url%>" class="hlt blocklink" target="_blank">',
          '<div class="ss_unit">',
            '<div>',
              '<span class="title" style="font-weight: bold;"><%=texts[i].title%></span>&nbsp;&nbsp;',
              '<span class="url_d"><%=texts[i].dispUrl%></span>',
            '</div>',
            '<div class="description"><%=texts[i].description%></div>',
          '</div>',
        '</a>',
      '<% } %>',

    '</div>'
  ].join('\n');

  // ### 右カラム広告のテンプレートを設定
  //
  mc.templates.rightColumn = {
    src: [
      '<script language="javascript" src="https://ds.advg.jp/adpds_deliver/js/pjs.js"></script>'
    ].join('\n'),
    disp: [
      '<% if (H.getContextPath() == "https://eow.alc.co.jp/") { %>',
        '<script language="javascript">adpds_js("https://ds.advg.jp/adpds_deliver", "adpds_site=alcad0505&adpds_frame=eow_300_250");</script>',
      '<% } else { %>',
        '<script language="javascript">adpds_js("https://ds.advg.jp/adpds_deliver", "adpds_site=alcad0505&adpds_frame=waku_166134");</script>',
      '<% } %>'
    ].join('\n')
  };

  // ### インタレストマッチのテンプレートを設定
  //
  mc.templates.interestMatch = {
    // **右カラム**
    rightColumn: [
       // 取得できた配列の要素数からリスティング数を確認(ダミーリスティングを除外)
      '<% var lst = O.ads, aln = lst.length/6-1, n = S.numberOfAds; %>',
       // 取得できたリスティング数（aln）が、指定された表示本数（n）に満たない場合、取得できたりスティング数を表示本数とする
      '<% if(aln < n) { n = aln; }%>',
      '<div id="interestMatch" class="adArea mb_3">',
        // ヘッダ開始
        '<!-- header -->',
        '<div class="ss_head">',
          '<img src="<%=H.getUIImgUrl(\'oj_ec01.png\')%>" width="20" height="20" align="absbottom" style="margin-right: 5px;" />',
          'インタレストマッチ - ',
          '<a href="https://listing.yahoo.co.jp/service/int/index.html" target="_blank" style="color: #0033CC; font-weight: normal;">',
            '広告の掲載について',
          '</a>',
        '</div>',
        '<!-- /header -->',
        // ヘッダ終わり
        '<div class="clear">',
          // リスティング広告開始
          '<!-- listings -->',
          '<ul>',
          '<% for(var i = 1; i <= n; i++) { %>',
            '<% var m = i * 6; %>', // m は配列の中の各リスティングの最初の要素の添字となる
            '<% if(!!lst[m] && lst[m] !== "") { %>',
              '<li><a href="<%=lst[m+2]%>" class="hlt blocklink ss_unit" target="_blank">',
                //'<div class="ss_unit">',
                  '<span class="title"><%=lst[m+3]%></span>',
                  '<span class="url_d"><%=lst[m+4]%></span>',
                  '<span class="description"><%=lst[m]%></span>',
                //'</div>',
              '</a></li>',
            '<% } %>',
          '<% } %>',
          '</ul>',
          '<!-- /listings -->',
          // リスティング広告終わり
        '</div>',
      '</div>'
    ].join('\n'),

    // **メインカラム**
    mainColumn: [
      '<% var lst = O.ads, aln = lst.length/6-1, n = 8, sn = 5; %>',
      '<% if(aln < n) { n = aln; }%>',
      '<% if(aln < sn) { n = 0; }%>',
      '<% if(sn <= n) {%>',
      '<div id="interestMatch" class="adArea mb_3">',
        // ヘッダ開始
        '<!-- header -->',
        '<div class="ss_head">',
          '<img src="<%=H.getUIImgUrl(\'oj_ec01.png\')%>" width="20" height="20" align="absbottom" style="margin-right: 5px;" />',
          'インタレストマッチ - ',
          '<a href="https://listing.yahoo.co.jp/service/int/index.html" target="_blank" style="color: #0033CC; font-weight: normal;">',
            '広告の掲載について',
          '</a>',
        '</div>',
        '<!-- /header -->',
        // ヘッダ終わり
        '<div class="clear">',
          // リスティング広告開始
          '<!-- listings -->',
          '<ul>',
          '<% for(var i = sn; i <= n; i++) { %>',
            '<% var m = i * 6; %>', // m は配列の中の各リスティングの最初の要素の添字となる
            '<% if(!!lst[m] && lst[m] !== "") { %>',
              '<li><a href="<%=lst[m+2]%>" class="hlt blocklink ss_unit" target="_blank">',
                  '<span class="title"><%=lst[m+3]%></span>',
                  '<span class="url_d"><%=lst[m+4]%></span>',
                  '<span class="description"><%=lst[m]%></span>',
              '</a></li>',
            '<% } %>',
          '<% } %>',
          '</ul>',
          '<!-- /listings -->',
          // リスティング広告終わり
        '</div>',
      '</div>',
      '<% } %>'
    ].join('\n')
  };

  // ### インタレストマッチのテンプレートを設定
  //
  mc.templates.ydn = {
    src: [
      '<script type="text/javascript" language="JavaScript" src="https://yads.yahoo.co.jp/js/yads.js"></script>'
    ].join('\n'),

    // **右カラム**
    rightColumn: [
      '<script type="text/javascript" language="JavaScript">yads_ad_ds = "68460_2003";</script>'
    ].join('\n'),

    // **メインカラム**
    mainColumn: [
     '<script type="text/javascript" language="JavaScript">yads_ad_ds = "44948_2004";</script>'
    ].join('\n')
  };

  // ### メインカラム下にEOWP誘導テキストを設定
  //
  mc.templates.introduceEowp = [
    '<%',
    'var q = document.f1.q.value;',
    'var len = C.texts.length;',
    'var hits = new Array();',
    'for (var i=0; i<len; i++) {',
      'var keys = C.texts[i].keywords.split("、");',
      'if (keys.indexOf(q) != -1) {',
        'hits.push(i);',
      '}',
    '}',
    'var txt;',
    'if (hits.length == 1) {',
      'txt = C.texts[hits[0]];',
    '} else {',
      'if (hits.length > 1) {',
        'for (var i=0; i<len; i++) {',
          'if (hits.indexOf(i) == -1) { S.weights[i] = 0; }',
        '}',
      '}',
      'txt = H.selectOneByWeights(C.texts, S.weights);',
    '}',
    '%>',
    '<div id="introduceEowp">',
      '<span class="intro">例文総数<span class="imp_bl">57万件</span>、無料版より40万件も多い<a href="<%=S.infoUrl%>" title="英辞郎 on the WEB Proとは？" target="_blank">「英辞郎 on the WEB Pro」</a>なら</span>',
      '<span class="intro">もっとたくさんの用例が見つかる！　詳しくは<a href="<%=S.infoUrl%>" title="英辞郎 on the WEB Proとは？" target="_blank">こちら</a></span>',
      '<div id="con_ex">',
      '<span class="intro example">例えば　<span class="imp"><%=txt.q%></span>　を検索すると･･････</span>',
      '<span class="eow_result">「英辞郎 on the WEB」では　該当件数 <%=txt.eowCnt%> 件</span>',
      '<span class="eowp_result"><a href="<%=txt.url%>" title="Pro版の検索結果を今すぐ確認！" target="_blank">「英辞郎 on the WEB Pro」では　該当件数 <span class="imp"><%=txt.eowpCnt%></span> 件！</a></span>',
          '</div>',
    '</div>'
  ].join('\n');

  // ### ゼロマッチ画面の広告テンプレートを設定
  //
  mc.templates.zeroMatchAd = [
    '<% var bnr = H.selectOneByWeights(C.banners, S.weights);%>',
    '<div align="center" width="400" style="margin-top: 15px; margin-bottom: 20px;">',
      '<div style="width: 400px; margin-bottom: 2px; padding: 5px 0 5px 0; background-color: #EEEEEE;">',
        '<a href="<%=bnr.url%>" title="<%=bnr.title%>" target="_blank"><%=bnr.title%></a>',
      '</div>',
      '<a href="<%=bnr.url%>" title="<%=bnr.title%>" target="_blank">',
        '<img src="<%=S.imgBaseUrl%><%=bnr.imgUrl%>" width="400" height="300" border="0" alt="<%=bnr.title%>" />',
      '</a>',
    '</div>'
  ].join('\n');

  // ### infospaceのテンプレートを設定
  //
  mc.templates.infospace = [
    '<% var bnr = H.selectOneByWeights(C.banners, S.weights);%>',
    '<a href="<%=bnr.url%>" target="_blank"><img src="/content/js/sa/img/<%=bnr.img%>" width="300" height="74" border="0" alt="<%=bnr.alt%>"></a>'
  ].join('\n');

  // ### レクタングル広告のテンプレートを設定
  //
  mc.templates.rectangle = {
    src: [
      '<script language="javascript" src="https://ds.advg.jp/adpds_deliver/js/pjs.js"></script>'
    ].join('\n'),
    disp: [
      '<script language="javascript">adpds_js("https://ds.advg.jp/adpds_deliver", "adpds_site=alcad0505&adpds_frame=eow_rectangle");</script>'
    ].join('\n')
  };

  // css 設定
  // --------
  //
  // `mc.addCSS()` でCSSを設定する。
  // ここの css の中では今のところ、`S` はトップレベルのオブジェクトを参照する。
  // ここで設定する以外にも、 eow_XXXXXXX.css に広告に使われているCSSが含まれている。
  //
  mc.css.hotSpot= [
    '#SS_mainColumn {',
      'margin-right: 10px;',
    '}',

    '.SS_words_table {',
     'border-style: none;',
//↓2014.10.01 EOWP-684 デザイン改修
     'width: 100%;',
     'table-layout: fixed;',
    '}',

    '#SS_mainColumn .SS_words_table td {',
//↓2014.10.01 EOWP-684 デザイン改修
//     'width: <%=gS.hotSpot.mainColumn.width%>px;',
    'text-align: center;',
    '}',

    '#SS_rightColumn .SS_words_table td {',
     'width: <%=gS.hotSpot.rightColumn.width%>px;',
    '}',

    '#SS_mainColumn .SS_words_table .td_pad,',
    '#SS_rightColumn .SS_words_table .td_pad {',
     'margin: 0;',
     'padding: 0;',
     'width: 4px;',
    '}',

    '#SS_mainColumn .SS_words_table tr,',
    '#SS_rightColumn .SS_words_table tr {',
     'vertical-align: top;',
    '}',

    '#AD_mainColumn {',
      'margin-right: 10px;',
    '}',

    '#AD_mainColumn table {',
      'border: none;',
    '}',

    '.ss_head {',
      'border-bottom: 1px solid #999999;',
      'padding: 1px;',
      'font-family: Sans-Serif;',
      'font-size: 13px;',
      'color: #333333;',
      'font-weight: bold;',
      'align: left;',
      'vertical-align: middle;',
    '}',

    '#interestMatch .ss_head {',
      'margin-top: 12px;',
    '}',

    '#interestMatch ul {',
      'list-style-type: none;',
    '}',

    '#interestMatch .url_d {',
      'display: block;',
    '}',

    '.ss_head img {',
      'width: 20px;',
      'height: 20px;',
      'margin-right: 5px;',
      'vertical-align: middle;',
    '}',

    /* IE6用 added 100519 */
    '*html .ss_head {',
      'position:relative;',
    '}',

    '.ss_unit {',
      'border-bottom: 1px #999999 solid;',
      'padding: 3px;',
      'font-family: Sans-Serif;',
      'font-size: 14px;',
      'line-height: 160%;',
    '}',
    '#interestMatch .ss_unit {',
      'border: none;',
      'line-height: 140%;',
      'margin: .5em 0;',
      'word-wrap: break-word;',
    '}',

    '.adArea .title {',
      'margin-bottom: 3px;',
      'font-size: 15px;',
      'text-decoration: underline;',
      'color: #0033CC;',
    '}',

    '.adArea .description,',
    '.adArea .description a:link,',
    '.adArea .description a:visited {',
      'margin-bottom: 2px;',
      'text-decoration: none;',
      'color: #222222;',
    '}',

    '.adArea .url_d {',
      'color: #008000;',
    '}',

    '.adArea .url_d a:link,',
    '.adArea .url_d a:visited {',
      'text-decoration: none;',
      'color: #008000;',
    '}',

    'a.hlt {',
      'background-color: #FFFFFF;',
      'text-decoration: none;',
    '}',
    'a.blocklink {',
      'display: block;',
    '}',

    'a.hlt:hover {',
      '/* background-color: #FFFBCC; */',
      '/* background-color: #DDDDFF; */',
      'background-color: #EEEEFF !important;',
      'text-decoration: none;',
    '}',

    'a.hlt:active {',
      '/* background-color: #FFFBCC; */',
      '/* background-color: #DDDDFF; */',
      'background-color: #EEEEFF !important;',
      'text-decoration: none;',
    '}',

    /* HotSpot Words */
    '.ss_unit .title,',
    '#ss_unit .title {',
      'font-weight: bold;',
    '}',
    '#interestMatch .ss_unit .title {',
      'font-weight: normal !important;',
      'font-size: 16px;',
    '}',

    /* for table layout */
    '.ss_unit table a {',
      'width: 100% !important;', /* ie6 */
      'display: block;',
    '}',

    /* for delimiter layout */
    '.ss_unit .hs_words .hs_delim a.hlt {',
      'display: inline !important;',
    '}',
    '.ss_unit .hs_words .hs_delim_red {',
      'color: #900;',
    '}',

    /* for introduce the EOWP */
    '#introduceEowp {',
      'border: 3px solid #EEDD99;',
      'border-radius: 5px;',
      'background-color: #FEFFEE;',
      'margin: 10px 0px 10px 0px;',
      'padding: 10px 10px 8px 10px;',
      'font-family: Arial, "Arial New", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", "メイリオ", Meiryo, Sans-Serif;',
      'font-weight: normal !important;',
      'font-size: 100%;',
      'text-align: center;',
    '}',
    '#con_ex {',
      'margin: 3px 0px 0px 0px;',
      'padding: 2px 10px 2px 10px;',
      'background-color: #FDFDD4;',
    '}',
    '#introduceEowp .intro {',
      'display: block;',
      'margin: 0px 0px 0px 0px;',
    '}',
    '#introduceEowp .eow_result {',
      'display: block;',
      'margin: 2px 0px 0px 0px;',
    '}',
    '#introduceEowp .eowp_result {',
      'display: block;',
      'margin: 0px 0px 0px 0px;',
      'font-size: 120%;',
    '}',
    '#introduceEowp .landing {',
      'display: block;',
      'line-height: 1.5;',
    '}',
    '#introduceEowp .inner {',
      'display: block;',
      'float: inherit;',
    '}',
    '#introduceEowp .detail {',
      'float:right;',
      'position:relative;',
      'bottom:18px;',
      'font-size:90%;',
    '}',
    '#introduceEowp a {',
      'text-decoration:none !important;',
      'color: #0000AA;',
      'font-weight: bold;',
    '}',
    '#introduceEowp a:hover {',
      'color: #FFFFFF;',
      'background-color: #0000CC;',
    '}',
    '#introduceEowp .eowp_result a {',
      'display: block;',
      'font-weight: bold;',
      'text-decoration:none !important;',
      'color: #0000CC;',
    '}',
    '#introduceEowp .eowp_result a:hover {',
      'color: #FFFFFF;',
      'background-color: #0000CC;',
    '}',
    '#introduceEowp .imp {',
      'font-weight: bold;',
      'font-size: 160%;',
      'color: #F50000',
    '}',
    '#introduceEowp .imp_bl {',
     'font-weight: bold;',
      'font-size: 120%;',
    '}'
  ].join('\n');

  // テンプレートのレンダリングを行う
  //
  //     @param {String} templateName Name of template.
  //
  function render() {
    //document.onload で読んでも CSS を反映できない。場当たり的な対処だが、ここでCSSを適用するのが確実なので・・
    mc.addCSS();
    document.write(mc.compile.apply(mc, arguments));
  }


  function ad_info_Fourth() {
		adInfoF = [
			'<script language="javascript" src="https://ds.advg.jp/adpds_deliver/js/pjs.js"></script>',
			'<script language="javascript">adpds_js("https://ds.advg.jp/adpds_deliver", "adpds_site=alcad0505&adpds_frame=eowf_rectangle_adn01");</script>'
		].join('\n');
		document.write(adInfoF);
  }


//広告 右6部分の広告表示
  function info_disp_r() {
//	  adInfoDisp_r = [
//	    '<script language="javascript" src="https://ds.advg.jp/adpds_deliver/js/pjs.js"></script>',
//	    '<script language="javascript">adpds_js("https://ds.advg.jp/adpds_deliver", "adpds_site=alcad0505&adpds_frame=eowf_300_250");</script>'
//	  ].join('\n');
//     document.write(adInfoDisp_r);
  }

//広告 TOP部分の広告表示
    function ad_top_center() {
		document.write('<div style="margin:0 auto; width:625px;">');
			//divの幅(width:294px;height:244px)を-6pxしているのは、表示を見易くする為に入れた線のpx分
			//TOP左広告(自社広告)
			adInfoTopLeft = [
			  '<div style="float:left; margin-bottom: 35px; margin-right: 10px;">',
				  '<a target="_blank" href="https://www.alc.co.jp/app/?utm_source=serpf_rectangle&utm_medium=banner&utm_content=eowappli_300-250_1606.jpg&utm_campaign=EOW_APP&iref=serpｆ_rectangle_eowappli_300_250" >',
					  '<img src="/content/img/eowappli_300-250_1606.jpg">',
				  '</a>',
			  '</div>',
			].join('\n');
     		document.write(adInfoTopLeft);

			document.write('<div style="margin-bottom: 40px; margin-left: 10px;">');
				//TOP右広告
				adInfoTopRight = [
				 '<script language="javascript" src="https://ds.advg.jp/adpds_deliver/js/pjs.js"></script>',
				 '<script language="javascript">adpds_js("https://ds.advg.jp/adpds_deliver", "adpds_site=alcad0505&adpds_frame=eowf_1st_rectangle");</script>'
				].join('\n');
	     		document.write(adInfoTopRight);
			document.write('</div>');
		document.write('</div>');
  }

  //広告 TOP部分の広告表示
    function north_banner() {
		document.write('<script language="javascript">adpds_js("https://ds.advg.jp/adpds_deliver", "adpds_site=alcad0505&adpds_frame=eowf_top_superbanner_adn01");</script>');
    }

  //広告 検索結果 右 上から２番目
    function rectangle() {
				adInfoRectanglet = [
					'<script language="javascript" src="https://ds.advg.jp/adpds_deliver/js/pjs.js"></script>',
					'<script language="javascript">adpds_js("https://ds.advg.jp/adpds_deliver", "adpds_site=alcad0505&adpds_frame=eowf_1st_rectangle");</script>'
				].join('\n');
	     		document.write(adInfoRectanglet);
    }

  //広告 検索結果 右 上から５番目
    function spd_disp_r() {
				adInfoSpd_disp_r = [
				  '<script language="javascript" src="https://ds.advg.jp/adpds_deliver/js/pjs.js"></script>',
				  '<script language="javascript">adpds_js("https://ds.advg.jp/adpds_deliver", "adpds_site=alcad0505&adpds_frame=eowf_300_250");</script>'
				].join('\n');
	     		document.write(adInfoSpd_disp_r);
    }


  // グローバルへエクスポート
  //
  // TODO: HTML の関数コールの箇所を修正する
  //
  global.hs_disp = function() {
		adInfoHs_disp = [
			'<script language="javascript" src="https://ds.advg.jp/adpds_deliver/js/pjs.js"></script>',
			'<script language="javascript">adpds_js("https://ds.advg.jp/adpds_deliver", "adpds_site=alcad0505&adpds_frame=eowf_footerbanner_adn01");</script>'
		].join('\n');
   		document.write(adInfoHs_disp);
  };

  global.hs_left_disp = function() {
		adInfoHsLeft_disp = [
			'<script language="javascript" src="https://ds.advg.jp/adpds_deliver/js/pjs.js"></script>',
			'<script language="javascript">adpds_js("https://ds.advg.jp/adpds_deliver", "adpds_site=alcad0505&adpds_frame=eowf_footerbanner_adn02");</script>'
		].join('\n');
   		document.write(adInfoHsLeft_disp);
  };

  global.ov_cmhs = function() {
		adInfoOv_cmhs = [
			'<script language="javascript" src="https://ds.advg.jp/adpds_deliver/js/pjs.js"></script>',
			'<script language="javascript">adpds_js("https://ds.advg.jp/adpds_deliver", "adpds_site=alcad0505&adpds_frame=eowf_rectangle_adn02");</script>'
		].join('\n');
   		document.write(adInfoOv_cmhs);
  };
  global.spd_disp_m = function() { render('mainColumn');  };
  global.spd_disp_z = function() { render('zeroMatchAd'); };
  global.infospace = function() { render('infospace'); };

//  global.rectangle = function() {render('rectangle.disp'); };
//  global.rectangle_src = function() {render('rectangle.src'); };


  //広告表示 mc.jsファイル内で広告を表示
  global.spd_disp_r = function() {spd_disp_r(); };
  global.rectangle = function() {rectangle(); };
  global.north_banner = function() { north_banner(); };
  global.ad_info_Fourth = function() { ad_info_Fourth(); }; //右４の広告
  global.info_disp_r = function() { info_disp_r(); };       //右６の広告
  global.ad_top_center = function() { ad_top_center(); };   //TOP部分の広告
  global.ad_superbanner = function() {
		adInfoAd_superbannert = [
		  '<script language="javascript" src="https://ds.advg.jp/adpds_deliver/js/pjs.js"></script>',
		  '<script language="javascript">adpds_js("https://ds.advg.jp/adpds_deliver", "adpds_site=alcad0505&adpds_frame=eowf_serp_superbanner_adn01");</script>'
		].join('\n');
   		document.write(adInfoAd_superbannert);
   };   //スーパーバナー

  global.ad_zeroMatch = function() {                         //0件時に出力される広告
		adZeroMatch = [
			'<script language="javascript" src="https://ds.advg.jp/adpds_deliver/js/pjs.js"></script>',
			'<script language="javascript">adpds_js("https://ds.advg.jp/adpds_deliver", "adpds_site=alcad0505&adpds_frame=eowf_error_300_250");</script>'
		].join('\n');
   		document.write(adZeroMatch);
  };
  global.ad_top_count = function() {                        //TOP部分のカウンター(EOWF)
		adInfoAd_top_count = [
		  '<script language="javascript" src="https://ds.advg.jp/adpds_deliver/js/pjs.js"></script>',
		  '<script language="javascript">adpds_js("https://ds.advg.jp/adpds_deliver", "adpds_site=alcad0505&adpds_frame=eowf_top_pv");</script>'
		].join('\n');
   		document.write(adInfoAd_top_count);
  };
  global.ad_top_count_eowpf = function() {                        //TOP部分のカウンター(EOWPF)
		adInfoAd_top_count_eowpf = [
		  '<script language="javascript" src="https://ds.advg.jp/adpds_deliver/js/pjs.js"></script>',
		  '<script language="javascript">adpds_js("https://ds.advg.jp/adpds_deliver", "adpds_site=alcad0505&adpds_frame=eowpf_top_pv");</script>'
		].join('\n');
   		document.write(adInfoAd_top_count_eowpf);
  };


  global.ad_serp_count = function() {                        //SERP部分のカウンター(EOWF)
		adInfoAd_serp_count = [
		  '<script language="javascript" src="https://ds.advg.jp/adpds_deliver/js/pjs.js"></script>',
		  '<script language="javascript">adpds_js("https://ds.advg.jp/adpds_deliver", "adpds_site=alcad0505&adpds_frame=eowf_serp_pv");</script>'
		].join('\n');
   		document.write(adInfoAd_serp_count);
  };
  global.ad_serp_count_eowpf = function() {                        //SERP部分のカウンター(EOWPF)
		adInfoAd_serp_count_eowpf = [
		  '<script language="javascript" src="https://ds.advg.jp/adpds_deliver/js/pjs.js"></script>',
		  '<script language="javascript">adpds_js("https://ds.advg.jp/adpds_deliver", "adpds_site=alcad0505&adpds_frame=eowpf_serp_pv");</script>'
		].join('\n');
   		document.write(adInfoAd_serp_count_eowpf);
  };




  // ここからは別管理となります
  //
  // 以下のものに依存:
  //
  // `allReplace`(Function)
  // : in eow_search.js
  //
  // `CONTEXT_PATH`(String)
  // : in HTML
  //

  // スポンサーサイト検索用
  function goSSS1() {
	  var a = goSSS1.arguments,
	  obj = "",
	  wname = "",
    layout = mc.settings.hotSpot.serpCols;

	  if (a.length > 0) {
		  obj = a[0];
	  }
	  var ck = document.forms[obj].q.value;
	  if (!ck) {
		  alert("検索語が入力されていません");
		  return false;
	  }
	  ck = allReplace(ck, " ", "");
	  ck = allReplace(ck, "　", "");
	  if (!ck) {
		  alert("検索語が入力されていません");
		  return false;
	  }
	  document.location.href = CONTEXT_PATH + "eow/ss/?q=" + encodeURIComponent(document.forms[obj].q.value) + "&col=" + layout;
  }
  // Enter
  function goSSS2() {
	  var a = goSSS2.arguments;
	  var obj = "";
	  if (a.length > 0) {
		  obj = a[0];

		  if (obj !== "") {
			  goSSS1(obj);
		  }
		  return false;
	  }
  }
  // Paging
  function goSSSPaging(param) {
	  document.location.href = CONTEXT_PATH + "eow/ss/?" + param;
	  return false;
  }
  global.goSSS1 = goSSS1;
  global.goSSS2 = goSSS2;
  global.goSSSPaging = goSSSPaging;

}(window));

// もしHTMLで定義されなかった場合に備えて定義しておく
window.CONTEXT_PATH = 'https://eow.alc.co.jp/';

// IEで配列のindexOfが使用できないため
if(!Array.indexOf){
  Array.prototype.indexOf = function(target){
    for(var i = 0; i < this.length; i++){
      if(this[i] === target){
        return i;
      }
    }
    return -1;
  }
}
