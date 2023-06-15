kaboom({
    global: true,
    width: 1000,
    height: 600,
    scale: 1,
    debug: true,
    canvas: document.querySelector("#kaboomCanvas")
})

const SPEED = 480

let SCORE = 0;
let INFOPANEL;

setGravity(2400)

loadSprite("Mario", "../img/space_mario_50x50.3.png")
loadSprite("Rocket", "../img/no_bg_rocket.png")
loadSprite("Mercury", "../img/mercuryTEST.png")
loadSprite("block", "https://i.imgur.com/fVscIbn.png")
loadSprite("coin", "https://i.imgur.com/wbKxhcd.png")


const level = addLevel([
    // Design the level layout with symbols
    "@     $    $     $       %   ",
    "=======  ======  ============",
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
        "$": () => [
            sprite("coin"),
            area(),
            body(),
            anchor("bot"),
            "coin"
        ],
        "%": () => [
            sprite("Rocket"),
            area(),
            body(),
            anchor("bot"),
            "Rocket"
        ]
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

player.onUpdate(() => {
    // Set the viewport center to player.pos
    camPos(player.worldPos())
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

// fly away
player.onCollide("Rocket", (Rocket) => {
    go("win", { SCORE: SCORE })
})

player.onUpdate(() => {
    if (player.pos.y >= 480) {
        go("lose")
    }
})

scene("win", ({ SCORE }) => {

    add([
        text(`You grabbed ${SCORE} coins!!!`, {
            width: width(),
        }),
        pos(12),
    ])

    $("#infoPanel1").hide();
    $("#infoPanel2").hide();
    $("#infoPanel3").hide();

    onKeyPress(start)

})

scene("lose", () => {

    add([
        text("You Lose"),
        pos(12),
    ])

    $("#infoPanel1").hide();
    $("#infoPanel2").hide();
    $("#infoPanel3").hide();

    onKeyPress(start)

})

function start() {

}

// Eat the coin!
player.onCollide("coin", (coin) => {
    destroy(coin)
    SCORE++;
    if (SCORE == 1) {
        $("#infoPanel1").show();
    } else if (SCORE == 2) {
        $("#infoPanel1").hide();
        $("#infoPanel2").show();
    } else if (SCORE == 3) {
        $("#infoPanel2").hide();
        $("#infoPanel3").show();
    }
})
$("#infoPanel1").hide();
$("#infoPanel2").hide();
$("#infoPanel3").hide();