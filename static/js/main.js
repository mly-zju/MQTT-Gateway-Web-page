$(document).ready(function() {
  var logout = $('.logout').eq(0);
  var table = $('.config').eq(0);
  var selfOn = $('.self-config').eq(0);
  var configLayer = $('.config-layer').eq(0);
  var configItems = configLayer.find('.config-input');
  var deviceId = configLayer.find('.config-id').eq(0);
  var configYes = $('.config-yes').eq(0);
  var configNo = $('.config-no').eq(0);
  var selfConfigLayer = $('.self-config-layer').eq(0);
  var selfConfigYes = $('.self-config-yes').eq(0);
  var selfConfigNo = $('.self-config-no').eq(0);
  var selfConfigDel = $('.rule-del');
  var selfConfigAdd = $('.self-config-add');

  logout.click(function() {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.reload();
  });

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
    if (items.eq(3).text() != '' && items.eq(4).text().split('/')[1] != '') {
      window.location.assign('/check?deviceId=' + e.target.dataset.checkid);
    } else {
      alert('请补全主题和数据单位！');
    }
  });

  configYes.click(function() {
    $('.config-form')[0].submit();
    configLayer.css('display', 'none');
  })

  configNo.click(function() {
    configLayer.css('display', 'none');
  })

  selfOn.click(function() {
    selfConfigLayer.css('display', 'block');
  });

  selfConfigYes.click(function() {
    var selfConfigRule = $('.self-config-rule');
    if (selfConfigRule.length == 0) {
      alert('没有添加规则！');
      selfConfigLayer.css('display', 'none');
      return;
    }
    var ruleManu = [];
    var ruleIpBegin = [];
    var ruleIpEnd = [];
    var ruleTopic = [];
    var ruleExt = [];
    var ruleScale = [];
    selfConfigRule.each(function(index, ele) {
      var t = $(this);
      ruleManu.push(t.find('.rule-manu option:selected').text());
      ruleIpBegin.push(t.find('.rule-ip-begin').val());
      ruleIpEnd.push(t.find('.rule-ip-end').val());
      ruleTopic.push(t.find('.rule-topic').val());
      ruleExt.push(t.find('.rule-extension option:selected').text());
      ruleScale.push(t.find('.rule-scaley').val() + '/' + t.find('.rule-scalex option:selected').text());
    });
    var infoManu = $('.info-manu');
    var infoAddr = $('.info-addr');
    var infoTopic = $('.info-topic');
    var infoScale = $('.info-scale');
    var deviceNum = infoManu.length;
    var jsonData = [];
    for (var i = 0; i < selfConfigRule.length; i++) {
      var deviceIndex = 0;
      var begin = '',
        end = '';
      if (ruleIpBegin[i] != '' && ruleIpEnd[i] != '') {
        begin = ruleIpBegin[i].split('.')[3];
        end = ruleIpEnd[i].split('.')[3];
      }
      for (var j = 0; j < deviceNum; j++) {
        if (ruleManu[i] == '不限厂商' || infoManu.eq(j).text() == ruleManu[i]) {
          if (begin != '' && end != '') {
            var addr = Number(infoAddr.eq(j).text().split('.')[3].split('/')[0]);
            if (addr >= Number(begin) && addr <= Number(end)) {
              if (ruleExt[i] == '无后缀') {
                infoTopic.eq(j).text(ruleTopic[i]);
                infoScale.eq(j).text(ruleScale[i]);
                jsonData.push({
                  deviceId: j,
                  topic: ruleTopic[i],
                  scale: ruleScale[i]
                });
              } else if (ruleExt[i] == '按照设备索引') {
                infoTopic.eq(j).text(ruleTopic[i] + '(' + deviceIndex + ')');
                infoScale.eq(j).text(ruleScale[i]);
                jsonData.push({
                  deviceId: j,
                  topic: ruleTopic[i] + '(' + deviceIndex + ')',
                  scale: ruleScale[i]
                });
                deviceIndex++;
              }
            }
          } else if (begin == '' && end == '') {
            if (ruleExt[i] == '无后缀') {
              infoTopic.eq(j).text(ruleTopic[i]);
              infoScale.eq(j).text(ruleScale[i]);
              jsonData.push({
                deviceId: j,
                topic: ruleTopic[i],
                scale: ruleScale[i]
              });
            } else if (ruleExt[i] == '按照设备索引') {
              infoTopic.eq(j).text(ruleTopic[i] + '(' + deviceIndex + ')');
              infoScale.eq(j).text(ruleScale[i]);
              jsonData.push({
                deviceId: j,
                topic: ruleTopic[i] + '(' + deviceIndex + ')',
                scale: ruleScale[i]
              });
              deviceIndex++;
            }
          }
        }
      }
    }
    $.ajax({
      dataType: 'json',
      type: 'PUT',
      url: '/index',
      data: JSON.stringify(jsonData),
      complete: function(data) {
        if (data.status == '200') {
          alert('自动配置成功!');
        } else {
          alert('自动配置失败');
        }
      }
    });
    selfConfigLayer.css('display', 'none');
  });

  selfConfigNo.click(function() {
    selfConfigLayer.css('display', 'none');
  })

  $('.self-config-wrapper').on('click', '.rule-del', function(e) {
    $(e.target).parent().remove();
  })

  selfConfigAdd.click(function() {
    var myhtml = "<div class='self-config-rule'>\
      <button class='rule-del'>&times;</button>\
      <label>厂商分类:</label>\
      <select class='rule-manu'>\
        <option>不限厂商</option>\
        <option>Cisco</option>\
      </select><br/>\
      <label>IP范围:</label>\
      <input class='rule-ip-begin'/>~<input class='rule-ip-end'/><br/>\
      <label>主题:</label>\
      <input class='rule-topic'/>\
      <label>后缀:</label>\
      <select class='rule-extension'>\
        <option>无后缀</option>\
        <option>按照设备索引</option>\
      </select><br/>\
      <label>单位(X轴):</label>\
      <select class='rule-scalex'>\
        <option>day</option>\
        <option>hour</option>\
      </select><br/>\
      <label>单位(Y轴):</label>\
      <input class='rule-scaley'/><br/>\
    </div>\
    "
    selfConfigYes.before(myhtml);
  })
});
