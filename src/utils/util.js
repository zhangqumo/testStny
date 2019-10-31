function getDay() {
	var now = new Date();
	var Year = now.getFullYear(); //获取完整的年份
	var Month = now.getMonth() + 1; //获取当前月份
	var Day = now.getDate(); //获取当前日
	var Hours = now.getHours(); //获取当前小时数(0-23)
	var Min = now.getMinutes(); //获取当前分钟数(0-59)
	var timestamp = now.getTime();
	var weekDay = ["周末", "周一", "周二", "周三", "周四", "周五", "周六"];
	var weeknum = now.getDay();
	var week = weekDay[weeknum % 7]; //获取星期几 
	var Alldate = [{
		date: Month + "/" + Day,
		weekDay: week,
		time: timestamp
	}];
	if (Month < 10) {
		Alldate[0].date = "0" + Alldate[0].date
	}
	console.log(timestamp)
	for (let i = 1; i < 7; i++) {
		let maxDay = new Date(Year, Month, 0).getDate(); //获取当前月份有多少天
		let thatDate = {
			date: Month + "/" + Day,
			weekDay: week,
			time: timestamp
		}
		Day++;
		weeknum++;
		if (Day > maxDay) {
			Day = 1;
			Month++;
		}
		if (Month > 12) {
			Month = 1;
			Year++;
		}
		week = weekDay[weeknum % 7]; //获取星期几  
		timestamp = timestamp + 86400000 * i;
		if (Month < 10) {
			thatDate.date = "0" + thatDate.date
		}
		Alldate.push(thatDate);
	}
	return Alldate
}

function getToday(carts, disabled, leftindex) {
	var now = new Date();
	var Year = now.getFullYear(); //获取完整的年份
	var Month = now.getMonth() + 1; //获取当前月份
	var Day = now.getDate(); //获取当前日
	var Hours = now.getHours(); //获取当前小时数(0-23)
	var Min = now.getMinutes(); //获取当前分钟数(0-59)
	var weekDay = ["周末", "周一", "周二", "周三", "周四", "周五", "周六"];
	var weeknum = now.getDay();
	var Alldate = [{
		date: Month + "月" + Day + "日",
		weekDay: week
	}];
	for (let i = 0; i < 6; i++) {
		let maxDay = new Date(Year, Month, 0).getDate(); //获取当前月份有多少天
		Day++;
		weeknum++;
		if (Day > maxDay) {
			Day = 1;
			Month++;
		}
		if (Month > 12) {
			Month = 1;
			Year++;
		}
		var week = weekDay[weeknum % 7]; //获取星期几 

		let thatDate = {
			date: Month + "月" + Day + "日",
			weekDay: week
		}
		Alldate.push(thatDate);
	}

	Alldate[0].weekDay = "今天";
	Alldate[1].weekDay = "明天";
	Alldate[2].weekDay = "后天";
	let AllTime = [];
	let All = {};
	//let orderTime = 0;
	// for(let i=0;i<carts.length;i++){
	//   orderTime += carts[i].time
	// }
	//let orderTimenum = Math.floor(orderTime/60);
	let thatTime;
	let fornum
	if (leftindex == 0) {
		//Hours = 11;Min = 59;
		if (Min < 30) {
			Min = 30;
		} else {
			Min = 0;
			Hours++;
		}
		//orderTimenum = (orderTime-orderTimenum*60>30)? orderTimenum++:(orderTime%60==0)?orderTimenum:orderTimenum+0.5;
		//fornum = (18-Hours-orderTimenum-2)*2;
		fornum = (24 - Hours - 2) * 2 - 1;
		Hours += 2;
		for (let i = 0; i <= fornum; i++) {
			if (Min == 0) {
				if (Hours < 10)
					thatTime = {
						time: "0" + Hours + ":0" + Min
					}
				else
					thatTime = {
						time: Hours + ":0" + Min
					}
			} else {
				if (Hours < 10)
					thatTime = {
						time: "0" + Hours + ":" + Min
					}
				else
					thatTime = {
						time: Hours + ":" + Min
					}
			}
			AllTime.push(thatTime);
			Min += 30;
			if (Min > 59) {
				Hours++;
				Min = 0;
			}
		}
		if (AllTime.length == 0) {
			disabled = 0;
			leftindex = 1;
			Hours = 0;
			Min = 0;
			fornum = (24 - Hours) * 2 - 1
			if (Min == 0) {
				if (Hours < 10)
					thatTime = {
						time: "0" + Hours + ":0" + Min
					}
				else
					thatTime = {
						time: Hours + ":0" + Min
					}
			} else {
				if (Hours < 10)
					thatTime = {
						time: "0" + Hours + ":" + Min
					}
				else
					thatTime = {
						time: Hours + ":" + Min
					}
			}
			AllTime.push(thatTime);
			Min += 30;
			if (Min > 59) {
				Hours++;
				Min = 0;
			}
		}
	} else if (leftindex != 0) {
		// Hours = 0;Min = 0;
		// fornum = (24-Hours)*2-1
		// for(let i=0;i<=fornum;i++){
		//   if(Min==0){
		//     if(Hours<10)
		//       thatTime = {time: "0"+Hours+":0"+Min}
		//     else 
		//       thatTime = {time: Hours+":0"+Min}
		//   }
		//   else{
		//     if(Hours<10)
		//       thatTime = {time: "0"+Hours+":"+Min}
		//     else 
		//       thatTime = {time: Hours+":"+Min}
		//   }
		//   AllTime.push(thatTime);
		//   Min += 30;
		//   if(Min>59){
		//     Hours++;
		//     Min = 0;
		//   }
		// }
		AllTime = [{
				time: "00:00"
			}, {
				time: "00:30"
			}, {
				time: "01:00"
			},
			{
				time: "01:30"
			}, {
				time: "02:00"
			}, {
				time: "02:30"
			}, {
				time: "03:00"
			},
			{
				time: "03:30"
			}, {
				time: "04:00"
			}, {
				time: "04:30"
			}, {
				time: "05:00"
			},
			{
				time: "05:30"
			}, {
				time: "06:00"
			}, {
				time: "06:30"
			}, {
				time: "07:00"
			},
			{
				time: "07:30"
			}, {
				time: "08:00"
			}, {
				time: "08:30"
			}, {
				time: "09:00"
			},
			{
				time: "09:30"
			}, {
				time: "10:00"
			}, {
				time: "10:30"
			},
			{
				time: "11:00"
			}, {
				time: "11:30"
			}, {
				time: "12:00"
			},
			{
				time: "12:30"
			}, {
				time: "13:00"
			}, {
				time: "13:30"
			},
			{
				time: "14:00"
			}, {
				time: "14:30"
			}, {
				time: "15:00"
			},
			{
				time: "15:30"
			}, {
				time: "16:00"
			}, {
				time: "16:30"
			},
			{
				time: "17:00"
			}, {
				time: "17:30"
			}, {
				time: "18:00"
			},
			{
				time: "18:30"
			}, {
				time: "19:00"
			}, {
				time: "19:30"
			},
			{
				time: "20:00"
			}, {
				time: "20:30"
			}, {
				time: "21:00"
			},
			{
				time: "21:30"
			}, {
				time: "22:00"
			}, {
				time: "22:30"
			},
			{
				time: "23:00"
			}, {
				time: "23:00"
			}
		]
	}
	All = {
		Alldate,
		AllTime,
		disabled,
		leftindex
	}
	return All;
}

