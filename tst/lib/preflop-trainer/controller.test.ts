import { getPlayers } from "@lib/preflop-trainer/controller"

function repeatedTest(description: string, numTimes: number, testFn: () => void) {
    for (let i = 0; i < numTimes; i++) {
        it(`${description} (iteration ${i + 1})`, testFn);
    }
}

describe('Preflop Controller Tests', () => {
    describe('getHoleCards Tests', () => {
        repeatedTest(
            'should return a unique array of cards different from the heros cards',
            50,
            () => {
                const numVillanCards = 8

                const villanCards = getPlayers(numVillanCards)

                expect(villanCards.length).toBe(numVillanCards)

                const allVillanCards = villanCards.flat()
                const setOfCards = new Set(allVillanCards)

                expect(setOfCards.size).toBe(allVillanCards.length)
            })
    })
})