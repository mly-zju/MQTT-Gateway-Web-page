$(document).ready(function(){
	var addItem=$('.add-item');
	var table=$('.config');
	table.on('click','.check-button',function(e){
		var tmp=$(this).closest('tr');
		var val=tmp.find('.device-index').eq(0).val();
		var data={};
		data.deviceId=val;
		// $.ajax({
		// 	url:'/check',
		// 	dataType:'json',
		// 	type:'post',
		// 	data:data
		// });
	});
});
