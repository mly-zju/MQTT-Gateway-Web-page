$(document).ready(function() {
  var dataBack = $('.data-back');
  var deviceInfo = JSON.parse($('#deviceInfo').val());
  var deviceData = JSON.parse($('#deviceData').val());
  deviceData.shift();

  dataBack.click(function() {
    window.history.back();
  });

  var title = {
    text: deviceInfo.topic
  };
  var oneDay = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00'
    , '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
    '21:00', '22:00', '23:00'];
  var oneWeek = ['周一', '周二', '周三', '周四', '周五', '周六', '周天'];
  var timeLib = [oneDay, oneWeek];
  var xAxis = {};
  var categories = [];
  var count = 0;
  var limit = 0;
  var timeLibIndex = 0;
  console.log(deviceInfo.scale.split('/')[1]);
  if (deviceInfo.scale.split('/')[1] == 'hour') {
    limit = 24;
    timeLibIndex = 0;
  } else {
    limit = 7;
    timeLibIndex = 1;
  }
  for (var i = parseInt(deviceInfo.currentTime); i >= 0; i--) {
    categories.unshift(timeLib[timeLibIndex][i]);
    count++;
  }
  for (var i = limit - 1; count < limit; count++) {
    categories.unshift(timeLib[timeLibIndex][i]);
    i--;
  }
  console.log(categories);
  xAxis = {
    categories: categories
  }


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

  var series = [
    {
      name: deviceInfo.deviceName,
      data: deviceData.slice(24-limit)
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
