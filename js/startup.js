// JavaScript Document								

$(function(){
	//------------------------------------------------------------------
	//初期設定　使いまわしそうな値を変数に格納しておく
	var contentsInner = $('.contents-inner');
	var boxWidth = $('.box').width();
	
	var contentsInnerUl = contentsInner.children();
	var contentsInnerLi = contentsInnerUl.find('li');
	
	var count = 0;
	
	contentsInnerLi.clone().appendTo(contentsInnerUl);
	contentsInner.css('width', contentsInnerLi.length * boxWidth * 2);
	
	//------------------------------------------------------------------
	//スライド関数を定義　対象物を左にスライドさせてカウンターを１増やす
	function SlideAnimate (){
		if(clickFlug){
		
		clickFlug = false;
		positionInit();
		count ++;
		contentsInner.animate({'left' : '-=' +(boxWidth)}, 'slow',
			function(){
				/*console.log(count);
				console.log(contentsInner.css('left'));*/
				clickFlug = true;
			});
		} else {
			return false;
		}
	}
	//------------------------------------------------------------------
	//逆のスライド関数を定義　対象物を右にスライドさせてカウンターを１減らす
	function RevertAnimate (){
		if(clickFlug){
			
			clickFlug = false;
			positionRevert();
			if(!(count <= 0)){count --;}
			contentsInner.animate({'left' : '+=' +(boxWidth)}, 'slow',
				function(){
					/*console.log(count);
					console.log(contentsInner.css('left'));*/
					clickFlug = true;
				});
			} else {
				return false;
			}
		}
	//------------------------------------------------------------------
	//リセット関数を定義　もしスライドが最後までいったら元に位置に戻す
	function positionInit (){
			if(!(count % contentsInnerLi.length)){
				contentsInner.css({'left': 0});
				count = 0;
			} else if(count > contentsInnerLi.length) {
				contentsInner.css({'left':-1*(boxWidth * (count % contentsInnerLi.length))});
				count = (count % contentsInnerLi.length);
	
			}
	}
	//------------------------------------------------------------------
	//リバーと関数を定義　もしスライドが最後までいったら元に位置に戻す
	function positionRevert (){
		if(count <= 0){
			contentsInner.css({'left':-1*(boxWidth *contentsInnerLi.length)});
			count = contentsInnerLi.length;
		}
	}
	
	//------------------------------------------------------------------
	$('.btn').css('cursor','pointer');
	var clickFlug = true;
	//------------------------------------------------------------------
	//　左ボタンをクリックしたら
	$('.left-btn').click(
		function(){
		SlideAnimate();
		});
	//------------------------------------------------------------------
	//　右ボタンをクリックしたら
	$('.right-btn').click(
		function(){
		RevertAnimate();
		});
	//------------------------------------------------------------------
	//実際の処理　スライド関数を繰り返す
	setInterval(function() {
		SlideAnimate();
	},2000);
	
});
