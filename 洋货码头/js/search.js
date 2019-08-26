// 页码切换
// 打开列表页 获取列表页数据 只要当前页码 当前页码显示的页码数量
// 获取页码以及数量
// 存储地址
var requestUrl = 'http://192.168.97.231:3001/'

// 1.从当前地址上获取页码以及数量
var page = getQueryParam('page') || 1
var count = getQueryParam('count') || 2

$.ajax({
	type: 'get',
	url: requestUrl + 'list',
	async: true,
	data: {
		page: page,
		count: count
	},
	success: function(res) {
		// console.log(res)
		var pageHtml = ''
		// 找到页码总数
		for (var i = 0; i < res.total; i++) {
			pageHtml += `<a href="search_content.html?page=${i+1}&count=${count}" class="f-button-yeshu">${i+1}</a>`
		}
		$('.f-goods-fanye a:first').after(pageHtml)
	}
})

// 3.点击上一页 下一页
$('.pageBtn').click(function() {
	if(page <= 1 && $(this).hasClass('prev')){
		return;
	}
	
	if(page>=total && $(this).hasClass('next')) {
		return;
	}
	
	if($(this).hasClass('next')) {
		page--
	}else {
		page++
	}
	
	window.lacation.href = 'search_content.html?page=' + page + '&count=' + count
	
})

function getQueryParam(name) {
	// 1)获取请求的参数
	var search = window.location.search
	// 2)截取字符串 不要问号（？）
	search = search.substr(1)
	// match 从一个字符串中匹配与正则相符的字符串
	// 返回的第一个参数为匹配的字符串
	// 后面的参数以小括号抱起来的字符
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
	
	var match = search.match(reg)
	
	if (match) {
		return match[2]
	}
	return ''
}
