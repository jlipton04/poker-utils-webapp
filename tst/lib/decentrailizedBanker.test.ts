import { Transaction, getMinTransfers } from "@lib/decentrailizedBanker"

describe('getMinTransfers tests', () => {
    it('should return an empty array if balances are already zero', () => {
        const balances = [0, 0, 0]
        const transfers = getMinTransfers(balances)
        expect(transfers).toEqual([])
      })
    
      it('should return the correct transfers for balances with both positive and negative values', () => {
        const balances = [-1, -1, 2]
        const transfers = getMinTransfers(balances)
        expect(transfers).toEqual(expect.arrayContaining([
            createTransaction(0, 2, 1),
            createTransaction(1, 2, 1)
        ] as Transaction[]))
      })

      it('should return the correct transfers with big loser', () => {
        const balances = [-3, 1, 2]
        const transfers = getMinTransfers(balances)
        expect(transfers).toEqual(expect.arrayContaining([
            createTransaction(0, 2, 3),
            createTransaction(2, 1, 1)
        ] as Transaction[]))
      })
    
      it('should return null if it is not possible to bring balances to zero', () => {
        const balances = [1, 1, 1]
        const transfers = getMinTransfers(balances)
        expect(transfers).toBeNull()
      })
})

function createTransaction(
    from: number,
    to: number,
    amount: number
) {
    return {
        from,
        to,
        amount
    } as Transaction
}