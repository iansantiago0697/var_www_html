// social bookmark icons: yahoo/google/hatena/delicious/livedoor/buzzurl

// --- for ie favs only ---
function ieAddFav() {
	window.external.addFavorite(p_url, p_title);
};
// --- for ie favs only ---

var p_url = document.URL;
var p_title = document.title;
var p_title_length = p_title.length;
var p_url_enc = encodeURIComponent(p_url);
var p_title_enc = encodeURIComponent(p_title);
var p_title_m_enc = encodeURIComponent(p_title.substring(0,p_title_length-22)) + '%20' ;

			// for IE Favorites
			var bk_ie = '<a href="javascript:ieAddFav();" title="お気に入りに登録する"><img src="http://eowimg.alc.co.jp/content/js/ie.png" width="16" height="16" alt="お気に入りに登録する" style="border-style:none; margin-left: 3px;" /></a>';

// for Yahoo! Bookmarks
var bk_yahoo = '<a href="http://bookmarks.yahoo.co.jp/action/bookmark?t=' + p_title_enc + '&amp;u=' + p_url_enc + '" target="_blank"><img src="http://i.yimg.jp/images/sicons/ybm16.gif" width="16" height="16" alt="Yahoo!ブックマークに登録" style="border-style:none; margin-left: 3px;" /></a>';

// for Google Bookmarks
var bk_google = '<a href="http://www.google.co.jp/bookmarks/mark?op=edit&bkmk=' + p_url_enc + '%2f&title=' + p_title_enc + '" target="_blank" title="Google ブックマークに登録する" style="text-decoration:none;"><img src="http://www.google.co.jp/favicon.ico" width="16" height="16" alt="Google ブックマークに登録する" style="border-style:none; margin-left: 2px;" /></a>';

// for Hatena Bookmark
var bk_hatena = '<a href="http://b.hatena.ne.jp/append?' + p_url + '" target="_blank" title="はてなブックマークに登録する" style="text-decoration:none;"><img src="http://b.hatena.ne.jp/images/append.gif" width="16" height="12" alt="はてなブックマークに登録する" style="border-style:none; margin-left: 2px;" /></a>';

// for delicious
var bk_delicious = '<a href="javascript:location.href=\'http://delicious.com/post?url=' + encodeURIComponent(p_url) + '&title=' + encodeURIComponent(p_title) + '\';" target="_blank" title="delicious に登録する" style="text-decoration:none;"><img src="http://delicious.com/static/img/delicious.small.gif" width="16" height="16" alt="delicious に登録する" style="border-style:none; margin-left: 2px;" /></a>';

// for Livedoor Clip
var bk_livedoor = '<a href="http://clip.livedoor.com/clip/add?link=' + p_url + '&title=' + p_title + '&jump=myclip" target="_blank" title="livedoor clip に登録する" style="text-decoration:none;"><img src="http://parts.blog.livedoor.jp/img/cmn/clip_16_16_b.gif" width="16" height="16" alt="livedoor clip に登録する" style="border-style:none; margin-left: 2px;" /></a>';

// for Buzzurl
var bk_buzzurl = '<a href="http://buzzurl.jp/entry/' + p_url+ '" target="_blank" title="Buzzurl に登録する" style="text-decoration:none;"><img src="http://buzzurl.jp/static/image/api/icon/add_icon_mini_08.gif" width="16" height="16" alt="Buzzurl に登録する" style="border-style:none; margin-left: 2px;" /></a>';

// for bit.ly
// wait until page is loaded to call API
BitlyClient.addPageLoadEvent(function(){
	BitlyCB.myShortenCallback = function(data) {
	// this is how to get a result of shortening a single url
		var result;
		for (var r in data.results) {
			result = data.results[r];
			result['longUrl'] = r;
			break;
		}
		document.getElementById("twitter").innerHTML = "<a href=\"http://twitter.com/home?status=%e3%80%8a%e8%8b%b1%e8%be%9e%e9%83%8e%20on%20the%20WEB%e3%80%8b" + p_title_m_enc + encodeURIComponent(result['shortUrl']) + "%20%ef%bc%88%20%2e%40eow_alc%ef%bc%89\" style=\"text-decoration:none;\" target=\"_blank\" title=\"この記事を Twitter でみんなに教える\"><img src=\"http://eowimg.alc.co.jp/content/img/icon_twitter.png\" width=\"16\" height=\"16\" border=\"0\" alt=\"この記事を Twitter でみんなに教える\"></a>";
	}
	p_url_tw = document.location + '?ref=tw';
	BitlyClient.shorten(p_url_tw, 'BitlyCB.myShortenCallback');
});
// for Twitter
var bk_twitter = '';

// memo（「このページをブックマークする」の文言の表示・非表示の切り替え）
// var memo = '';
var memo = '<span style="color:#666666; font-size:9pt;">このページをブックマークする：</span>';
var twimemo = '<span style="color:#666666; font-size:9pt;">このページを Twitter でみんなに教える：</span>';

// a -> 配置位置：'l' = 左, 'c' = 中央, r = 右, (null) = 指定なし
function bookmarks(a) {
	var isMSIE = /*@cc_on!@*/false;
	if (isMSIE) {
		bks = bk_ie + bk_yahoo + bk_google + bk_hatena + bk_delicious + bk_livedoor + bk_buzzurl;
	} else {
		bks = bk_yahoo + bk_google + bk_hatena + bk_delicious + bk_livedoor + bk_buzzurl;
	};
	if (a == 'l') {
		a = 'left';
	} else if (a == 'c') {
		a = 'center';
	} else if (a == 'r') {
		a = 'right';
	};
	if (!a) {
		document.write(memo + bks);
	} else {
		document.write('<div align="' + a+ '">' + memo + bks + '&nbsp;&nbsp;' + twimemo + '<span id="twitter"></span>' +'</div>');
	};
};
