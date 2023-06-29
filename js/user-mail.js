// 下拉与收起
$('.info-list').click(function () {
	$(this).addClass('open').parent().siblings().children('.info-list').removeClass('open');
}).children('.info-short').click(function (event) {
	event.stopPropagation();
	$(this).parent().removeClass('open');
});

var check_box = $('.info-list').siblings().children('input'),
	nav_btn = $('.nav-btn'),
	nav_input = nav_btn.children('input');

// 选中
check_box.change(function () {
	nav_btn.removeClass('on');

	$.each(check_box, function () {
		$(this).prop('checked') ? nav_btn.addClass('on') : nav_input.removeAttr('checked');
	});
});

// 全选
nav_input.change(function () {
	if ($(this).prop('checked')) {
		check_box.prop('checked', 'true');
		$(this).parent().addClass('on');
	} else {
		check_box.removeAttr('checked');
		$(this).parent().removeClass('on');
	}
});

// 删除
$('.tr-del').click(function () {
	var _parent = $(this).parent();

	if (_parent.hasClass('on')) {
		/*ajax的回调*/
		$.each(check_box, function () {
			if ($(this).prop('checked')) {
				$(this).parent().parent().remove();
			}
		});
		_parent.removeClass('on');
		nav_input.removeAttr('checked');
		/*end*/
	}
});

// 标记已读
$('.tr-mark').click(function () {
	var _parent = $(this).parent();

	if (_parent.hasClass('on')) {
		/*ajax的回调*/
		$.each(check_box, function () {
			if ($(this).prop('checked')) {
				var _list = $(this).parent().siblings('.info-list');

				if (_list.hasClass('mark')) {
					_list.removeClass('mark').children('.info-state').html('已读');
				}
			}
		});
		_parent.removeClass('on');
		nav_input.removeAttr('checked');
		check_box.removeAttr('checked');
		/*end*/
	}
});