conf = {
       className : 'btn',
       postfix : '_on'
};
function setMouseOverImages() {
       $A(document.getElementsByClassName(conf.className)).each(function (node){
               node.onmouseout = changeSrcFunction(node.src);
               node.onmouseover =
			    changeSrcFunction(node.src.replace(/(\.gif|\.jpg|\.png)/, conf.postfix+"$1"));
       });
}
function changeSrcFunction(data){
       return function(){ this.src = data; }
}
Event.observe(window, 'load', setMouseOverImages, false);


conf1 = {
	className : "stripedtable",
	oddlineClassName : "oddline",
	evenlineClassName : "evenline"
}

function setStripedTable(){
	var tables = $A(document.getElementsByClassName(conf1.className));
	tables.each(function (table){
		var lines = $A(table.getElementsByTagName("tr"));
		var row=0;
		lines.each(function (tr){
			row++;
			if(row%2==1) {
				tr.className = conf1.oddlineClassName;
			} else {
				tr.className = conf1.evenlineClassName;
			}
		});
	});
}
Event.observe(window, 'load', setStripedTable, false);


