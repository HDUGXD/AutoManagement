var myApp = new Framework7();
var $$ = Dom7;

var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true
});
/*$$("#submit").on("click",function(){
	$$(".mainmenu li").each(function(){
		if($$(this).children("span").hasClass("prise")){
			var priseVal = $$(this).children("span");
		}
	});
});*/

$$("#goodprise").on("click",function(){
	$$(this).removeClass("goodprise").addClass("goodprise-3 prise");
	$$("#midprise").removeClass("midprise-3 prise").addClass("midprise");
	$$("#badprise").removeClass("badprise-3 prise").addClass("badprise");
});
$$("#midprise").on("click",function(){
	$$(this).removeClass("midprise").addClass("midprise-3 prise");
	$$("#goodprise").removeClass("goodprise-3 prise").addClass("goodprise");
	$$("#badprise").removeClass("badprise-3 prise").addClass("badprise");
});
$$("#badprise").on("click",function(){
	$$(this).removeClass("badprise").addClass("badprise-3 prise");
	$$("#midprise").removeClass("midprise-3 prise").addClass("midprise");
	$$("#goodprise").removeClass("goodprise-3 prise").addClass("goodprise");
});
