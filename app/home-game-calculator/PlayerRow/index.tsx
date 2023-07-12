import { ChangeEvent, useState } from "react"

export type PlayerRowData = {
  playerName: string
  buyIn: number
  cashOut: number
  venmo: string
}

export type PlayerRowProps = PlayerRowData & {
  onRemove: () => void
  handleInputChange: (field: string, value: string, type: string) => void
}

export default function PlayerRow(
  {
    playerName,
    buyIn,
    cashOut,
    venmo,
    onRemove,
    handleInputChange,
  }: PlayerRowProps) {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.id, e.target.value, e.target.type)

  const fields: DisplayFieldProps[] = [
    {
      type: 'text',
      name: 'playerName',
      displayName: 'Player Name',
      value: playerName
    },
    {
      type: 'text',
      name: 'venmo',
      displayName: 'Venmo',
      value: venmo
    },
    {
      type: 'number',
      name: 'buyIn',
      displayName: 'Buy In',
      value: buyIn
    },
    {
      type: 'number',
      name: 'cashOut',
      displayName: 'Cash Out',
      value: cashOut
    },
    {
      type: 'number',
      name: 'balance',
      displayName: 'Balance',
      value: (cashOut - buyIn).toFixed(2),
    }
  ]

  return (<div className='grid'>
    {fields.map(fieldProps => (<DisplayField key={fieldProps.name} {...{...fieldProps, onChange}} />))}
    <button
      type="button"
      onClick={onRemove}
      role='button'
    >Remove</button>
  </div>)
}

type DisplayFieldProps = {
  type: string,
  name: string,
  displayName: string
  value: string | number,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

function DisplayField({
  type,
  name,
  displayName,
  value,
  onChange
}: DisplayFieldProps) {
  return (
    <label htmlFor={name}>
      {displayName}
      <input
        type={type}
        value={value}
        id={name}
        onChange={e => onChange!(e)}
      />
    </label>
  )
}