function infospace() {
	var lnlist_src;
	var lnlist_prb;
	// クリエイティブの HTML ソースコード
	lnlist_src = new Array();
	// ▼ EOWP誘導1
	lnlist_src[0] = '<a href="https://eowp.alc.co.jp/info2/?utm_source=serp_sp&utm_medium=infospace&utm_campaign=eowp_sp_06" target="_blank"><img src="' + eowConfig.resourceUrl + 'images/eowp_sp_06.png" border="0" alt="無料版の約7倍、94万件の例文"></a>';
	// ▼ EOWP誘導2
	lnlist_src[1] = '<a href="https://eowp.alc.co.jp/info2/?utm_source=serp_sp&utm_medium=infospace&utm_campaign=eowp_sp_05" target="_blank"><img src="' + eowConfig.resourceUrl + 'images/eowp_sp_05.png" border="0" alt="89%のユーザーが仕事効率化を実感"></a>';
	// ▼ EOWP誘導年額
	lnlist_src[2] = '<a href="https://eowp.alc.co.jp/info-nen/?utm_source=serp_sp&utm_medium=infospace&utm_campaign=year" target="_blank"><img src="' + eowConfig.resourceUrl + 'images/eowp_sp_07.png" border="0" alt="年額コースなら1カ月分お得！英辞郎 on the WEB Pro"></a>';
	// ▼ アルクのスマートフォンアプリ
	lnlist_src[3] = '<a href="https://amzn.to/1HStCav" target="_blank"><img src="' + eowConfig.resourceUrl + 'images/20150430-0507_EOWSerp_KyukyokuMoshi.png" border="0" alt="[音声DL付]TOEIC(R)テスト 究極の模試600問 究極シリーズ [Kindle版]"></a>';

	// クリエイティブの表示確率（%）：総和が 100 になるように
	lnlist_prb = new Array();
	lnlist_prb[0] = 25;
	lnlist_prb[1] = 25;
	lnlist_prb[2] = 25;
	lnlist_prb[3] = 25;
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
