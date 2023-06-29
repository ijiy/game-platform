// tab切换
function link(index) {
	$('.nav-tab a').eq(index).addClass('on').siblings('a').removeClass('on');
	$('.con-tab').eq(index).addClass('show').siblings('.con-tab').removeClass('show');
}

$('.nav-tab a').click(function () {
	if (!$(this).hasClass('on')) {
		link($(this).index() / 2);
	}
});

// 查询
submitPost($('.submit'), function () {
	
}, function () {
	alert('还没建设自助服务的内容');
})