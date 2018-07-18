//*****************//
// UI TEAM
// 2012 JINLIANG	
//*****************//
$.fn.jselect=function(options){
    options = options || {};
    var callbackvalue;
	var _self=$(this);
	var _childselect=$("#"+options.lll);
	var ajaxurl=options.url;
	var thisul=$(this).find("ul");
	return _self.each(function(e) {
        setselect($(this));
	})

   function setselect(obj){
       obj.find("a").click(function(e){
       var inputvalue=$(this).attr("rel");
       //alert(_self.find("input").attr("value"));
       obj.find("input").attr("value",inputvalue); 
	   callbackvalue=inputvalue;
	   if(obj.find(".selectul").is(":hidden")){
           $(this).parent().parent().show();
            }else if($(this).find(".selectul").show()){
           $(this).parent().parent().hide();
            }
           e.stopPropagation();
	 });
   	 /*
	 obj.find(".selectul").mouseleave(function(e){
	    if($(this).show()){
                $(this).hide();
            }
            e.stopPropagation();
	 });
	 */

       obj.find("input").focus(function(e){
           //if(obj.find(".selectul").is(":hidden")){
           //    $(this).parent().find(".selectul").show();
           //}
           //e.stopPropagation();
	 }).click(function(e){
           if(obj.find(".selectul").is(":hidden")){
         $(this).parent().find(".selectul").show();
            }
           else if(obj.find(".selectul").show()){
               $(this).parent().find(".selectul").hide();
           }
            e.stopPropagation();
	 });
	 
	 obj.find("li:odd").css("background","#f4f4f4");
   }
	
	
}
	
