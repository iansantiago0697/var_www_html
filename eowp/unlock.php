<?php
	/**
	 * ロボットアクセス防御認証（via Google reCARTCHA）
	 */
	function authReCAPTCHA() {
		$secretKey = '6LeHeRYUAAAAAD1teZmJIyawBJZphv3vQMD7XKnE';

		$url = 'https://www.google.com/recaptcha/api/siteverify';
		$data = array(
				'secret' => $secretKey,
				'response' => $_REQUEST['g-recaptcha-response'],
				'remoteip' => $_SERVER['REMOTE_ADDR'],
		);
		$url .= '?' . http_build_query($data);
		$header = Array(
				'Content-Type: application/x-www-form-urlencoded',
				);
		$options = array('http' =>
				array(
						'method' => 'GET',
						'header'  => implode("\r\n", $header),
						'ignore_errors' => true
				)
		);
		$apiResponse = file_get_contents($url, false, stream_context_create($options));
		$jsonData = json_decode($apiResponse, true);

		return $jsonData;
	}

	/**
	 * バックエンドAPI呼出
	 */
	function requestBackend($url, $data) {
		$url .= '?' . http_build_query($data);
		$header = Array(
				'Content-Type: application/x-www-form-urlencoded',
				);
		$options = array('http' =>
				array(
						'method' => 'GET',
						'header'  => implode("\r\n", $header),
						'ignore_errors' => true
				)
		);
		$apiResponse = file_get_contents($url, false, stream_context_create($options));
		$jsonData = json_decode($apiResponse, true);

		return $jsonData;
	}

	/**
	 * アクセスブロックを解除する（via Cassandra）
	 */
	function unlockAccessBlock($custId) {
		$cmd = "/usr/bin/cqlsh backnet1 9042 -e \"DELETE from eowp_botprotector.remoteclients where addr='{$custId}';\"";
		$output = shell_exec($cmd);

		return $output;
	}

	/**
	 * アクセスブロック解除ページを生成する
	 */
	function getHtml($errorMessage) {
		$html = <<<EOF
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ja" lang="ja">
	<head>
		<meta http-equiv="Content-Language" content="ja" />
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta http-equiv="Pragma" content="no-cache" />
		<meta http-equiv="cache-control" content="no-cache, must-revalidate" />
		<meta name="ROBOTS" content ="NOINDEX,NOFOLLOW" />
		<meta name="ROBOTS" content ="NOARCHIVE" />
		<title>ブロック解除 : 英辞郎 on the WEB：アルク</title>
		<style type="text/css">
		body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, form, fieldset, input, textarea, p, blockquote, th, td{
			margin:0; padding:0;
		}
		table{
			border-collapse:collapse; border-spacing:0;
		}
		fieldset, img{
			border:0;
		}
		address, caption, cite, code, dfn, em, strong, th, var{
			font-style:normal; font-weight:normal;
		}
		ol, ul{
			list-style:none;
		}
		caption, th{
			text-align:left;
		}
		h1, h2, h3, h4, h5, h6{
			font-size:100%; font-weight:normal;
		}
		q:before, q:after{
			content:”;
		}
		abbr, acronym{
			border:0;
		}

		body{
			font-family:'メイリオ',Meiryo,'ヒラギノ角ゴ Pro W3','Hiragino Kaku Gothic Pro','ＭＳ Ｐゴシック','MS PGothic',sans-serif;
			background: #f2f2f2;
		}
		#Container{
			text-align: center;
		}
		#Contents{
			margin:80px auto 0;
			width: 650px;
			height: 200px;
		}
		.Messege{
			float: left;
			text-align: left;
			width: 500px;
			height: 200px;
		}
		.Status{
			margin-bottom: 20px;
			font-size: 105%;
			font-weight: 900;
			color: #00008B;
		}
		.Input{
			margin-bottom: 20px;
			font-size: 105%;
			font-weight: 900;
			color: #000000;
		}
		.Description{
			margin-bottom: 20px;
			font-size: 80%;
			margin: 1em 0 0;
		}
		.Error{
			margin-bottom: 20px;
			font-size: 105%;
			font-weight: 900;
			color: #FF0000;
		}
		.Eng{
			font-size: 90%;
		}
		.GoBack{
			text-align: right;
			font-size: 80%;
			font-weight: 900;
			margin-top: 1em;
			margin-right: 20px;
		}
		.Illust{
			float: right;
			height: 200px;
		}
		.Doctor{
			position: relative;
			top:50px;
		}
		#Footer{
			clear: both;
			font-size: 75%;
			margin-top: 80px;
		}
		</style>
		<script src='https://www.google.com/recaptcha/api.js?hl=ja'></script>
	</head>
	<body>
		<div id="Container">
			<div id="Contents">
				<div class="Messege">
					<p class="Status">アクセスブロック解除</p>
					<p class="Description">メールアドレスIDとパスワードを入力した上で、チェックボックスと解除ボタンをクリックしてください。</p>
					<p class="Description"><span class="eng">Please fill in the blanks to reopen the service.</span></p>
					<p class="Description"></p>
					<p class="Error">{$errorMessage}</p>
					<form action="/unlock.php" method="post">
						<p class="Input">
							<span>メールアドレスID</span><br>
							<input type="text" name="mailAddress" size="25" autocomplete="off" required>
						</p>
						<p class="Input">
							<span>パスワード</span><br>
							<input type="password" name="password" size="25" autocomplete="off" required>
						</p>
						<p class="Input">
							<div class="g-recaptcha" data-sitekey="6LeHeRYUAAAAAI4n0E1T_5X3_XK1A_XOqfqTs49F"></div>
						</p>
						<br />
						<p class="Input">
							<input type="submit" value="解除" />
						</p>
					</form>
					<p class="GoBack">お問い合わせは<a href="https://www.alc.co.jp/inquiry/eow/" title="お問い合わせフォームへ" target="_blank">こちら</a></p>
					<p class="GoBack">If you have any further questions or concerns, please contact us <a href="https://www.alc.co.jp/inquiry/eow/" title="お問い合わせフォームへ" target="_blank">here</a>.</p>
				</div>
			</div>
		</div>
	</body>
