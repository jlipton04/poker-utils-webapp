import { Heap } from 'heap-js'

export type Transaction = {
    from: number,
    to: number,
    amount: number
}

type PlayerBalance = {
    id: number
    balance: number
}

const customComparator = (a: PlayerBalance, b: PlayerBalance) => b.balance - a.balance

/**
 * If the balances do not sum to zero, the function will return null
 * 
 * @param balances List of balances of each player; The indicies will be used as player IDs
 * @returns Minimum list of transactions required to make all parties whole
 */
export function getMinTransfers(balances: number[]): Transaction[] | null {
    if (balances.reduce((sum, currBal) => sum + currBal) !== 0) {
        return null
    }

    const transactions: Transaction[] = []

    // Initialize heap with only non-zero balances
    const balanceHeap = new Heap(customComparator)
    balanceHeap.init(balances
        .filter(balance => balance !== 0)
        .map((balance, id) => ({balance, id}))
    )

    while (balanceHeap.size() > 1) {
        const biggest = balanceHeap.pop()!
        const smallest = balanceHeap.bottom(1)[0]

        transactions.push({
            from: smallest.id,
            to: biggest.id,
            amount: Math.abs(smallest.balance)
        })

        balanceHeap.remove(smallest)

        biggest.balance = biggest.balance + smallest.balance

        if (biggest.balance !== 0) {
            balanceHeap.push(biggest)
        }
    }

    return transactions
}