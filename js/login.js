$(document).ready(function(){
	var canvas=document.getElementsByClassName('canvas-wrapper')[0];
	var ctx=canvas.getContext('2d');
	var canHeight=$(window).height();
	var canWidth=$(window).width();
	var lastTime=0;
	var currentTime=0;
	var delta=0;
	var timeout;
	var bgPic=new Image();
	bgPic.src='img/background.jpg';
	canvas.height=canHeight;
	canvas.width=canWidth;

	window.requestAnimFrame = (function() {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
			function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
				return window.setTimeout(callback, 1000 / 60);
			};
	})();
	window.cancelAnimFrame = (function(x){
		return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame ||
			function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
				return window.clearTimeout(x);
			};
	})();

	var fruitObj=function(){
		this.x=[];
		this.y=[];
		this.alive=[];
		this.img=[];
		this.num=25;
		this.speed=[];
		this.direction=[];
		this.delay=[];
		this.init=function(){
			var i=0;
			for(i=0;i<this.num;i++){
				this.x[i]=0;
				this.y[i]=Math.random()*canHeight;
				this.alive[i]=true;
				this.img[i]=new Image();
				this.img[i].src='img/dust'+i%3+'.png';
				this.speed[i]=Math.random()*0.15+0.07;
				this.direction[i]=i%3;
				this.delay[i]=Math.random()*5000;
			}
		}
		this.draw=function(){
			var i=0;
			lastTime=currentTime;
			currentTime=Date.now();
			delta=currentTime-lastTime;
			if(delta>4000){
				delta=100;
			}
			//更改fruit的状态
			for(i=0;i<this.num;i++){
				if(this.delay[i]>0){
					this.delay[i]-=delta;
				}else{
					if(this.direction[i]==0){
						this.x[i]+=this.speed[i]*delta;
					}else if(this.direction[i]==1){
						this.x[i]+=this.speed[i]*delta;
						this.y[i]+=this.speed[i]*delta/3;
					}else{
						this.x[i]+=this.speed[i]*delta;
						this.y[i]-=this.speed[i]*delta/3;
					}
					ctx.save();
					ctx.drawImage(this.img[i],this.x[i],this.y[i]);
					ctx.restore();
					if(this.x[i]>canWidth||this.y[i]>canHeight||this.y[i]<0){
						this.speed[i]=Math.random()*0.15+0.07;
						this.x[i]=0;
						this.y[i]=Math.random()*canHeight;
					}
				}
			}
		}
	}
	var fruit=new fruitObj();
	fruit.init();
	function myLoop(){
		ctx.clearRect(0,0,canWidth,canHeight);
		ctx.drawImage(bgPic,0,0,canWidth,canHeight);
		fruit.draw();
		window.cancelAnimFrame(timeout);
		timeout=window.requestAnimFrame(myLoop);
	}
	myLoop();
});