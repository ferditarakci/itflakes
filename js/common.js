/*******************
 *
 * Mobile detection
 * 
 *******************/
var ua = navigator.userAgent.toLowerCase();
var isAndroid = /android/i.test(ua);
var isGingerbread = /android 2\.3/i.test(ua);
var isHoneycombOrNewer = /android [3-9]/i.test(ua);
var isFroyoOrOlder = isAndroid && !isGingerbread && !isHoneycombOrNewer;
/*******************
 *
 * Preloading
 * 
 *******************/

$(function () {
    $("body").queryLoader2({
        barColor: "#000000",
        backgroundColor: "#FFFFFF",
        percentage: true,
        barHeight: 1,
        completeAnimation: "fade",
        minimumTime: 800,
        onComplete: SiteFonksiyon
    });
});




function SiteFonksiyon() {
	/*******************
	 *
	 * URL HASH
	 *
	 *******************/
	function urlHash() {
		var hURL = window.location.hash.split("/")[2];
		if(typeof hURL === "undefined") {
			hURL = "home";
		}
		return hURL; 
	}
	
	//alert(urlHash())
	/*******************
	 *
	 * RENKLER
	 *
	 *******************/
	function colors(name){
		switch(name) {
			case "healthcare":
				return temaOrderRenk["home"][1]/*"#ccdc29"*/;
				break;
			case "business":
				return  temaOrderRenk["home"][2]/*"#00a9cc"*/;
				break;
			case "empty":
				return "transparent";
				break;
		}
	}	  
	/*******************
	 *
	 * DEĞİŞKENLER
	 * 
	 *******************/

	// RUBS
	var links = [
		"home",
		"home-page",
		"about-us",
		"products-and-services",
		"clients-and-partners",
		"circle",
		"follow-us"
	];

	var order = {
		"home" : 0,
		"home-page" : 1,
		"about-us" : 2, 
		"products-and-services" : 3, 
		"clients-and-partners" : 4,
		"circle" : 5, 
		"follow-us" : 6
	};

	var temaOrderRenk = {
		"home" 					: [0, "#ccdc29", "#00a9cc"],
		"home-page" 			: [1, "#ccdc29", "#00a9cc"],
		"about-us" 				: [2, "#ccdc29", "#00a9cc"], 
		"products-and-services" : [3, "#ccdc29", "#00a9cc"], 
		"clients-and-partners" 	: [4, "#eeef8d", "#8cc6ec"], 
		"circle"				: [5, "#ccdc29", "#00a9cc"], 
		"follow-us" 			: [6, "#ccdc29", "#00a9cc"]
	};
/*
	var rightColor = {
		"home" : "#00a9cc",
		"home-page" : "#00a9cc",
		"about-us" : "#00a9cc", 
		"products-and-services" : "#00a9cc", 
		"clients-and-partners" : "#00a9cc", 
		"circle" : "#8cc6ec", 
		"follow-us" : "#00a9cc"
	};
*/






	// VARS     
	var wrapper = $("#wrapper");
	var arrows;
	var s = $("#healthcare");
	var c = $("#business");
	var both = $("#healthcare, #business");
	both.find(".background").hide();

	// BOYUTLAR
	var w = wrapper.width();
	var h = wrapper.height();
	var deplacement = w * 0.1;

	// ARKAPLAN KENARLARI
	var bords = both.find(".bord");   
	var bord;
	var bordHealthcare;
	var bordBusiness;
	if(!isGingerbread && !isFroyoOrOlder) {
		bordHealthcare = Raphael("bordHealthcare", 100, h);
		bordBusiness = Raphael("bordBusiness", 100, h); 
	} else {
		$("#bordHealthcare").css({"background-color": temaOrderRenk[urlHash()][1] }).hide(); /*"#ccdc29"*/
		$("#bordBusiness").css({"background-color" : temaOrderRenk[urlHash()][2] }).hide(); /*"#0bb7eb"*/
	}
	// AKTİF, PASİF VE TİP
	var active;
	var unactive;
	var type;

	// SABİT BOYUT
	var fixedRatio = 0.9;

	// ORIENTATION
	var orientation = "landscape";

	// FARE HAREKETİNE İZİN VERİLSİN Mİ?
	var mouseMove = true;
	var home = true;

	/*******************
	 *
	 * YENİDEN BOYUTLANDIRMA
	 * 
	 *******************/
	function resizeHandler() {
		// PENCERE BOYUTLARI
		w = wrapper.width();
		h = wrapper.height();
		deplacement = w * 0.1;
		if(!isGingerbread && !isFroyoOrOlder) {
			bordHealthcare.setSize(100, wrapper.height());
			bordBusiness.setSize(100, wrapper.height());
		}

		if(urlHash() == "home" || $(window).height() < 400) {
			$(".navigation").hide()
		} else {
			$(".navigation").show()
		}

		// İÇERİK BOYUTLARI
		both.find(".inner").each(function(){
			var elmt = $(this);
			var visible = elmt.parent().is(":visible");
			elmt.parent().show();
			elmt.css("height", "auto");
			var H = elmt.outerHeight();
			if(H > h-300) {
				elmt.height(h-135);
				elmt.css({
					"marginTop" : "135px",
					"top"		: "0px"
				});
				elmt.find(".overview").css("paddingBottom", "200px");
			} else {
				elmt.height(H);
				elmt.css({
					"marginTop" : -(H/2)+"px",  
					"paddingTop": "0px",
					"top"		: "50%" 
				});
				elmt.find(".overview").css("paddingBottom", "0px");
			}
			var scroll = elmt.data("tsb");
			if(scroll){
				scroll.update("relative");
			}
			if(!visible){
				elmt.parent().hide();
			}
		});  
		
		// mobile orientation
		if(window.innerHeight > window.innerWidth){
		    orientation = "portrait";
		} else {
			orientation = "landscape";
		}
	}
	$(window).resize(function(){
		resizeHandler();
	}).trigger("resize");
	/*
	$(window).load(function(){
		resizeHandler();
	});*/


	/*******************
	 *
	 * ALT SAYFA SEKMELERİ
	 * 
	 *******************/	  
	var tab_id = $("div.tabs, div.sub-tabs");
	if (tab_id.length > 0) { //, event: "mouseover"
		tab_id.tabs({ ajaxOptions: {cache: false}/*, fx: {opacity:"toggle", duration:150}*/ });
		tab_id.find("li > a").on("click", function(){
			setTimeout(function() {
				resizeHandler()
			}, 200)
		});
	}

	var inner_row = $("div.hover-active");
	if (inner_row.length > 0) {
		var Timer;
		inner_row.hover(
			function (e) {
				e.preventDefault();
				var thiss = $(this);
				clearTimeout(Timer);
				thiss.addClass("active").find(".hide").show();
				thiss.find(".readmore").hide();
				resizeHandler();
			},
			function (e) {
				e.preventDefault();
				var thiss = $(this);
				clearTimeout(Timer);
				Timer = setTimeout(function() {
					inner_row.removeClass("active").find(".hide").hide();
					thiss.find(".readmore").show();
					resizeHandler();
				}, 1000);
			}
		);
	}

	var client_list = $(".clients ul.list li");//alert(client_list.length)
	if (client_list.length > 0) {
		client_list.hover(
			function (e) { $(this).find(".detail").stop().fadeTo(500, 1) },
			function (e) { $(this).find(".detail").stop().fadeTo(500, 0) }
		)
	}

	//$("#element").css("borderRadius", "10px");
	//$("#another").css("border-radius", "20px");
	//$(".fast a").css("transition", "none");
	$("a").not(".fast a").css({
		"-webkit-transition" : "all .50s linear",
		"-moz-transition" : "all .50s linear",
		"-ms-transition" : "all .50s linear",
		"-o-transition" : "all .50s linear",
		"transition" : "all .50s linear"
	});

	$(".inner-row .img-round-text").css({
		"border-radius" : "0px 10px 10px 0px"
	});

	$(".clients .detail").css({
		"border-radius" : "10px"
	});



	/*******************
	 *
	 * DEVICE ORIENTATION
	 * 
	 *******************/	  
	/*if (window.DeviceMotionEvent!=undefined) {
		window.ondevicemotion = function(event) {
			var value = 0;
			if(orientation == "landscape") {
				value = 1-((event.accelerationIncludingGravity.y+5)/10);   
			} else {
				value = 1-((event.accelerationIncludingGravity.x+5)/10); 
			}
			mouseUpdate(w*value);
		}    
	}*/
	/*window.ondeviceorientation = function(event) {
		//$("#gamma").text("g::"+Math.round(event.gamma)+"||a::"+Math.round(event.alpha)+"||b::"+Math.round(event.beta)); 
		var value = event.beta/50;
		if(orientation == "landscape") {
			value = 1-((event.beta+50)/100);
		} else {
			value = 1-((event.gamma+50)/100);
		}
		mouseUpdate(w*value);
	}*/  


	/*******************
	 *
	 * FARE HAREKETİ
	 *
	 *******************/	 	 	 	
	$("#wrapper").mousemove(function(event){
		mouseUpdate(event.clientX);
	});


	/*******************
	 *
	 * FARE HAREKETİNE GÖRE KORDİNANT GÜNCELLEMELERİ
	 *
	 *******************/	
	function mouseUpdate(x){

		if(!home && mouseMove) {
			/*******************
			 *
			 * AKTİF BÖLÜM
			 * 
			 *******************/ 		 		
			var ratioX = x/(w/2) - 1; 		
			var big;	
			if(type == "healthcare") {
				big = w * fixedRatio + (deplacement * (-ratioX));
			} else {				
				big = w * fixedRatio + (deplacement * ratioX);
			}
			var small = w - big;

			// AKTİF HAREKET
			if(type == "healthcare") {
				TweenMax.to(active, 0.5, {css:{width:big, left:0}, onUpdate:updateBgWidth, onUpdateParams:[active]});
			} else {
				TweenMax.to(active, 0.5, {css:{width:big, left:small}, onUpdate:updateBgWidth, onUpdateParams:[active]});
			}

			// PASİF HAREKET
			if(type == "healthcare") {
				TweenMax.to(unactive, 0.5, {css:{width:small+100, left:big-100}, onUpdate:updateBgWidth, onUpdateParams:[unactive]});
			} else {
				TweenMax.to(unactive, 0.5, {css:{width:small+100, left:0}, onUpdate:updateBgWidth, onUpdateParams:[unactive]});     
			}

			// TRIANGLE
			if(!isGingerbread && !isFroyoOrOlder) {
				bord.clear();
				var max;
				if(type == "healthcare") {
					max = 90*(x/w)+10; 				 			
					bord.path("M0 0 L"+max+" 0 L0 "+h+" Z").attr("fill", temaOrderRenk[urlHash()][1]/*colors(active.attr("id"))*/).attr("stroke-opacity", 0);
					$("#healthcare .background").css("background-color", temaOrderRenk[urlHash()][1]);
				} else {
					max = 90*((w-x)/w)+10;
					bord.path("M"+(100)+" 0 L"+(100)+" "+h+" L"+(100-max)+" "+h+" Z").attr("fill", temaOrderRenk[urlHash()][2]/*colors(active.attr("id"))*/).attr("stroke-opacity", 0);
					$("#business .background").css("background-color", temaOrderRenk[urlHash()][2]);
				}
			}

		} else if(home && mouseMove) {
			/*******************
			 *
			 * GİRİŞ SAYFASI
			 *
			 *******************/
			 if(active && active.length > 0) {
				if(!isGingerbread && !isFroyoOrOlder) {
					bord.clear();
				}
				var max = 90*(Math.abs(x/w-0.5)*-2+1)+10;
				if(type == "healthcare") {
					TweenMax.to(s, 1, {css:{width:(w-x+50)}, onUpdate:updateBgWidth, onUpdateParams:[s]});
					TweenMax.to(c, 1, {css:{width:x+50, left:w-x-50}, onUpdate:updateBgWidth, onUpdateParams:[c]});
					if(!isGingerbread && !isFroyoOrOlder) {
						bordHealthcare.path("M0 0 L"+max+" 0 L0 "+h+" Z").attr("fill", temaOrderRenk[urlHash()][1]/*colors("healthcare")*/).attr("stroke", "none");		 			
						$("#healthcare .background").css("background-color", temaOrderRenk[urlHash()][1]);
					}
				} else {
					TweenMax.to(s, 1, {css:{width:(w-x+50)}, onUpdate:updateBgWidth, onUpdateParams:[s]});
					TweenMax.to(c, 1, {css:{width:x+50, left:w-x-50}, onUpdate:updateBgWidth, onUpdateParams:[c]}); 
					if(!isGingerbread && !isFroyoOrOlder) {
						bordBusiness.path("M"+(100)+" 0 L"+(100)+" "+h+" L"+(100-max)+" "+h+" Z").attr("fill", temaOrderRenk[urlHash()][2]/*colors("business")*/).attr("stroke", "none");
						$("#business .background").css("background-color", temaOrderRenk[urlHash()][2]);
					}
				}
			}
		}
	}

	// ARKAPLAN GENİŞLİĞİNİ GÜNCELLEME
	function updateBgWidth(elmt) {
		elmt.find(".background").width(elmt.width()-100);
	}

	/*******************
	 *
	 * CLICK AU CLICK
	 *
	 *******************/
	both.bind("click touchstart", function(e) {

		if($(this).hasClass("unactive") || home) {
			mouseMove = true; 

			active = $(this).addClass("active").removeClass("unactive");
			unactive = both.not(active).addClass("unactive").removeClass("active");

			type = active.attr("id");
			wrapper.removeAttr("class").addClass(type);

			TweenMax.to(active, 0.3, {css:{autoAlpha:1}});
			TweenMax.to(unactive, 0.3, {css:{autoAlpha:0.1}});
			active.find(".bord, .background").show();
			unactive.find(".bord, .background").hide();

			if(active.attr("id") == "healthcare") {
				bord = bordHealthcare;
				TweenMax.to(active, 1, {css:{width:w*fixedRatio+100}, onUpdate:updateBgWidth, onUpdateParams:[active]});
			} else {
				bord = bordBusiness;
				TweenMax.to(active, 1, {css:{width:w*fixedRatio+100, left:w*(1-fixedRatio)-100}, onUpdate:updateBgWidth, onUpdateParams:[active]});		
			}
			if(unactive.attr("id") == "healthcare") {
				TweenMax.to(unactive, 1, {css:{width:w*(1-fixedRatio)}, onUpdate:updateBgWidth, onUpdateParams:[unactive]});  
			} else {
				TweenMax.to(unactive, 1, {css:{width:w*(1-fixedRatio), left:w*fixedRatio}, onUpdate:updateBgWidth, onUpdateParams:[unactive]});
			}

			active.find("> .cache").addClass("hidden");
			unactive.find("> .cache").removeClass("hidden");

			/*******************
			 *
			 * PREMIER CLICK
			 * 
			 *******************/

			if(home) {
				var _goto = currentRub.data("rub") == "home" ? "home-page" : currentRub.data("rub");
				home = false;    
				changeRub(_goto);
				nav.show().parent().removeClass("hide");
				TweenMax.from(nav, 0.3, {css:{autoAlpha:0}});
				if(isGingerbread || isFroyoOrOlder) {
					$(".bord").show();
				}
			}

			/*
			if(type == "healthcare"){
				mouseUpdate(w);
			} else {                 
				mouseUpdate(1);
			}*/

			updateUrl();
		}
		
		
	});	
	function updateUrl() {
		// URL DEĞİŞİMİ
		var rub;
		var side;

		if(type) {
			side = "/" + type;
		} else {
			side = "";
		}
		//alert(both.data("rub"))

		if(currentRub) {
			rub = currentRub.data("rub");
		} else {
			rub = "home-page";
		}
		//alert(rub)
		//window.location.hash = "#/" + rub + "/" + side;
		window.location.hash = "#" + side + "/" + rub;

		//$.get("ajax.asp", {section : "healthcare", page: "about"}, function(veri){ $("div[data-rub=about-us] .inner").html(veri) });
		//tab_id.tabs("refresh");

		if(type == "healthcare") {
			mouseUpdate(w-1);
			$(".service1").show();
			$(".service2").hide();
			$("#navigation h1").removeClass("business");
		} else {
			mouseUpdate(1);
			$(".service2").show();
			$(".service1").hide();
			$("#navigation h1").addClass("business");
		}

	}

	/*******************
	 *
	 * HOVER ON RUB
	 *
	 *******************/
	both.hover(function() {

		var elmt = $(this);
		var other = both.not(elmt);

		if(home) {
			// ON EST SUR LA HOME
			active = elmt.addClass("active").removeClass("unactive");
			unactive = both.not(elmt).addClass("unactive").removeClass("active");

			if(active.attr("id") == "healthcare") {
				bord = bordHealthcare;
			} else {
				bord = bordBusiness;
			}

			active.find(".bord, .background").show();
			unactive.find(".bord, .background").hide();

			type = active.attr("id");
			wrapper.removeAttr("class").addClass(type);

		} else if(elmt.hasClass("unactive")) {

			// ON EST PAS SUR LA HOME
			// on survole l'inactif
			TweenMax.killTweensOf(both);
			mouseMove = false;
			var width = w*0.75;
			var toLeft = w - (w*0.75);
			var a = 0;
			var b = 0.6;
			if(type != "healthcare") {
				TweenMax.to(active, 0.8, {css:{width:width+100, left:toLeft-100}, ease:Elastic.easeOut.config(a, b), onUpdate:updateBgWidth, onUpdateParams:[active]});
				TweenMax.to(unactive, 0.8, {css:{width:toLeft, opacity:0.4, left:0}, ease:Elastic.easeOut.config(a, b), onUpdate:updateBgWidth, onUpdateParams:[unactive]});
			} else {
				TweenMax.to(active, 0.8, {css:{width:width+100, left:0}, ease:Elastic.easeOut.config(a, b), onUpdate:updateBgWidth, onUpdateParams:[active]});
				TweenMax.to(unactive, 0.8, {css:{width:toLeft, opacity:0.4, left:width}, ease:Elastic.easeOut.config(a, b), onUpdate:updateBgWidth, onUpdateParams:[unactive]});
			}
		}
	},
	function() {
		mouseMove = true;  
		var elmt = $(this);  
		if(!home && elmt.hasClass("unactive")) {
			TweenMax.to(elmt, 0.3, {css:{opacity:0.1}});
		}
	});

	/*******************
	*
	* NAVIGATION CLAVIER
	* 
	*******************/
	$(document.documentElement).keydown(function(event) {

		if(typeof active != "undefined" && typeof unactive != "undefined") {

			// SI HAUT OU BAS, ET HOME
			if((event.which == 38 || event.which == 40) && home) {
				home = false;
				nav.show().parent().removeClass("hide");
				TweenMax.from(nav, 0.3, {css:{autoAlpha:0}});
				if(event.which == 38) $("#healthcare").click();
				else if (event.which == 38) $("#business").click();
			}

			// SELON LA TOUCHE
			switch(event.which) {
				// HAUT
				case 38:
					arrows.find(".prev").click();
					break;
				// BAS
				case 40:
					arrows.find(".next").click();
					break;
				// GAUCHE
				case 37:
					s.click();
					break;
				// DROIT
				case 39:
					c.click();
					break;
			}
		}
	});

	/*******************
	*
	* RUBS MANAGEMENT
	* 
	*******************/
	var currentRub = null;
	var nav = $("#navigation ul");
	//nav.hide().parent().addClass("hide");

	nav.find("a").click(function(){
		var elmt = $(this);
		var link = elmt.attr("href");//alert(link.substr(1))
		changeRub(link.substr(1)); //alert(link.substr(1))

		//alert(temaOrderRenk[urlHash()][1])
		//$("#healthcare .background").css("background-color", leftColor[link.substr(3)]);

		return false;
	});


	function changeRub(link, time) {
		if (typeof time == "undefined") {
			time = 1.2;
		}

		if(link == "home") {
			$("#navigation").hide();
			wrapper.find(" > .navigation").hide();
		} else {
			$("#navigation").show();
			wrapper.find(" > .navigation").show();
		}

		if(order[link] < 2) {
			TweenMax.to(wrapper.find(" > .navigation .prev").removeClass("active"), 0.3, {css:{opacity:0.2}});
		} else {
			TweenMax.to(wrapper.find(" > .navigation .prev").addClass("active"), 0.3, {css:{opacity:1}});
		}

		if(order[link] == links.length-1) {
			TweenMax.to(wrapper.find(" > .navigation .next").removeClass("active"), 0.3, {css:{opacity:0.2}});
		} else {
			TweenMax.to(wrapper.find(" > .navigation .next").addClass("active"), 0.3, {css:{opacity:1}});
		}

		if(!currentRub || currentRub.data("rub") != link) {
			currentRub = both.find(".container").filter(function() {
				return $(this).data("rub") == link;
			});
			//alert(Object.size(temaOrderRenk))
			//alert(Object.size(order))
			//alert($(".home-page").prop('tagName'))
			var currentId = order[currentRub.data("rub")];
			for(var i = 0; i<Object.size(order); i++){
				var rubTw = both.find(".container").filter(function() {
					return order[$(this).data("rub")] == i;
				});
				TweenMax.to(rubTw.show(), time, {css:{top:(-(currentId-i)*100)+"%"}, ease:Elastic.easeOut.config(0.5, 1.5), onComplete:resetRub, onCompleteParams:[rubTw]});
			}
		}

		nav.find("a").removeClass("active");
		var activeLink = nav.find("a[href=\"#"+ link +"\"]");
		activeLink.addClass("active");


		// RECALAGE DES TRIANGLES
		//if(type == "healthcare"){
		//	mouseUpdate(w-1);
		//} else {                 
		//	mouseUpdate(1);
		//}

		updateUrl();

	}

	// ON CACHE LES RUBRIQUES
	function resetRub(rub){
		if(!rub.is(currentRub)){
			rub.hide();
		}
	}

	/*******************
	*
	* INITIALISATION DES CONTAINERS
	*
	*******************/
	both.find(".container").each(function() {
		var elmt = $(this);

		var gifPic;
		if(elmt.data("rub") != "home") {
			if(elmt.parent().attr("id") == "healthcare") {
				gifPic = $("<img />").attr({"src" : "img/gif-image.gif"});
			} else {
				gifPic = $("<img />").attr({"src" : "img/gif-image.gif"});
			}
			gifPic = gifPic.css({"width" : 750, "height" : 150, "margin-bottom" : 20});
			elmt.find(".inner").prepend( gifPic );
		}

		elmt.prepend('<div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div>');
		elmt.find(".inner").wrapInner('<div class="overview" />').wrapInner('<div class="viewport" />').tinyscrollbar(); //{sizethumb:150}
		$(".scrollbar .track .thumb").css({"opacity" : 0.2, "border-radius" : "20px"}).find(".end").css("opacity", .2);
	});
	/*******************
	*
	* NAVIGATION AUX FLECHES
	*
	*******************/
	wrapper.each(function() {

		arrows = wrapper.find(".navigation");
		arrows.find(".prev").click(function(){
			var currentId = order[currentRub.data("rub")];
			if((currentId-1) > 0) {
				changeRub(links[currentId-1]);
			}
			return false;
		});
		arrows.find(".next").click(function(){
			var currentId = order[currentRub.data("rub")];
			if((currentId+1) < links.length) {
				changeRub(links[currentId+1]);
			}
			return false;			
		});

	});      
	/*******************
	*
	* PAGE clients
	*
	*******************/
	function initclients() {
		$(".clients").each(function() {
			var elmt = $(this);
			elmt.find(".mosaique .image").each(function() { 
				var img = $(this);
				var id = img.attr("id");
				var mos = img.parent();
				var txt = mos.find("#" + id + "-txt");
				var bg = $('<img src="img/bg-portrait.png" width="200" height="200" class="bgportrait" alt="" />').appendTo(img);  

				var angle = "0";
				if(img.hasClass("left")) {
					angle = "180";
				} else if(img.hasClass("right")) {
					angle = "0";
				} else if(img.hasClass("bottom")) {
					angle = "89.9";
				}

				if($("html").hasClass("lte8")) {

					TweenMax.set(bg, {css:{rotation:angle}});
					txt.add(bg).css("visibility", "hidden");

					img.bind("mouseenter touchstart", function() {
						txt.add(bg).css("visibility", "visible");
						return false;
					}).bind("mouseleave touchend", function() {
						txt.add(bg).css("visibility", "hidden");
						return false;
					});

				} else {

					TweenMax.set(bg, {css:{scale:0.2, rotation:angle, transformOrigin:"center center"}});
					TweenMax.set(txt, {css:{autoAlpha:0}});

					img.bind("mouseenter touchstart", function() {
						TweenMax.killTweensOf([bg, txt]);
						TweenMax.to(bg, 0.3, {css:{scale:1, transformOrigin:"center center"}, ease:Quad.easeOut});
						TweenMax.to(txt, 0.3, {css:{autoAlpha:1}, delay:0.2});
					}).bind("mouseleave touchend", function() {
						TweenMax.killTweensOf([bg, txt]);
						TweenMax.to(bg, 0.3, {css:{scale:0.2, transformOrigin:"center center"}, ease:Quad.easeIn});
						TweenMax.to(txt, 0.3, {css:{autoAlpha:0}});
					});
				}

			});
		});
	}

	/*******************
	*
	* İLETİŞİM FORMU
	*
	*******************/
	var submited = false;
	var validate = false;
	$("#career-form, #consultancy-form").submit(function(event) {

		if(!submited && !validate) {

			submited = true;

			var form = $(this);

			var nom = form.find("input[name=first_name]").val();
			var number = form.find("input[name=number]").val();
			var email = form.find("input[name=mail]").val();
			var file = form.find("input[name=file]").val();
			var message = form.find("input[name=name]").val();

			var valid = true;

			form.find(".error, .retour").remove();
			var error = $("<p class=\"error\"></p>").bind("mouseenter touchstart", function() {
				TweenMax.to($(this), 0.3, {css:{autoAlpha:0}, onComplete:function(){$(this).remove();}});
			});

			if(isBlank(nom)) {
				valid = false;
				var err = error.clone(true).text("Lütfen adınızı girin.").insertAfter($("#nom"));
				TweenMax.from(err, 0.3, {css:{autoAlpha:0}});
			}

			if(isBlank(email)) {
				valid = false;
				var err = error.clone(true).text("Lütfen e-posta adresinizi girin.").insertAfter($("#email"));
				TweenMax.from(err, 0.3, {css:{autoAlpha:0}});
			} else if(!reg.test(email)) {
				valid = false;
				var err = error.clone(true).text("E-posta adresiniz geçerli değil, lütfen kontrol edin.").insertAfter($("#email"));
				TweenMax.from(err, 0.3, {css:{autoAlpha:0}});
			}

			if(isBlank(message)) {
				valid = false;
				var err = error.clone(true).text("Web sitenizden bir e-posta gönderildi.").insertAfter($("#message"));
				TweenMax.from(err, 0.3, {css:{autoAlpha:0}});
			}

			if(valid) {
				$.post($(this).attr("action"), $(this).serialize(), function(data, textStatus) {
					submited = false;
					if(data == 1) {
						validate = true;
						TweenMax.to($("#submit").css("cursor", "default"), 1, {css:{autoAlpha:0.2}});
						form.append($('<p class="retour ok">Mesajınız gönderildi!</p>'));
						TweenMax.from(form.find(".retour"), 0.3, {css:{autoAlpha:0}});
						$(window).trigger("resize");
					}
				});
			} else {
				submited = false;
				form.append($('<p class="retour">Formu eksiksiz doldurun.</p>'));
				TweenMax.from(form.find(".retour"), 0.3, {css:{autoAlpha:0}});
			}

			$(window).trigger("resize");

		}
		console.log(submited);

		return false;
	});

	/*******************
	*
	* GO HOME
	* 
	*******************/  
	// LAUNCH
  	var toShow = $("#wrapper, #navigation");
  	toShow.css("visibility", "visible");
  	//TweenMax.from(toShow, 1, {css:{autoAlpha:0}});
	// clients
	//initclients();

	// FIRST LAUNCH
	function checkUrl() {
		// LAUNCH HOME
		var fullUrl = window.location.hash; //alert(fullUrl)
		var urls = fullUrl.split("/");
		if(urls.length == 3) {
			if($.inArray(urls[2], links)) {
				//home = false;
				changeRub(urls[2], 0);
				//nav.find('a[href="#'+urls[1]+'"]').click();
				if(urls[1] == "healthcare") {
					s.click();
				} else if(urls[1] == "business") {
					c.click();
				} else {
					s.click();
				}
			} else {
				changeRub("home", 0);
			}
		} else {
			changeRub("home", 0);
		}
	}
	checkUrl();

	// RESIZE
	$(window).trigger("resize");
}
/*******************
*
* JS
* 
*******************/
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
    	if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

var reg = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$', 'i');
