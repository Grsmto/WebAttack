window.jQuery || document.write('<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"><\/script>');

// node containing text jquery plugin
function Nct(){}Nct.prototype={init:function(a,b){this.textArray=[];this.elements=[];this.options=b;this.jquery=a;this.n=-1;if(b.async===true)b.async=2;if(b.not){a=a.not(b.not);a=a.add(a.find("*").not(b.not)).not($(b.not).find("*"))}else a=a.add(a.find("*"));this.jq=a;this.jql=this.jq.length;return this.process()},process:function(){this.n++;var a=this,b=this.options,c="",d=false,e=false,f=this.jq[this.n],g,h,i;if(this.n===this.jql){i=this.jquery.pushStack(this.elements,"nodesContainingText");b.complete.call(i,i,this.textArray);if(b.returnAll===false&&b.walk===false)return this.jquery;return i}if(!f)return this.process();g=$(f);var j=f.nodeName.toUpperCase(),k=j==="INPUT"&&$.attr(f,"type").toLowerCase();if({SCRIPT:1,NOSCRIPT:1,STYLE:1,OBJECT:1,IFRAME:1}[j])return this.process();if(typeof b.subject==="string"){c=g.attr(b.subject)}else{if(b.altAndVal&&(j==="IMG"||k==="image"))c=g.attr("alt");else if(b.altAndVal&&{text:1,button:1,submit:1}[k])c=g.val();else if(j==="TEXTAREA")c=g.val();else{h=f.firstChild;if(b.walk!==true)e=true;else{while(h){if(h.nodeType==1){e=true;break}h=h.nextSibling}}if(!e)c=g.text();else{if(b.walk!==true)d=true;h=f.firstChild;while(h){if(h.nodeType==3&&h.nodeValue.match(/\S/)!==null){if(h.nodeValue.match(/<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)>/)!==null){if(h.nodeValue.match(/(\S+(?=.*<))|(>(?=.*\S+))/)!==null){d=true;break}}else{d=true;break}}h=h.nextSibling}if(d){c=g.html();c=b.stripScripts?c.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,""):c;this.jq=this.jq.not(g.find("*"))}}}}if(!c)return this.process();this.elements.push(f);this.textArray.push(c);b.each.call(f,this.elements.length-1,f,c);if(b.async){setTimeout(function(){a.process()},b.async);return this.jquery}else return this.process()}};var defaults={not:"",async:false,each:function(){},complete:function(){},comments:false,returnAll:true,walk:true,altAndVal:false,subject:true,stripScripts:true};$.fn.nodesContainingText=function(a){a=$.extend({},defaults,$.fn.nodesContainingText.defaults,a);return(new Nct).init(this,a)};$.fn.nodesContainingText.defaults=defaults

// Random element
jQuery.fn.random = function(num) {
    num = parseInt(num);
    if (num > this.length) return this.pushStack(this);
    if (! num || num < 1) num = 1;
    var to_take = new Array();
    this.each(function(i) { to_take.push(i); });
    var to_keep = new Array();
    var invert = num > (this.length / 2);
    if (invert) num = this.length - num;
    for (; num > 0; num--) {
      for (var i = parseInt(Math.random() * to_take.length); i > 0; i--)
        to_take.push(to_take.shift());
      to_keep.push(to_take.shift());
    }
    if (invert) to_keep = to_take;
    return this.filter(function(i) { return $.inArray(i, to_keep) != -1; });
};

