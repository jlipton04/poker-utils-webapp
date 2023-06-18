'use client'

import './styles.css'
import classnames from 'classnames'

export type TableProps = {
  heroCards: string,
  villanCards: boolean[]
}

const seatClassnames = classnames([
  'seat'
])

export default function Table(tableProps: TableProps) {
  return (
    <div className="container">
      <div className="table"></div>
      <div>
        <div className={`hero ${seatClassnames}`}>
          <img src={`/cards/${tableProps.heroCards.substring(0,2)}.png`} />
          <img src={`/cards/${tableProps.heroCards.substring(2,4)}.png`} />
        </div>
        {tableProps.villanCards.map((value) => {
          return value && <div className={`${seatClassnames}`}>
            <img className="holeCards" src="/cards/card_back.png" />
            <img className="holeCards" src="/cards/card_back.png" />
          </div>
        })}
      </div>
    </div>
  )
}