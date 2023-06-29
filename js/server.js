// tab切换
function link(index) {
	$('.nav-tab a').eq(index).addClass('on').siblings('a').removeClass('on');

	// 单独请求返回数据
	$('.con-tab ul').html('<li class="state-nor"><a href="" target="_blank"><span>流畅</span>[200服] 服务器名</a></li>');
}

$('.nav-tab a').click(function () {
	if (!$(this).hasClass('on')) {
		link($(this).index() / 2);
	}
});