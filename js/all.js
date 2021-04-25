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

const melon = `<img src="./images/watermelon_all.png" alt="西瓜" style="height: 100px; width: auto;" id="melon">`
const coconut = `<img src="./images/coconut_all.png" alt="椰子" style="height: 75px; width: auto;" id="coconut">`
const apple = `<img src="./images/apple_all2.png" alt="蘋果" style="height: 80px; width: auto;" id="apple">`
const banana = `<img src="./images/banana_all.png" alt="香蕉" style="height: 100px; width: auto;" id="banana">`
const orange = `<img src="./images/orange_all.png" alt="柳丁" style="height: 60px; width: auto;" id="orange">`
const lemon = `<img src="./images/lemon_all.png" alt="檸檬" style="height: 50px; width: auto;" id="lemon">`

const fruits = [melon, coconut, apple, banana, orange, lemon]

//掉水果(X 軸隨機，Y 軸改變)
// 水果掉落的範圍
let regionWidth = $('.fruitRegion').outerWidth()
let regionHeight = $('.fruitRegion').outerHeight()
let ltX = $('.fruitRegion').offset().left
let ltY = $('.fruitRegion').offset().top
let rtX = ltX + regionWidth
let lbY = $('#footer').offset().top
let countdown = 60 //暫定

console.log('寬:' + regionWidth + ',' + '高:' + regionHeight)
console.log('左上:' + ltX + ',' + ltY)
console.log('右上:' + rtX + ',' + ltY)
console.log('右下:' + rtX + ',' + lbY)
console.log('左下:' + ltX + ',' + lbY)

// 按下 START 會進入遊戲畫面
$('#startBtn').click(function () {
  $('#startPage').css('display', 'none')

  let timer = setInterval(function () {
    countdown--
    randomData()
    addFruit()

    $('.text-countdown').text(countdown)
    if (countdown === 0) {
      alert('時間到')
      clearInterval(timer)
    }
  }, 1000)
})

// 滑鼠在該區域裡的相對位置
// $('.fruitRegion').mousemove(function (e) {
//   var elm = $(this)
//   var mouseX = e.pageX - elm.offset().left
//   var mouseY = e.pageY - elm.offset().top
//   console.log('滑鼠位置:' + mouseX + ',' + mouseY)
// })

//隨機數字
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min))
}
// 隨機數據
let fruitIndex //隨機水果索引值
let fruit //隨機水果
let fruitNum //水果數量
let velocity //隨機速度
let posX //隨機 x 座標

function randomData() {
  fruitNum = randomNum(1, 3)
  fruitIndex = randomNum(0, 6)
  posX = randomNum(ltX + 105, rtX) //加上最大顆的水果寬度，不然會超出邊界
  posY = randomNum(lbY, ltY)
  velocity = randomNum(2000, 5000)
}

//增加水果
let index = 0
function addFruit() {
  let fruitFallFrequency = setInterval(function () {
    randomData()
    index++
    fruit = fruits[fruitIndex]
    $('.fruitRegion').append(`<span class="fruit" id="${index}">${fruits[fruitIndex]}</span>`)

    $('.fruitRegion span')
      .eq($('.fruitRegion span').length - 1)
      .css({ left: `${posX}px` })
    fruitFall(fruitIndex)
    if (countdown === 0) {
      clearInterval(fruitFallFrequency)
    }
  }, 5000)
}

//水果掉下來
function fruitFall(fruitIndex) {
  $('.fruitRegion span')
    .eq($('.fruitRegion span').length - 1)
    .animate({ top: `${regionHeight + 100}px` }, (fruitIndex + 1) * 1000, 'linear')
}

// 滑鼠碰到水果就變切片
let score = 0
$('.fruitRegion').on('mouseover', '.fruit', function () {
  if ($(this).find('img').attr('id') === 'melon') {
    score += 5; 
    $(this).find('img').attr('src', '/images/watermelon_slice.png')

    setTimeout(function () {
      $(this).hide()
    }, 10)
  } else if ($(this).find('img').attr('id') === 'coconut') {
    score += 4
    $(this).find('img').attr('src', '/images/coconut_half.png')
    setTimeout(function () {      
      $(this).hide()
    }, 10)
  } else if ($(this).find('img').attr('id') === 'banana') {
    score += 3
    $(this).find('img').attr('src', '/images/banana_slice.png')
    setTimeout(function () {
      $(this).hide()
    }, 10)
  } else if ($(this).find('img').attr('id') === 'apple') {
    score += 2
    $(this).find('img').attr('src', '/images/apple_slice.png')
    setTimeout(function () {
      $(this).hide()
    }, 10)
  } else if ($(this).find('img').attr('id') === 'orange') {
    score += 1
    $(this).find('img').attr('src', '/images/orange_4.png')
    setTimeout(function () {
      $(this).hide()
    }, 10)
  } else if ($(this).find('img').attr('id') === 'lemon') {
    score += 1
    $(this).find('img').attr('src', '/images/lemon_half2.png')
    // $(this).onmouseover = null;
    
    setTimeout(function () {
      $(this).hide()
    }, 10)
  }
  console.log(score)
  $('.text-score').text(score)
})

