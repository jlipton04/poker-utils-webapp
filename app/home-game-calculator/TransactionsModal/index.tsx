export type TransactionsModalProps = {
  transactions: TransactionData[]
  onClose: () => void
}

export type TransactionData = {
  toName: string
  toVenmo: string
  fromName: string
  fromVenmo: string
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
          toVenmo,
          fromName,
          fromVenmo,
          amount }, index) => (<>
            <label htmlFor="terms">
              <input type="checkbox" key={index} />
              <em data-tooltip={fromName}>@{fromVenmo}</em> sends <b>${amount}</b> to <em data-tooltip={toName}>@{toVenmo}</em>
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