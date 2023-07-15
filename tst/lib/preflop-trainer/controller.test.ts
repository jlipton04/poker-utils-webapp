import { Card } from "@lib/preflop-trainer/card"
import { getVillanCards } from "@lib/preflop-trainer/controller"

function repeatedTest(description: string, numTimes: number, testFn: () => void) {
    for (let i = 0; i < numTimes; i++) {
        it(`${description} (iteration ${i + 1})`, testFn);
    }
}

describe('Preflop Controller Tests', () => {
    describe('getVillanCards Tests', () => {
        repeatedTest(
            'should return a unique array of cards different from the heros cards',
            50,
            () => {
                const heroCards: Card[] = [
                    {
                        suit: 'S',
                        pip: 'A'
                    },
                    {
                        suit: 'C',
                        pip: 'A'
                    }
                ]
                const numVillanCards = 8

                const villanCards = getVillanCards(numVillanCards, heroCards)

                expect(villanCards.length).toBe(numVillanCards)

                const allVillanCards = villanCards.flat()
                const setOfCards = new Set(allVillanCards)

                expect(setOfCards.size).toBe(allVillanCards.length)
            })
    })
})