/* extracts listing elements from array */
/* works with oj cm2 */

function cm_disp(n) {
	var v01 = '<a href="';
	var v02 = '" class="hlt" target="_blank"><div id="ss_unit"><div class="title">';
	var v03 = '</div><div class="description">';
	var v04 = '</div><div class="url_d">';
	var v05 = '</div></div></a>';
	/* 取得できた配列の要素数からリスティング数を確認（ダミーリスティングを除外） */
	var aln = zSr.length/6 - 1;
	/* 取得できたリスティング数（aln）が、指定された表示本数（n）に満たない場合、取得できたりスティング数を表示本数とする */
	if (aln < n) {
		n = aln;
	};
	/* 既定の回数ループを実行し、リスティングを表示 */
	for (i = 1; i < n + 1; i++) {
		m = i * 6;
		if ((zSr[m]) || (zSr[m] != '')) {
			document.write(v01 + zSr[m + 2]+ v02 + zSr[m + 3] + v03 + zSr[m] + v04 + zSr[m + 4] + v05);
		};
	};
};
