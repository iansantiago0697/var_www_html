function ejr_link_info() {
	var lnlist_src;
	var lnlist_prb;
	// クリエイティブの HTML ソースコード
	lnlist_src = new Array();
	// ▼▼▼英辞郎：40% ▼▼▼
	lnlist_src[0] = '<a href="https://bit.ly/cckxt7" target="_blank"><img src="https://eowimg.alc.co.jp/content/js/sa/img/100203_eow_kwcol.gif" width="198" border="0" alt="整列・頻度集計機能β公開"></a>';
	// ▼▼▼ オンラインショップ：20%▼▼▼
	lnlist_src[1] = '<a href="https://home.alc.co.jp/db/owa/sp_sacd_redir_pt?code=s_eow_info_15" target="_blank"><img src="https://eowimg.alc.co.jp/content/js/sa/img/100323_oshop_hmcp.gif" width="198" border="0" alt="シリウス誕生記念 HMキャンペーン"></a>';
	// ▼▼▼ SA：20% ▼▼▼
	lnlist_src[2] = '<a href="https://home.alc.co.jp/db/owa/sp_sacd_redir_pt?code=o_eow_content_05" target="_blank"><img src="https://eowimg.alc.co.jp/content/js/sa/img/100330_sa_med_kiku.gif" width="198" border="0" alt="キクタンメディカル日替わりチャンツ＆クイズ：スペースアルク"></a>';
	// ▼▼▼ SA（字幕翻訳コンテスト）：20% ▼▼▼
	lnlist_src[3] = '<a href="https://bit.ly/av16xo" target="_blank"><img src="https://eowimg.alc.co.jp/content/js/sa/img/100323_sa_jimakon.gif" width="198" border="0" alt="目指せ！ TOEIC800点攻略日記：スペースアルク"></a>';

	// クリエイティブの表示確率（%）：総和が 100 になるように
	lnlist_prb = new Array();
	lnlist_prb[0] = 40;
	lnlist_prb[1] = 20;
	lnlist_prb[2] = 20;
	lnlist_prb[3] = 20;
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
