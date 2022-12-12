// アイテムを増やす場合は、item[（数字）] の行を追加する
// （数字）の部分は、先頭から 0 で始まり、増分 1 の刻みで（欠番は許されない）
// 各配列要素の new Array に続く (　　) 内には、シングルクォーテーションで囲んだ文字列を、CSV で格納
// 各配列要素の new Array に続く (　　) 内に記述する内容は、タイトル、URLとなる
// 文字コードは UTF-8、改行コードは LF（UNIX 形式）となる
// 各配列要素は、等確率で表示される
// 意図的に表示確率を高めたい場合は、配列の個数（行数）を増やす

// ▼ ▼ ▼ 編集不可 ▼ ▼ ▼
var item = new Array();
// ▲ ▲ ▲ 編集不可 ▲ ▲ ▲

// ▼ ▼ ▼ 編集可 ▼ ▼ ▼
item[0] = new Array('【Memo】英和検索の検索結果は、どんな順番で並んでいる？', '//eowimg.alc.co.jp/content/iphone/tips/tip001.html');
item[1] = new Array('【Basic】スペース区切りで AND 検索！ ', '//eowimg.alc.co.jp/content/iphone/tips/tip002.html');
item[2] = new Array('【Advanced】AND 検索大活用！ ', '//eowimg.alc.co.jp/content/iphone/tips/tip003.html');
item[3] = new Array('【Memo】和英検索はどのように処理されているの？', '//eowimg.alc.co.jp/content/iphone/tips/tip004.html');
item[4] = new Array('【Memo】スペリングミスの多い単語トップ 25 ', '//eowimg.alc.co.jp/content/iphone/tips/tip005.html');
item[5] = new Array('【Advanced】国際 社会 vs 社会 国際：複数のキーワードでの表示順', '//eowimg.alc.co.jp/content/iphone/tips/tip006.html');
item[6] = new Array('【Advanced】do (one\'s | my | your | his | her | its | our | their) best ', '//eowimg.alc.co.jp/content/iphone/tips/tip007.html');
item[7] = new Array('【Advanced】 [ ] で英単語を囲って、変化形も含めて検索しよう ', '//eowimg.alc.co.jp/content/iphone/tips/tip025.html');
item[8] = new Array('【BASIC】 " "（二重引用符）で囲んでフレーズ検索 ', '//eowimg.alc.co.jp/content/iphone/tips/tip009.html');
item[9] = new Array('【Advanced】*-friendly：*（ワイルドカード）を使ってみよう！ ', '//eowimg.alc.co.jp/content/iphone/tips/tip012.html');
item[10] = new Array('【Tip】キーワード入力補助でラクラク検索♪ ', '//eowimg.alc.co.jp/content/iphone/tips/tip013.html');
item[11] = new Array('【Basic】「◯◯◯を含まない」NOT 検索', '//eowimg.alc.co.jp/content/iphone/tips/tip015.html');
item[12] = new Array('【Memo】『英辞郎 on the WEB』検索オプション早見表', '//eowimg.alc.co.jp/content/iphone/tips/tip016.html');
item[13] = new Array('【Advanced】give ◯◯◯ up：give と up の間に任意の 1 語を挟む見出しを検索', '//eowimg.alc.co.jp/content/iphone/tips/tip018.html');
item[14] = new Array('【Tip】英文のメールや手紙の例文をまとめて検索！', '//eowimg.alc.co.jp/content/iphone/tips/tip019.html');

// ▲ ▲ ▲ 編集可 ▲ ▲ ▲

// ▼ ▼ ▼ 編集不可 ▼ ▼ ▼
var item_len = item.length;
var n = Math.floor(Math.random()*item_len);
// ▲ ▲ ▲ 編集不可 ▲ ▲ ▲
