// 未定义的页面数据
// var cookie_account = undefined, // 获取cookie
var cookie_account = '12345', // 获取cookie
	pay_rate = 1, // 元宝比例
	pay_data = {
		account: cookie_account,
		plateform: '游戏',
		game: undefined,
		service: undefined,
		pay: undefined,
		cheap: undefined,
		acer: undefined,
		tel: undefined
	},
	user_account = $('.user-account input');


$('.pay-list ul.show li').eq(0).addClass('pay-list-on');
pay_data.pay = $('.pay-list ul.show li').eq(0).attr('title');

// 登录状态赋值账号
if (pay_data.account) {
	var _len = pay_data.account.length;
	user_account.val(pay_data.account).width(_len ? (_len < 50 ? _len * 12 : 600) : 140);
} else {
	user_account.removeAttr('readonly').focus().width(140);
}

// 登录状态显示坚果支付
if (cookie_account) {
	$('.toggle-nut').show();
};

// 修改账号
$('.user-account a').on('click', function (event) {
	event.stopPropagation();
	var _input = $(this).siblings('input');

	_input.removeAttr('readonly').focus().select();
	_input[0].defaultValue = _input.val();
	$(this).siblings('span').hide();

	if (_input.val().length < 12) {
		_input.width(140);
	}
});

// 检测账号修改是否正确
user_account.on('blur', function () {
	var _len = $(this).val().length;

	if ($(this).val().length < 5) {
		var _def = this.defaultValue;

		_len = _def.length;
		$(this).val(_def).siblings('span').removeClass('yes').addClass('wrong').html('<i></i>输入的账号不存在，请重新输入！').show();
	} else {
		pay_data.account = this.defaultValue = $(this).val();
		$(this).attr('readonly', true).siblings('span').removeClass('wrong').addClass('yes').html('<i></i>输入正确').show();
	}
	$(this).width(_len ? (_len < 50 ? _len * 12 : 600) : 140);
});

// 充值到哪
$('.user-plateform div').on('click', function () {
	pay_data.plateform = $(this).html().replace('充值到', '');
	$(this).addClass('custom-btn').siblings().removeClass('custom-btn');

	if ($(this).hasClass('pay-to-nut')) {
		$('.user-service').hide();
		$('.service-nut').show();
		$('.toggle-nut').hide();
	} else {
		$('.user-service').show();
		$('.service-nut').hide();

		if (cookie_account) {
			$('.toggle-nut').show();
		};
	}
});

// 游戏区服 (切换)
$('.user-service .pick-box').on('click', function (event) {
	$(this).siblings().toggle().parent().addClass('cheap-on').siblings().removeClass('cheap-on').children('.pick-box').siblings().hide();
	$(this).siblings().is(':hidden') ? $(this).parent().removeClass('cheap-on') : $(this).parent().addClass('cheap-on');

	if ($(this).hasClass('select-service-mark') && !pay_data.game) {
		$('.service-list').hide().parent().removeClass('cheap-on');
		$('.service-error').show().children('span').html('请先选择游戏');
	};
});

// 选择游戏
$('.game-list-nav span').on('click', function () {
	$(this).addClass('pick-on').siblings().removeClass('pick-on');
	$('.game-list-con ul').eq($(this).index()).show().siblings().hide();
});

// 选择游戏 (选中)
$('.select-game .data-list li:not(.latest li)').on('click', function () {
	pay_data.game = $(this).text();

	$('.select-game .pick-box input').val(pay_data.game);

	$('.service-list').show().parent().addClass('cheap-on');
	$('.game-list').hide().parent().removeClass('cheap-on');
	$('.service-error').hide();
});

// 选择游戏 (最近选中)
$('.select-game .latest li').on('click', function () {
	pay_data.game = $(this).find('span').html();
	pay_data.service = $(this).find('strong').html();

	$('.select-game .pick-box input').val(pay_data.game);
	$('.select-service .pick-box input').val(pay_data.service);

	$(this).addClass('cheap-latest').siblings().removeClass('cheap-latest');
	$('.game-list').hide().parent().removeClass('cheap-on');
	$('.service-error').hide();
});

// 选择区服 (选中)
$('.select-service .data-list li').on('click', function () {
	pay_data.service = $(this).html();
	$('.select-service .pick-box input').val(pay_data.service);

	// 检测是否在该服创建角色
	if ($.trim(pay_data.service) == '没有角色') {
		pay_data.service = undefined;
		$('.service-error').show().children('span').html('您尚未在该区服创建角色，请重新选择或请先<a href="">&nbsp;进入游戏</a>');
	} else {
		$('.service-list').hide().parent().removeClass('cheap-on');
		$('.service-error').hide();
	}
});

// 选择区服 (切换: 最近, 输入, 全部区服)
$('.service-list-nav span').on('click', function () {
	$(this).addClass('pick-on').siblings().removeClass('pick-on');
	$('.service-list-con .data-list').eq($(this).index()).show().siblings().hide();
});

// 选择区服 -> 全部区服 (切换: 1-100, 101-200, ...)
$('.service-all-order span').on('click', function () {
	$(this).addClass('pick-on').siblings().removeClass('pick-on');
	$('.service-all ul').eq($(this).index()).show().siblings('ul').hide();
});