function WebAttack() {
	if (!window.WEBATTACK)
		window.WEBATTACK = {
			enemiesKilled: 0
		};
	/*
		== Classes ==
	*/	
	
	function Vector(x, y) {
		if ( typeof x == 'Object' ) {
			this.x = x.x;
			this.y = x.y;
		} else {
			this.x = x;
			this.y = y;
		}
	};

	Vector.prototype = {
		cp: function() {
			return new Vector(this.x, this.y);
		},
		
		mulNew: function(factor) {
			return new Vector(this.x * factor, this.y * factor);
		},
		
		add: function(vec) {
			this.x += vec.x;
			this.y += vec.y;
			return this;
		},
		
		normalize: function() {
			var l = this.len();
			this.x /= l;
			this.y /= l;
			return this;
		},
		
		len: function() {
			var l = Math.sqrt(this.x * this.x + this.y * this.y);
			if ( l < 0.005 && l > -0.005) return 0;
			return l;
		},
		
		is: function(test) {
			return typeof test == 'object' && this.x == test.x && this.y == test.y;
		}
	};

	
	/*
	== Setup ==
	*/
	var that = this;
	var w = document.documentElement.clientWidth, h = document.documentElement.clientHeight;
	
	// selected word vars
	var $selectedCurrentWord;
	var selectedCurrentWordX;
	var selectedCurrentWordY;
	var selectedCurrentWordHeight;
	
	// effects vars
	var particleSpeed = 400;
	var maxParticles = 20;
	var wordSpeed = 6000;
	var popSpeed = 1500;
	var intervalWord;
	var intervalMalus;
	
	// display vars
	var $gameMessage;
	var $background;
	
	// game vars
	var currentWord = 1;
	var gameLength = 0;
	var wordLength = 4;
	var totalMistakes = 0;
	var accuracy = 100;
	var replace_array = {
		'&':'and','\'':'','À':'A','À':'A','Á':'A','Á':'A','Â':'A','Â':'A','Ã':'A','Ã':'A',
		'Ä':'e','Ä':'A','Å':'A','Å':'A','Æ':'e','Æ':'E','Ā':'A','Ą':'A','Ă':'A','Ç':'C',
		'Ç':'C','Ć':'C','Č':'C','Ĉ':'C','Ċ':'C','Ď':'D','Đ':'D','È':'E','È':'E','É':'E',
		'É':'E','Ê':'E','Ê':'E','Ë':'E','Ë':'E','Ē':'E','Ę':'E','Ě':'E','Ĕ':'E','Ė':'E',
		'Ĝ':'G','Ğ':'G','Ġ':'G','Ģ':'G','Ĥ':'H','Ħ':'H','Ì':'I','Ì':'I','Í':'I','Í':'I',
		'Î':'I','Î':'I','Ï':'I','Ï':'I','Ī':'I','Ĩ':'I','Ĭ':'I','Į':'I','İ':'I','Ĳ':'J',
		'Ĵ':'J','Ķ':'K','Ľ':'K','Ĺ':'K','Ļ':'K','Ŀ':'K','Ñ':'N','Ñ':'N','Ń':'N','Ň':'N',
		'Ņ':'N','Ŋ':'N','Ò':'O','Ò':'O','Ó':'O','Ó':'O','Ô':'O','Ô':'O','Õ':'O','Õ':'O',
		'Ö':'e','Ö':'e','Ø':'O','Ø':'O','Ō':'O','Ő':'O','Ŏ':'O','Œ':'E','Ŕ':'R','Ř':'R',
		'Ŗ':'R','Ś':'S','Ş':'S','Ŝ':'S','Ș':'S','Ť':'T','Ţ':'T','Ŧ':'T','Ț':'T','Ù':'U',
		'Ù':'U','Ú':'U','Ú':'U','Û':'U','Û':'U','Ü':'e','Ū':'U','Ü':'e','Ů':'U','Ű':'U',
		'Ŭ':'U','Ũ':'U','Ų':'U','Ŵ':'W','Ŷ':'Y','Ÿ':'Y','Ź':'Z','Ż':'Z','à':'a','á':'a',
		'â':'a','ã':'a','ä':'e','ä':'e','å':'a','ā':'a','ą':'a','ă':'a','å':'a','æ':'e',
		'ç':'c','ć':'c','č':'c','ĉ':'c','ċ':'c','ď':'d','đ':'d','è':'e','é':'e','ê':'e',
		'ë':'e','ē':'e','ę':'e','ě':'e','ĕ':'e','ė':'e','ƒ':'f','ĝ':'g','ğ':'g','ġ':'g',
		'ģ':'g','ĥ':'h','ħ':'h','ì':'i','í':'i','î':'i','ï':'i','ī':'i','ĩ':'i','ĭ':'i',
		'į':'i','ı':'i','ĳ':'j','ĵ':'j','ķ':'k','ĸ':'k','ł':'l','ľ':'l','ĺ':'l','ļ':'l',
		'ŀ':'l','ñ':'n','ń':'n','ň':'n','ņ':'n','ŉ':'n','ŋ':'n','ò':'o','ó':'o','ô':'o',
		'õ':'o','ö':'e','ö':'e','ø':'o','ō':'o','ő':'o','ŏ':'o','œ':'e','ŕ':'r','ř':'r',
		'ŗ':'r','ù':'u','ú':'u','û':'u','ü':'e','ū':'u','ü':'e','ů':'u','ű':'u','ŭ':'u',
		'ũ':'u','ų':'u','ŵ':'w','ÿ':'y','ŷ':'y','ż':'z','ź':'z','ß':'s','ſ':'s','Α':'A',
		'Ά':'A','Β':'B','Γ':'G','Δ':'D','Ε':'E','Έ':'E','Ζ':'Z','Η':'I','Ή':'I','Θ':'TH',
		'Ι':'I','Ί':'I','Ϊ':'I','Κ':'K','Λ':'L','Μ':'M','Ν':'N','Ξ':'KS','Ο':'O','Ό':'O',
		'Π':'P','Ρ':'R','Σ':'S','Τ':'T','Υ':'Y','Ύ':'Y','Ϋ':'Y','Φ':'F','Χ':'X','Ψ':'PS',
		'Ω':'O','Ώ':'O','α':'a','ά':'a','β':'b','γ':'g','δ':'d','ε':'e','έ':'e','ζ':'z',
		'η':'i','ή':'i','θ':'th','ι':'i','ί':'i','ϊ':'i','ΐ':'i','κ':'k','λ':'l','μ':'m',
		'ν':'n','ξ':'ks','ο':'o','ό':'o','π':'p','ρ':'r','σ':'s','τ':'t','υ':'y','ύ':'y',
		'ϋ':'y','ΰ':'y','φ':'f','χ':'x','ψ':'ps','ω':'o','ώ':'o'
	};
	
	// combos vars
	var goodTyping = 0;
	var comboCoeff = 1;
	
	// Init display
	this.gameContainer = document.createElement('div');
	this.gameContainer.className = 'WEBATTACK';
	$('body').prepend(this.gameContainer);

	this.canvas = document.createElement('canvas');
	this.canvas.setAttribute('width', w);
	this.canvas.setAttribute('height', h);
	this.canvas.className = 'WEBATTACK';
	with ( this.canvas.style ) {
		width = w + "px";
		height = h + "px";
		position = "fixed";
		top = "0px";
		left = "0px";
		bottom = "0px";
		right = "0px";
		zIndex = "10000";
	}
	this.gameContainer.appendChild(this.canvas);
	
	// Init canvas
	this.ctx = this.canvas.getContext("2d");
	this.ctx.fillStyle = "black";
	this.ctx.strokeStyle = "black";
	
	this.pos;
	this.lastPos = false;
	
	// Particles are created when something is shot
	this.particles = [];
	
	// Enemies lay first in this.enemies, when they are shot they are moved to this.dying
	this.enemies = [];
	this.dying = [];
	this.totalEnemies = 0;
	
	var ignoredTypes = ['HTML', 'HEAD', 'BODY', 'SCRIPT', 'TITLE', 'META', 'STYLE', 'LINK'];
	if ( window.ActiveXObject )
		ignoredTypes = ['HTML', 'HEAD', 'BODY', 'SCRIPT', 'TITLE', 'META', 'STYLE', 'LINK', 'SHAPE', 'LINE', 'GROUP', 'IMAGE', 'STROKE', 'FILL', 'SKEW', 'PATH', 'TEXTPATH', 'INS']; // Half of these are for IE g_vml
	var hiddenTypes = ['BR', 'HR'];
	
	
	// function updateEnemyIndex() {
		// for ( var i = 0, enemy; enemy = that.enemies[i]; i++ )
			// removeClass(enemy, "WEBATTACKENEMY");
			
		// var all = document.body.getElementsByTagName('*');
		// that.enemies = [];
		// for ( var i = 0, el; el = all[i]; i++ ) {
			// if ( indexOf(ignoredTypes, el.tagName.toUpperCase()) == -1 && el.prefix != 'g_vml_' && hasOnlyTextualChildren(el) && el.className != "WEBATTACK" && el.offsetHeight > 0 ) {
				// el.aSize = size(el);
				// that.enemies.push(el);
				// addClass(el, "WEBATTACKENEMY");
				
				// this is only for enemycounting
				// if ( ! el.aAdded ) {
					// el.aAdded = true;
					// that.totalEnemies++;
				// }
			// }
		// }
	// };
	// updateEnemyIndex();
	
	function textRewriting() {
	
		// Reécriture des mots pour les rendre manipulables
		$("body").nodesContainingText().each(function(){
			var wordPositionTestX = $(this).offset().left;
			var wordPositionTestY = $(this).offset().top;
			
			if($(this).css('display') != 'none' && $(this).css('text-indent') > -999 + 'px' && indexOf(ignoredTypes, this.tagName.toUpperCase()) == -1 && this.prefix != 'g_vml_' && hasOnlyTextualChildren(this) && this.className != "WEBATTACK" && this.offsetHeight > 0 && wordPositionTestY < h && wordPositionTestY > 0 && wordPositionTestX < w && wordPositionTestX > 0) {
				var text = $(this).text();
				var out = "";
				var word = "";
				var nb = 0;
				
				for(var i=0;i<text.length;i++) {
					var letter = text.charAt(i);
					var cleanLetter = letter;
					
					if(replace_array[letter] != undefined)
						cleanLetter	= replace_array[letter];
					
					if(cleanLetter.match(/^[a-zA-Z]+$/)) {
						word += letter;
						nb ++;
					}
					else {
						if(nb>0 && nb>2)
							out += "<span class='WEBATTACKENEMY'>" + word + "</span>";
						else
							out += word;
						out += letter;
						nb = 0;
						word = "";
					}
				}
				$(this).html(out);
			}
		});
	};

	
	
	/*
	== Interface elements ==
	*/	
	$('body').css('overflow','hidden');
	
	if ( ! $('#WEBATTACK-BACKGROUND')[0] ) {
		// Wrapper element
		this.background = document.createElement('div');
		this.background.id = "WEBATTACK-BACKGROUND";
		this.background.className = "WEBATTACK";
		with ( this.background.style ) {
			position = "fixed";
			zIndex = "10001";
			left = '0';
			top = '0';
			width = '100%';
			height = '100%';
			background = '#000';
			opacity = '0';
		}
		this.gameContainer.appendChild(this.background);
		
		// points
		this.points = document.createElement('span');
		this.points.id = "WEBATTACK-POINTS";
		this.points.className = "WEBATTACK";
		this.points.innerHTML = "0";
		with ( this.points.style ) {
			fontSize = "28pt";
			fontFamily = "Arial,sans-serif";
			fontWeight = "bold";
			top = "15px";
			left = "10px";
			position = "fixed";
			zIndex = "10001";
		}
		this.gameContainer.appendChild(this.points);
		
		// message
		this.message = document.createElement('div');
		this.message.id = "WEBATTACK-MESSAGE";
		this.message.className = "WEBATTACK";
		this.message.innerHTML = "GO !";
		$gameMessage = $("WEBATTACK-MESSAGE");
		with ( this.message.style ) {
			fontFamily = "Arial,sans-serif";
			position = "fixed";
			zIndex = "10002";
			textAlign = "center";
			top = "20%";
			left = "50%";
			textAlign = "center";
			lineHeight = "95px";
			fontSize = "0";
			opacity = "0";
			width = "700px";
		}
		this.gameContainer.appendChild(this.message);
		
		// combo message
		this.combo = document.createElement('div');
		this.combo.className = 'WEBATTACK-COMBO';
		document.body.appendChild(this.combo);
		with ( this.combo.style ) {
			width = "200px";
			height = "100px";
			position = "absolute";
			top = "200px";
			left = "300px";
			zIndex = "10003";
			fontSize = "0";
		}
		this.gameContainer.appendChild(this.combo);
	} else {
		this.background = $('#WEBATTACK-BACKGROUND');
		this.points = $('#WEBATTACK-POINTS');
		this.message = $('#WEBATTACK-MESSAGE');
		this.combo = $('#WEBATTACK-COMBO');
	}
	
	// Départ du jeu, mise en place des éléments visuels
	function startMessage() {
		console.log('Game start');
		$background = $('#WEBATTACK-BACKGROUND');
		$background.animate({opacity:0.3});
		
		$gameMessage = $('#WEBATTACK-MESSAGE');
		$gameMessage.css('margin-left', - $gameMessage.width()/2);
		$gameMessage.delay(200).animate({
								opacity: 1,
								fontSize: '+=100'
								}, 'slow', function() {
									$(this).delay(300).queue(function() {
										$(this).css('display','none');
										$background.css('display','none');
										launchGame();
									});
								});
	};
	
	
	function noWordsToAttack() {
		console.log('no word to attack');
		
		$background.css('display', 'block');
		$background.animate({opacity:0.3});
		
		$gameMessage.css({'display':'block', 'opacity':'0', 'font-size':'0'});
		$gameMessage = $('#WEBATTACK-MESSAGE');
		$gameMessage.text('No words to attack on this page ! Scroll and reload !');
		$gameMessage.delay(200).animate({
								opacity: 1,
								fontSize: '+=100'
								}, 'slow', function() {
									$(this).delay(300).queue(function() {
										$(this).css('display','none');
										$background.css('display','none');
										launchGame();
									});
								});
	}
	
	function launchGame(){
		var totalWordsNumber = $('.WEBATTACKENEMY').length;
		console.log("total words : "+totalWordsNumber);
		gameLength = totalWordsNumber >= 120 ? 24 : parseInt(totalWordsNumber * 0.2);
		console.log("game length : "+gameLength);
		randomize();
	};
	
	function randomize(){
		if(gameLength != 0) {
			var wordAdded = 0;
			var wordFinished = 0;
			intervalWord = window.setInterval(function(){
				wordAdded++;
				//Gestion vitesse du mot en fonction du nombre de lettres
				// switch ($('span.selected'+currentWord).length) {
					// case (this > 4 && this < 10):
						// wordSpeed = 4000;
					// break;
					// case (this > 4 && this < 10):
						// wordSpeed = 4000;
					// break;
					// case (this > 4 && this < 10):
						// wordSpeed = 4000;
					// break;
					// default:
						// wordSpeed = 4000;
					// break;
				// }
				
				
				// $('span.WEBATTACKENEMY').random().addClass('selected'+wordAdded).removeClass('WEBATTACKENEMY');
				
				
				if (wordAdded > 5) { wordLength = 7 };
				
				randomElement = $('span.WEBATTACKENEMY').random();
				
				if (randomElement.length == 0) gameFinished();
				
				// word must be < wordLength caracters
				while(randomElement.text().length > wordLength && wordLength != 7) {
					randomElement = $('span.WEBATTACKENEMY').random();	
				}
				randomElement.addClass('selected'+wordAdded).removeClass('WEBATTACKENEMY');
				
				// Clone selected word
				$('.selected'+wordAdded).clone().insertAfter('.selected'+wordAdded).removeClass('selected'+wordAdded).addClass('selectedClone'+wordAdded);
				
				selectedWordAddedX = $('.selected'+wordAdded).offset().left;
				selectedWordAddedY = $('.selected'+wordAdded).offset().top;

				this.pos = new Vector(selectedCurrentWordX, selectedCurrentWordY);

				$('.selected'+wordAdded).css({'position':'absolute', 'top':'selectedWordAddedY', 'left':'selectedWordAddedX', 'background':'yellow', 'z-index':9999}).animate({
							fontSize: '+=100'
							}, wordSpeed, 'linear', function(){
								wordFinished++;
								$(this).css({'background':'red', 'color':'red'});
								window.clearInterval(intervalMalus);
								intervalMalus = setInterval(function(){ 
									window.WEBATTACK.enemiesKilled -= 10; 
									setScore(); 
								}, 1000);
								if(wordFinished > gameLength){
									gameFinished();
									return false;
								}
							});
				if(wordAdded > gameLength){
					window.clearInterval(intervalWord);
					return false;
				}

				$selectedCurrentWord = $('.selected'+currentWord);
			} ,popSpeed);
		} else {
			noWordsToAttack();
		}
	};

	function gameFinished(){
		console.log('Game Finish');
		window.clearInterval(intervalWord);//Stop boucle
		window.clearInterval(intervalMalus);
		$.fx.off;//Stop all effects
		$background.css({'display':'block'});
		$gameMessage.empty().css('display','block').text('Game Finish !');
		$gameMessage.html($gameMessage.html() + '<br/>Score : ' + $('#WEBATTACK-POINTS').text() + '<br/>Accuracy :' +accuracy+'%');
		$('span.WEBATTACKENEMY').stop();
		$gameMessage.click(function(e) {
			$(this).css('display','none');
			$background.css('display','none');
			reset();
		});
	};
	
	function reset(){
		$('span.WEBATTACKENEMY').css({'font-size':'inherit', 'background':'inherit'});
		// startMessage();
	};
	
	
	//TODO: Accuracy
	//TODO: Words per minute
	//TODO: Quand bonne lettre tapée, ralentit la vitesse de croissance (ou pas)
	//TODO: Changer GameOver en malus, finir le jeu quand tous les mots ont été fait.
	
	//Combo
	function comboCount(){
		// console.log(goodTyping);
		if (goodTyping == 15) {
			comboMessage(2);
			//combo x2
		}else if (goodTyping == 30) {
			comboMessage(3);
			//combo x3
		}else if (goodTyping == 70) {
			comboMessage(4);
			//combo x4
		}
	};
	
	function comboMessage(val){
		comboCoeff = val;
		$('.WEBATTACK-COMBO').css({'display':'block', 'font-size':'0', 'opacity':'1'}).text("x"+val+" !").animate({
					fontSize: '+=100'
					}).delay(1000).animate({opacity:'0'});
	}
	
	
	/*
		== On typing event ==
	*/
	
	//Gestion du clavier et du word tipping
	$(document.documentElement).keydown(function (event) {
		var charCode = event.which || event.keyCode || event.charCode;
		if (charCode == 50) charCode = 69;
		if (charCode == 55) charCode = 69;
		if (charCode == 48) charCode = 65;
		if (charCode == 57) charCode = 69;
		if (charCode == 192) charCode = 85;
		var charStr = String.fromCharCode(charCode);
		var currentWordText = $('span.selected'+currentWord).text().toUpperCase();
		var currentLetterText = currentWordText.charAt(0)
		var currentLetterTextClean = currentLetterText;
		
		if(replace_array[currentLetterText] != undefined)
			currentLetterTextClean	= replace_array[currentLetterText];
		
		// If typing text match with the letter of the current word
		if(currentLetterTextClean == charStr) {
			$('span.selected'+currentWord).text($('span.selected'+currentWord).text().substring(1));
			goodTyping++;
			comboCount();
			window.WEBATTACK.enemiesKilled++;
			// If the word is complete
			if(currentWordText.length == 1) {
				selectedCurrentWordX = $selectedCurrentWord.offset().left;
				selectedCurrentWordY = $selectedCurrentWord.offset().top;

				selectedCurrentWordHeight = $selectedCurrentWord.height();
				this.pos = new Vector(selectedCurrentWordX, selectedCurrentWordY);
				addParticles(this.pos);
				$('span.selected'+currentWord).stop().removeClass('WEBATTACKENEMY selected'+currentWord).remove();
				$('.selectedClone'+currentWord).remove();
				/*if(currentWord > gameLength){
					gameFinished();
					return false;
				}*/
				//console.log(currentWord);
				currentWord++;
			}
		}else{
			goodTyping = 0;
			totalMistakes++;
			accuracy = (1 - (totalMistakes / gameLength)) * 100;
			$('span.selected'+currentWord).css('background', 'red');
			window.setTimeout(function(){
			$('span.selected'+currentWord).css('background', 'yellow')
			}, 200 );
		}
	});
	
	
	/*
		== Miscs ==
	*/
	
	function indexOf(arr, item, from){
		if ( arr.indexOf ) return arr.indexOf(item, from);
		var len = arr.length;
		for (var i = (from < 0) ? Math.max(0, len + from) : from || 0; i < len; i++){
			if (arr[i] === item) return i;
		}
		return -1;
	};
	
	function getElementFromPoint(x, y) {
		// hide canvas so it isn't picked up
		applyVisibility('hidden');
		
		var element = document.elementFromPoint(x, y);

		if ( ! element ) {
			applyVisibility('visible');
			return false;
		}

		if ( element.nodeType == 3 )
			element = element.parentNode;

		// show the canvas again
		applyVisibility('visible');
		return element;
	};
	
	function applyVisibility(vis) {
		for ( var i = 0, p; p = window.WEBATTACKGAMES[i]; i++ ) {
			p.gameContainer.style.visibility = vis;
		}
	};
	
	function addParticles(startPos) {
		var time = new Date().getTime();
		var amount = maxParticles;
		for ( var i = 0; i < amount; i++ ) {
			that.particles.push({
				// random direction
				dir: (new Vector(Math.random() * 20 - 10, Math.random() * 20 - 10)).normalize(),
				pos: startPos.cp(),
				cameAlive: time
			});
		}
	};
	
	function hasOnlyTextualChildren(element) {
		if (typeof(element) != 'undefined') {
			if ( element.offsetLeft < -100 && element.offsetWidth > 0 && element.offsetHeight > 0 ) return false;
			if ( indexOf(hiddenTypes, element.tagName) != -1 ) return true;
			
			if ( element.offsetWidth == 0 && element.offsetHeight == 0 ) return false;
			for ( var i = 0; i < element.childNodes.length; i++ ) {
				// <br /> doesn't count... and empty elements
				if (
					indexOf(hiddenTypes, element.childNodes[i].tagName) == -1
					&& element.childNodes[i].childNodes.length != 0
				) return false;
			}
			return true;
		}
	};
	
	function setScore() {
		$('#WEBATTACK-POINTS').text(window.WEBATTACK.enemiesKilled*10*comboCoeff);
	};
	
	/*
		Context operations
	*/
	
	this.ctx.clear = function() {
		this.clearRect(0, 0, w, h);
	};
	
	this.ctx.clear();
	
	this.ctx.drawLine = function(xFrom, yFrom, xTo, yTo) {
		this.beginPath();
		this.moveTo(xFrom, yFrom);
		this.lineTo(xTo, yTo);
		this.lineTo(xTo + 1, yTo + 1);
		this.closePath();
		this.fill();
	};
	
	this.ctx.tracePoly = function(verts) {
		this.beginPath();
		this.moveTo(verts[0][0], verts[0][1]);
		for ( var i = 1; i < verts.length; i++ )
			this.lineTo(verts[i][0], verts[i][1]);
		this.closePath();
	};
	
	var randomParticleColor = function() {
	return (['red', 'yellow'])[random(0, 1)];
	};
	
	this.ctx.drawParticles = function(particles) {
		var oldColor = this.fillStyle;
		
		for ( var i = 0; i < particles.length; i++ ) {
			this.fillStyle = randomParticleColor();
			this.drawLine(particles[i].pos.x, particles[i].pos.y, particles[i].pos.x - particles[i].dir.x * 10, particles[i].pos.y - particles[i].dir.y * 10);
		}
		
		this.fillStyle = oldColor;
	};
	
	function random(from, to) {
		return Math.floor(Math.random() * (to + 1) + from);
	};
	
	
	/*
		Effects loop
	*/
	var lastUpdate = new Date().getTime();
	
	this.update = function() {
		var forceChange = false;
		
		
		// ==
		// logic
		// ==
		var nowTime = new Date().getTime();
		var tDelta = (nowTime - lastUpdate) / 1000;
		lastUpdate = nowTime;
		
		
		// update particles position
		for ( var i = this.particles.length - 1; i >= 0; i-- ) {
			this.particles[i].pos.add(this.particles[i].dir.mulNew(particleSpeed * tDelta * Math.random()));
			
			if ( nowTime - this.particles[i].cameAlive > 300 ) {
				this.particles.splice(i, 1);
				forceChange = true;
				continue;
			}
			
			// check collisions
			var murdered = getElementFromPoint(this.particles[i].pos.x, this.particles[i].pos.y);
			
			if (
				murdered && murdered.tagName &&
				indexOf(ignoredTypes, murdered.tagName.toUpperCase()) == -1 &&
				hasOnlyTextualChildren(murdered) && murdered.className == "WEBATTACKENEMY"
			) {
				// console.log(murdered.className);
				didKill = true;
				this.dying.push(murdered);
				
				this.particles.splice(i, 1);
				
				continue;
			}
		}
		
		if (this.dying.length) {
			for ( var i = this.dying.length - 1; i >= 0; i-- ) {
				try {
					// If we have multiple spaceships it might have already been removed
					if ( this.dying[i].parentNode )
						window.WEBATTACK.enemiesKilled++;
					this.dying[i].parentNode.removeChild(this.dying[i]);
				} catch ( e ) {}
			}
			setScore();
			this.dying = [];
		}
		
		
		// Update score
		//$('#WEBATTACK-POINTS').text(count*10);
		
		// ==
		// drawing
		// ==
		
		// clear
		if ( this.particles.length != 300) {
			this.ctx.clear();

			if (this.particles.length) {
				this.ctx.drawParticles(this.particles);
			}
		}
		
		this.lastPos = this.pos;
	}
	
	function gameInit() {
		textRewriting();
		startMessage();
	}
	gameInit();
	
	// Start timer
	var updateFunc = function() {
		try {
			that.update.call(that);
		}
		catch (e) {
			clearInterval(interval);
			throw e;
		}
	};
	
	var interval = setInterval(updateFunc, 80);
}// End of function

$(document).ready(function(){

	if ( ! window.WEBATTACKGAMES )
	window.WEBATTACKGAMES = [];

	window.WEBATTACKGAMES[window.WEBATTACKGAMES.length] = new WebAttack();
});