$('.beast-up-con ul').width(650 * $('.beast-up-con li').length);
$('.beast-bt-con ul').width(128 * $('.beast-bt-con li').length);

function move(elem, num) {
	if(!elem.is(':animated')) {
		elem.stop().animate({
			scrollLeft: elem.scrollLeft() + num
		});
	}
}

$('.beast-up .beast-right').click(function () {
	move($(this).siblings('.beast-up-con'), 650);
});

$('.beast-up .beast-left').click(function () {
	move($(this).siblings('.beast-up-con'), -650);
});

$('.beast-bt .beast-right').click(function () {
	move($(this).siblings('.beast-bt-con'), 128);
});

$('.beast-bt .beast-left').click(function () {
	move($(this).siblings('.beast-bt-con'), -128);
});