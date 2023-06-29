var date = new Date(),
	user = {
		year_start: 1897,
		year_end: date.getFullYear() // 这个时间应该从服务器获取
	},
	year_value = '',
	province_value = '';

// 年
for (var i = user.year_start; i <= user.year_end; i++) {
	year_value += '<li>' + i + '</li>';
}

// 省
for (var i = 0; i < dsy.Items['-1'].length; i++) {
	province_value += '<li>' + dsy.Items['-1'][i] + '</li>';
}

$('.user-year').siblings('ul').html(year_value);
$('.user-province').siblings('ul').html(province_value);

// 账号修改
var user_name = $('.user-name input'),
	user_name_len = user_name.val().length;

$('.user-name a').click(function () {
	user_name.removeAttr('disabled').focus()
});

user_name.blur(function () {
	$(this).attr('disabled', true);

	if (!$(this).val()) {
		$(this).val(this.defaultValue);
	}
}).width(user_name_len < 8 ? 78 : (user_name_len < 50 ? user_name_len * 8 : 400));

// 检测年月日的输入值
function checkValFn(_this, _max, _min) {
	var _val = parseInt(_this.val()),
		_parent = _this.parent().parent(),
		_date = _parent.find('.user-date'),
		_month = _parent.find('.user-month').val(),
		_year = _parent.find('.user-year').val(),
		_def = parseInt(_this[0].defaultValue);

	if (!_val || _val > _max || _val < _min || _val.toString() == 'NaN') {
		if ( _def >= _min && _def <= _max) {
			_val = _def;
		} else {
			if (_val > _max) {
				_val = _max;
			} else if (_val < _min) {
				_val = _min;
			} else {
				_val = '';
			}
		}
	} else {
		_this[0].defaultValue = _val;
	}
	_this.val(_val);
	var _dateVal = _date.val();

	if (parseInt(_dateVal) > new Date(_year, _month, 0).getDate()) {
		_date.val(1);
	}

	if (_dateVal && parseInt(_dateVal).toString() == 'NaN') {
		_date.val('');
	}
}

function checkVal(_input, _max, _min) {
	_input.on('change', function () {
		checkValFn($(this), _max, _min);
	});
}

checkVal($('.user-month'), 12, 1);
checkVal($('.user-year'), user.year_end, user.year_start);

wrapSelect($('.wrap-select input'), function (_this) {
	if (_this.hasClass('user-date')) {
		var _ul = _this.siblings('ul'),
			_parent = _this.parent(),
			_em = _parent.siblings('em'),
			_year = $.trim(_parent.siblings().children('.user-year').val()),
			_month = $.trim(_parent.siblings().children('.user-month').val()),
			_date = '';

		if (!_year) {
			_em.html('* 请先选择年份!').show();
		} else if (!_month) {
			_em.html('* 请先选择月份!').show();
		} else {
			var max_date = new Date(_year, _month, 0).getDate();

			for (var i = 1; i <= max_date; i++) {
				_date += '<li>' + i + '</li>';
			}
			_ul.html(_date).show();
			pickList(_ul.children('li'));
			checkVal(_this, max_date, 1);
			_em.hide();
		}
	} else if (_this.hasClass('user-city')) {
		var	city_value = '',
			_ul = _this.siblings('ul'),
			_parent = _this.parent(),
			_em = _parent.siblings('em'),
			_province = $('.user-province'),
			_em = _parent.siblings('em');

		if (_province.val()) {
			for (var i = 0; i < dsy.Items['-1'].length; i++) {
				var v = dsy.Items['-1'][i];

				if (new RegExp(v).test(_province.val())) {
					_province.val(v);
					_province[0].defaultValue = v;

					for (var j = 0; j < dsy.Items[i].length; j++) {
						city_value += '<li>' + dsy.Items[i][j] + '</li>';
					}
					_ul.html(city_value);
					pickList(_ul.children('li'));
					_em.hide();
					break;
				}
			}
		} else {
			_em.show();
		}
	}
}, function (_this) {
	var _parent = _this.parent(),
		_child = _parent.children('li'),
		_input = _parent.siblings('input');
		
	if (_input.hasClass('user-month')) {
		checkValFn(_input, _child.eq(_child.length - 1), 1);
	} else if (_input.hasClass('user-province')) {
		if (_input.val() != _input[0].defaultValue) {
			$('.user-city').val('');
			_input[0].defaultValue = _input.val();
		}
	}
});

// 保持设置
submitPost($('.submit'), function () {
	alert('检查提交内容');
}, function (data) {
	alert('保存成功');
});