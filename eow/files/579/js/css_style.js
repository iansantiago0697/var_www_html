<!--
var osName = navigator.appVersion ;
var browser = navigator.appName ;

var winIEstylesheet = "//eowimg.alc.co.jp/content/css/winIE_style_sa.css" ;
var winNNstylesheet = "//eowimg.alc.co.jp/content/css/winNN_style_sa.css" ;
var macIEstylesheet = "//eowimg.alc.co.jp/content/css/macIE_style_sa.css" ;
var macNNstylesheet = "//eowimg.alc.co.jp/content/css/macNN_style_sa.css" ;

//Macintosh
if(osName.indexOf('Mac')!=-1){
	if(browser.charAt(0)=="N"){
		document.write( "<link rel=\"stylesheet\" href=\"" + macNNstylesheet + "\" type=\"text/css\">" );
	}
	else {
		document.write( "<link rel=\"stylesheet\" href=\"" + macIEstylesheet + "\" type=\"text/css\">" );
	}
}
//windows
else if(osName.indexOf('Win')!=-1){
	if(browser.charAt(0)=="N"){
		document.write( "<link rel=\"stylesheet\" href=\"" + winNNstylesheet + "\" type=\"text/css\">" );
	}
	else {
		document.write( "<link rel=\"stylesheet\" href=\"" + winIEstylesheet + "\" type=\"text/css\">" );
	}
}
// -->