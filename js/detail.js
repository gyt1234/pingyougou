$(function(){
	//tab栏
	$(".tab_list li").click(function(){
		$(this).addClass("current").siblings().removeClass("current");
		var index = $(this).index();
		$(".aside .tab_con").eq(index).show().siblings(".tab_con").hide();
	});

	//商品介绍tab栏切换
	$(".detail_tab_list li").click(function(){
		$(this).addClass("current").siblings().removeClass("current");
		var index = $(this).index();
		$(".item").eq(index).show().siblings(".item").hide();
	});

	//商品图片切换
	$(".list_item li img").mouseover(function(){
		$(this).parent().addClass("current").siblings().removeClass("current");
		$(".preview_img img").attr("src",this.src);
	});

});