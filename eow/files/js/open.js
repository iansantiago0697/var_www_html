function open_win(wi,he,s_data,w_name) {
w_name=window.open(s_data, w_name, "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1,left=1,top=1,copyhistory=0,width="+wi+",height="+he);
w_name.focus();
};