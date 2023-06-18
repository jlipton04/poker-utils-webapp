import fs from 'fs'
import path from 'path'
import type { NextApiRequest, NextApiResponse } from 'next'

const RANGE_DIR = 'ranges'

export type IsCorrectActionRequest = {
    mode: string,
    position: string,
    cardQuality: string,
    action: string
}

export type IsCorrectActionResponse = {
    correct: boolean
}

const loadedRanges: Map<string, Map<string, Map<string, string[]>>> = new Map<string, Map<string, Map<string, string[]>>>()

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<IsCorrectActionResponse>
) {
    console.log(req.body)

    const { mode, position, cardQuality, action } = req.body as IsCorrectActionRequest

    if (!loadedRanges.get(mode)?.get(position)?.get(action)) {
        loadRange(mode, position, action)
    }

    const currentRange = loadedRanges.get(mode)!!.get(position)!!.get(action)!!

    res.status(200).json({
        correct: currentRange.includes(cardQuality)
    })
}

function loadRange(mode: string, position: string, action: string) {
    const filePath = path.join(process.cwd(), RANGE_DIR, `${mode}_${position}_${action}.txt`)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const parsedWithPercentages = fileContent.split(',')

    if (mode == 'RFI') {
        parsedWithPercentages.forEach((card, index) => {
            parsedWithPercentages[index] = card.substring(0, 3)
        })
    }

    if (!loadedRanges.has(mode)) {
        loadedRanges.set(mode, new Map<string, Map<string, string[]>>())
    }

    if (!loadedRanges.get(mode)!!.has(position)) {
        loadedRanges.get(mode)!!.set(position, new Map<string, string[]>())
    }

    loadedRanges.get(mode)!!.get(position)!!.set(action, parsedWithPercentages)
}