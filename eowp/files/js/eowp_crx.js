//CRXR: 拡張機能おすすめ用モジュール
//
//処理の流れ(拡張機能がインストールされている時)
//	1. 500ms 後におすすめを表示する関数起動する処理をセット
//	2. iframe で拡張機能の html を表示
//	3. 拡張機能のhtml中でeowpと同じドメインにあるhtmlをiframeで表示し、そのhtml中からおすすめ表示をキャンセル
//
//処理の流れ(拡張機能がインストールされていない時)
//	1. 500ms 後におすすめを表示する関数起動する処理をセット
//	2. iframe で拡張機能の html を表示 → 失敗しおすすめ表示はキャンセルされない
//	3. おすすめを表示する関数が起動し、おすすめが表示される
//
var CRXR = (function() {
	var showDelay = 1500, //表示するまでの待ち時間(ms)
		hideButton = false, //閉じるボタンを表示するかどうか
		cookie = 'ncrxr=1', //No CRX Recommend 1:表示しない
		cookieDomain = 'eowp.alc.co.jp', //Cookieを保存するドメイン
		cookieExpires = 100*365*24*60*60*1000, //Cookieの有効期限(ms)
		dateSetShow, dateCancel,

		CrxRecommend = function() { //表示用
			var recommendText = 'Google Chrome 拡張機能と連携してご利用いただけます！',
				recommendLink = {
					text: '拡張機能のインストールはこちらから',
					href: 'https://eowp.alc.co.jp/gotoProm.html?type=chrome_extension'
				},
				hideButtonText = '×',
				id = {
					container: 'eow-crx-recommend'
				},
				className = {
					text: 'eow-crx-recommend-text',
					link: 'eow-crx-recommend-link',
					hideButton: 'eow-crx-recommend-hide'
				},
				template = '<span class=' + className.text + '>' + recommendText + '</span>' +
					'<div class=' + className.link + '><a href=' + recommendLink.href + ' target=\'_blank\'>' + recommendLink.text+ '</a></div>' +
					'<span class=' + className.hideButton + '>' + hideButtonText + '</span>',

				container = (function() {
					c = document.createElement('div');
					c.id = id.container;
					c.innerHTML = template;
					//	c = document.getElementById(id.container);
					return c;
				}()),
				hideButton = container.getElementsByClassName(className.hideButton)[0],

				parentElement =	document.getElementById('maincontentsmall'),
				showBeforeElement = document.getElementById('top');

			this.show = function show() {
				console.log('Show CRX Recommend div');
				parentElement.insertBefore(container, showBeforeElement);
			};
			this.hide = function hide() {
				parentElement.removeChild(container);
			};

			hideButton.addEventListener('click', this.hide, false);

			this.hideButton = hideButton;
		};

	function setCookie() {
		var c = [
		cookie,
		//リリース時に置き換え
		'expires=' + (new Date(Date.now() + cookieExpires)).toGMTString(),
		'domain=' + cookieDomain
		];
		document.cookie = c.join('; ');
	}
	function isCookieSet() {
		return !(document.cookie.indexOf(cookie) === -1);
	}

	var cr, crTimer; //cr: CrxRecommend オブジェクト

	function setShowing() {
		dateSetShow = Date.now();
		console.log('Set CRX Recommend, Recommend will show up after: ', showDelay, 'ms');
		crTimer = setTimeout(function(){
			//↑このタイマーを孫iframeから解除することで拡張のおすすめ表示をストップするという仕組み
			if(isCookieSet()) {
				console.log('Cookie is set, Don\'t Show CRX Recommend.');
				return;
			}
			cr = new CrxRecommend();
			if(hideButton) {
				cr.hideButton.addEventListener('click', setCookie);
			} else {
				cr.hideButton.style.display = 'none';
			}
			cr.show();
		}, showDelay);
	}
	function cancelShowing() {
		dateCancel = Date.now();
		console.log('CRX Recommend Canceled, TimerID: ', crTimer,
				'delay: ', dateCancel - dateSetShow, 'ms');
		clearTimeout(crTimer);
	}
	function hide() {
		if(cr) cr.hide();
	}
	//Public
	return {
		setShowing: setShowing,
		cancelShowing: cancelShowing,
		hide: hide
	};
}());

CRXR.setShowing();

// onloadで呼ばれる
// iframeのsrc設定
function js_eowp_chrome(){
	var obj=document.getElementById('ifm_crx');
	if(obj){
		obj.setAttribute("src","chrome-extension://oonalfdoahlmjaoloddjenihohbfodme/iframe_chrome_crx_recommend_cancel.html");
	}
}

