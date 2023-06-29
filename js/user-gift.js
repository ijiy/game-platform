// 复制
new ZeroClipboard($('tr strong')).on('copy', function(event) {
	event.clipboardData.setData('text/plain', $(event.target).siblings('b').text());
})
.on('aftercopy', function(event) {
	alert('礼包兑换码【' + event.data['text/plain'] + '】已复制到剪贴板');
})
.on('error', function(event) {
	alert('请用【CTRL+C】代替本页面的"复制"按钮\n' + event.name + ': ' + event.message);
	ZeroClipboard.destroy();
});

// 展开与收起
$('tr a').click(function () {
	var _parent = $(this).parent().parent();

	if (_parent.hasClass('on')) {
		$(this).html('展开');
		_parent.removeClass('on').next('.next').hide();
	} else {
		$(this).html('收起');
		_parent.addClass('on').next('.next').show().siblings('.next').hide().prev().removeClass('on').find('a').html('展开');
	}
})