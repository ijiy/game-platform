// 保持设置
submitPost($('.submit'), function () {
	alert('检查提交内容');
}, function () {
	alert('保存成功');
});

// 实例化下拉列表
wrapSelect($('.wrap-select input'));

// 实例化日期插件
$('.date').cDate({
	year_start: 2000,
	year_end: new Date().getFullYear() // 应该从服务器获取今年
})