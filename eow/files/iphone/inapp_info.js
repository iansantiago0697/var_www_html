// アイテムを増やす場合は、item[（数字）] の行を追加する
// （数字）の部分は、先頭から 0 で始まり、増分 1 の刻みで（欠番は許されない）
// 各配列要素の new Array に続く (　　) 内には、シングルクォーテーションで囲んだ文字列を、CSV で格納
// 各配列要素の new Array に続く (　　) 内に記述する内容は、キャッチ、URLとなる
// 文字コードは UTF-8、改行コードは LF（UNIX 形式）となる
// 各配列要素は、等確率で表示される
// 意図的に表示確率を高めたい場合は、配列の個数（行数）を増やす

// ▼ ▼ ▼ 編集不可 ▼ ▼ ▼
var item = new Array();
// ▲ ▲ ▲ 編集不可 ▲ ▲ ▲

// ▼ ▼ ▼ 編集可 ▼ ▼ ▼
item[0] = new Array('再生スピードも変更出来る！リスニング学習には『uListening』', '//bit.ly/eow4i-iulis');
item[1] = new Array('『英辞郎 on the WEB Pro』がスマートフォン対応！', '//bit.ly/eowp_i1');
item[2] = new Array('リスニングに便利な機能満載の無料アプリ『uListening』', '//bit.ly/eow4i-iulis');
item[3] = new Array('EJ７月号は、メリル・ストリープ（女優）、ポール・クルーグマン（経済学者、ノーベル経済学賞受賞者）、スティーブ・ソレイシィ （英語講師、NHKラジオ『英会話タイムトライアル』講師）のインタビューを掲載', '//bit.ly/eow4i-iulis');
item[4] = new Array('『英辞郎 on the WEB Pro』単語帳は最大5000件登録可能', '//bit.ly/eowp_i1');

// ▲ ▲ ▲ 編集可 ▲ ▲ ▲

// ▼ ▼ ▼ 編集不可 ▼ ▼ ▼
var item_len = item.length;
var n = Math.floor(Math.random()*item_len);
// ▲ ▲ ▲ 編集不可 ▲ ▲ ▲
