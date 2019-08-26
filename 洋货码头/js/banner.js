
var requsetUrl = 'http://127.0.0.1:3001/';

// 定义一个请求实例
var request = new XMLHttpRequest();

// 异步：从上到下执行js代码时，遇到ajax时分出一条线路，不影响原来的进程
// 请求方式 请求地址 是否异步(true 为异步,)
request.open('get',requsetUrl + 'getBanner',true);

// 发送到后台的数据
request.send();

// 请求发送的状态:
// 0  初始化XMLHttpRequest
// 1  打开
// 2/3  请求发送成功
// 4 请求完成  后台返回前端数据成功

// 请求监听状态码
request.onreadystatechange = function() {
	// 执行过程中的状态码
	// console.log(request.readyState)
	
	// 当返回的状态码为4
	if(request.readyState == 4) {
		
		var result = JSON.parse(request.responseText);
		// console.log(result);
		
		// 请求返回的结果success为true
		if(result.success == true){
			
			var bannerLists = result.list;
			console.log(bannerLists)
			var slide = document.querySelector('.cursoal-silide');
			// console.log(slide)
			var html = `<img src="${requsetUrl+bannerLists[bannerLists.length-1].img}" />`
			
			for(var i = 0; i < bannerLists.length; i++) {
				html += `<img src="${requsetUrl + bannerLists[i].img}" />`
			}
			
			html += `<img src="${requsetUrl + bannerLists[0].img}" />`
			slide.innerHTML = html; 
			// cursoal()
		}
		
	}
}