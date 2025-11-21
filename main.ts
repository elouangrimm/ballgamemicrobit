buttonClicks.onButtonDoubleClicked(buttonClicks.AorB.A, function () {
	
})
function game_over () {
    basic.clearScreen()
    music.play(music.createSoundExpression(WaveShape.Square, 5000, 0, 255, 84, 1000, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    basic.showString("" + game.score())
    ball.delete()
    item.delete()
    setup()
}
input.onButtonPressed(Button.AB, function () {
    basic.showString("" + game.score())
    basic.pause(10)
})
buttonClicks.onButtonHeld(buttonClicks.AorB.B, function () {
    game.setScore(0)
})
function point () {
    game.addScore(1)
    music.play(music.createSoundExpression(WaveShape.Sine, 496, 2033, 120, 252, 200, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    item.delete()
    item = game.createSprite(randint(0, 4), randint(0, 4))
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (sound_on) {
        music.setBuiltInSpeakerEnabled(false)
        music.play(music.createSoundExpression(WaveShape.Triangle, 408, 364, 23, 14, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        sound_on = false
    } else {
        music.setBuiltInSpeakerEnabled(true)
        music.play(music.createSoundExpression(WaveShape.Triangle, 408, 540, 255, 230, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        sound_on = true
    }
})
function setup () {
    sound_on = true
    gameover = false
    started = false
    while (started != true) {
        if (input.buttonIsPressed(Button.A)) {
            timermode = true
            started = true
            music.play(music.createSoundExpression(WaveShape.Sine, 408, 584, 255, 80, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            start()
        }
        if (input.buttonIsPressed(Button.B)) {
            timermode = false
            started = true
            music.play(music.createSoundExpression(WaveShape.Sine, 408, 584, 255, 80, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
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
let sound_on = false
let item: game.LedSprite = null
let ball: game.LedSprite = null
setup()
basic.forever(function () {
    if (!(ball.isTouching(item))) {
        while (!(ball.isTouching(item))) {
            basic.pause(10)
        }
        if (ball.isTouching(item)) {
            point()
        }
        basic.pause(10)
    }
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
    if (timermode == true) {
        timer = 0
        while (timer < 30) {
            basic.pause(1000)
            timer += 1
        }
        basic.pause(10)
        game_over()
    }
})
