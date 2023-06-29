var ie7 = false;

if (navigator.appName == 'Microsoft Internet Explorer' && parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, '').replace('MSIE', '')) < 8) {
	ie7 = true;
}

function showLeftTop() {
	// 返回顶部
	document.body.scrollTop > 100 || document.documentElement.scrollTop > 100 ? $(".aside-left-top").show() : $(".aside-left-top").hide();

	// 向下滚动添加动画
	$.each($('.scroll-active'), function () {
		$(this)[0].getBoundingClientRect().top < $('body').height() ? $(this).addClass('scroll-active-on') : $(this).removeClass('scroll-active-on');
	});
}

// IE6宽度兼容
function wrapFix() {
	$('body').width() < 1200 ? $('.wrapper').addClass('wrapfix') : $('.wrapper').removeClass('wrapfix');
}

showLeftTop();
wrapFix();

$(window).scroll(showLeftTop).resize(wrapFix);

$(".aside-left-top").click(function() {
	$('body, html').animate({
		scrollTop: 0
	}, 1000);
});

$('.aside-left a').hover(function () {
	$(this).children('span').show();
}, function () {
	$(this).children('span').hide();
});

$(function () {
	// 53客服
	$('.webCompany').on('click', function () {
		window.open('http://tb.53kf.com/webCompany.php?arg=10128628&style=1', 'foo', 'height=640, width=830, left=' + (window.innerWidth - 768) / 2 + 'px, top=' + (window.innerHeight - 640) / 2 + 'px', '_blank');
	});

	// IE8以下占位符兼容
	$('input, textarea').placeholder();
});

// banner
$.each($('.banner>ul'), function () {
	var _this = $(this),
		_parent = _this.parent();

	if (_parent.attr('ol')) {
		_parent.append('<ol>');
	}

	_this.cycle({
		fx: _parent.attr('fx'),
		timeout: 1500,
		speed: 2000,
		pause: 1,
		pager: '.banner ol',
		prev:'.banner .prev',
		next:'.banner .next',
		pagerEvent: 'click',
		// manualTrump: 0,
		pagerAnchorBuilder: function(i, slide) {
			i++;
			return '<li></li>';
		}
	});
});

// 上划预览
$('.pulling li div').on('mouseover', function () {
	$(this).hide().siblings('dl').stop().slideDown().parent().addClass('show').siblings().removeClass('show').children('dl').stop().hide().siblings().show();
});

var more_height = null;

function hidePulling() {
	$('.game-new .block').stop().animate({
		height: 243
	}, 100, function () {
		$(this).children('.more').removeClass('on');
		var that = $(this).find('li');
		that.eq(0).addClass('show').siblings().removeClass('show');
		that.eq(0).children('dl').stop().slideDown().siblings('div').hide().parent().siblings().children('dl').hide().siblings('div').show();
	});
}

$('.game-new').on('click', function (event) {
	event.stopPropagation();
});

$('.game-new .more').on('click', function () {
	if (!more_height) {
		more_height = $(this).siblings('.con').height() + 21;
	}

	if ($(this).parent().height() == 243) {
		$(this).parent().stop().animate({
			height: more_height
		}, 100, function () {
			$(this).children('.more').addClass('on');
		});
	} else {
		hidePulling();
	}
});

var user_aside = $('.user-aside'),
	left_arrow = user_aside.children('.left-arrow'),
	aside_height = user_aside.height();

// 自适应与IE5/6兼容右侧高度
function asideHeight() {
	user_aside.height(Math.max($('.user-article').height(), aside_height));
	left_arrow.height(user_aside.height());
}
asideHeight();

// 选中下拉列表
function pickList(_li, fn) {
	_li.click(function (event) {
		event.preventDefault();
		var _parent = $(this).parent();
		_parent.hide().siblings('input').val($(this).html());
		if (fn) fn($(this));
	});
}

function fixSelect(_input) {
	_input.val(_input.val().toString().replace(' ', ''));
}

function hideSelect() {
	$('.wrap-select ul').hide();
}

function wrapSelect(_input, fn, pickFn) {
	_input.focus(function () {
		// 修复IE5/6/7初始无法拖动下拉滚动条
		if (ie7 && $(this).val() == '') $(this).val(' ');

		hideSelect();
		if (fn) fn($(this));
		$(this).siblings('ul').show();
	})
	.parent().click(function (event) {
		event.stopPropagation();
	});
	pickList(_input.siblings('ul').children('li'), pickFn);
}

$(document).on('click', function () {
	hideSelect();
	hidePulling();
});

// ajax替换表单提交
function submitPost(_submit, beforeFn, afterFn) {
	_submit.click(function (event) {
		event.preventDefault();
		var _parent = $(this).parent();

		if (beforeFn() == false) return false;

		// $.post(_parent.attr('action'), _parent.serialize(), function (data) {
			if (afterFn) afterFn(_parent/*, data*/);
		// });
	});
}

// 倒计时
var	tel_code = $('.get-code'),
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

// 打开li里面的p
$('.open-li li a').click(function () {
	$(this).siblings('p').is(':visible') ? $(this).parent().removeClass('on').removeClass('pick').children('p').hide(300) : $(this).parent().addClass('on').children('p').show(300).parent().siblings().removeClass('on').removeClass('pick').children('p').hide(300).parent().parent().siblings('ul').children().removeClass('on').removeClass('pick').children('p').hide(300);
});