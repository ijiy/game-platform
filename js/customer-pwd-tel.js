submitPost($('.next-0'), function () {
}, function () {
	$('.progress-nav').addClass('p-1').children().addClass('on');
	$('.progress-0').hide();
	$('.progress-2').show();
});

submitPost($('.next-2'), function () {
	console.log('检查是否匹配');
	return false;
}, function () {
	alert('保存成功');
});

var	tel_code = $('.wrap-code a'),
	get_time = null, // 请求验证码时间
	get_code = false, // 判断是否可以点击获取验证码
	over_time = 0, // 倒计时间
	date_timer = null; // 倒计计时器

// 一开始请求验证码时间get_time
get_time = null;

if (get_time) {
	get_code = false;
	tel_code.addClass('on');
	codeTimer();
} else {
	get_code = true;
}

tel_code.click(function () {
	if (!get_code) return false;
	get_code = false;

	// 判断手机号码是否正确

	// 请求验证码
	get_time = 59;
	codeTimer();
});

function codeTimer () {
	var now_date = new Date();

	date_timer = setInterval(function () {
		over_time = get_time - parseInt((new Date() - now_date) / 1000);
		tel_code.html(over_time);
		tel_code.addClass('on');

		if (over_time <= 0) {
			clearInterval(date_timer);
			tel_code.html('重新发送60');
			get_code = true;
		}
	}, 17);
}