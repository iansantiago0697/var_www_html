#!/usr/bin/perl

use strict;
use utf8;
use Sys::Hostname;
use Fcntl qw(:flock :mode :seek);

# エラー収集gateway
#
# JavaScript上のエラーをサーバログとして収集するためのCGI
# JavaScriptのエラーフックに「new Image().src('http://eowp.alc.co.jp/info/error_collect.cgi?x=xxxxx&y=yyyyyyy') にようにして使用する

# 設定項目

# ログ出力先ディレクトリ
my $logDir = '/tmp/';

# ログファイル名
my $lofFilenameBase = 'javascript_error_log_';

print "Content-type: text/plain\n\n";

#foreach my $name (keys %ENV) {
#	print "${name} : ${ENV{$name}}\n";
#}

# print "\n\nCOOKIES\n";

my $HTTP_COOKIE = $ENV{'HTTP_COOKIE'};
my %cookies;
foreach my $cookie (split(/\;/, $HTTP_COOKIE)) {
#	print "${cookie}\n";
	# cookieの名前を取り出す
	my $pos = index($cookie, '=');
	if ($pos > 0) {
		my $name = substr($cookie, 0, $pos);
		$name =~ s/^\s+//;
		my $value = substr($cookie, $pos + 1);
		$cookies{$name} = "${value}";
#		print "${name} :: $value\n";
#		print "${name} :: ${cookies{'$name'}}\n";
	}
}

# ログする項目
# アクセス日時
my ($sec,$min,$hour,$mday,$mon,$year,$wday,$yday,$isdst) = localtime(time);
$year += 1900;
$mon += 1;
my $timestamp = sprintf("%04d/%02d/%02d_%02d:%02d:%02d", $year, $mon, $mday, $hour, $min, $sec);

# 自サーバhostname
my $hostname = hostname();

# ログファイルパスの決定
my $logFile = $logDir . $lofFilenameBase . $hostname . sprintf("_%04d-%02d-%02d", $year, $mon, $mday);

# ログする環境変数
# REQUEST_METHOD : HTTPメソッド(GETのみ許可)
my $request_method = $ENV{'REQUEST_METHOD'} ? $ENV{'REQUEST_METHOD'} : "";
exit if $request_method ne 'GET';

# QUERY_STRING : CGIへのクエリ変数
my $query_string = $ENV{'QUERY_STRING'} ? $ENV{'QUERY_STRING'} : "";

# HTTP_USER_AGENT : ブラウザ
my $user_agent = $ENV{'HTTP_USER_AGENT'} ? $ENV{'HTTP_USER_AGENT'} : "";

# HTTP_REFERER : どこのページでのエラーか
my $referer = $ENV{'HTTP_REFERER'} ? $ENV{'HTTP_REFERER'} : "";

# HTTP_ACCEPT_LANGUAGE : ブラウザの言語
my $accept_language = $ENV{'HTTP_ACCEPT_LANGUAGE'} ? $ENV{'HTTP_ACCEPT_LANGUAGE'} : "";

# HTTP_IV_REMOTE_ADDRESS : LB以前のリモートIP
my $ip = $ENV{'HTTP_IV_REMOTE_ADDRESS'} ? $ENV{'HTTP_IV_REMOTE_ADDRESS'} : "";

# ログするクッキー
# __utma : GAによるユニークユーザー (30分ぐらい有効)
my $utma = exists($cookies{'__utma'}) ? $cookies{'__utma'} : "[none]";

# eowpuser : eowpでの顧客ID+ログインタイムスタンプのhash他
my $eowpuser = exists($cookies{'eowpuser'}) ? $cookies{'eowpuser'} : "[none]";
if (my $i = index($eowpuser, '.') > 0) {
	$eowpuser = substr($eowpuser, 0, $i - 1);
}

# eowpsp : スマホの設定
my $eowpsp = exists($cookies{'eowpsp'}) ? $cookies{'eowpsp'} : "[none]";

#print "\n\nLogging: \n\n";
#print "TIMESTAMP : $timestamp\n";
#print "HOSTNAME : $hostname\n";
#print "REQUEST_METHOD : $request_method\n";
#print "REFERER : $referer\n";
#print "REMOTE_ADDRESS : $ip\n";
#print "UTMA : ${utma}\n";
#print "EOWPUSER : ${eowpuser}\n";
#print "EOWPSP : ${eowpsp}\n";
#print "USER_AGENT : $user_agent\n";
#print "ACCEPT_LANGUAGE : $accept_language\n";
#print "QUERY_STRING : $query_string\n";

#print "\n\nhash: 126\n\n";
#foreach my $x (sort keys %cookies) {
#	print "$x = ${cookies{$x}}\n";
#}

# print "\nlog file : $logFile\n";

my $data = "[js_error]\t";
#$data .= "$timestamp\t";
#$data .= "$hostname\t";
$data .= "$request_method\t";
$data .= "$referer\t";
$data .= "$ip\t";
$data .= "$utma\t";
$data .= "$eowpuser\t";
$data .= "$eowpsp\t";
$data .= "$user_agent\t";
$data .= "$accept_language\t";
$data .= "$query_string";

# ログファイルへ出力
#open(LOG, ">>$logFile") or die "Failed to open log file.($!)\n";
#flock(LOG, LOCK_EX) or warn "Failed to lock log file ($!)\n";
##seek(OUT, 0, SEEK_END) or die "Failed to seek log file to end.\n";
#
#print LOG "$data\n" or warn "Failed to write log file ($!)\n";
#
#close(LOG) or warn "Failed to close log file ($!)\n";;

print STDERR "$data";

print "OK\n";
exit 0;

