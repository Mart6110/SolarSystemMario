//const { start } = require("@popperjs/core");

kaboom({
    global: true,
    width: 1000,
    height: 600,
    scale: 1,
    debug: true,
    canvas: document.querySelector("#kaboomCanvas")
})

const SPEED = 480

setGravity(2400)

loadSprite("Mario", "../img/space_mario_50x50.3.png")
loadSprite("Rocket", "../img/no_bg_rocket.png")
loadSprite("Mercury", "../img/mercuryTEST.png")
loadSprite("block", "https://i.imgur.com/fVscIbn.png")

const level = addLevel([
    // Design the level layout with symbols
    "@                  ",
    "======= ====== ====",
], {
    // The size of each grid
    tileWidth: 40,
    tileHeight: 40,
    // The position of the top left block
    pos: vec2(100, 500),
    // Define what each symbol means (in components)
    tiles: {
        "@": () => [
            sprite("Mario"),
            area(),
            body(),
            anchor("bot"),
            "player",
        ],
        "=": () => [
            sprite("block"),
            area(),
            body({ isStatic: true }),
            anchor("bot"),
        ],
    },
})

const background = add([
    sprite("Mercury"),
    z(-100),
    scale(1),
    fixed(),
])

// Get the player object from tag
const player = level.get("player")[0]

// Movements
onKeyPress("space", () => {
    if (player.isGrounded()) {
        player.jump()
    }
})

onKeyDown("left", () => {
    player.move(-SPEED, 0)
})

onKeyDown("right", () => {
    player.move(SPEED, 0)
})

// Back to the original position if hit a "danger" item
player.onCollide("danger", () => {
    player.pos = level.tile2Pos(0, 0)
})

// Eat the coin!
player.onCollide("coin", (coin) => {
    destroy(coin)
    play("score")
})


/* scene("game", ({ level, score }) => {
    //layers(['bg', 'obj', 'ui'], 'obj')

    const maps = [
        [
            '                                      ',
            '                                      ',
            '                                      ',
            '                                      ',
            '                                      ',
            '     %   =*=%=                        ',
            '                                      ',
            '                            -+        ',
            '                    ^   ^   ()        ',
            '==============================   =====',
        ],
        [
            '£                                       £',
            '£                                       £',
            '£                                       £',
            '£                                       £',
            '£                                       £',
            '£        @@@@@@              x x        £',
            '£                          x x x        £',
            '£                        x x x x  x   -+£',
            '£               z   z  x x x x x  x   ()£',
            '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
        ]
    ]

    const levelCfg = {
        tileHeight: 20,
        tileWidth: 20,
        '=': [
            sprite('block'),
            area(),
            body({ isStatic: true }),
            anchor("bot")
        ],
    }

    const gameLevel = addLevel(maps[level], levelCfg)

    const scoreLabel = add([
        text(score),
        pos(30, 6),
        layer('ui'),
        {
            value: score,
        }
    ])

    const background = add([
        fixed(),
    ])

    background.add([
        sprite("Mercury"),
        scale(1),
        width(),
        height(),
    ])

    add([text('level ' + parseInt(level + 1)), pos(40, 6)])

    function big() {
        let timer = 0
        let isBig = false
        return {
            update() {
                if (isBig) {
                    CURRENT_JUMP_FORCE = BIG_JUMP_FORCE
                    timer -= dt()
                    if (timer <= 0) {
                        this.smallify()
                    }
                }
            },
            isBig() {
                return isBig
            },
            smallify() {
                this.scale = vec2(1)
                CURRENT_JUMP_FORCE = JUMP_FORCE
                timer = 0
                isBig = false
            },
            biggify(time) {
                this.scale = vec2(2)
                timer = time
                isBig = true
            }
        }
    }

    const player = add([
        sprite('mario'), solid(),
        pos(30, 0),
        body(),
        big(),
        origin('bot')
    ])

    action('mushroom', (m) => {
        m.move(20, 0)
    })

    player.on("headbump", (obj) => {
        if (obj.is('coin-surprise')) {
            gameLevel.spawn('$', obj.gridPos.sub(0, 1))
            destroy(obj)
            gameLevel.spawn('}', obj.gridPos.sub(0, 0))
        }
        if (obj.is('mushroom-surprise')) {
            gameLevel.spawn('#', obj.gridPos.sub(0, 1))
            destroy(obj)
            gameLevel.spawn('}', obj.gridPos.sub(0, 0))
        }
    })

    player.collides('mushroom', (m) => {
        destroy(m)
        player.biggify(6)
    })

    player.collides('coin', (c) => {
        destroy(c)
        scoreLabel.value++
        scoreLabel.text = scoreLabel.value
    })

    action('dangerous', (d) => {
        d.move(-ENEMY_SPEED, 0)
    })

    player.collides('dangerous', (d) => {
        if (isJumping) {
            destroy(d)
        } else {
            go('lose', { score: scoreLabel.value })
        }
    })

    player.action(() => {
        camPos(player.pos)
        if (player.pos.y >= FALL_DEATH) {
            go('lose', { score: scoreLabel.value })
        }
    })

    player.collides('pipe', () => {
        keyPress('down', () => {
            go('game', {
                level: (level + 1) % maps.length,
                score: scoreLabel.value
            })
        })
    })

    // Movements
    onKeyPress("space", () => {
        if (player.isGrounded()) {
            player.jump()
        }
    })

    onKeyDown("left", () => {
        player.move(-SPEED, 0)
    })

    onKeyDown("right", () => {
        player.move(SPEED, 0)
    })
})

scene('lose', ({ score }) => {
    add([text(score, 32), origin('center'), pos(width() / 2, height() / 2)])
})

go("game", { level: 0, score: 0 })

function selectLanguage(language) {
    // Replace with your language selection logic
    // For example, load language data from separate files and apply the language pack

    // Reset background color of all buttons
    var buttons = document.getElementsByClassName('language-button');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = '';
    }

    // Apply background color to the selected button
    var selectedButton = document.getElementById(language + 'Button');
    selectedButton.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';

    // Load language data based on selected language and perform any necessary operations
    if (language === 'est') {
        // Load Estonian language pack
        // Perform language-specific operations
        console.log('Estonian language selected');
    } else if (language === 'dan') {
        // Load Danish language pack
        // Perform language-specific operations
        console.log('Danish language selected');
    } else if (language === 'eng') {
        // Load English language pack
        // Perform language-specific operations
        console.log('English language selected');
    }
} */

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
