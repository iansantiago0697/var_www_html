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
item[0] = new Array('英文メールに即効！アプリ版もご利用ください', 'http://www.alc.co.jp/iphone/eranking/index.html');
item[1] = new Array('音声も聞ける！iPhoneアプリ版はこちら', 'http://www.alc.co.jp/iphone/eranking/index.html');
item[2] = new Array('仕事で英語を使う方にお勧め→', 'http://www.alc.co.jp/iphone/eranking/index.html');
item[3] = new Array('検索ランキングがアプリになりました', 'http://www.alc.co.jp/iphone/index.html');
item[4] = new Array('検索ランキングiPhone版はこちら→', 'http://www.alc.co.jp/iphone/eranking/index.html');
// ▲ ▲ ▲ 編集可 ▲ ▲ ▲

// ▼ ▼ ▼ 編集不可 ▼ ▼ ▼
var item_len = item.length;
var n = Math.floor(Math.random()*item_len);
// ▲ ▲ ▲ 編集不可 ▲ ▲ ▲
