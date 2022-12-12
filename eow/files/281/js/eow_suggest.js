/*
--------------------------------------------------------
suggest.js - Input Suggest
Version 2.1 (Update 2008/04/02)
Copyright (c) 2006-2008 onozaty (//www.enjoyxstudy.com)
--------------------------------------------------------
*/

function  __search(oj) {
// mod ↓
// items["SUGGEST_STATUS"] is define of search.js
  if (items["SUGGEST_STATUS"] == "1") {
	SuggestBase._search(oj);
  };
//	SuggestBase._search(oj);
// mod ↑
}

if (!Suggest) {
  var Suggest = {};
}

Suggest.Key = {
  TAB:     9,
  RETURN: 13,
  ESC:    27,
  UP:     38,
  DOWN:   40
};

Suggest.copyProperties = function(dest, src) {
  for (var property in src) {
    dest[property] = src[property];
  }
  return dest;
};

Suggest.Local = function() {
  this.initialize.apply(this, arguments);
};
Suggest.Local.prototype = {
  initialize: function(input, suggestArea, candidateList) {

    this.input = this._getElement(input);
    this.suggestArea = this._getElement(suggestArea);
    this.candidateList = candidateList;
    this.oldText = this.getInputText();

    if (arguments[3]) this.setOptions(arguments[3]);

    this._addEvent(this.input, 'focus', this._bind(this.checkLoop));
    this._addEvent(this.input, 'blur', this._bind(this.inputBlur));

    var keyevent = 'keydown';
    this._addEvent(this.input, keyevent, this._bindEvent(this.keyEvent));

    this.clearSuggestArea();
  },

  // options
  inputValueBackup: '',
  input: '',
  interval: 200,
  dispMax: 20,
  listTagName: 'div',
  prefix: false,
  ignoreCase: true,
  highlight: false,
  dispAllKey: false,
  classMouseOver: 'over',
  classSelect: 'select',

  setOptions: function(options) {
    Suggest.copyProperties(this, options);
  },

  inputBlur: function() {

    this.changeUnactive();
    this.oldText = this.getInputText();

    if (this.timerId) clearTimeout(this.timerId);
    this.timerId = null;

    setTimeout(this._bind(this.clearSuggestArea), 300);
  },

  checkLoop: function() {
    var text = this.getInputText();
    if (text != this.oldText) {
      this.oldText = text;
      this.search();
    }
    else {
	    if (this.timerId) clearTimeout(this.timerId);
	    this.timerId = setTimeout(this._bind(this.checkLoop), this.interval);
    }
  },

  search: function() {
//    this.clearSuggestArea();
    var text = this.getInputText();
	text = this._ltrim(text);
    if (text == '' || text == null) {
		
		this.clearSuggestArea();
	    
	    if (this.timerId) clearTimeout(this.timerId);
	    this.timerId = setTimeout(this._bind(this.checkLoop), this.interval);
    	return;
    }
	var httpoj = this.createXMLHttpRequest();
	if (httpoj != null) {
		httpoj.open("GET", "/eow/sg/?q=" + encodeURIComponent(text), true);
		httpoj.onreadystatechange = function() {
			if (httpoj.readyState==4) {
				__search(httpoj);
			}
		}
		httpoj.send(null);
	}
  },

  createXMLHttpRequest: function() {
	if (window.ActiveXObject) {
		try {
			return new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e1) {
			try {
				return new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e2) {
				return null;
			}
		}
	}
	else if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	}
	else {
		return null;
	}
  },

  _search: function(oj) {
    this.clearSuggestArea();
	var		res  = oj.responseXML;
	var results = res.getElementsByTagName('suggest')[0].childNodes;
	var resultList = [];
	this.suggestIndexList = [];

	var j = 0;
	for (var i=0;i<results.length;i++)
	{
		if (results[i].hasChildNodes()) {
			resultList.push(decodeURIComponent(results[i].childNodes[0].nodeValue));
			this.suggestIndexList.push(j++);
		}
	}
	if (resultList != 0) {
		this.candidateList = resultList;
		this.createSuggestArea(resultList);
	}
	if (this.timerId) clearTimeout(this.timerId);
	this.timerId = setTimeout(this._bind(this.checkLoop), this.interval);
  },

  clearSuggestArea: function() {
    this.suggestArea.innerHTML = '';
    this.suggestArea.style.display = 'none';
    this.suggestList = null;
    this.suggestIndexList = null;
    this.activePosition = null;
  },

// add ↓
  getLimitByteWord: function(text,limitbyte,suffix) {
    var ct;
    var size = 0;
    var q = text;
    for(ct = 0; ct < text.length; ct++) {
      var c = text.charCodeAt(ct);
      if(c >= 128){
        size++;
      }
      size++;
      if (size > limitbyte) {
        q = text.substring(0,ct) + suffix;
        break;
      }
    }
    return q;
  },
