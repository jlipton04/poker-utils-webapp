import Table from '../components/table'
import ActionBar from '../components/actionBar'
import { ActionBarProps } from '../components/actionBar'

export default function PreflopTrainer() {
    const actionBarProps: ActionBarProps = {
        call: true,
        raise: true,
        fold: true
    }

    return (
        <div style={{marginTop: '20vh'}}>
            <Table />
            <ActionBar {...actionBarProps} />
        </div>
    )
}