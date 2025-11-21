function MainMenu () {
    basic.clearScreen()
    if (!(sound_on)) {
        led.plot(2, 0)
    } else {
        led.unplot(2, 0)
    }
    menuFlash = !(menuFlash)
    if (menuFlash) {
        led.plot(0, 2)
        led.plot(4, 2)
        basic.pause(290)
    } else {
        led.unplot(0, 2)
        led.unplot(4, 2)
        basic.pause(320)
    }
}
buttonClicks.onButtonDoubleClicked(buttonClicks.AorB.A, function () {
	
})
function game_over () {
    basic.clearScreen()
    music.play(music.createSoundExpression(WaveShape.Square, 5000, 0, 255, 84, 1000, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    basic.showString("" + (game.score()))
    ball.delete()
    item.delete()
    setup()
}
buttonClicks.onButtonHeld(buttonClicks.AorB.B, function () {
    game.setScore(0)
})
function point () {
    game.addScore(1)
    music.play(music.createSoundExpression(WaveShape.Sine, 496, 2033, 120, 252, 200, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    item.delete()
    item = game.createSprite(randint(0, 4), randint(0, 4))
}
input.onButtonPressed(Button.AB, function () {
    if (!(showingScore)) {
        showingScore = true
        basic.showString("" + (game.score()))
        basic.pause(200)
        showingScore = false
    }
})
function setup () {
    sound_on = false
    music.setBuiltInSpeakerEnabled(false)
    gameover = false
    started = false
    MainMenu()
    if (control.hardwareVersion() == "2") {
        version = 2
    } else {
        version2 = 1
    }
    while (started != true) {
        MainMenu()
        if (input.buttonIsPressed(Button.A)) {
            timermode = true
            started = true
            music.play(music.createSoundExpression(WaveShape.Sine, 408, 584, 255, 80, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            basic.showString("3")
            basic.pause(75)
            basic.showString("2")
            basic.pause(75)
            basic.showString("1")
            basic.pause(75)
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
    if (!(started)) {
        MainMenu()
    }
})
function start () {
    basic.clearScreen()
    ball = game.createSprite(2, 2)
    item = game.createSprite(randint(0, 4), randint(0, 4))
}
let diagDelay = 0
let moveDelay = 0
let thresholdDiagonal = 0
let thresholdStraight = 0
let timermode = false
let version2 = 0
let version = 0
let started = false
let gameover = false
let showingScore = false
let item: game.LedSprite = null
let ball: game.LedSprite = null
let menuFlash = false
let sound_on = false
let timer = 0
setup()
let sound = images.createImage(`
    . . # . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
basic.forever(function () {
    if (!(started) || showingScore) {
        return
    }
    if (ball && item && ball.isTouching(item)) {
        point()
        basic.pause(100)
    }
    thresholdStraight = 200
    thresholdDiagonal = 120
    moveDelay = 50
    diagDelay = Math.round(moveDelay * Math.SQRT2)
    if (input.acceleration(Dimension.X) < 0 - thresholdStraight && Math.abs(input.acceleration(Dimension.Y)) > thresholdDiagonal) {
        ball.change(LedSpriteProperty.X, -1)
        ball.change(LedSpriteProperty.Y, input.acceleration(Dimension.Y) < 0 ? -1 : 1)
        basic.pause(diagDelay)
    } else if (input.acceleration(Dimension.X) > thresholdStraight && Math.abs(input.acceleration(Dimension.Y)) > thresholdDiagonal) {
        ball.change(LedSpriteProperty.X, 1)
        ball.change(LedSpriteProperty.Y, input.acceleration(Dimension.Y) < 0 ? -1 : 1)
        basic.pause(diagDelay)
    } else {
        if (input.acceleration(Dimension.X) < 0 - thresholdStraight) {
            ball.change(LedSpriteProperty.X, -1)
            basic.pause(moveDelay)
        }
        if (input.acceleration(Dimension.X) > thresholdStraight) {
            ball.change(LedSpriteProperty.X, 1)
            basic.pause(moveDelay)
        }
        if (input.acceleration(Dimension.Y) < 0 - thresholdStraight) {
            ball.change(LedSpriteProperty.Y, -1)
            basic.pause(moveDelay)
        }
        if (input.acceleration(Dimension.Y) > thresholdStraight) {
            ball.change(LedSpriteProperty.Y, 1)
            basic.pause(moveDelay)
        }
    }
    basic.pause(10)
})
