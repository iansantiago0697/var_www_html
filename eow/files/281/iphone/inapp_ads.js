// アイテムを増やす場合は、item[（数字）] の行を追加する
// （数字）の部分は、先頭から 0 で始まり、増分 1 の刻みで（欠番は許されない）
// 各配列要素の new Array に続く (　　) 内には、シングルクォーテーションで囲んだ文字列を、CSV で格納
// 各配列要素の new Array に続く (　　) 内に記述する内容は、先頭から順に、アプリ名、画像ファイル名、キャッチコピー、URL となる
// 文字コードは UTF-8、改行コードは LF（UNIX 形式）となる
// 各配列要素は、等確率で表示される
// 意図的に表示確率を高めたい場合は、配列の個数（行数）を増やす

// ▼ ▼ ▼ 編集不可 ▼ ▼ ▼
var item = new Array();
// ▲ ▲ ▲ 編集不可 ▲ ▲ ▲

// ▼ ▼ ▼ 編集可 ▼ ▼ ▼
item[0] = new Array('「EJ」8月号・大好評発売中', 'icon1208.png', '今月はポール・マッカートニーが登場', '//bit.ly/iyG7FQ', '0');
item[1] = new Array('「EJ」8月号・大好評発売中', 'icon1208.png', 'オリンピックで沸く「イギリス」英語特集', '//bit.ly/iyG7FQ', '0');
item[2] = new Array('英辞郎 on the WEB Pro', 'app_eowp_64.png', '12000語の単語の音声が聞ける！', '//bit.ly/eowp_i3', '315');
item[3] = new Array('英辞郎 on the WEB Pro', 'app_eowp_64.png', '単語帳に最大5000件まで登録可能！', '//bit.ly/eowp_i2', '315');
item[4] = new Array('uListening (ユーリスニング)', '2222222.png', '英語学習者必須の電子書籍ビューア―', '//click.linksynergy.com/fs-bin/stat?id=683qiVVfTgA&offerid=94348&type=3&subid=0&tmpid=2192&RD_PARM1=http%253A%252F%252Fitunes.apple.com%252FWebObjects%252FMZStore.woa%252Fwa%252FviewSoftware%253Fid%253D423181740%2526s%253D143462%2526partnerId%253D30', '0');
item[5] = new Array('英辞郎 on the WEB Pro', 'app_eowp_64.png', '12000語の単語の音声が聞ける！', '//bit.ly/eowp_i3', '315');
item[6] = new Array('日常会話表現－起きてから寝るまで英語表現', 'iTunesArtwork_512.png', '録音機能付き、つぶやき練習法！', '//bit.ly/uxnhek', '170');
item[7] = new Array('オフィス会話表現－起きてから寝るまで英語表現', 'iTunesArtwork_.png', '録音機能付き、つぶやき練習法！', '//itunes.apple.com/us/app/ofisu-hui-hua-biao-xian-aruku/id493215828?mt=8', '170');
item[8] = new Array('uListening (ユーリスニング)', '2222222.png', '話速変換機能搭載の便利アイテム', '//click.linksynergy.com/fs-bin/stat?id=683qiVVfTgA&offerid=94348&type=3&subid=0&tmpid=2192&RD_PARM1=http%253A%252F%252Fitunes.apple.com%252FWebObjects%252FMZStore.woa%252Fwa%252FviewSoftware%253Fid%253D423181740%2526s%253D143462%2526partnerId%253D30', '0');
item[9] = new Array('英辞郎 on the WEB Pro', 'app_eowp_64.png', '単語帳に最大5000件まで登録可能！', '//bit.ly/eowp_i2', '315');
item[10] = new Array('「EJ」8月号・大好評発売中', 'icon1208.png', '今なら最新号をセール中！', '//bit.ly/iyG7FQ', '0');
item[11] = new Array('英語日記ドリル【添削機能付き】', '9590405.png', '優れた添削機能が人気！', '//bit.ly/mXq996', '700');
item[12] = new Array('TOEIC(R)テスト スーパー模試 600問 for iPad（アルク）', '9590272.png', 'iPad専用アプリでTOEIC対策', '//click.linksynergy.com/fs-bin/stat?id=683qiVVfTgA&offerid=94348&type=3&subid=0&tmpid=2192&RD_PARM1=http%253A%252F%252Fitunes.apple.com%252FWebObjects%252FMZStore.woa%252Fwa%252FviewSoftware%253Fid%253D373237577%2526s%253D143462%2526partnerId%253D30', '1800');
item[13] = new Array('スティーブの英会話なるほどフレーズ100', '9590288.png', 'アプリで英会話の瞬発力をつける！', '//click.linksynergy.com/fs-bin/stat?id=683qiVVfTgA&offerid=94348&type=3&subid=0&tmpid=2192&RD_PARM1=http%253A%252F%252Fitunes.apple.com%252FWebObjects%252FMZStore.woa%252Fwa%252FviewSoftware%253Fid%253D328244269%2526s%253D143462%2526partnerId%253D30', '850');
item[14] = new Array('スティーブの英会話ペラペラビジネス100', '9590287.png', '仕事にも役立つ100フレーズ', '//bit.ly/A8qxHz', '850');
item[15] = new Array('英辞郎 on the WEB Pro', 'app_eowp_64.png', '12000語の単語の音声が聞ける！', '//bit.ly/eowp_i3', '315');
item[16] = new Array('英辞郎 on the WEB Pro', 'app_eowp_64.png', '単語帳に最大5000件まで登録可能！', '//bit.ly/eowp_i2', '315');
item[17] = new Array('「EJ」８月号・大好評発売中', 'icon1208.png', '007のダニエル・クレイグが登場', '//bit.ly/iyG7FQ', '0');
// ▲ ▲ ▲ 編集可 ▲ ▲ ▲

// ▼ ▼ ▼ 編集不可 ▼ ▼ ▼
var item_len = item.length;
var n = Math.floor(Math.random()*item_len);
// ▲ ▲ ▲ 編集不可 ▲ ▲ ▲
