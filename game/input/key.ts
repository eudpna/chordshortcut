import { Gctx } from "../Gctx"
import { chordToName } from "../lib/chords"
import { isNumeric, isRoman, keyToRoman } from "../lib/lib"
import { notenumToSolfa } from "../lib/sound/solfa"


// export function keysToInput(gctx: Gctx) {
//     const keys = gctx.input.keys
//     if (keys.includes('left')) {
//         gctx.input.direction.x = -1
//     }
//     if (keys.includes('right')) {
//         gctx.input.direction.x = 1
//     }
//     if ((!keys.includes('left') && !keys.includes('right')) || (keys.includes('left') && keys.includes('right'))) {
//         gctx.input.direction.x = 0
//     }
// }

export function setKeyEventListeners(gctx: Gctx) {
    window.addEventListener('keydown', (e) => {

        if ((e.target as HTMLElement).closest('.prevent-shot')) {
            return
        }



        const key = replaceKeyName(e.key)

        // chordBtnに対応するキーが押下され　　かつ
        // すでに押されていなければ
        gctx.chordBtns.btns.forEach(chordBtn => {
            if (chordBtn.qwerty === key
                && !gctx.input.keys.includes(key)
            ) {
                chordBtn.down()
            }
        })

        gctx.klavier.keys.forEach(klavierKey => {
            if (klavierKey.qwerty === key
                && !gctx.input.keys.includes(key)
            ) {
                klavierKey.down()
            }
        })

        // 存在するキーを押下したら　かつ
        // 既に押されていなかったら
        // if (gctx.keybinds.map(keybind => keybind.qwerty.toLowerCase()).includes(key) &&
        // !gctx.input.keys.includes(key)) {
        //     (key, gctx.qwertyKeyToNotenum(key.toUpperCase()), notenumToSolfa(gctx.qwertyKeyToNotenum(key.toUpperCase())))
        //     // 対応するノートを鳴らす
        //     gctx.playNote(
        //         gctx.qwertyKeyToNotenum(key.toUpperCase())
        //     )
        // }


        addKey(gctx, key)
    })

    window.addEventListener('keyup', (e) => {

        if ((e.target as HTMLElement).closest('.prevent-shot')) {
            return
        }


        const key = replaceKeyName(e.key)

        // chordBtnに対応するキーが離されたら
        gctx.chordBtns.btns.forEach(chordBtn => {
            if (chordBtn.qwerty === key
            ) {
                chordBtn.up()
            }
        })

        gctx.klavier.keys.forEach(klavierKey => {
            if (klavierKey.qwerty === key
            ) {
                klavierKey.up()
            }
        })

        // // 数字キーが離されたら
        // if (isRoman(key)
        // ) {
        //     // 対応するコードを停止
        //     const chord = gctx.getChordByRoman(keyToRoman(key))
            
        //     if (gctx.fadeChord) {
        //         gctx.fadeChord(chordToName(chord))
        //     } else {
        //         gctx.stopChord(chordToName(chord))
        //     }
        // }

        // // 存在するキーを離したら
        // if (gctx.keybinds.map(keybind => keybind.qwerty.toLowerCase()).includes(key)) {
        //     // 対応するノートを停止
        //     gctx.stopNote(
        //         gctx.qwertyKeyToNotenum(key.toUpperCase())
        //     )
        // }

        removeKey(gctx, key)
    })
}

function replaceKeyName(k: string): string {
    let key = k.toLowerCase()
    return key
}


function addKey(gctx: Gctx, key: string) {
    if (gctx.input.keys.includes(key)) return
    gctx.input.keys.push(key)
}

function removeKey(gctx: Gctx, key: string) {
    gctx.input.keys = gctx.input.keys.filter(k => k !== key)
}