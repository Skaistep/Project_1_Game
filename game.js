
// This is selecting the text element and targeting it by id set in html
// This is selecting the buttons element and targeting it by id set in html (called it optionButtonsElement because this is an actual element in the application)
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

// State variable that's equal to an empty object, allows to keep a track of what the character has on them for example the goo
let state = {}

// This is a function to start up the game and set all of the state and application to where it needs to be
// When we start our game we want to take our state and make sure that this is an empty object
// Also we want to show the next text node, so we use showTextNode and type (1) to show the very first one
function startGame() {
state = {}
showTextNode(1)
}

// This is a function that allows to display whichever option we're on
//To implement the show text node just going to first get the text node which is going to be equal to textNodes.find and this is going to take in a text node for each one in the array and we want
//to find the one that has current ID so we will say textNode.id is going to be equal to textNodeIndex. 
//
function showTextNode(textNodeIndex) {
const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
textElement.innerText = textNode.text
while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
}

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

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

// This is a function that is going to happen every time an option is selected
// SelectOption(option) is going to take whichever option that we select because we need to know which option we're selecting 
function selectOption(option) {
const nextTextNodeId = option.nextText
if (nextTextNodeId <= 0) {
    return startGame()
}
state = Object.assign(state, option.setState)
showTextNode(nextTextNodeId)
}

// Variable to define textNodes
//Inside is an object that is going to have an id of 1 (for first text node), text, options
//Options within the object will show us what we can do. It will have parameters for text (that will show up on the button), setState (for example true), nextText (target id for example '2') as this is what we want to see next
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