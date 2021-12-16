
// This is selecting the text element and targeting it by id set in html
// This is selecting the buttons element and targeting it by id set in html (optionButtonsElement because this is an actual element in the application)
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

// State variable that's equal to an empty object, allows to keep a track of what the character has on them for example the goo
let state = {}

// This is a function to start up the game and set all of the state and application to where it needs to be
// When we start the game we want to take our state and make sure that this is an empty object
// Also we want to show the next text node, so we use showTextNode and type (1) to show the very first one
function startGame() {
state = {}
showTextNode(1)
}

// This is a function that allows to display whichever option we're on
// To implement showTextNode - first get the textNode equal textNodes.find (this is going to take in a textNode for each one in the array) and find the one that has current id
// To show the text set the innerText of our textElement equal to textNode.text
// To remove all the options use 'while' loop. While it has a firstChild, remove child of the optionButtonsElement.firstChild - this removes all of the options and allows to add the options that I need
function showTextNode(textNodeIndex) {
const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
textElement.innerText = textNode.text
while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
}

// To add options that I need I am going to loop through all of the options using .forEach over all these different options
// Created a function to check that I can show that node by using IF showOption, and if we are passing the option and if we can show it we're going to execute the code inside of here
// Created a button, set the text for it, set the classList and added the button class so it is going to be styled properly
// Created addEventListener for click on to here, taking a single function that will target selectOption function and pass in the option
// Added optionButtonsElement group and appendChild(button) to obtain the option buttons on the screen
textNode.options.forEach(option => {
    if (showOption(option)) {
        const button = document.createElement('button')
        button.innerText = option.text
        button.classList.add('btn')
        button.addEventListener('click', () => selectOption(option))
        optionButtonsElement.appendChild(button)
    }
})
}

// If there is no required state or return is true then this will allow to show the option
function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

// This is a function that is going to happen every time an option is selected
// SelectOption(option) is going to take whichever option that we select because we need to know which option we're selecting
// In order to get to second step, I implemented selectOption function by using nextTextNodeId equal to option.nextText
// Then take the state and set it equal to Object.assign first the initial state and then the option.setState (this is going to take the current state, add everything from options set state to it and override anything that's already there)
// For example if blue Goo is true but false in the option set state it's going to set it to false in our state and this is going to return a brand-new object which we're going to set to our current state
// Then after all that is done we just want to show the text node for our nextTextNodeId // FOR STATE INFORMATION TO WORK
// To restart the game, I used nextText with a negative 1. Instead of the function or selecting an option I set 'if' statement less than or equal to 0 the game will restart.
function selectOption(option) {
const nextTextNodeId = option.nextText
if (nextTextNodeId <= 0) {
    return startGame()
}
state = Object.assign(state, option.setState)
showTextNode(nextTextNodeId)
}

// Variable to define textNodes
// Inside is an object that is going to have an id of 1 (for first text node), text, options
// Options within the object will show us what we can do. It will have parameters for text (that will show up on the button), setState (for example true), nextText (target id for example '2') as this is what we want to see next
const textNodes = [
    {
        id: 1,
        text: 'You wake up in a strange place and you see a jar of blue goo near you',
        options: [
            {
                text: 'Take goo',
                setState: { blueGoo: true },
                nextText: 2
            },
            {
                text: 'Leave the good',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'You venture forth in search of answers to where you are when you come across a merchant.',
        options: [
            {
                text: 'Trade the goo for a sword',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, sword:true },
                nextText: 3
            },
            {
                text: 'Trade the goo for a shield',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, shield:true },
                nextText: 3
            },
            {
                text: 'Ignore the merchant',
                nextText: 3
            },
        ]
    },
    {
        id: 3,
        text: 'After leaving the merchant you start to feel tired and stumble upon a small town next to a dangerous looking castle.',
        options: [
            {
                text: 'Explore the castle',
                nextText: 4
            },
            {
                text: 'Find a room to sleep at in the town',
                nextText: 5
            },
            {
                text: 'Find some hay in a stable to sleep in',
                nextText: 6
            },
        ]
    },
    {
        id: 4,
        text: 'You are so tired that you fall asleep while exploring the castle and are killed by some terrible monster in your sleep.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 5,
        text: 'Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 6,
        text: 'You wake up well rested and full of energy ready to explore the nearby castle.',
        options: [
            {
                text: 'Explore the castle',
                nextText: 7
            }
        ]
    },
    {
        id: 7,
        text: 'While exploring the castle you come across a horrible monster in your path.',
        options: [
            {
            text: 'Try to run',
            nextText: 8
            },
            {
            text: 'Attack it with your sword',
            requiredState: (currentState) => currentState.sword,
            nextText: 9
            },
            {
            text: 'Hide behind your shield',
            requiredState: (currentState) => currentState.shield,
            nextText: 10
            },
            {
            text: 'Throw the blue goo at it',
            requiredState: (currentState) => currentState.blueGoo,
            nextText: 11
            }
        ]
        },
        {
        id: 8,
        text: 'Your attempts to run are in vain and the monster easily catches.',
        options: [
            {
            text: 'Restart',
            nextText: -1
            }
        ]
        },
        {
        id: 9,
        text: 'You foolishly thought this monster could be slain with a single sword.',
        options: [
            {
            text: 'Restart',
            nextText: -1
            }
        ]
        },
        {
        id: 10,
        text: 'The monster laughed as you hid behind your shield and ate you.',
        options: [
            {
            text: 'Restart',
            nextText: -1
            }
        ]
        },
        {
        id: 11,
        text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.',
        options: [
            {
            text: 'Congratulations. Play Again.',
            nextText: -1
            }
        ]
        }
]

// This allows the game to start as soon as the page loads
startGame()