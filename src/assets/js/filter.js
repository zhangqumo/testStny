import Vue from 'vue'
export default (function() {
  Vue.filter('status', function(value) {
    if (value == 1) {
      return '启用'
    } else if (value == 0) {
      return '禁用'
    } else {
      return '未知状态'
    }
  })
  Vue.filter('statusOrder', function(value) {
    if (value == 1) {
      return '待付款'
    } else if (value == 2) {
      return '待接单'
    } else if (value == 3) {
      return '待发货'
    } else {
      return '已发货'
    }
  })
  Vue.filter('gender', function(value) {
    if (value == 1) {
      return '男'
    } else if (value == 2) {
      return '女'
    } else {
      return '保密'
    }
  })
  Vue.filter('card_level', function(value) {
    if (value == 0) {
      return '准会员'
    } else if (value == 1) {
      return '会员'
    } else {
      return ''
    }
  })
  Vue.filter('from', function(value) {
    if (value == 'exchange') {
      return '商城兑换'
    } else if (value == 'register') {
      return '注册赠送'
    } else if (value == 'sys') {
      return '系统发放'
    } else if (value == 'birthday') {
      return '生日发放'
    } else {
      return '其他'
    }
  })
  Vue.filter('state', function(value) {
    if (value == 'using') {
      return '待核销'
    } else if (value == 'used') {
      return '已使用'
    } else if (value == 'nouse') {
      return '未使用'
    }
  })
  Vue.filter('order_status', function(value) {
    if (value == '1') {
      return '已绑定'
    } else if (value == '0') {
      return '未绑定'
    } else if (value == '-1') {
      return '已隐藏'
    }
  })
  Vue.filter('rules', function(value) {
    return value
  })
  Vue.filter('fileLink', function(value) {
    const link = window.imgUrl + value
    return link
  })
  Vue.filter('toolType', function(value) {
    let type = ''
    if (value == 1) {
      type = '系统工具'
    } else if (value == 2) {
      type = '说明知道'
    }
    return type
  })
  Vue.filter('numToString', function(value) {
    const string = value.toString()
    return string
  })
  Vue.filter('projectState', function(value) {
    let string = ''
    switch (value) {
      case '1':
        string = '售前项目'
        break
      case '2':
        string = '服务中项目'
        break
      case '3':
        string = '已结束项目'
        break
    }
    return string
  })
  Vue.filter('time', function(value) {
    let day = moment.unix(value)
    let date = moment(day).format('YYYY/MM/DD H:mm')
    return date
  })
  Vue.filter('date', function(value) {
    let day = moment.unix(value)
    let date = moment(day).format('YYYY/MM/DD')
    return date
  })
  Vue.filter('abstract', function(value) {
    let abstract = ''
    if (value.length > 70) {
      abstract = value.substr(0, 70) + '...'
    } else {
      abstract = value
    }
    return abstract
  })
  Vue.filter('posStatus', function(value) {
    let status = ''
    switch (value) {
      case 1:
        status = '在职'
        break
      case 2:
        status = '待入职'
        break
      case 3:
        status = '离职'
        break
    }
    return status
  })
  Vue.filter('template', function(value) {
    let template = ''
    if (value == '') {
      template = '上传'
    } else {
      template = '上传更新'
    }
    return template
  })


})()
