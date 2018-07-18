var monthNames = ["1 月 ", "2 月 ", "3 月 ", "4 月 ", "5 月 ", "6 月 ",
    "7 月 ", "8 月 ", "9 月 ", "10 月 ", "11 月 ", "12 月 "
];
var dayNames = ["周日 ", "周一 ", "周二 ", "周三 ", "周四 ", "周五 ", "周六 "]

var newDate = new Date();
newDate.setDate(newDate.getDate());
$('#Date').html(
    newDate.getFullYear() + ' 年 ' +
    monthNames[newDate.getMonth()] +
    newDate.getDate() + ' 日, ' +
dayNames[newDate.getDay()] + ' '

);
