
// This is selecting the text element and targeting it by id set in html
// This is selecting the buttons element and targeting it by id set in html (optionButtonsElement because this is an actual element in the application)
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

// State variable that's equal to an empty object, allows to keep a track of what the character has on them for example a box of matches
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
// For example if matches is true but false in the option set state it's going to set it to false in our state and this is going to return a brand-new object which we're going to set to our current state
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
        text: 'You wake up in pitch dark. It’s cold and there is a strange smell. You feel around on the ground and find a box of matches.',
        options: [
            {
                text: 'Take matches',
                setState: { matches: true },
                nextText: 2
            },
            {
                text: 'Leave matches',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'After a moment you hear the echo of a familiar voice calling your name.',
        options: [
            {
                text: 'Use matches to see a path and head towards the voice',
                requiredState: (currentState) => currentState.matches,
                setState: { matches: false, path:true },
                nextText: 3
            },
            {
                text: 'Light the matches and look around you',
                requiredState: (currentState) => currentState.matches,
                setState: { matches: false, lookAround:true },
                nextText: 3
            },
            {
                text: 'Ignore the voice',
                nextText: 3
            },
        ]
    },
    {
        id: 3,
        text: 'You now see a light in the direction of the voice but you also hear a loud ROAR to the right of you!',
        options: [
            {
                text: 'Run away from the ROAR',
                nextText: 4
            },
            {
                text: 'Run towards the source of light',
                nextText: 5
            },
            {
                text: 'Freeze in fear',
                nextText: 6
            },
        ]
    },
    {
        id: 4,
        text: 'You are too slow and the monster gets you.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 5,
        text: 'You start running in panic but can not see what is ahead. You fall into a bottomless pit.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 6,
        text: 'The source of the roar is approaching and it is blocking your exit. You hear four foot steps and a stench of wet dog getting stronger and stronger. It is a BEAR!!',
        options: [
            {
                text: 'Deal with the enemy',
                nextText: 7
            }
        ]
    },
    {
        id: 7,
        text: 'Your adrenaline kicks in - fight or flight.',
        options: [
            {
            text: 'Attack',
            nextText: 8
            },
            {
            text: 'Run following the path',
            requiredState: (currentState) => currentState.path,
            nextText: 9
            },
            {
            text: 'Put out the matches and hide',
            requiredState: (currentState) => currentState.lookAround,
            nextText: 10
            },
            {
            text: 'Throw matches to distract the bear',
            requiredState: (currentState) => currentState.matches,
            nextText: 11
            }
        ]
        },
        {
        id: 8,
        text: 'You foolishly thought you could fight a bear.',
        options: [
            {
            text: 'Restart',
            nextText: -1
            }
        ]
        },
        {
        id: 9,
        text: 'Your attempts to run are in vain and the bear easily catches.',
        options: [
            {
            text: 'Restart',
            nextText: -1
            }
        ]
        },
        {
        id: 10,
        text: 'The bear could smell the matches and ate you.',
        options: [
            {
            text: 'Restart',
            nextText: -1
            }
        ]
        },
        {
        id: 11,
        text: 'You threw the matches to distract the bear. Silly bear falls for the decoy. You hold your breath and tiptoe towards the exit to avoid alerting the bear of your escape. You succeed to escape the cave and get re-united with your family who were looking for you.',
        options: [
            {
            text: 'Congratulations! Play Again.',
            nextText: -1
            }
        ]
        }
]

// This allows the game to start as soon as the page loads
startGame()