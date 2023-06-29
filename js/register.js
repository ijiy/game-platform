submitPost($('.submit'), function () {
	alert('检查提交内容');
}, function () {
	alert('提交成功');
});

$('.nav-tab a').click(function () {
	var _this = $(this),
		_span = _this.parent().siblings('form').find('.wrap-input span');

	if (_this.hasClass('on')) return false;

	_this.addClass('on').siblings().removeClass('on');
	$('.con-tab').eq(_this.index()).show().siblings('.con-tab').hide();

	if (_span.attr('title')) _span.removeClass('wrong yes').html('<em>*</em>' + _span.attr('title')).siblings('input').val('');
});