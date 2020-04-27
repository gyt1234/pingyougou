
(function(w){
	w.tool={
		//根据id获取标签
		$: function (id){
			return typeof id==='string'? document.getElementById(id):null;
		},
		//浏览器兼容,json封装scroll
		scroll : function (){
			if(window.pageYOffset !== null){ //最新的浏览器
				return {
					"top": window.pageYOffset,
					"left":window.pageXOffset
				}
			}else if(document.compatMode === 'CSS1Compat'){//W3C标准
				return{
					"top": document.documentElement.scrollTop,
					"left":document.documentElement.scrollLeft
				}
			}
			return{//怪异浏览器
				"top": document.body.scrollTop,
				"left":document.body.scrollLeft
			}
		},
		//display显示
		show : function (ele){
			ele.style.display = 'block';
		},
		//display隐藏
		hide : function (ele){
			ele.style.display = 'none';
		},
		//浏览器兼容,client家族封装
		client : function (){
			if(window.innerWidth !== null){ //最新的浏览器
				return {
					"width": window.innerWidth,
					"height":window.innerHeight
				}
			}else if(document.compatMode === 'CSS1Compat'){//W3C标准
				return{
					"width": document.documentElement.clientWidth,
					"height":document.documentElement.clientHeight
				}
			}
			return{ //怪异浏览器
				"width": document.body.clientWidth,
				"height":document.body.clientHeight
			}
		},
		//获取CSS属性值
	    getStyleArr : function(obj,attr){
			if(obj.currentStyle){ //IE和opera
				return obj.currentStyle[attr];
			}else{//w3c标准
				return window.getComputedStyle(obj,null)[attr];
			}
	    },
	    //动态设置CSS样式
	    changeCssStyle : function(obj,attr,value){
	    	obj.style[attr] = value;
	    },
		/*
		缓动动画函数 
		eleObj:元素
		json:样式集合
		fn:动画集合
		*/
	    buffer : function (eleObj,json,fn){
			//1.1清除定时器
			clearInterval(eleObj.intervalId);
			//1.2定义变量
			var speed = 0, begin=0, target=0, flag = false;
			//1.3设置定时器
			eleObj.intervalId=setInterval(function(){
				//标志（标签的所有属性有没有钱执行完毕）
				flag = true;

				for(var key in json){
					//获取要做动画属性的初始值
					if(key === 'opacity'){
						begin = parseInt(tool.getStyleArr(eleObj,key) * 100) || 100;
						target = parseInt(json[key] * 100);
					}else if('scrollTop' === key){	//滚动
						begin = Math.ceil(Number(eleObj.scrollTop));
						target = parseInt(json[key]);
					}else{
						begin = parseInt(tool.getStyleArr(eleObj,key)) || 0;
					  	target = parseInt(json[key]);
					}


					//求出步长
					speed = (target - begin) * 0.2;
					speed = (target > begin) ? Math.ceil(speed) : Math.floor(speed);

					//动起来
					if(key === 'opacity'){//透明度
						eleObj.style.opacity = (begin + speed) / 100;
					}else if('scrollTop' === key){//滚动
						eleObj.scrollTop = begin + speed;
					}else if("zIndex" === key){
						eleObj.style[key] = json[key];
					}else{
						eleObj.style[key] = begin + speed + 'px';
					}
					
					//判断
					if(begin !== target){
						flag = false;
					}	
				}

				//1.4清除定时器
				if(flag){
					clearInterval(eleObj.intervalId);
					//开启另一组动画
					if(fn){
						fn();
					}
				}

			},20);
		},
	};
})(window);