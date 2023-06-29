;(function ($) {
	$.fn.cDate = function (options) {
		var defaults = {
				year_start: 1990,
				year_end: 2020
			},
			opts = $.extend(defaults, options),
			date_inputs = $(this), // 插件对象
			pickDate = 1, // 选中的日
			keyDate = 0, // 按esc键的当前时间
			nowDate = new Date(),
			oldYear = nowDate.getFullYear,
			oldMonth = nowDate.getMonth;

		if (date_inputs.length) {
			date_inputs.wrap($('<div class="wrap-table-date" style="position: relative;"></div>')).parent().append('<div class="table-date"><div class="caption clear"><div class="select fl"><input type="text"></div><div class="select"><input type="text"></div><span class="month-left">&lt;</span><span class="month-right">&gt;</span></div><div class="thead"><ul class="clear"><li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li></ul></div><ul class="tbody clear"></ul><div class="tfoot clear"><div class="wrap-time"><label>时间</label><div class="wrap-time-input"><span class="time-min">&lt;</span><input class="time-input" data="time_hours" type="text"><i>:</i><input class="time-input" data="time_minute" type="text"><i>:</i><input class="time-input" data="time_second" type="text"><span class="time-max">&gt;</span></div><ul class="time-hours time-con" data="time_hours"><h4>小时</h4><a class="close-parent">x</a></ul><ul class="time-minute time-con" data="time_minute"><h4>分钟</h4><a class="close-parent">x</a></ul><ul class="time-second time-con" data="time_second"><h4>秒钟</h4><a class="close-parent">x</a></ul></div><div class="wrap-btn"><input type="button" class="now-time" value="当前"><input type="button" class="update-time" value="确认"></div></div></div>');

			$.each(date_inputs, function () {
				var date_input = $(this),
					show_time = date_input.attr('time'),
					show_week = date_input.attr('week'),

					wrap_date = date_input.siblings('.table-date'),
					tbody = wrap_date.find('.tbody'), // 日期区域

					wrap_time = wrap_date.find('.wrap-time'), // 时间盒子
					wrap_time_input = wrap_time.find('.wrap-time-input'), // 时间区域
					time_inputs = wrap_time_input.find('.time-input'), // 时间文本框
					time_input_hours = wrap_time_input.find('.time-input[data=time_hours]'),
					time_input_minute = wrap_time_input.find('.time-input[data=time_minute]'),
					time_input_second = wrap_time_input.find('.time-input[data=time_second]'),

					time_con = wrap_time.find('.time-con'), // 时间列表
					time_con_hours = wrap_time.find('.time-con[data=time_hours]'), // 小时列表
					time_con_minute = wrap_time.find('.time-con[data=time_minute]'), // 分钟列表
					time_con_second = wrap_time.find('.time-con[data=time_second]'), // 秒钟列表

					time_max = wrap_date.find('.time-max'), // 最大时间
					time_min = wrap_time.find('.time-min'), // 最小时间

					month_left = wrap_date.find('.month-left'), // 左翻页
					month_right = wrap_date.find('.month-right'), // 右翻页

					now_time = wrap_date.find('.now-time'), // 当前
					update_time = wrap_date.find('.update-time'), // 确认

					close_parent = wrap_date.find('.close-parent'), // 关闭

					caption_select = wrap_date.find('.caption input'), // 年与月的下拉框
					select_month = caption_select.eq(0),
					select_year = caption_select.eq(1);


				if (show_time || show_week) {
					wrap_time.remove();
				}

				date_input.parent().width(date_input[0].clientWidth).height(date_input[0].clientHeight);

				// 定义月份
				for (var i = 0; i < 12; i++) {
					select_month.parent().append('<li>' + (i + 1) + '月</li>');
				}

				// 定义年份
				for (var i = 0; i < opts.year_end - opts.year_start + 1; i++) {
					select_year.parent().append('<li>' + (opts.year_start + i) + '年</li>');
				}

				select_month.siblings('li').wrapAll('<ul>');
				select_year.siblings('li').wrapAll('<ul>');

				// 定义小时
				for (var i = 0; i < 24; i++) {
					time_con_hours.append('<li>' + i + '</li>');
				}

				// 定义分钟与秒钟
				for (var i = 0; i < 60; i++) {
					time_con_minute.append('<li>' + i + '</li>');
					time_con_second.append('<li>' + i + '</li>');
				}

				// 时间文本框赋值
				function showTime() {
					time_input_hours.val(famatNum(nowDate.getHours()));
					time_input_minute.val(famatNum(nowDate.getMinutes()));
					time_input_second.val(famatNum(nowDate.getSeconds()));
				}

				// 格式化数字
				function famatNum(time) {
					return time < 10 ? ('0' + (time ? time : '0')) : time;
				}

				// 效验时间
				function checkTime(time) {
					var check_time = Number(time.replace(/\s/g, ''));
					return !check_time ? 0 : check_time;
				}

				// 格式化年月
				function famatSelect() {
					var month = select_month.val(),
						year = select_year.val();

					select_month.val(parseInt(month) + '月');
					select_year.val(parseInt(year) + '年');
				}

				// 目标文本框赋值
				function showVal() {
					var year = parseInt(select_year.val()),
						month = parseInt(select_month.val());

					year = year ? year : oldYear;
					month = month ? month : oldMonth;
					oldYear = year;
					oldMonth = month;

					if (!show_week) {
						date_input.val(year + (show_time > 2 ? '' : '-' + famatNum(month)) + (show_time > 1 ? '' : '-' + famatNum(pickDate)) + (!show_time ? ' ' + famatNum(checkTime(time_input_hours.val())) + ':' + famatNum(checkTime(time_input_minute.val())) + ':' + famatNum(checkTime(time_input_second.val())) : ''));
					} else {
						var	day = new Date(year, month - 1, pickDate).getDay(),
							now_day = new Date(year, month, 0).getDate(),
							next_day = new Date(year, month - 1, 0).getDate(),
							year_0 = year_1 = year,
							month_0 = month_1 = month,
							week_0,
							week_1;

						if (!day) {
							week_0 = pickDate - 6;
							week_1 = pickDate;
						} else {
							week_0 = parseInt(pickDate - day) + 1,
							week_1 = parseInt(pickDate) + 7 - day;
						}

						if (week_0 < 1) {
							week_0 += parseInt(next_day);
							month_0 = month - 1;

							if (month_0 < 1) {
								month_0 = 12;
								year_0--;
							}
						}

						if (week_1 > now_day) {
							week_1 -= now_day;
							month_1 = month + 1;

							if (month_1 > 12) {
								month_1 = 1;
								year_1++;
							}
						}
						date_input.val(year_0 + '-' + famatNum(month_0) + '-' + famatNum(week_0) + ' 到 ' + year_1 + '-' + famatNum(month_1) + '-' + famatNum(week_1));
					}
				}

				// 显示日期
				function showDate(year, month) {
					year = parseInt(year);
					month = parseInt(month);

					year = year ? year : oldYear;
					month = month ? month : oldMonth;
					oldYear = year;
					oldMonth = month;

					if (year < opts.year_start) {
						year = opts.year_start;
					} else if (year > opts.year_end) {
						year = opts.year_end;
					}

					if (month < 1) {
						manth = 1;
					} else if (month > 12) {
						month = 12;
					}

					var	tbody_html = '',
						now_day = new Date(year, month, 0).getDate(), // 这个月的天数
						next_day = new Date(year, month - 1, 0).getDate(), // 上一个月天数
						next_day_on = new Date(year, month - 1, 1).getDay(), // 可显示上一个月的天数
						prev_day_on = 42 - now_day - next_day_on; // 可显示下一个月的天数

					select_year.val(year);
					select_month.val(month);
					nowDate = new Date();
					pickDate = nowDate.getDate();

					if (next_day_on) {
						for (var i = next_day - next_day_on; i < next_day; i++) {
							tbody_html += '<li class="next">' + (i + 1) + '</li>';
						}
					}

					for (var i = 0; i < now_day; i++) {
						tbody_html += '<li' + (year == nowDate.getFullYear() && month == nowDate.getMonth() + 1 && i == nowDate.getDate() - 1 ? ' class="now"' : '') + '>' + (i + 1) +'</li>';
					}

					if (prev_day_on) {
						for (var i = 0; i < prev_day_on; i++) {
							tbody_html += '<li class="prev">' + (i + 1) + '</li>';
						}
					}

					tbody.html(tbody_html).children('li:not(".next, .prev")').on('click', function () {
						caption_select.siblings('ul').hide();
						pickDate = $(this).html();
						showVal();
						$(this).addClass('pick').siblings().removeClass('pick');
					});

					tbody.children('li.next').on('click', function () {
						var month = parseInt(select_month.val()),
							year = parseInt(select_year.val());

						if (month == 1 && year == opts.year_start) return false;
						pickDate = $(this).html();

						var	month = parseInt(select_month.val()),
							_parent = $(this).parent(),
							_pickDate = pickDate;

						turnMonth(select_year.val(), --month);
						famatSelect();

						$.each(_parent.children('li:not(".next, .prev")'), function () {
							if ($(this).html() == _pickDate) {
								$(this).addClass('pick');
							}
						});

						pickDate = _pickDate;
						showVal();
					});

					tbody.children('li.prev').on('click', function () {
						var	month = parseInt(select_month.val()),
							year = parseInt(select_year.val());

						if (month == 12 && year == opts.year_end) return false;

						pickDate = $(this).html();

						var	_parent = $(this).parent(),
							_pickDate = pickDate;

						turnMonth(select_year.val(), ++month);
						famatSelect();

						$.each(_parent.children('li:not(".next, .prev")'), function () {
							if ($(this).html() == _pickDate) {
								$(this).addClass('pick');
							}
						});

						pickDate = _pickDate;
						showVal();
					});
				}

				// 滚轮
				function mouseWheel(elem, fn) {
					if (elem) {
						$.each($(elem), function () {
							$(this).on('mousewheel DOMMouseScroll', function (event) {
								if (this.scrollHeight == this.offsetHeight) event.preventDefault();

								if (fn) fn((event.originalEvent.wheelDelta && (event.originalEvent.wheelDelta > 0 ? 1 : -1)) || (event.originalEvent.detail && (event.originalEvent.detail > 0 ? -1 : 1)), $(this));
							});
						});
					}
				}

				// 正确输出时间
				function famatTime(elem, val) {
					if (elem.attr('data') == time_input_hours.attr('data')) {
						if (val > 23) {
							val = 0;
						}

						if (val < 0) {
							val = 23;
						}
					} else{
						if (val > 59) {
							val = 0;
						}

						if (val < 0) {
							val = 59;
						}
					}

					elem.val(val);
					showVal();
					timePick(elem);
				}

				// 翻页
				function turnMonth(year, month) {
					year = parseInt(year);
					month = parseInt(month);

					if (month < 1) {
						month = 12;
						year--;
					}

					if (month > 12) {
						month = 1;
						year++;
					}

					if (year <= opts.year_end && year >= opts.year_start) {
						showDate(year, month);
					}
				}

				// 选中时间
				function timePick(elem) {
					var _con = $('.time-con[data=' + elem.attr('data') + ']');

					if (_con.is(':visible')) {
						$.each(_con.children('li'), function () {
							if (parseInt($(this).html()) == parseInt(elem.val())) {
								$(this).addClass('pick').siblings().removeClass('pick');
							}
						});
					}
				}

				// 选中年月
				function selectPick(elem) {
					$.each(elem.siblings('ul').children('li'), function () {
						if (parseInt($(this).html()) == parseInt(elem.val())) {
							$(this).addClass('pick').siblings().removeClass('pick');
						}
					});
				}

				function keyInput(elem, event, fn) {
					var _key = event.keyCode,
						_val = parseInt(elem.val().toString().replace(/\D/gi, ''));

					if (_key == 37 || _key == 39) {
						return false;
					} else if (_key == 38) {
						_val++;
					} else if (_key == 40) {
						_val--;
					}

					_val || _val == 0 ? fn(_key, _val, elem) : elem.val('');

					if (_key == 9) {
						elem.select();
					}
				}

				// 打开年月下拉列表
				function openSelect(select) {
					var _ul = select.siblings('ul');

					select.select();
					caption_select.siblings('ul').hide();
					_ul.show();
					time_con.hide();

					$.each(_ul.children(), function () {
						if (parseInt($(this).html()) == parseInt(select.val())) {
							$(this).removeClass('pick').addClass('now').siblings().removeClass('pick, now');
						}
					});
				}

				// 年月列表
				caption_select.on('click', function () {
					openSelect($(this));
				})
				.on('focus', function () {
					openSelect($(this));
				})
				.on('change', function () {
					showDate(select_year.val(), select_month.val());
					showVal();
					famatSelect();
					selectPick($(this));
				})
				.parent().on('click', function (event) {
					event.stopPropagation();
				})
				.find('li').on('click', function (event) {
					event.preventDefault();
					var _parent = $(this).parent(),
						_input = _parent.siblings('input');

					_input.val($(this).html());
					selectPick(_input);
					showVal();
					_parent.hide();
				});

				// 年/月选中
				caption_select.siblings('ul').children('li').on('click', function () {
					var _inputs = $(this).parent().parent().parent().find('input'),
						_input = $(this).parent().siblings('input'),
						_year = _inputs.eq(1),
						_month = _inputs.eq(0);

					turnMonth(_year.val(), _month.val());
					famatSelect();
					showVal();
					_input.select();
					selectPick(_input);
					$(this).parent().hide();
				});

				// 月输入
				select_month.on('keydown, keyup', function (event) {
					keyInput($(this), event, function (_key, _val, that) {
						turnMonth(select_year.val(), _val);
						select_year.val(parseInt(select_year.val()) + '年');
						showVal();
						selectPick(that);
					});
				});

				// 年输入
				select_year.on('keydown, keyup', function (event) {
					keyInput($(this), event, function (_key, _val, that) {
						if (_val >= opts.year_start && _val <= opts.year_end) {
							showDate(_val, select_month.val());
							select_month.val(parseInt(select_month.val()) + '月');
							showVal();
							selectPick(that);
						}
					});
				});

				// 月滚动翻页
				mouseWheel(select_month, function (delta, that) {
					var month = parseInt(select_month.val());
					delta > 0 ? month++ : month--;
					turnMonth(select_year.val(), month);
					famatSelect();
					showVal();
					that.select();
					selectPick(that);
				});

				// 月列表滚动
				mouseWheel(select_month.siblings('ul'), function (delta, that) {
					var _input = that.siblings('input'),
						month = parseInt(_input.val());
					delta > 0 ? month++ : month--;
					turnMonth(select_year.val(), month);
					famatSelect();
					showVal();
					_input.select();
					selectPick(_input);
				});

				// 年滚动翻页
				mouseWheel(select_year, function (delta, that) {
					var year = parseInt(select_year.val());
					delta > 0 ? year++ : year--;

					if (year > opts.year_end) {
						year = opts.year_start;
					}

					if (year < opts.year_start) {
						year = opts.year_end;
					}

					showDate(year, select_month.val());
					famatSelect();
					showVal();
					that.select();
					selectPick(that);
				});

				// 年列表滚动
				var year_ul = select_year.siblings('ul');

				mouseWheel(year_ul, function (delta, that) {
					var _input = that.siblings('input'),
						year = parseInt(_input.val());
					delta > 0 ? year++ : year--;

					if (year > opts.year_end) {
						year = opts.year_start;
					}

					if (year < opts.year_start) {
						year = opts.year_end;
					}

					showDate(year, select_month.val());
					famatSelect();
					showVal();
					_input.select();
					selectPick(_input);
				});

				// 显示与隐藏插件对象
				date_input.on('click, focus', function () {
					date_inputs.not($(this)).siblings('.table-date').hide().find('.caption .select ul').hide();
					time_con.hide();

					if (wrap_date.is(':hidden')) {
						showDate(nowDate.getFullYear(), nowDate.getMonth() + 1);
						famatSelect();
						showTime();

						if (!$.trim($(this).val())) {
							showVal();
						}
						wrap_date.show();
					}
				})
				.on('keydown', function (event) {
					if (event.keyCode == 13) {
						date_inputs.not($(this)).siblings('.table-date').hide().find('.caption .select ul').hide();
						wrap_date.show();
						time_con.hide();
						showDate(nowDate.getFullYear(), nowDate.getMonth() + 1);
						famatSelect();
						showTime();
					}
				});

				// 隐藏插件对象
				$(document).on('click', function () {
					date_inputs.siblings('.table-date').hide();
					caption_select.siblings('ul').hide();
					time_con.hide();
				})
				.on('keydown', function (event) {
					if (event.keyCode == 27 && new Date() - keyDate > 0) {
						var _table_date = $('.table-date:visible'),
							_time_con = _table_date.find('.time-con'),
							_caption_select = _table_date.find('.caption input');
						
						if (_time_con.is(':visible')) {
							_time_con.hide().siblings().children('input').blur();
						} else if (_caption_select.siblings('ul').is(':visible')) {
							_caption_select.siblings('ul').hide().siblings('input').blur();
						} else if (date_inputs.siblings('.table-date').is(':visible')) {
							_table_date.hide();
						}
					}
					keyDate = new Date();
				});

				wrap_date.on('click', function () {
					caption_select.siblings('ul').hide();
					time_con.hide();
				});

				// 阻止点击事件冒泡到插件对象的容器上
				date_input.parent().on('click', function (event) {
					event.stopPropagation();
				});

				wrap_time_input.on('click', function (event) {
					event.stopPropagation();
				});

				time_con.on('click', function (event) {
					event.stopPropagation();
				});

				// 日期滚动翻页
				mouseWheel(tbody, function (delta) {
					var month = parseInt(select_month.val());
					delta > 0 ? month++ : month--;
					turnMonth(select_year.val(), month);
					famatSelect();
				});

				// 向左翻页
				month_left.on('click', function () {
					var month = parseInt(select_month.val());
					turnMonth(select_year.val(), --month);
					famatSelect();
				});

				// 向右翻页
				month_right.on('click', function () {
					var month = parseInt(select_month.val());
					turnMonth(select_year.val(), ++month);
					famatSelect();
				});

				// 打开时间
				function openTime(that) {
					var _con = $('.table-date:visible .time-con[data=' + that.attr('data') + ']');
					_con.show().siblings('.time-con').hide();
					caption_select.siblings('ul').hide();
					that.select();

					if (_con.is(':visible')) {
						$.each(_con.children('li'), function () {
							if (parseInt($(this).html()) == parseInt(that.val())) {
								$(this).removeClass('pick').addClass('now').siblings().removeClass('pick, now');
							}
						});
					}
				}

				// 展示时间
				time_inputs.on('focus', function () {
					openTime($(this));
				})
				.on('keydown, keyup', function (event) {
					keyInput($(this), event, function (_key, _val, that) {
						famatTime(that, _val);
					});
				})
				.on('change, blur', function () {
					$(this).val(famatNum(checkTime($(this).val())));
				});

				// 关闭父级窗口
				close_parent.on('click', function () {
					$(this).parent().hide();
				});

				// 选中时间
				time_con.children('li').on('click', function (event) {
					event.preventDefault();
					$('.time-input[data=' + $(this).parent().attr('data') + ']').val(famatNum($(this).html())).select();
					showVal();
					$(this).addClass('pick').siblings().removeClass('pick').parent().hide();
				});

				// 滚轮选中时间
				mouseWheel(time_inputs, function (delta, that) {
					that.focus();
					var _val = that.val();
					delta > 0 ? _val++ : _val--;
					famatTime(that, _val);
				});

				mouseWheel(time_con, function (delta, that) {
					var _input = that.siblings('.wrap-time-input').find('.time-input[data=' + that.attr('data') + ']'),
						_val = _input.val();
					delta > 0 ? _val++ : _val--;
					famatTime(_input, _val);
				});

				// 最大时间
				time_max.on('click', function () {
					time_input_hours[0].value = 23;
					time_input_minute[0].value = time_input_second[0].value = 59;
					showVal();
					timePick(time_input_hours);
					timePick(time_input_minute);
					timePick(time_input_second);
				});

				// 最小时间
				time_min.on('click', function () {
					time_input_hours[0].value = time_input_minute[0].value = time_input_second[0].value = '00';
					showVal();
					timePick(time_input_hours);
					timePick(time_input_minute);
					timePick(time_input_second);
				});

				// 当前 
				now_time.on('click', function () {
					nowDate = new Date();
					showDate(nowDate.getFullYear(), nowDate.getMonth() + 1);
					famatSelect();
					showTime();
					showVal();
				})
				.on('focus', function () {
					$(this).parent().siblings().find('.time-con').hide();
					select_month.siblings('ul').hide();
					select_year.siblings('ul').hide();
				});

				// 确认(隐藏插件对象)
				update_time.on('click', function () {
					wrap_date.hide();
					showVal();
				});
			});
		}
	}
})(jQuery);