function infospace() {
	var lnlist_src;
	var lnlist_prb;
	// クリエイティブの HTML ソースコード
	lnlist_src = new Array();
	 // ▼▼▼ 申込月無料 ▼▼▼
	lnlist_src[0] = '<a href="//eowp.alc.co.jp/info2/?utm_source=setting&utm_medium=infospace&utm_campaign=free" target="_blank"><img src="/content/js/sa/img/newbanner1.jpg" border="0" alt="英辞郎 on the WEB Pro"></a>';
	// ▼▼▼ 例文数が無料版の4倍 ▼▼▼
	lnlist_src[1] = '<a href="//eowp.alc.co.jp/info2/?utm_source=setting&utm_medium=infospace&utm_campaign=sentence" target="_blank"><img src="/content/js/sa/img/newbanner2.jpg" border="0" alt="英辞郎 on the WEB Pro"></a>';
	// ▼▼▼ 毎月1日はEOWPの日 ▼▼▼
	lnlist_src[2] = '<a href="//eowp.alc.co.jp/info2/?utm_source=setting&utm_medium=infospace&utm_campaign=1st" target="_blank"><img src="/content/js/sa/img/newbanner3.jpg" border="0" alt="英辞郎 on the WEB Pro"></a>';
	// ▼▼▼ 年額コースに切り替えませんか ▼▼▼
	lnlist_src[3] = '<a href="//eowp.alc.co.jp/info-nen/?utm_source=setting&utm_medium=infospace&utm_campaign=nen01" target="_blank"><img src="/content/js/sa/img/newbanner4.jpg" border="0" alt="英辞郎 on the WEB Pro"></a>';
	// ▼▼▼ 利用者の89％が実感 ▼▼▼
	lnlist_src[4] = '<a href="//eowp.alc.co.jp/info2/?utm_source=setting&utm_medium=infospace&utm_campaign=work" target="_blank"><img src="/content/js/sa/img/newbanner5.jpg" border="0" alt="英辞郎 on the WEB Pro"></a>';


	// クリエイティブの表示確率（%）：総和が 100 になるように
	lnlist_prb = new Array();
	lnlist_prb[0] = 20;
	lnlist_prb[1] = 20;
	lnlist_prb[2] = 20;
	lnlist_prb[3] = 20;
	lnlist_prb[4] = 20;
	// NO CHANGE：各配列要素の確率合算値（乱数の最大値設定）
	var p = 0;
	for (i = 0; i < lnlist_src.length; i++) {
		p = p + lnlist_prb[i];
	};
	// NO CHANGE：表示確率の母数のチェック
	if (lnlist_src.length != lnlist_prb.length) {
		alert('src-prb error');
	};
	if (p > 100) {
		alert('prb error!');
	};
	// NO CHANGE：BREAK ポイントの初期化乱数の生成
	var m = 0;
	var n = Math.floor(Math.random() * p);
	// NO CHANGE：m -> BREAK ポイント
	for (i = 0; i < lnlist_src.length; i++) {
		m = m + lnlist_prb[i];
		if (n < m) {
			document.write(lnlist_src[i]);
//			alert(lnlist_prb + ' : ' + n + ' - ' + m + ' - ' + i);
			break;
		};
	};
};
