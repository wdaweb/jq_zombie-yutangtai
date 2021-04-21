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

const melon = `background-image:url("./images/watermelon_all.png")`
const coconut = `background-image:url("/images/coconut_all.png")`
const apple = `background-image:url("/images/apple_all2.png")`
const banana = `background-image:url("/images/banana_all.png")`
const orange = `background-image:url("/images/orange_all.png")`
const lemon = `background-image:url("/images/lemon_all.png")`

const fruits = [melon, coconut, apple, banana, orange, lemon]

//掉水果(X 軸隨機，Y 軸改變)
// 水果掉落的範圍
let regionWidth = $('.fruitRegion').outerWidth()
let regionHeight = $('.fruitRegion').outerHeight()
let ltX = $('.fruitRegion').offset().left
let ltY = $('.fruitRegion').offset().top
let rtX = ltX + regionWidth
let lbY = $('#footer').offset().top

console.log('寬:' + regionWidth + ',' + '高:' + regionHeight)
console.log('左上:' + ltX + ',' + ltY)
console.log('右上:' + rtX + ',' + ltY)
console.log('右下:' + rtX + ',' + lbY)
console.log('左下:' + ltX + ',' + lbY)

// 按下 START 會進入遊戲畫面
$('#startBtn').click(function () {
  $('#startPage').css('display', 'none')

  //進入畫面 0.5 秒後開始倒數計時
  setTimeout(function () {
    let countdown = 10 //暫定

    let timer = setInterval(function () {
      countdown--
      randomData()
      addFruit()
      fruitFall()
      $('.text-countdown').text(countdown)
      if (countdown === 0) {
        alert('時間到')
        clearInterval(timer)
      }
    }, 1000)
  }, 500)
})

// 滑鼠在該區域裡的相對位置
$('.fruitRegion').mousemove(function (e) {
  var elm = $(this)
  var mouseX = e.pageX - elm.offset().left
  var mouseY = e.pageY - elm.offset().top
  console.log('滑鼠位置:' + mouseX + ',' + mouseY)
})

//隨機數字
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min))
}
// 隨機數據
let fruitIndex //隨機水果索引值
let fruit //隨機水果
let fruitNum = 0 //水果數量
let velocity = 0 //隨機速度
let posX = 0 //隨機 x 座標

function randomData() {
  fruitNum = randomNum(1, 5)
  fruitIndex = randomNum(0, 6)
  velocity = randomNum(850, 10000)
  posX = randomNum(ltX, rtX)
  postY = randomNum(lbY, ltY)
}

//增加水果
function addFruit() {
  randomData()
  fruit = fruits[fruitIndex]
  $('.fruitRegion').append(`<div class="fruitBox"></div>`)
  $('.fruitBox').animate({ left: '+=100px' })
  $('.fruit').addClass('move')
}

//水果掉下來
function fruitFall() {
  // console.log(posX + 'px')
  // console.log(postY + 'px')
  if ($('.fruitRegion span').length > 0) {
    posX = randomNum(ltX, rtX)
    console.log('x 座標:' + posX)
    console.log('span 數量:' + $('.fruitRegion span').length)
    for (let i = 0; i < $('.fruitRegion span').length; i++) {
      console.log('i 迴圈:' + i)
      $('.fruit')
        .eq(i)
        .css({ left: `${posX}px` })
    }
    // $('.fruit').animate(
    //   {
    //     // width: '+=100px',
    //     left: `${startX + posX}px`,
    //     top: `${startY + postY}px`
    //   },
    //   1000
    // )
  } else {
    $('.fruit').css('display', 'none')
  }
}
