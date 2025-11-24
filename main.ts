function MainMenu () {
    basic.clearScreen()
}
input.onButtonPressed(Button.A, function () {
    if (!(started)) {
        timermode = true
        started = true
        if (sound_on) {
            music.play(music.createSoundExpression(WaveShape.Sine, 408, 584, 255, 80, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        }
        basic.showString("3")
        basic.pause(75)
        basic.showString("2")
        basic.pause(75)
        basic.showString("1")
        basic.pause(75)
        start()
    }
})
basic.forever(function () {
    if (sound_on) {
        input.soundLevel()
    }
})
function game_over () {
    basic.clearScreen()
    if (sound_on) {
        music.play(music.createSoundExpression(WaveShape.Square, 5000, 0, 255, 84, 1000, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    }
    basic.showString("" + (game.score()))
    ball.delete()
    item.delete()
    basic.clearScreen()
    basic.pause(200)
    control.reset()
}
function point () {
    game.addScore(1)
    if (sound_on) {
        music.play(music.createSoundExpression(WaveShape.Sine, 496, 2033, 200, 300, 200, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    }
    item.delete()
    item = game.createSprite(randint(0, 4), randint(0, 4))
}
input.onButtonPressed(Button.AB, function () {
    if (!showingScore) {
        showingScore = true

        let bx = ball.get(LedSpriteProperty.X)
        let by = ball.get(LedSpriteProperty.Y)
        let ix = item.get(LedSpriteProperty.X)
        let iy = item.get(LedSpriteProperty.Y)

        ball.delete()
        item.delete()

        basic.clearScreen()
        basic.showString("" + game.score())
        basic.pause(200)

        ball = game.createSprite(bx, by)
        item = game.createSprite(ix, iy)

        showingScore = false
    }
})

input.onButtonPressed(Button.B, function () {
    if (!(started)) {
        timermode = false
        started = true
        if (sound_on) {
            music.play(music.createSoundExpression(WaveShape.Sine, 408, 584, 255, 80, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        }
        start()
    }
})
function setup () {
    sound_on = false
    music.setBuiltInSpeakerEnabled(false)
    gameover = false
    started = false
    MainMenu()
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (sound_on) {
        music.setBuiltInSpeakerEnabled(false)
        music.play(music.createSoundExpression(WaveShape.Triangle, 584, 364, 41, 27, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        sound_on = false
    } else {
        music.setBuiltInSpeakerEnabled(true)
        sound_on = true
        music.play(music.createSoundExpression(WaveShape.Triangle, 408, 540, 255, 230, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
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
let timer = 0
let version2 = 0
let version = 0
let gameover = false
let showingScore = false
let item: game.LedSprite = null
let ball: game.LedSprite = null
let timermode = false
let started = false
let menuFlash = false
let sound_on = false
let total_time = 30
let sensitivity = 1.75
setup()
basic.forever(function () {
    if (timermode && started) {
        timer = 0
        while (timer < total_time + 3 && started) {
            basic.pause(1000)
            timer += 1
        }
        if (started) {
            game_over()
        }
    }
})
basic.forever(function () {
    if (!(started) || showingScore || !(ball)) {
        return;
    }
    if (ball && item && ball.isTouching(item)) {
        point()
        basic.pause(100)
    }

    thresholdStraight = 200 / sensitivity
    thresholdDiagonal = 120 / sensitivity
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
