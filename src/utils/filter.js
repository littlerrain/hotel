const filter = {
  formatDate: function (value) {
    var d = new Date(value)
    var year = d.getFullYear()
    var month = d.getMonth() + 1
    var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
    // var hour = d.getHours();
    // var minutes = d.getMinutes();
    // var seconds = d.getSeconds();
    // return  year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
    return year + '-' + month + '-' + day
  },
  formatDay: function (value) {
    const wd = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六']
    var d = new Date(value)
    var year = d.getFullYear()
    var month = d.getMonth() + 1
    var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
    var hour = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    var dow = d.getDay();
     //return  year+ '年' + month + '月' + day + '日 ' + hour + ':' + minutes + ':' + seconds;
    return year + '年' + month + '月' + day + '日 ' + wd[dow%7]
  },
};

export default filter