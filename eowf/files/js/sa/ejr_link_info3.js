function ejr_link_info() {
	var lnlist_src;
	var lnlist_prb;
	// �N���G�C�e�B�u�� HTML �\�[�X�R�[�h
	lnlist_src = new Array();
	// �������p���Y�F40% ������
	lnlist_src[0] = '<a href="https://bit.ly/cckxt7" target="_blank"><img src="https://eowimg.alc.co.jp/content/js/sa/img/100203_eow_kwcol.gif" width="198" border="0" alt="����E�p�x�W�v�@�\�����J"></a>';
	// ������ �I�����C���V���b�v�F20%������
	lnlist_src[1] = '<a href="https://home.alc.co.jp/db/owa/sp_sacd_redir_pt?code=s_eow_info_15" target="_blank"><img src="https://eowimg.alc.co.jp/content/js/sa/img/100323_oshop_hmcp.gif" width="198" border="0" alt="�V���E�X�a���L�O HM�L�����y�[��"></a>';
	// ������ SA�F20% ������
	lnlist_src[2] = '<a href="https://home.alc.co.jp/db/owa/sp_sacd_redir_pt?code=o_eow_content_05" target="_blank"><img src="https://eowimg.alc.co.jp/content/js/sa/img/100330_sa_med_kiku.gif" width="198" border="0" alt="�L�N�^�����f�B�J�����ւ��`�����c���N�C�Y�F�X�y�[�X�A���N"></a>';
	// ������ SA�i�����|��R���e�X�g�j�F20% ������
	lnlist_src[3] = '<a href="https://bit.ly/av16xo" target="_blank"><img src="https://eowimg.alc.co.jp/content/js/sa/img/100323_sa_jimakon.gif" width="198" border="0" alt="�ڎw���I TOEIC800�_�U�����L�F�X�y�[�X�A���N"></a>';

	// �N���G�C�e�B�u�̕\���m���i%�j�F���a�� 100 �ɂȂ�悤��
	lnlist_prb = new Array();
	lnlist_prb[0] = 40;
	lnlist_prb[1] = 20;
	lnlist_prb[2] = 20;
	lnlist_prb[3] = 20;
	// NO CHANGE�F�e�z��v�f�̊m�����Z�l�i�����̍ő�l�ݒ�j
	var p = 0;
	for (i = 0; i < lnlist_src.length; i++) {
		p = p + lnlist_prb[i];
	};
	// NO CHANGE�F�\���m���̕ꐔ�̃`�F�b�N
	if (lnlist_src.length != lnlist_prb.length) {
		alert('src-prb error');
	};
	if (p > 100) {
		alert('prb error!');
	};
	// NO CHANGE�FBREAK �|�C���g�̏����������̐���
	var m = 0;
	var n = Math.floor(Math.random() * p);
	// NO CHANGE�Fm -> BREAK �|�C���g
	for (i = 0; i < lnlist_src.length; i++) {
		m = m + lnlist_prb[i];
		if (n < m) {
			document.write(lnlist_src[i]);
//			alert(lnlist_prb + ' : ' + n + ' - ' + m + ' - ' + i);
			break;
		};
	};
};
