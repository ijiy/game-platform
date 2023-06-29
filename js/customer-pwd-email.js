submitPost($('.next-0'), function () {
}, function () {
	$('.progress-nav').addClass('p-1').children().addClass('on');
	$('.progress-0').hide();
	$('.progress-2').show();
});

submitPost($('.next-2'), function () {
}, function () {
	alert('保存成功');
});