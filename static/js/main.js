$(document).ready(function(){
	var addButton=$('.add-button');
	var addItem=$('.add-item');
	var table=$('.config');
	addButton.click(function(){
		var flag=1;
		addItem.each(function(index){
			if(!$(this).val())
				flag=0;
		});
		if(flag==0){
			alert('请补全信息！');
		}else{
			var tmp=document.createElement('tr');
			var content='';
			addItem.each(function(index){
				content+='<td>'+$(this).val()+'</td>';
			});
			content+='<td><button class="del-button">删除</button></td><td><button class="check-button">查看</button></td>'
			tmp.innerHTML=content;
			table.append(tmp);
		}
	});
	table.on('click','.del-button',function(e){
		var tmp=$(this).closest('tr');
		tmp.remove();
	});
});