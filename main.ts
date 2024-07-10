function game_over () {
    basic.clearScreen()
    basic.showString("" + (game.score()))
    ball.delete()
    item.delete()
    setup()
}
buttonClicks.onButtonHeld(buttonClicks.AorB.B, function () {
    game.setScore(0)
})
input.onButtonPressed(Button.AB, function () {
    basic.showString("" + (game.score()))
    basic.pause(100)
})
function setup () {
    gameover = false
    started = false
    while (started != true) {
        if (input.buttonIsPressed(Button.A)) {
            timermode = true
            started = true
            start()
        }
        if (input.buttonIsPressed(Button.B)) {
            timermode = false
            started = true
            start()
        }
        basic.pause(10)
    }
}
function start () {
    ball = game.createSprite(2, 2)
    item = game.createSprite(randint(0, 4), randint(0, 4))
}
let timer = 0
let timermode = false
let started = false
let gameover = false
let item: game.LedSprite = null
let ball: game.LedSprite = null
setup()
basic.forever(function () {
    if (timermode == true) {
        timer = 0
        while (timer < 30) {
            basic.pause(1000)
            timer += 1
        }
        game_over()
    }
    basic.pause(10)
})
basic.forever(function () {
    if (input.acceleration(Dimension.X) < -200) {
        ball.change(LedSpriteProperty.X, -1)
        basic.pause(50)
    }
    if (input.acceleration(Dimension.X) > 200) {
        ball.change(LedSpriteProperty.X, 1)
        basic.pause(50)
    }
    if (input.acceleration(Dimension.Y) < -200) {
        ball.change(LedSpriteProperty.Y, -1)
        basic.pause(50)
    }
    if (input.acceleration(Dimension.Y) > 200) {
        ball.change(LedSpriteProperty.Y, 1)
        basic.pause(50)
    }
    basic.pause(10)
})
basic.forever(function () {
    if (!(ball.isTouching(item))) {
        while (!(ball.isTouching(item))) {
            basic.pause(10)
        }
        if (ball.isTouching(item)) {
            game.addScore(1)
            item.delete()
            item = game.createSprite(randint(0, 4), randint(0, 4))
        }
        basic.pause(10)
    }
})
