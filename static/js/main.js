$(document).ready(function(){
	var addItem=$('.add-item');
	var table=$('.config');
	var configLayer=$('.config-layer');
	var configItems=configLayer.find('.config-input');
	var deviceId=configLayer.find('.config-id').eq(0);
	table.on('click','.config-button',function(e){
		var tmp=$(this).closest('tr');
		var items=tmp.find('td');
		configLayer.css('display','block');
		for(var i=0;i<3;i++){
			configItems.eq(i).val(items.eq(i).text());
		}
		var scale=items.eq(3).text().split('/');
		configItems.eq(3).val(scale[1]);
		configItems.eq(4).val(scale[0]);
		var id=tmp.find('.check-button a').attr('href').split('=')[1];
		deviceId.val(id);
	});
	configLayer.on('click',function(e){
		if(e.target==e.currentTarget){
			configLayer.css('display','none');
		}
	});
});
