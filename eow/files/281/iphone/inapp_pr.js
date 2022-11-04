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
item[0] = new Array('ENGLISH JOURNAL for iPhone 好評発売中', 'http://www.alc.co.jp/iphone/ulistening/index.html');
item[1] = new Array('お役立ち英語表現はこちらから→', 'http://www.alc.co.jp/');
item[2] = new Array('この春、新開講！「朝英語Biz」', '//shop.alc.co.jp/cnt/other/iphone/index2.html');
item[3] = new Array('創刊40周年 ありがとうキャンペーン開催中', '//shop.alc.co.jp/cnt/other/ej/index2.html');
item[4] = new Array('耳から聞く「起きてから寝るまで英語表現」', '//itunes.apple.com/WebObjects/MZStore.woa/wa/viewAudiobook?id=402719341&s=143462');
item[5] = new Array('旅行英会話をアプリで磨く！29日より50％OFFセール', '//itunes.apple.com/jp/app/id407885346?mt=8');
// ▲ ▲ ▲ 編集可 ▲ ▲ ▲

// ▼ ▼ ▼ 編集不可 ▼ ▼ ▼
var item_len = item.length;
var n = Math.floor(Math.random()*item_len);
// ▲ ▲ ▲ 編集不可 ▲ ▲ ▲
