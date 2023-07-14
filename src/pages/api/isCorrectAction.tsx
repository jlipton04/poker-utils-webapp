import { getLoadedRanges } from '@lib/rangeStore'
import type { NextApiRequest, NextApiResponse } from 'next'

export type IsCorrectActionRequest = {
    mode: string,
    position: string,
    cardQuality: string,
    action: string
}

export type IsCorrectActionResponse = {
    correct: boolean
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<IsCorrectActionResponse>
) {
    console.log(req.body)

    const { mode, position, cardQuality, action } = req.body as IsCorrectActionRequest

    let answer: boolean = false;

    if (mode === 'RFI') {
        answer = isCorrectRfiAction(position, cardQuality, action)
    }

    res.status(200).json({
        correct: answer
    })
}

function isCorrectRfiAction(
    position: string,
    cardQuality: string,
    action: string
): boolean {
    const ranges = getLoadedRanges().get('RFI')!!.get(position)!!

    if (action === 'RAISE') {
        return ranges.get('RAISE')!!.includes(cardQuality)
    }

    if (action === 'CALL') {
        const callRange = ranges.get('CALL')

        return callRange?.includes(cardQuality) ?? false
    }

    if (action === 'FOLD') {
        const raiseRange = ranges.get('RAISE')!!
        const callRange = ranges.get('CALL')

        return !raiseRange.includes(cardQuality) && (!callRange?.includes(cardQuality))
    }

    return false
}