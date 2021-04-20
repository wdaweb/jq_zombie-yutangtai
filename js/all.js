//參考資料:https://animejs.com/documentation/#cssProperties
//動畫推薦:https://des13.com/news/web/822-animate1

/*目標：
一、開始畫面
1.按下 START 會進入遊戲畫面

二、開始遊戲
1.在畫面隨機掉下水果(由上往下)
2.滑鼠滑到水果會把水果切一半並得分
3.水果種類和加分：西瓜(+1)、椰子(+1)、蘋果(+2)、橘子(+2)、檸檬(+2)、香蕉(+3)
4.有時間限制：60 秒
5.按下【暫停鍵】時間會暫停、水果暫停落下，且【暫停鍵】換成【開始鍵】
6.按下【開始鍵】後遊戲繼續
(7.記錄最高分)

三、遊戲結束
1.Sweetalert 顯示分數(和最高分數)，按下確定後回到開始畫面
*/

// 按下 START 會進入遊戲畫面
$('#startBtn').click(function () {
  $('#startPage').css('display', 'none')

  //進入畫面 0.5 秒後開始倒數計時
  setTimeout(function () {
    let countdown = 10 //暫定

    let timer = setInterval(function () {
      countdown--
      console.log(countdown)
      $('.text-countdown').text(countdown)
      if (countdown === 0) {
        alert('時間到')
        clearInterval(timer)
      }
    }, 1000)
  }, 500)
})

//掉水果(X 軸隨機，Y 軸改變)
// 水果掉落的範圍
let regionWidth = $('.fruitRegion').outerWidth()
let regionHeight = $('.fruitRegion').outerHeight()
let startX = $('.fruitRegion').offset().left
let startY = $('.fruitRegion').offset().top
let endX = startX + regionWidth
let endY = $('#footer').offset().top

console.log('寬:' + regionWidth + ',' + '高:' + regionHeight)
console.log('左上:' + startX + ',' + startY)
console.log('右上:' + endX + ',' + startY)
console.log('右下:' + endX + ',' + endY)
console.log('左下:' + startX + ',' + endY)

// 滑鼠在該區域裡的相對位置
$('.fruitRegion').mousemove(function (e) {
  var elm = $(this)
  var xPos = e.pageX - elm.offset().left
  var yPos = e.pageY - elm.offset().top
  console.log('滑鼠位置:' + xPos + ',' + yPos)
})

function fruitFall() {
  let x = Math.floor(Math.random() * 10)
}
