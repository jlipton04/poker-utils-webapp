export type TransactionsModalProps = {
  transactions: TransactionData[]
  onClose: () => void
}

export type TransactionData = {
  toName: string
  fromName: string
  amount: number
}

export default function TransactionsModal({
  transactions,
  onClose
}: TransactionsModalProps) {
  return (
    <dialog open>
      <article>
        <h3>Reccomended Transactions</h3>
        {transactions.map(({
          toName,
          fromName,
          amount }, index) => (<>
            <label htmlFor="terms">
              <input type="checkbox" key={index} />
              <b>{fromName}</b> sends <b>${amount}</b> to <b>{toName}</b >
            </label>
          </>))}
        <footer>
          <button
            onClick={onClose}
          >Close</button>
        </footer>
      </article>
    </dialog>
  )
}