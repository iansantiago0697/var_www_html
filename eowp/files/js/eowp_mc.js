//
// **英辞郎 on the WEB Pro** の広告運用用スクリプト
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
  // * **ログイン画面でのインフォーメーション**: `inforspace`
  //
  var mc = new SaCoT({ categoryDepth: 1});

  // ヘルパー関数の拡張  
  // -----------------
  // SaCoTにデフォルトで用意されているもの以外のヘルパー関数を作成
  
  // デザイン用画像のURLを取得
  //
  // `window.IMG_URI` が正しく設定されているときはその値を基準にURLを返す。
  // 正しく設定されていないときはURIの値を良きに計らって返す。
  // Opera で `window.IMG_URI` が空文字列となり、EOWP のトップ階層に画像のリクエスト(404となる)
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
      baseUrl = document.location.protocol + '//eowp.alc.co.jp/content/img/';
    }
    return baseUrl + fileName;
  };

  // ドメインまでのURL(Context Path)を取得
  //
  //     @return {String} URL
  //
  mc.helpers.getContextPath = function mc_getContextPath() {
    return window.CONTEXT_PATH ? window.CONTEXT_PATH : document.location.protocol + '//eowp.alc.co.jp/';
  };

  //
  // ### informationの設定
  //
  mc.settings.inforspace = {
    // informationの出現頻度設定
    weights: [
        1 /*"キャンペーン"*/
       ,0 /*ダミー１*/
    ]
  };

  // 
  // ### information内容の設定
  //
  mc.contents.inforspace = {
    banners: [{
      keywords: '年額コースなら<br />1カ月分お得!',
      url: 'https://home.alc.co.jp/db/owa/sp_sacd_redir_pt?code=c_eowp_login_02'
    },{
      keywords: 'ダミー１：出力するメッセージをここに記述します。',
      url: 'https://home.alc.co.jp/db/owa/sp_sacd_redir_pt?code=c_eowp_login_02'
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

  //
  // ### information template
  //
  mc.templates.inforspace = [
    '<% var bnr = H.selectOneByWeights(C.banners, S.weights);%>',
    '<div id="login_info">',
        '<a href="<%=bnr.url%>" target="_blank">',
            '<strong><%=bnr.keywords%></strong>',
        '</a>',
    '</div>'
  ].join('\n');

  //
  // ### remark template
  //
  mc.templates.remark = [
    '<div class="remark">',
        '<a href="https://shop.alc.co.jp/spg/cart/renewpass/form/-/" target="_blank">パスワードをお忘れの方はこちら</a><br />',
        '<hr style="margin:10px 0px;">',
        '<% if(window.name == "eowpapp" || window.name == "eowpapp_opt"){ %>',
                '<a href="https://home.alc.co.jp/db/owa/sp_sacd_redir_pt?code=o_eowp_ch_login_01" target="_blank" title="「英辞郎 on the WEB Pro」情報ページへ">「英辞郎 on the WEB Pro」とは？ </a><br />',
        '<% }else{ %>',
                '<a href="https://home.alc.co.jp/db/owa/sp_sacd_redir_pt?code=o_eowp_login_01" target="_blank" title="「英辞郎 on the WEB Pro」情報ページへ\">「英辞郎 on the WEB Pro」とは？ </a><br />',
        '<% } %>',
    '</div>'
  ].join('\n');

  // css 設定
  // --------
  //
  // `mc.addCSS()` でCSSを設定する。
  // ここで設定する以外にも、 eowp.css に広告に使われているCSSが含まれている。
  //      
  mc.css.inforspace= [
    '#login_info {',
        'display: block;',
        'float: right;',
        'margin: 10px 0px 5px 0px;',
        'width: 35%;',
        'border: outset #dfdddd;',
        'text-align: center;',
        'background-color: #eeeeee;',
        'font-size: 90%',
    '}',
    '#login_info a {',
        'display: block;',
    '}',
    '#login_info a:hover {',
        'background-color: #f8f8f8;',
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

  // グローバルへエクスポート
  //
  // TODO: HTML の関数コールの箇所を修正する
  //
  global.inforspace = function() {
    render('inforspace');
  };
  global.remark = function() {
    render('remark');
  };
}(window));

// もしHTMLで定義されなかった場合に備えて定義しておく
window.CONTEXT_PATH = document.location.protocol + '//eowp.alc.co.jp/';