function getDates(days, todate) {

	var dateArry = [];

	for (var i = 0; i < days; i++) {

		var dateObj = dateLater(todate, i);

		dateArry.push(dateObj)

	}

	return dateArry;

}

function dateLater(dates, later) {

	let dateObj = {};

	let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
	let show_dayN = new Array(7, 1, 2, 3, 4, 5, 6);

	let date = new Date(dates);

	date.setDate(date.getDate() + later);

	let day = date.getDay();

	let yearDate = date.getFullYear();

	let month = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1);
	let dayFormate = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());

	dateObj.date = month + '/' + dayFormate;
	dateObj.dateTow = month + '-' + dayFormate;
	dateObj.weekDay = show_day[day];

	dateObj.time = Date.parse(yearDate + '/' + month + '/' + dayFormate);
	dateObj.timeTwo = yearDate + '-' + month + '-' + dayFormate;
	dateObj.weekNo = show_dayN[day];
	return dateObj;


}
const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}

function formatTodayHalfHours(nowDate = +new Date()) {
	var timeStamp = new Date(new Date().setHours(0, 0, 0, 0));
	var dateList = [];

	while (nowDate > timeStamp) {
		var hour = new Date(nowDate).getHours() < 10 ? '0' + new Date(nowDate).getHours() : new Date(nowDate).getHours();
		console.log(hour)
		var minute = new Date(nowDate).getMinutes() < 31 ? '00' : '30';

		dateList.unshift(hour + ':' + minute);
		nowDate -= 30 * 60 * 1000
	}
	return dateList
}


// 函数节流
function throttle(fn, gapTime) {
	if (gapTime == null || gapTime == undefined) {
		gapTime = 1500
	}

	let _lastTime = null

	// 返回新的函数
	return function() {
		let _nowTime = +new Date()
		if (_nowTime - _lastTime > gapTime || !_lastTime) {
			fn.apply(this, arguments) //将this和参数传给原函数
			_lastTime = _nowTime
		}
	}
}
// 具体时间
function specificDate() {
	var isData = false;
	var day2 = new Date();
	day2.setTime(day2.getTime());
	var specificDate = day2.getDate();
	if (specificDate == 20) {
		isData = true
	}
	return isData
}
//获取屏幕得宽高
function screenHeightWidth() {
	var screenWidth, screenHeight;
	return {
		screenWidth: document.documentElement.clientWidth,
		screenHeight: document.documentElement.clientHeight
	}
}
//px转为rem按1rem == 37.5px转换保留6小数
function conversion(a) {
	let num = (a / 37.5).toFixed(6);
	return num
}
//判断时苹果还是安卓手机并且判断是不是ipx
function getsystem() {
	var u = navigator.userAgent,
		app = navigator.appVersion,
		model = '';
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
	var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if (isAndroid) {
		model = 'an'
	}
	if (isIOS) {
		if (screen.height == 812 && screen.width == 375) {
			//是iphoneX
			model = 'ipx'
		} else {
			model = 'ip'
			//不是iphoneX
		}

	}
	return model
}
//把函数添加到对象属性里 
module.exports = {
	formatTime: formatTime,
	getToday: getToday,
	throttle: throttle,
	getDay: getDay,
	getDates: getDates,
	formatTodayHalfHours: formatTodayHalfHours,
	specificDate,
	screenHeightWidth,
	conversion,
	getsystem
}
