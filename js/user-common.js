var loc = document.location,
	loc_url = loc.href,
	loc_hash = loc.hash,
	page_link = 'user-account.html',
	page_name = loc_url.substring(loc_url.lastIndexOf('/') + 1);

// 重定向页面
function linkTo(index) {
	if (loc_hash.replace('#', '') != index) {
		loc.href = loc_url.replace(page_name, (page_link + '#' + index));

		if (page_link == page_name.replace(loc_hash, '')) {
			document.location.reload();
		}
	}
}

// tab切换
function link(index) {
	$('.nav-tab a').eq(index).addClass('on').siblings('a').removeClass('on');
	$('.con-tab').eq(index).addClass('show').siblings('.con-tab').removeClass('show');

	if (index || index == 0) {
		loc.href = loc_url.replace(loc_hash, ('#' + index));
	}
	asideHeight();
}

$('.nav-tab a').click(function () {
	if (!$(this).hasClass('on')) {
		link($(this).index() / 2);
	}
});

// 账号安全等级, 页面加载时与修改设置后调用
function accountLevel(index) {
	if (index == 2) {
		$('.header-tip strong').html('高').addClass('high').removeClass('middle, low');
		$('.user-pwd span').eq(2).addClass('on').siblings().removeClass('on');
	} else if (index == 1) {
		$('.header-tip strong').html('中').addClass('middle').removeClass('high, low');
		$('.user-pwd span').eq(1).addClass('on').siblings().removeClass('on');
	} else {
		$('.header-tip strong').html('低').addClass('low').removeClass('middle, high');
		$('.header-tip p').show();
		$('.user-pwd span').eq(0).addClass('on').siblings().removeClass('on');
	}
}

// 请求账号安全等级(0/1/2)
accountLevel(2);

// 保存设置
submitPost($('.set-before .submit'), function () {
	alert('检查提交内容');
}, function (_parent) {
	_parent.parent().hide().siblings('.set-after').show();
});