kaboom({
    global: true,
    width: 1050,
    height: 650,
    scale: 1,
    debug: true,
    canvas: document.querySelector("#kaboomCanvas")
});

setGravity(900);

loadSprite("Mario", "../img/space_mario_50x50.3.png")
loadSprite("Rocket", "../img/no_bg_rocket.png")
loadSprite("Mercury", "../img/mercuryTEST.png")
loadSprite("MercuryGround", "../img/mario_path.png")

const speed = 320

const LEVELS = [
    [
        "@              >",
        "================",
    ],
    [
        "@   $   >",
        "=   =   =",
    ]
]



const ui = add([
    fixed(),
])

const player = add([
    sprite("Mario"),
    pos(120, 250),
    area(),
    body(),
])

ui.add([
    sprite("Mercury"),
    scale(1),
    width(),
    height()

])

player.onUpdate(() => {

})

add([
    sprite("Rocket"),
    pos(850, 450),
    rotate(-90),
    area(),
])

add([
    sprite("MercuryGround"),
    pos(0, 200),
    area(),
    // Give objects a body() component if you don't want other solid objects pass through
    body({ isStatic: true }),
    "MercuryGround"
])


onKeyDown("left", () => {
    player.move(-speed, 0)
})

onKeyDown("right", () => {
    player.move(speed, 0)
})

onKeyDown("down", () => {
    player.move(0, speed)
})

onKeyPress("space", () => {
    if (player.isGrounded()) {
        player.jump()
    }
})

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
}

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
