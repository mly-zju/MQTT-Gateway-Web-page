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
         name: deviceInfo.deviceName,
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

   $('#container1').highcharts(json1);
});
