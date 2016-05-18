$(document).ready(function() {
  var table = $('.config').eq(0);
  var selfOn = $('.self-config').eq(0);
  var configLayer = $('.config-layer').eq(0);
  var configItems = configLayer.find('.config-input');
  var deviceId = configLayer.find('.config-id').eq(0);
  var selfConfigLayer = $('.self-config-layer').eq(0);
  table.on('click', '.config-button', function(e) {
    var tmp = $(this).closest('tr');
    var items = tmp.find('td');
    configLayer.css('display', 'block');
    for (var i = 0; i < 4; i++) {
      configItems.eq(i).val(items.eq(i).text());
    }
    var scale = items.eq(4).text().split('/');
    configItems.eq(5).val(scale[0]);
    var id = tmp.find('.check-button')[0].dataset.checkid;
    deviceId.val(id);
  });
  table.on('click', '.check-button', function(e) {
    var tmp = $(this).closest('tr');
    var items = tmp.find('td');
    if (items.eq(3).text() != '' && items.eq(4).text().split('/')[0] != '' && items.eq(4).text().split('/')[1] != '') {
      window.location.assign('/check?deviceId=' + e.target.dataset.checkid);
    } else {
      alert('请补全主题和数据单位！');
    }
  });
  configLayer.on('click', function(e) {
    if (e.target == e.currentTarget) {
      configLayer.css('display', 'none');
    }
  });
  selfOn.click(function() {
    selfConfigLayer.css('display', 'block');
  });
  selfConfigLayer.on('click', function(e) {
    if (e.target == e.currentTarget) {
      selfConfigLayer.css('display', 'none');
    }
  });
});
