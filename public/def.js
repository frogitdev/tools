// UNIT PRESET FROM Jacob Banner
// https://codepen.io/jacobbanner/pen/oxeoqp

var property = new Array();
var unit = new Array();
var factor = new Array();

property[9] = "질량";
unit[9] = new Array("킬로그램 (kg)", "그램 (g)", "밀리그램 (mg)", "마이크로그램 (mu-g)", "캐럿 (ct)", "파운드 (lb)", "온스 (oz)", "톤 (t)");
factor[9] = new Array(1, .001, 1e-6, .000000001, .0002, .4535924, .02834952, 1000);

property[15] = "시간";
unit[15] = new Array("초", "분", "시간", "일", "개월", "년");
factor[15] = new Array(1, 60, 3600, 8.640E4, 2628000, 31536000);