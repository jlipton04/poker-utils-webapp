import { ChangeEvent } from "react"

const CURRENCY_PLACEHOLDER = '0.00'

export type PlayerRowData = {
  playerName: string
  buyIn: number
  cashOut: number
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
      type: 'number',
      name: 'buyIn',
      displayName: 'Buy In',
      value: buyIn,
      placeholder: CURRENCY_PLACEHOLDER
    },
    {
      type: 'number',
      name: 'cashOut',
      displayName: 'Cash Out',
      value: cashOut,
      placeholder: CURRENCY_PLACEHOLDER
    },
    {
      type: 'number',
      name: 'balance',
      displayName: 'Balance',
      value: (cashOut - buyIn).toFixed(2),
      placeholder: CURRENCY_PLACEHOLDER
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
  placeholder?: string,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

function DisplayField({
  type,
  name,
  displayName,
  value,
  placeholder,
  onChange
}: DisplayFieldProps) {
  return (
    <label htmlFor={name}>
      {displayName}
      <input
        type={type}
        value={value}
        id={name}
        placeholder={placeholder}
        onChange={e => onChange!(e)}
      />
    </label>
  )
}