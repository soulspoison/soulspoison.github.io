$(document).ready(function(){
			//首层导航切入效果
			$("#ccc1").click(function(){
				  $("#tab-one").stop(false,true).delay(200).animate({
					right: '0'
				}, 800, 'easeOutExpo');			
				  $("#ccc1").stop(false,true).fadeOut(300);
				  $("#ccc3").stop(false,true).delay(300).fadeIn(300);
  			})
			$("#ccc3").click(function(){
				$("#tab-one").stop(false,true).animate({
					right: '-120%'
				}, 800, 'easeOutExpo');
				 $("#ccc1").stop(false,true).delay(300).fadeIn(300);
				 $("#ccc3").stop(false,true).fadeOut(300);
			})
			//品牌导航切入效果
			$("#wallpaper").click(function(){
				 $("#tab-one").animate({
					right: '-120%'
				}, 800, 'easeOutExpo');	
				  $("#tab-two").delay(500).animate({
					right: '0'
				}, 800, 'easeOutExpo');			
				 
				  $("#ccc3").stop(false,true).toggle(400);
				  $("#ccc4").stop(false,true).delay(500).toggle(400);
  			})
			$("#ccc4").click(function(){
				$("#tab-two,#tab-three,#tab-four,#tab-five,#tab-six").animate({
					right: '-120%'
				}, 800, 'easeOutExpo');
				$("#tab-one").delay(500).animate({
					right: '0'
				}, 800, 'easeOutExpo');
				$("#ccc3").stop(false,true).delay(400).toggle(400);
				$("#ccc4").stop(false,true).toggle(400);
			})
			$("#tile").click(function(){
				 $("#tab-one").animate({
					right: '-120%'
				}, 800, 'easeOutExpo');	
				  $("#tab-three").delay(500).animate({
					right: '0'
				}, 800, 'easeOutExpo');			
				 
				  $("#ccc3").stop(false,true).toggle(400);
				  $("#ccc4").stop(false,true).delay(500).toggle(400);
  			})

			$("#floor").click(function(){
				  $("#tab-one").animate({
					right: '-120%'
				}, 800, 'easeOutExpo');	
				  $("#tab-four").delay(500).animate({
					right: '0'
				}, 800, 'easeOutExpo');			
				  
				  $("#ccc3").stop(false,true).toggle(400);
				  $("#ccc4").stop(false,true).delay(500).toggle(400);
  			})
			$("#diatom").click(function(){
				  $("#tab-one").animate({
					right: '-120%'
				}, 800, 'easeOutExpo');	
				  $("#tab-five").delay(500).animate({
					right: '0'
				}, 800, 'easeOutExpo');			
				  
				  $("#ccc3").stop(false,true).toggle(400);
				  $("#ccc4").stop(false,true).delay(500).toggle(400);
  			})
			$("#sofa").click(function(){
				  $("#tab-one").animate({
					right: '-120%'
				}, 800, 'easeOutExpo');	
				  $("#tab-six").delay(500).animate({
					right: '0'
				}, 800, 'easeOutExpo');			
				  
				  $("#ccc3").stop(false,true).toggle(400);
				  $("#ccc4").stop(false,true).delay(500).toggle(400);
  			})

			//点击及阻止冒泡
			$("div>ul>li").has("ul").click(function(){
				$(this).children("ul").stop(false,true).slideToggle(600);
				$("div>ul>li>ul").click(function(event){
			event.stopPropagation();
			})
			})
			//点击切换效果            
			$("#click-001").click(function(){
				$(this).children("img").css("border","#0f0 solid 2px");
				$(this).siblings("li").children("img").css("border","#fff solid 2px");
				$("#main1").stop(false,true).fadeIn(400);
				$("#main1").siblings().fadeOut(400);
			})

			$("#click-002").click(function(){
				$(this).children("img").css("border","#0f0 solid 2px");
				$(this).siblings("li").children("img").css("border","#fff solid 2px");
				$("#main2").stop(false,true).fadeIn(400);
				$("#main2").siblings().fadeOut(400);
			
			})
			$("#click-003").click(function(){
				$(this).children("img").css("border","#0f0 solid 2px");
				$(this).siblings("li").children("img").css("border","#fff solid 2px");
				$("#main1").fadeOut(400);
				$("#main1").siblings().fadeOut(400);
			})

			$("#click-011").click(function(){
				$(this).children("img").css("border","#0f0 solid 2px");
				$(this).siblings("li").children("img").css("border","#fff solid 2px");
				$("#main3").stop(false,true).fadeOut(400);
				$("#main3").siblings().fadeOut(400);
			})
			$("#click-012").click(function(){
				$(this).children("img").css("border","#0f0 solid 2px");
				$(this).siblings("li").children("img").css("border","#fff solid 2px");
				$("#main3").stop(false,true).fadeIn(400);
				$("#main3").siblings().fadeOut(400);
			})
			$("#click-013").click(function(){
				$(this).children("img").css("border","#0f0 solid 2px");
				$(this).siblings("li").children("img").css("border","#fff solid 2px");
				$("#main4").stop(false,true).fadeIn(400);
				$("#main4").siblings().fadeOut(400);
			})

			$("#click-021").click(function(){
				$(this).children("img").css("border","#0f0 solid 2px");
				$(this).siblings("li").children("img").css("border","#fff solid 2px");
				$("#main01").stop(false,true).fadeIn(400);
				$("#main01").siblings().fadeOut(400);
			})
			$("#click-022").click(function(){
				$(this).children("img").css("border","#0f0 solid 2px");
				$(this).siblings("li").children("img").css("border","#fff solid 2px");
				$("#main02").stop(false,true).fadeIn(400);
				$("#main02").siblings().fadeOut(400);
			})
			$("#click-023").click(function(){
				$(this).children("img").css("border","#0f0 solid 2px");
				$(this).siblings("li").children("img").css("border","#fff solid 2px");
				$("#main03").stop(false,true).fadeIn(400);
				$("#main03").siblings().fadeOut(400);
			})

})
$(function(){
        //快捷按钮效果
        $(".plug-menu").click(function(){
        var span = $(this).find("span");
        if(span.attr("class") == "open"){
                span.removeClass("open");
                span.addClass("close");
                $(".plug-btn").removeClass("open");
                $(".plug-btn").addClass("close");
        }else{
                span.removeClass("close");
                span.addClass("open");
                $(".plug-btn").removeClass("close");
                $(".plug-btn").addClass("open");
        }
        });
        $(".plug-menu").on('touchmove',function(event){event.preventDefault();});
});
	
//阻止手机端触摸事件
	document.body.addEventListener('touchmove', function (event) {
    event.preventDefault();
}, false);