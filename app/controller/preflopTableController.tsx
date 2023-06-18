const PIPS = [
    'A',
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    'T',
    'J',
    'Q',
    'K'
]

const SUITS = [
    'C',
    'D',
    'H',
    'S'
]

export function getHoleCards(): string {
    const cardOne = PIPS[Math.floor(Math.random() * PIPS.length)] + SUITS[Math.floor(Math.random() * SUITS.length)]
    let cardTwo = cardOne

    while (cardOne === cardTwo) {
        cardTwo = PIPS[Math.floor(Math.random() * PIPS.length)] + SUITS[Math.floor(Math.random() * SUITS.length)]
    }

    return cardOne + cardTwo
}