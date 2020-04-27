window.addEventListener('load',function(){
	//轮播图
	(function(){
		//1.获取需要的标签
		var content = document.getElementsByClassName('focus_content')[0];
		var contentImg = content.children;
		var prev = document.getElementsByClassName('arrow-l')[0];
		var next = document.getElementsByClassName('arrow-r')[0];
		var bottom = document.getElementsByClassName('circle')[0];

		//2.全局索引
		var now = 0;
		 
		 //3.动态创建指示器li
		 for(var i = 0; i < contentImg.length; i++){
		 	var li = document.createElement('li');
		 	bottom.insertBefore(li, bottom.children[0]);
		 }

		 //4.让第一个li选中
		 bottom.children[0].className = 'current';

		 //5.让除了第一张的幻灯片定位
		 var scrollImgWidth = content.offsetWidth;
		 for(var j = 1; j < contentImg.length; j++){
		 	contentImg[j].style.left = scrollImgWidth + 'px';
		 }

		 //6.处理左右点击
		 //点击左边
		 prev.addEventListener('click',function(){
		 	/*
		 	1.当前可视区域的幻灯片快速右移
			2.下一张幻灯片出现在可视区域的左边
			3.让这张幻灯片做动画进入
			*/
			tool.buffer(contentImg[now], {"left":scrollImgWidth});
			now--;
			//边界判断
			if(now < 0){
				now = contentImg.length - 1;
			}
			contentImg[now].style.left = -scrollImgWidth + 'px';
			tool.buffer(contentImg[now], {"left": 0});
			//切换索引
		 	changeIndex();

		 });

		 //点击右边
		 next.addEventListener('click',function(){
		 	autoPlay();
		 });

		 //7.处理底部点击
		 for(var k = 0; k < bottom.children.length; k++){
		 	//取出单个li标签
		 	var li = bottom.children[k];
		 	//监听鼠标进入
		 	(function(index){
		 		li.addEventListener('mouseover',function(){
		 			//对比
		 			if(index > now){
		 				tool.buffer(contentImg[now], {"left":-scrollImgWidth});
		 				contentImg[index].style.left = scrollImgWidth + 'px';
		 			}else if(index < now){
		 				tool.buffer(contentImg[now], {"left":scrollImgWidth});
		 				contentImg[index].style.left = -scrollImgWidth + 'px';
		 			}
		 			now = index;
		 			tool.buffer(contentImg[now], {"left":0});
		 			//切换索引
		 			changeIndex();
		 		});
		 	})(k);
		}

		 //8.切换底部索引
		 function changeIndex(){
		 	for(var i = 0; i < bottom.children.length; i++){
		 		bottom.children[i].className = '';
		 	}
		 	bottom.children[now].className = 'current';
		 }

		function autoPlay(){
			/*
		 	1.当前可视区域的幻灯片快速左移
			2.下一张幻灯片出现在可视区域的右边
			3.让这张幻灯片做动画进入
			*/
			tool.buffer(contentImg[now], {"left":-scrollImgWidth});
			now++;
			//边界判断
			if(now >= contentImg.length){
				now = 0;
			}
			contentImg[now].style.left = scrollImgWidth + 'px';
			tool.buffer(contentImg[now], {"left": 0});
			//切换索引
		 	changeIndex();
		}

		//9.定时器,让幻灯片从左到右自动运动起来
		var time = setInterval(autoPlay, 2000);

		//10.设置和清除定时器
		content.parentNode.addEventListener('mouseover',function(){
			clearInterval(time);
		});
		content.parentNode.addEventListener('mouseout',function(){
			setInterval(time,2000);
		});

	})();

	 //回到顶部
	(function(){
		//1.获取需要的标签
		var top = document.getElementsByClassName('top')[0];

		 //2.定义变量
		 var scrollTopHeight = 0, begin = 0, end = 0, time = null;

		//3.监听页面的滚动
		 window.addEventListener("scroll", function(){
		 	 //获取滚动的高度
		 	 scrollTopHeight = tool.scroll().top;
		 	 begin = scrollTopHeight;
		 });

		 //4.监听鼠标点击
		 top.addEventListener("click",function(){
		 	//清除定时器
		 	clearInterval(time);
		 	//开启缓动动画
		 	time = setInterval(function(){
		 		begin += (end - begin) * 0.2;
				window.scrollTo(0,begin);
				//2.3清除定时器
				if(Math.round(begin) === end){
					clearInterval(time);
				}
		 	},20);

		 });
	})();


	//楼层效果
	(function(){
		//当点击了li 此时不需要执行页面滚动里面的背景添加current
		//节流阀 互斥锁
		var flag = true;

		//获得今日推荐模块的高度
		var toolTop = $(".recommend").offset().top;

		//页面一加载就判断是否显示或隐藏电梯
		toggleTool();

		function toggleTool(){
			//如果页面滚动的高度>=今日推荐的高度，则出现电梯
			if($(document).scrollTop() >= toolTop){
				$(".fixedtool").fadeIn();
			}else{
				$(".fixedtool").fadeOut();
			}
		}

		//1.页面滚动显示和隐藏电梯
		$(window).scroll(function(){
			toggleTool();

			if(flag){
				//4.页面滚动到某个内容区域 左侧导航小li相应添加和删除current类名
				$(".floor .w").each(function(index,element){
					if($(document).scrollTop() >= $(element).offset().top){
						$(".fixedtool li").eq(index).addClass("current").siblings().removeClass();
					}
				});
			}

		});

		//2.点击电梯导航页面可以滚动到相应内容区域
		$(".fixedtool li").click(function(){
			flag = false;
			//console.log($(this).index()); 获取当前点击li的索引
			//当我们每次点击小li 就需要计算页面要去往的位置
			//选出对应索引内容区域的盒子 计算他的offset().top
			var current = $('.floor .w').eq($(this).index()).offset().top;
			//页面动画滚动效果
			$("body,html").stop().animate({
				scrollTop: current
			},function(){
				flag = true;
			});

			//3.点击之后 让当前li 添加current类名 其他兄弟移除current类名
			$(this).addClass("current").siblings().removeClass();
		});
	})();


	//tab栏切换
	(function(){
		//1.点击当前的li里面的a  添加style-red类 其余兄弟移除类
		$(".jiadian .tab_list li a").mouseover(function(){
			$(this).addClass("style-red").parent().siblings().children(0).removeClass("style-red");
			//2.点击的同时 得到当前a的父元素li的索引号
			var index = $(this).parent().index();
			//3.让下面相应索引号的tab_con显示 其余tab_con隐藏
			$(".jiadian .box_bd .tab_con").eq(index).show().siblings().hide();
		});
	})();
});

