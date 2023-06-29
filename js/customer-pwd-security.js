submitPost($('.next-0'), function () {
}, function () {
	$('.progress-nav').addClass('p-1').children().addClass('on').eq(2).removeClass('on');
	$('.progress-0').hide();
	$('.progress-1').show();
});

submitPost($('.next-1'), function () {
}, function () {
	$('.progress-nav').addClass('p-2').removeClass('p-1').children().addClass('on');
	$('.progress-1').hide();
	$('.progress-2').show();
});

submitPost($('.next-2'), function () {
}, function () {
	alert('保存成功');
});

wrapSelect($('.wrap-input input'));