const weeks = ['日', '月', '火', '水', '木', '金', '土'];
const date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;

/**
 * 画面に表示したいカレンダーの枚数を指定。(二枚目以降は次の月~)
 */
const config = {
  show: 3
};

let startDate = new Date(year, month - 1, 1); // 月の最初の日を取得
let endDate = new Date(year, month,  0); // 月の最後の日を取得
let endDayCount = endDate.getDate(); // 月の末日
let lastMonthEndDate = new Date(year, month - 1, 0); // 前月の最後の日の情報
let lastMonthendDayCount = lastMonthEndDate.getDate(); // 前月の末日
let startDay = startDate.getDay(); // 月の最初の日の曜日を取得



/**
 *　カレンダーにセットする日付と曜日をセットする
 *  @params year: セットする年
 *  @params month: セットする次
 */
function setCalendarDate(year,month){
  startDate = new Date(year, month - 1, 1); // 月の最初の日を取得
  endDate = new Date(year, month,  0); // 月の最後の日を取得
  endDayCount = endDate.getDate(); // 月の末日
  lastMonthEndDate = new Date(year, month - 1, 0); // 前月の最後の日の情報
  lastMonthendDayCount = lastMonthEndDate.getDate(); // 前月の末日
  startDay = startDate.getDay(); // 月の最初の日の曜日を取得
}


/**
 * カレンダーを作成する
 * @param year: 作成するカレンダーの年
 * @param month: 作成するカレンダーの月
 */
function createCalendar(year, month) {
  
  setCalendarDate(year,month);
    
  let dayCount = 1; // 日にちのカウント
  let calendarHtml = ''; // HTMLを組み立てる変数

  calendarHtml += '<h1>' + year  + '/' + month + '</h1>';
  calendarHtml += '<table>';

  // 曜日の行を作成
  for (let i = 0; i < weeks.length; i++) {
      calendarHtml += '<td>' + weeks[i] + '</td>';
  }
  
  for (let w = 0; w < 6; w++) {
    calendarHtml += '<tr>';

    for (let d = 0; d < 7; d++) {
      if (w == 0 && d < startDay) {
        // 1行目で1日の曜日の前
        let num = lastMonthendDayCount - startDay + d + 1;
        calendarHtml += '<td class="is-disabled">' + num + '</td>';
      } else if (dayCount > endDayCount) {
        // 末尾の日数を超えた
        let num = dayCount - endDayCount;
        calendarHtml += '<td class="is-disabled">' + num + '</td>';
        dayCount++;
      } else {
        calendarHtml += '<td>' + dayCount + '</td>';
        dayCount++;
      }
    }
    calendarHtml += '</tr>';
  }
  
  calendarHtml += '</table>';

  return calendarHtml;
}


/**
 * カレンダーを画面に表示する
 * @param year: 表示するカレンダーの年
 * @param year: 表示するカレンダーの月
 */
function showCalendar(year, month) {
  for (let i = 0; i < config.show; i++) {
    const calendarHtml = createCalendar(year, month);
    
    let calendarId = "calendar" + i; 
    
    
    if($("section").length <= i){
      
      $("<section>",{
        id: calendarId,
      }).appendTo("#calendar");
    }
    
    $("#" + calendarId).html(calendarHtml);
    
    
     /**
     * 12月の次になったときは翌年の1月からスタートさせる
     */
    month++;
    if (month > 12) {
        year++;
        month = 1;
    }
  }
}


/**
 * 「前の月へボタン、次の月へボタン」がクリックされた時の動作
 * @param targetId: クリックされたボタンのIdの種類("prev" or "#next")
 * 
 */
function moveCalendar(targetId) {
  $("#calendar").html = "";
  
  console.log($("#calendar").html);
    
  if (targetId === 'prev') {
    month--;
    
    /**
     * 12月の次になったときは翌年の1月から表示
     */
    if (month < 1) {
      year--;
      month = 12;
    }
  }else if(targetId === "next"){
    month++;
    
    /**
     * 1月の前になったときは前年の12月から表示
     */    
    if (month > 12) {
      year++;
      month = 1;
    }
    
  }

  showCalendar(year, month);
}

/**
 * 「今月に戻る」ボタンを押したときの動作
 * 
 * カレンダーを最初に表示していた月(今月)に戻す。
 */
function clickThisMonthButton(){
  year = date.getFullYear();
  month = date.getMonth() + 1;
  
  showCalendar(year,month);
  
}


showCalendar(year, month);

$(function(){
  
  $(".move_month").click(function(){
    let targetId = $(this).attr("id");
    moveCalendar(targetId);
  });
  
  $("#return_this_month").click(function(){
    clickThisMonthButton();
  });
    
});
