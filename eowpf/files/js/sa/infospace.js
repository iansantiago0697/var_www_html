function infospace() {
	var lnlist_src;
	var lnlist_prb;
	// クリエイティブの HTML ソースコード
	lnlist_src = new Array();
	// ▼▼▼ 1日はEOWPの日バージョン：1日のみ ▼▼▼
	lnlist_src[0] = '<a href="https://home.alc.co.jp/db/owa/sp_sacd_redir_pt?code=c_eow_info_55" target="_blank"><img src="/content/js/sa/img/eowp_300_120_55_1.png" width="300" height="120" border="0" alt="英辞郎 on the WEB Pro"></a>';
	// ▼▼▼ 1日はEOWPの日バージョン2：1日のみ ▼▼▼
	lnlist_src[1] = '<a href="https://home.alc.co.jp/db/owa/sp_sacd_redir_pt?code=c_eow_info_55_2" target="_blank"><img src="/content/js/sa/img/eowp_300_120_55_2.png" width="300" height="120" border="0" alt="英辞郎 on the WEB Pro"></a>';
	// ▼▼▼ EOWP早めに申し込めばお得バージョン：2〜10日頃 ▼▼▼
	lnlist_src[2] = '<a href="https://home.alc.co.jp/db/owa/sp_sacd_redir_pt?code=c_eow_info_56" target="_blank"><img src="/content/js/sa/img/eowp_300_120_56_3.png" width="300" height="120" border="0" alt="英辞郎 on the WEB Pro"></a>';
	// ▼▼▼ EOWP早めに申し込めばお得バージョン：2〜10日頃 ▼▼▼
	lnlist_src[3] = '<a href="https://home.alc.co.jp/db/owa/sp_sacd_redir_pt?code=c_eow_info_56_2" target="_blank"><img src="/content/js/sa/img/eowp_300_120_56_5.png" width="300" height="120" border="0" alt="英辞郎 on the WEB Pro"></a>';
	// ▼▼▼ EOWP通常バージョン1：2以降月末まで ▼▼▼
	lnlist_src[4] = '<a href="https://home.alc.co.jp/db/owa/sp_sacd_redir_pt?code=c_eow_info_60" target="_blank"><img src="/content/js/sa/img/eowp_300_120_60.png" width="300" height="120" border="0" alt="英辞郎 on the WEB Pro"></a>';
	// ▼▼▼ EOWP通常バージョン3：1日以外20% ▼▼▼
	lnlist_src[5] = '<a href="https://home.alc.co.jp/db/owa/sp_sacd_redir_pt?code=c_eow_info_60_2" target="_blank"><img src="/content/js/sa/img/eowp_300_120_60_2.png" width="300" height="120" border="0" alt="英辞郎 on the WEB Pro"></a>';
	// ▼▼▼ EOWP年額コース：10日〜月末20% ▼▼▼
	lnlist_src[6] = '<a href="https://home.alc.co.jp/db/owa/sp_sacd_redir_pt?code=c_eow_info_61" target="_blank"><img src="/content/js/sa/img/eowp_300_120_61.png" width="300" height="120" border="0" alt="英辞郎 on the WEB Pro"></a>';
	// ▼▼▼ EOWP年額コース：10日〜月末20% ▼▼▼
	lnlist_src[7] = '<a href="https://home.alc.co.jp/db/owa/sp_sacd_redir_pt?code=s_eow_info_61_2" target="_blank"><img src="/content/js/sa/img/eowp_300_120_61_2.png" width="300" height="120" border="0" alt="英辞郎 on the WEB Pro"></a>';
	// ▼▼▼ バーチャル英会話：1日以外20% ▼▼▼
	lnlist_src[8] = '<a href="https://home.alc.co.jp/db/owa/sp_sacd_redir_pt?code=s_eow_info_54" target="_blank"><img src="/content/js/sa/img/130415_veo54.gif" width="300" height="120" border="0" alt="バーチャル英会話教室"></a>';

	// クリエイティブの表示確率（%）：総和が 100 になるように
	lnlist_prb = new Array();
	lnlist_prb[0] = 0;
	lnlist_prb[1] = 0;
	lnlist_prb[2] = 0;
	lnlist_prb[3] = 0;
	lnlist_prb[4] = 20;
	lnlist_prb[5] = 20;
	lnlist_prb[6] = 20;
	lnlist_prb[7] = 20;
	lnlist_prb[8] = 20;
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