</html>
EOF;

		return $html;
	}


// ****************************************************************************************************************
// エントリーポイント
// ****************************************************************************************************************
try {
	// 初期表示
	if (!isset($_REQUEST['mailAddress']) && !isset($_REQUEST['password'])) {
		header("X-Frame-Options: SAMEORIGI");
		$html = getHtml(null);
		echo $html;
		exit;
	}

	// リクエストパラメーター確保
	$mailAddress = htmlspecialchars($_REQUEST['mailAddress'], ENT_QUOTES, 'UTF-8');
	$password = htmlspecialchars($_REQUEST['password'], ENT_QUOTES, 'UTF-8');

	// ロボットアクセス防御認証
	$jsonData = authReCAPTCHA();
	if($jsonData['success'] !== true){
		header("X-Frame-Options: SAMEORIGI");
		$errorMessage = "reCARTCHAに誤りがあります。";
		$html = getHtml($errorMessage);
		echo $html;
		exit;
	}

	// 英辞郎 on the WEB ユーザー認証
	$sId = '';
	$url = 'http://127.0.0.1/eowpws/login';
	$data = array(
			'mailAddress' => $mailAddress,
			'password' => $password
	);
	$jsonData = requestBackend($url, $data);
	if($jsonData['ret'] === 0){
		$sId = $jsonData['sid'];
	}
	else {
		header("X-Frame-Options: SAMEORIGI");
		$errorMessage = "メールアドレスIDかパスワードに誤りがあります。";
		$html = getHtml($errorMessage);
		echo $html;
		exit;
	}

	// 英辞郎 on the WEB 顧客No取得
	$custId = '';
	$url = 'http://127.0.0.1/eowpws/membershipAuth';
	$data = array(
			'sid' => $sId
	);
	$jsonData = requestBackend($url, $data);
	if($jsonData['ret'] === "0"){
		$custId = $jsonData['custId'];
	}
	else {
		header("X-Frame-Options: SAMEORIGI");
		$errorMessage = "メールアドレスIDかパスワードに誤りがあります。";
		$html = getHtml($errorMessage);
		echo $html;
		exit;
	}

	// アクセスブロック解除
	$output = unlockAccessBlock($custId);

	header("X-Frame-Options: SAMEORIGI");
	header("Location: /blocked_reopen.html");
}
catch (Exception $e) {
	header("X-Frame-Options: SAMEORIGI");
	header("Location: /error.html");
}
?>
