timer = 0
gameover = False
ball = game.create_sprite(2, 2)
item = game.create_sprite(randint(0, 4), randint(0, 4))

def on_forever():
    global timer, gameover
    if not (gameover):
        basic.pause(1000)
        timer += 1
        if timer >= 30:
            ball.delete()
            item.delete()
            basic.show_string("" + str(game.score()))
            basic.pause(100)
            gameover = True
            game.set_score(0)
            basic.clear_screen()
basic.forever(on_forever)

def on_forever2():
    if not (gameover):
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
    global item
    if not (gameover):
        while not (ball.is_touching(item)):
            basic.pause(10)
        if ball.is_touching(item):
            game.add_score(1)
            item.delete()
            item = game.create_sprite(randint(0, 4), randint(0, 4))
    basic.pause(10)
basic.forever(on_forever3)
