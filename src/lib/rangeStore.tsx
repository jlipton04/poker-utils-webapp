import fs from 'fs'
import path from 'path'

const RANGE_DIR = 'src/ranges'

const MODES = [
    'RFI'
]

const POSITIONS = [
    'UTG',
    'UTG+1',
    'UTG+2',
    'LJ',
    'HJ',
    'CO',
    'BTN',
    'SB'
]

const ACTIONS = [
    'RAISE',
    'CALL'
]

const loadedRanges: Map<string, Map<string, Map<string, string[]>>> = new Map<string, Map<string, Map<string, string[]>>>()

export function getLoadedRanges() {
    if (loadedRanges.size === 0) {
        loadRangesFromFile()
    }

    return loadedRanges
}

function loadRangesFromFile() {
    MODES.forEach((mode) => {
        POSITIONS.forEach((position) => {
            ACTIONS.forEach((action) => {
                loadRangeFromFile(mode, position, action)
            })
        })
    })
}

function loadRangeFromFile(
    mode: string,
    position: string,
    action: string
) {
    const filePath = path.join(process.cwd(), `${RANGE_DIR}/${mode}`, `${position}_${action}`)

    if (!fs.existsSync(filePath)) {
        return
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const parsedWithPercentages = fileContent.split(',')

    if (mode == 'RFI') {
        parsedWithPercentages.forEach((card, index) => {
            parsedWithPercentages[index] = card.substring(0, card.indexOf(':'))
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