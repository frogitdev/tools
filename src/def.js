// UNIT PRESET FROM Jacob Banner
// https://codepen.io/jacobbanner/pen/oxeoqp

var property = new Array()
var unit = new Array()
var factor = new Array()

property[1] = "넓이";
unit[1] = new Array("제곱킬로미터 (km^2)", "제곱미터 (m^2)", "제곱센티미터 (cm^2)", "제곱피트 (ft^2)", "제곱인치 (in^2)", "제곱마일 (mi^2)", "제곱야드 (yd^2)", "평", "에이커 (acre)", "아르 (a)", "반 (barn)", "헥타르 (ha)", "루드 (rood)", "서큘러 밀");
factor[1] = new Array(1000000, 1, .0001, 9.290304E-02, 6.4516E-04, 2589988, .8361274, 3.305785, 4046.856, 100, 1E-28, 10000, 1011.71413184285, 5.067075E-10);

property[7] = "길이";
unit[7] = new Array("킬로미터 (km)", "미터 (m)", "센티미터 (cm)", "밀리미터 (mm)", "마이크로미터 (mu-m)", "나노미터 (nm)", "피코미터 (pm)", "펨토미터 (fm)", "옹스트롬 (Å)", "천문단위 (AU)", "패덤", "펄롱", "피트 (ft)", "인치 (in)", "광년 (LY)", "마일 (mi)", "파섹 (pc)", "파이카", "포인트 (pt)", "야드 (yd)", "자 (尺)", "간 (間)", "정 (町)", "리 (里)", "해리 (海里)");
factor[7] = new Array(1000, 1, .01, .001, 1E-6, 1E-9, 1E-12, 1E-15, 1E-10, 1.49598E11, 1.8288, 201.168, .3048, .0254, 9.46055E+15, 1609.344, 3.08374E+16, 4.217518E-03, .0003514598, .9144, .30303, 1.818182, 109.090909, 392.727273, 1852);

property[9] = "질량"
unit[9] = new Array("킬로그램 (kg)", "그램 (g)", "밀리그램 (mg)", "마이크로그램 (mu-g)", "캐럿 (ct)", "파운드 (lb)", "온스 (oz)", "톤 (t)")
factor[9] = new Array(1, .001, 1e-6, .000000001, .0002, .4535924, .02834952, 1000)

property[15] = "시간"
unit[15] = new Array("밀리초", "초", "분", "시간", "일", "주", "개월", "년", "연대", "세기")
factor[15] = new Array(0.001, 1, 60, 3600, 8.640E4, 604800, 2628000, 31536000, 315360000, 3153600000)
