$('.search-select li').click(function () {
	$(this).parent().siblings('span').html($(this).html());

	// ajax
	var data = {
		imgUrl: 'images/game-list-tj.png', // 图片
		title: '天局官网', // 标题
		con: '30绑定元宝、装备强化石*10', // 内容
		range: '全部', // 适用范围
		hot: 0, // 是否热门, 0||1
		limiteVip: 10, // 领取条件: [1, 10]
		limiteNum: 1000, // 仅限[0, ]份
		surplus: 123, // 剩余
	};

	$('.gift-list').html('<div class="block col-893"><dl class="clear"><dt><img src="' + data.imgUrl +'" alt="' + data.title + '"></dt><dd><h3 class="clear"><strong>' + data.title +'</strong>' + (data.limiteNum ? ('<em>仅限' + data.limiteNum + '份</em>') : '') + '<span' + (data.hot ? ' class="logo-hot"' : '') + '></span><div class="fr gift-limite">' + (data.limiteVip ? '<span style="background-position-y: -33px;"></span>' : '') + (data.limiteNum ? '<span></span>' : '') + '</div></h3><p>适用范围：<span>' + data.range +'</span></p><p>礼包内容：<span>' + data.con + '</span></p><p>领取条件：<span class="vip-x vip-' + data.limiteVip + '"></span></p><p>剩余：<em>' + data.surplus + '</em></p><a href="" class="custom-btn" target="_blank">立即领取</a></dd></dl></div>');
});