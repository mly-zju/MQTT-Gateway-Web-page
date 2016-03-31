$(document).ready(function() {
  var deviceInfo=JSON.parse($('#deviceInfo').val());
  var deviceData=JSON.parse($('#deviceData').val());
  deviceData.shift();

   var title = {
       text: deviceInfo.topic
   };
   var xAxis = {
      //  categories: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00'
      //         ,'06:00', '07:00', '08:00', '09:00', '10:00', '11:00']
      categories: ['00:00','01:00','02:00']
   };
   var yAxis = {
      title: {
         text: deviceInfo.scale.split('/')[0]
      },
      plotLines: [{
         value: 0,
         width: 1,
         color: '#808080'
      }]
   };

   var tooltip = {
      valueSuffix: '\xB0C'
   }

   var legend = {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0
   };

   var series =  [
      {
         name: deviceInfo.diveceName,
        //  data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2,
        //     26.5, 23.3, 18.3, 13.9, 9.6]
        data: deviceData
      }
   ];

   var json1 = {};
   var json2 = {};
   var json3 = {};

   json1.title = title;
   json1.xAxis = xAxis;
   json1.yAxis = yAxis;
   json1.tooltip = tooltip;
   json1.legend = legend;
   json1.series = series;

   var title2={
       text: '一周内平均气温'
   };
   json2.title = title2;
   json2.xAxis = xAxis;
   json2.yAxis = yAxis;
   json2.tooltip = tooltip;
   json2.legend = legend;
   json2.series = series;

   var title3={
       text: '一月内平均气温'
   };
   json3.title = title3;
   json3.xAxis = xAxis;
   json3.yAxis = yAxis;
   json3.tooltip = tooltip;
   json3.legend = legend;
   json3.series = series;

   $('#container1').highcharts(json1);
   $('#container2').highcharts(json2);
   $('#container3').highcharts(json3);
   var ul=$('.nav');
   var lis=$('.nav li');
   var as=$('.nav li a');
   var containers=$('.container');
   ul.on('click','li',function(e){
       lis.removeClass('mine-display');
       $(this).addClass('mine-display');
       containers.css('display','none');
       var index;
       for(var i=0;i<as.length;i++){
           if(as.eq(i)[0]==e.target)
              index=i;
       }
       containers.eq(index).css('display','block');
   });
});