// add ↑

  createSuggestArea: function(resultList) {
    this.suggestList = [];
    this.inputValueBackup = this.input.value;
    for (var i = 0, length = resultList.length; i < length; i++) {
      var element = document.createElement(this.listTagName);
// mod ↓
//      element.innerHTML = resultList[i];
//      element.innerHTML = this.getLimitByteWord(resultList[i],54,"......");
      element.innerHTML = allReplace(this.getLimitByteWord(resultList[i],54,"......"),'\\','&yen;');
// mod ↑
      this.suggestArea.appendChild(element);
      this._addEvent(element, 'click', this._bindEvent(this.listClick, i));
      this._addEvent(element, 'mouseover', this._bindEvent(this.listMouseOver, i));
      this._addEvent(element, 'mouseout', this._bindEvent(this.listMouseOut, i));
      this.suggestList.push(element);
    }

// add ↓
    var element = document.createElement(this.listTagName);
//    element.innerHTML = '<div style="text-align:right;"><span id="suggestclose" onClick="changeSuggestDisplay(\'off\');">閉じる</span></div>';
    element.innerHTML = '<div style="text-align:right;"><span id="suggestclose" onClick="closeSuggestDisplay();">閉じる</span></div>';
    this.suggestArea.appendChild(element);
    this.suggestList.push(element);
// add ↑

    this.suggestArea.style.display = '';
  },
  getInputText: function() {
    return this.input.value;
  },
  setInputText: function(text) {
// mod ↓
//    this.input.value = text;
    this.input.value = this.getLimitByteWord(text,170,"");
// mod ↑
  },
  // key event
  keyEvent: function(event) {
    if (!this.timerId) {
      this.timerId = setTimeout(this._bind(this.checkLoop), this.interval);
    }
    if (this.dispAllKey && event.ctrlKey
        && this.getInputText() == ''
        && !this.suggestList
        && event.keyCode == Suggest.Key.DOWN) {
      this._stopEvent(event);
      this.keyEventDispAll();
    } else if (event.keyCode == Suggest.Key.UP ||
               event.keyCode == Suggest.Key.DOWN) {
      if (this.suggestList && this.suggestList.length != 0) {
        this._stopEvent(event);
        this.keyEventMove(event.keyCode);
      }
    } else if (event.keyCode == Suggest.Key.RETURN) {
      if (this.suggestList && this.suggestList.length != 0) {
        this._stopEvent(event);
        this.keyEventReturn();
      }
    } else if (event.keyCode == Suggest.Key.ESC) {
      if (this.suggestList && this.suggestList.length != 0) {
        this._stopEvent(event);
        this.keyEventEsc();
      }
    } else {
      this.keyEventOther(event);
    }
  },
  keyEventDispAll: function() {
    this.clearSuggestArea();
    this.oldText = this.getInputText();
    this.suggestIndexList = [];
    for (var i = 0, length = this.candidateList.length; i < length; i++) {
      this.suggestIndexList.push(i);
    }
    this.createSuggestArea(this.candidateList);
  },

  keyEventMove: function(keyCode) {
    this.changeUnactive();
    if (keyCode == Suggest.Key.UP) {
      if (this.activePosition == null) {
// mod ↓
//        this.activePosition = this.suggestList.length -1;
        this.activePosition = this.suggestList.length -2;
// mod ↑
      }else{
        this.activePosition--;
        if (this.activePosition < 0) {
          this.activePosition = null;
          this.input.value = this.inputValueBackup;
          return;
        }
      }
    }else{
      if (this.activePosition == null) {
        this.activePosition = 0;
      }else{
        this.activePosition++;
      }
// mod ↓
//     if (this.activePosition >= this.suggestList.length) {
      if (this.activePosition >= this.suggestList.length -1) {
// mod ↑
        this.activePosition = null;
        this.input.value = this.inputValueBackup;
        return;
      }
    }
    this.changeActive(this.activePosition);
  },

  keyEventReturn: function() {
    this.clearSuggestArea();
    this.moveEnd();
    goF1('fm1');
  },
  keyEventEsc: function() {
    this.clearSuggestArea();
    this.input.value = this.inputValueBackup;
    this.oldText = this.getInputText();
    if (window.opera) setTimeout(this._bind(this.moveEnd), 5);
  },
  keyEventOther: function(event) {},
  changeActive: function(index) {
    this.setStyleActive(this.suggestList[index]);
    this.setInputText(this.candidateList[this.suggestIndexList[index]]);
    this.oldText = this.getInputText();
    this.input.focus();
  },
  changeUnactive: function() {
    if (this.suggestList != null
        && this.suggestList.length > 0
        && this.activePosition != null) {
      this.setStyleUnactive(this.suggestList[this.activePosition]);
    }
  },
  listClick: function(event, index) {
    this.changeUnactive();
    this.activePosition = index;
    this.changeActive(index);
    this.moveEnd();
    goF1('fm1');
  },
  listMouseOver: function(event, index) {
    this.setStyleMouseOver(this._getEventElement(event));
  },

  listMouseOut: function(event, index) {
    if (!this.suggestList) return;
    var element = this._getEventElement(event);
    if (index == this.activePosition) {
      this.setStyleActive(element);
    }else{
      this.setStyleUnactive(element);
    }
  },
  setStyleActive: function(element) {
    element.className = this.classSelect;
  },

  setStyleUnactive: function(element) {
    element.className = '';
  },

  setStyleMouseOver: function(element) {
    element.className = this.classMouseOver;
  },
  moveEnd: function() {

    if (this.input.createTextRange) {
      this.input.focus(); // Opera
      var range = this.input.createTextRange();
      range.move('character', this.input.value.length);
      range.select();
    } else if (this.input.setSelectionRange) {
      this.input.setSelectionRange(this.input.value.length, this.input.value.length);
    }
  },
  _getElement: function(element) {
    return (typeof element == 'string') ? document.getElementById(element) : element;
  },
  _addEvent: (window.addEventListener ?
    function(element, type, func) {
      element.addEventListener(type, func, false);
    } :
    function(element, type, func) {
      element.attachEvent('on' + type, func);
    }),
  _stopEvent: function(event) {
    if (event.preventDefault) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.returnValue = false;
      event.cancelBubble = true;
    }
  },
  _getEventElement: function(event) {
    return event.target || event.srcElement;
  },
  _bind: function(func) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    return function(){ func.apply(self, args); };
  },
  _bindEvent: function(func) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    return function(event){ event = event || window.event; func.apply(self, [event].concat(args)); };
  },
  _ltrim: function(text){
    return String(text).replace(/^[ 　]*/gim, "");
  }
};
