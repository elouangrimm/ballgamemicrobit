def game_over():
    basic.clear_screen()
    music.play(music.create_sound_expression(WaveShape.SQUARE,
            5000,
            0,
            255,
            84,
            1000,
            SoundExpressionEffect.NONE,
            InterpolationCurve.LINEAR),
        music.PlaybackMode.UNTIL_DONE)
    basic.show_string("" + str(game.score()))
    ball.delete()
    item.delete()
    setup()

def my_function():
    game.set_score(0)
buttonClicks.on_button_held(buttonClicks.AorB.B, my_function)

def point():
    global item
    game.add_score(1)
    music.play(music.create_sound_expression(WaveShape.SQUARE,
            1,
            5000,
            198,
            164,
            200,
            SoundExpressionEffect.NONE,
            InterpolationCurve.CURVE),
        music.PlaybackMode.IN_BACKGROUND)
    item.delete()
    item = game.create_sprite(randint(0, 4), randint(0, 4))

def on_button_pressed_ab():
    basic.show_string("" + str(game.score()))
    basic.pause(100)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def setup():
    global sound_on, gameover, started, timermode
    sound_on = True
    gameover = False
    started = False
    while started != True:
        if input.button_is_pressed(Button.A):
            timermode = True
            started = True
            music.play(music.create_sound_expression(WaveShape.SQUARE,
                    147,
                    5000,
                    105,
                    255,
                    291,
                    SoundExpressionEffect.NONE,
                    InterpolationCurve.CURVE),
                music.PlaybackMode.UNTIL_DONE)
            start()
        if input.button_is_pressed(Button.B):
            timermode = False
            started = True
            music.play(music.create_sound_expression(WaveShape.TRIANGLE,
                    1,
                    5000,
                    40,
                    255,
                    500,
                    SoundExpressionEffect.NONE,
                    InterpolationCurve.LINEAR),
                music.PlaybackMode.UNTIL_DONE)
            start()
        basic.pause(10)

def on_logo_pressed():
    global sound_on
    if sound_on:
        music.set_built_in_speaker_enabled(False)
        sound_on = False
    else:
        music.set_built_in_speaker_enabled(True)
        sound_on = True
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_pressed)

def start():
    global ball, item
    ball = game.create_sprite(2, 2)
    item = game.create_sprite(randint(0, 4), randint(0, 4))
timer = 0
timermode = False
started = False
gameover = False
sound_on = False
item: game.LedSprite = None
ball: game.LedSprite = None
setup()

def on_forever():
    if not (ball.is_touching(item)):
        while not (ball.is_touching(item)):
            basic.pause(10)
        if ball.is_touching(item):
            point()
        basic.pause(10)
basic.forever(on_forever)

def on_forever2():
    if input.acceleration(Dimension.X) < -200:
        ball.change(LedSpriteProperty.X, -1)
        basic.pause(50)
    if input.acceleration(Dimension.X) > 200:
        ball.change(LedSpriteProperty.X, 1)
        basic.pause(50)
    if input.acceleration(Dimension.Y) < -200:
        ball.change(LedSpriteProperty.Y, -1)
        basic.pause(50)
    if input.acceleration(Dimension.Y) > 200:
        ball.change(LedSpriteProperty.Y, 1)
        basic.pause(50)
    basic.pause(10)
basic.forever(on_forever2)

def on_forever3():
    global timer
    if timermode == True:
        timer = 0
        while timer < 30:
            basic.pause(1000)
            timer += 1
        basic.pause(10)
        game_over()
basic.forever(on_forever3)