// 充值方式 (切换)
$('.pay-mode li').on('click', function () {
	var _this = $(this),
		this_title = _this.attr('title'),
		pay_pwd = $('.pay-list ul').eq(_this.index()).find('input');

	_this.addClass('pick-on').siblings().removeClass('pick-on');
	$('.pay-list ul').eq(_this.index()).show().siblings().hide().children('li').removeClass('pay-list-on');

	$('.pay-tip strong').html(this_title);
	$('.pay-tip em').html(_this.data('tip'));

	pay_data.cheap = pay_data.acer = undefined;
	pay_rate = parseFloat(_this.data('rate'));

	// 点击"支付宝, 微信"等选项卡时, 即为选中了充值方式
	pay_data.pay = ('支付宝, 微信, 坚果充值, 盛大卡, 骏网卡').match(this_title) ? this_title : undefined;

	// 显示对应充值套餐列表
	$('.data-' + _this.data('cheap')).show().siblings().hide();

	// 重置充值套餐的样式与提示
	$('.select-cheap .pick-box span').html('请选择充值套餐');
	$('.select-cheap').removeClass('cheap-list-on');
	$('.set-cheap p').html('请选择充值套餐');

	// 请输入支付密码获焦
	if (pay_pwd && this_title == '坚果充值') {
		pay_pwd.focus();
	}
});

// 充值方式 (选中)
$('.pay-list li').on('click', function () {
	if ($(this).attr('title')) {
		pay_data.pay = $(this).attr('title');
	}
	
	$(this).addClass('pay-list-on').siblings().removeClass('pay-list-on');

	// 显示更多
	if ($(this).hasClass('bank-m')) {
		pay_data.pay = undefined;
		$(this).removeClass('pay-list-on').hide();
		$('.show-bank-m').show();
	};
});

// 充值套餐 (切换: 显示, 隐藏)
$('.select-cheap .pick-box').on('click', function () {
	if (!pay_data.pay) {
		alert('请先选择充值方式');
		return false;
	};

	if ($('.cheap-list').is(':hidden')) {
		$(this).parent().addClass('cheap-on');
		$('.cheap-list').show();
	} else {
		$('.cheap-list').hide();

		if (!$('.select-cheap .pick-box').find('strong')[0]) {
			$(this).parent().removeClass('cheap-on');
		};
	}
});

// 充值套餐 (选中)
$('.cheap-list ul').on('click', function (event) {
	pay_data.cheap = $(event.target).html();
	pay_data.acer = parseInt(pay_data.cheap) * pay_rate * 10;

	$('.select-cheap').addClass('cheap-list-on');
	$('.select-cheap .pick-box span').html('<strong>' + pay_data.cheap + '</strong>');
	$('.cheap-list').hide();
	$('.set-cheap p').html('可获得：<em class="em">' + pay_data.acer + '元宝、' + pay_data.acer / 10 + '积分</em>。');
});

// 充值套餐 (滚动条)
$('.cheap-list').niceScroll($('.cheap-scroll'), {
	bouncescroll: 0,
	autohidemode: 0,
	cursorcolor: '#17baf5',
	cursorwidth: 15,
	cursorborder: 'none',
	cursorborderradius: '0',
	railpadding: {right: 2}
});

// 提交订单
$('.submit-order').on('click', function () {
	// 收集页面数据
	if (!pay_data.account) {
		alert('请输入正确的账号');
		return false;
	};

	if (pay_data.plateform == '游戏') {
		// 检测选择游戏
		if (!pay_data.game) {
			$('.service-error').show().children('span').html('请选择游戏');
			alert('请选择游戏')
			return false;
		};

		// 检测选择区服
		if (!pay_data.service) {
			$('.service-error').show().children('span').html('请选择区服');
			alert('请选择区服')
			return false;
		};
	};


	// 检测充值方式
	if (!pay_data.pay) {
		alert('请选择充值方式!');
		return false;
	};

	// 检测充值套餐
	if (!pay_data.cheap) {
		alert('请选择充值套餐!');
		return false;
	};

	if (!$('.enter-tel').val()) {
		alert('请输入正确的手机号码!');
		return false;
	} else {
		pay_data.tel = $('.enter-tel').val();
	}

	$('.confirm-account').html(pay_data.account);
	$('.confirm-plateform').html(pay_data.plateform);
	$('.confirm-game').html(pay_data.game);
	$('.confirm-service').html(pay_data.service);
	$('.confirm-pay').html(pay_data.pay);
	$('.confirm-cheap').html(pay_data.cheap);
	$('.confirm-acer').html(pay_data.acer);
	$('.confirm-intg').html(pay_data.acer / 10);

	if (pay_data.plateform == '坚果') {
		$('.confirm-plateform').parent().html('坚果');
	};

	// 显示对话框
	$('.dialog-box').fadeIn(150);
});

// 提交订单
submitPost($('.pay-confirm'), function () {
	
}, function (data) {
	console.log(data);
})

// 关闭对话框
$('.dialog-close, .pay-update').on('click', function () {
	$('.dialog-box').fadeOut(150);
});

// 确认充值
$('.pay-confirm').on('click', function () {
	// ajax提交页面数据
});

$('body').on('click', function () {
	// 隐藏充值套餐列表游戏区服列表
	$('.user-service .pick-box').siblings().hide().parent().removeClass('cheap-on');

	// 隐藏充值套餐列表
	if (!$('.select-cheap .pick-box').find('strong')[0]) {
		$('.select-cheap').removeClass('cheap-on');
	};
	$('.cheap-list').hide();
});

// 阻止冒泡
$('.select-game, .select-service, .select-cheap').on('click', function (event) {
	event.stopPropagation();
});