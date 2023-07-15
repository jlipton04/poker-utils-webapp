'use client'

export type OptionsBarProps = {
    position: string,
    mode: string
}

export default function OptionsBar(props: OptionsBarProps) {
    return (
        <div className="optionsBar">
            <div className="position">Postition: <span>{props.position}</span></div>
            <div className="mode">Mode: <span>{props.mode}</span></div>
        </div>
    )
}