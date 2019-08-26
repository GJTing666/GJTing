
var recommendUrl = 'http://127.0.0.1:3001/';

// 定义一个请求实例
var requestone = new XMLHttpRequest();
requestone.open('get',recommendUrl + 'lists?id=1',true);
// 发送到后台的数据
requestone.send();

requestone.onreadystatechange = function() {
	
	if(requestone.readyState == 4) {
		
		var result = JSON.parse(requestone.responseText);
		// console.log(result);
		
		// 请求返回的结果success为true
		if(result.success == true){
			
			var recommendLists = result.list;
			// console.log(recommendLists)
			
			var recommen = document.getElementById('1');
			var html = ''
			for(var i = 0; i< recommendLists.length; i++) {
				
					html += `<li class="recommen-lists fl">
							<img src="${recommendUrl + recommendLists[i].img}">
							<div class="text-ellipsis-o recommen-goods-title">
								${recommendLists[i].title}
							</div>
							<div class="recommen-goods-price">
								<span class="text-main font-14 price iconfont icon-renminbi1688">${recommendLists[i].price}</span>
							</div>
							</li>`
			}
			recommen.innerHTML = html;
			
		}
	}
}

var requesttwo = new XMLHttpRequest();
requesttwo.open('get',recommendUrl + 'lists?id=2',true);
requesttwo.send();
requesttwo.onreadystatechange = function() {
	
	if(requesttwo.readyState == 4) {
		
		var result = JSON.parse(requesttwo.responseText);
		// console.log(result);
		
		// 请求返回的结果success为true
		if(result.success == true){
			
			var recommendLists = result.list;
			// console.log(recommendLists)
			
			var recommen = document.getElementById('2');
			var html = ''
			for(var i = 0; i< recommendLists.length; i++) {
				
					html += `<li class="recommen-lists fl">
							<img src="${recommendUrl + recommendLists[i].img}">
							<div class="text-ellipsis-o recommen-goods-title">
								${recommendLists[i].title}
							</div>
							<div class="recommen-goods-price">
								<span class="text-main font-14 price iconfont icon-renminbi1688">${recommendLists[i].price}</span>
							</div>
							</li>
							`
			}
			recommen.innerHTML = html;
			
		}
	}
}
var requestthree = new XMLHttpRequest();
requestthree.open('get',recommendUrl + 'lists?id=3',true);
requestthree.send();
requestthree.onreadystatechange = function() {
	
	if(requestthree.readyState == 4) {
		
		var result = JSON.parse(requestthree.responseText);
		// console.log(result);
		
		// 请求返回的结果success为true
		if(result.success == true){
			
			var recommendLists = result.list;
			// console.log(recommendLists)
			
			var recommen = document.getElementById('3');
			var html = ''
			for(var i = 0; i< recommendLists.length; i++) {
				
					html += `<li class="recommen-lists fl">
							<img src="${recommendUrl + recommendLists[i].img}">
							<div class="text-ellipsis-o recommen-goods-title">
								${recommendLists[i].title}
							</div>
							<div class="recommen-goods-price">
								<span class="text-main font-14 price iconfont icon-renminbi1688">${recommendLists[i].price}</span>
							</div>
							</li>
							`
			}
			recommen.innerHTML = html;
			
		}
	}
}

// banner
var requestUrl = 'http://127.0.0.1:3001/'
ajaxPackage({
		async: true,
		url: requestUrl + 'getBanner',
		dataType: 'json',
		success: function(res) {
			console.log(res)
			if(res.success == true){
				
				var bannerLists = res.list;
				console.log(bannerLists)
				var slide = document.querySelector('.cursoal-silide');
				// console.log(slide)
				var html = `<img src="${requestUrl + bannerLists[bannerLists.length-1].img}" />`
				
				for(var i = 0; i < bannerLists.length; i++) {
					html += `<img src="${requestUrl + bannerLists[i].img}" />`
				}
				
				html += `<img src="${requestUrl + bannerLists[0].img}" />`
				slide.innerHTML = html; 
			}
		}
	})
	
	// 推荐
	ajaxPackage({
		async: true,
		url: requestUrl + 'lists?id=1',
		type: 'get',
		dataType: 'json',
		success: function(res, id=1) {
			success(res, id)
		}
	})
	ajaxPackage({
		async: true,
		url: requestUrl + 'lists?id=2',
		type: 'get',
		dataType: 'json',
		success: function(res, id=2) {
			console.log(id)
			success(res, id)
		}
	})
	ajaxPackage({
		async: true,
		url: requestUrl + 'lists?id=3',
		type: 'get',
		dataType: 'json',
		success: function(res, id=3) {
			success(res, id)
		}
	})
	
	function success(res, id) {
		var lists = res.list;
		console.log(lists)
		var html = '';
		for(var i=0; i<lists.length; i++) {
			html += `<li class="recommen-lists fl">
				<img src="${requestUrl + lists[i].img}">
				<div class="text-ellipsis-o recommen-goods-title">
					${lists[i].title}
				</div>
				<div class="recommen-goods-price">
					<span class="text-main font-14 price iconfont icon-renminbi1688">${lists[i].price}</span>
				</div>
				</li>`
		}
		if(id == 1) {
			document.getElementById('goodsOne').innerHTML = html;
		}else if(id == 2) {
			document.getElementById('goodsTwo').innerHTML = html;
		}else if(id == 3) {
			document.getElementById('goodsThree').innerHTML = html;
		}
	}


