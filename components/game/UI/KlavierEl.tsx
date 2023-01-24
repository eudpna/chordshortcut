import TextareaAutosize from "react-textarea-autosize"
import { Gctx } from "../../../game/Gctx"
import { Klavier } from "../../../game/Klavier"
import { isNotenumHasFlat } from "../../../game/lib/sound/scale"
import { notenumToSolfa, Solfa, solfaArr, SolfaToFlat } from "../../../game/lib/sound/solfa"


const hakken_width = 500
const kokken_margin = 8


export const KlavierEl: React.FC<{
    gctx: Gctx
}> = (props) => {
    const gctx = props.gctx
    const klavier = gctx.klavier

    const kokken_num = klavier.keys.filter(key => key.isBlack).length
    const hakken_num = klavier.keys.filter(key => !key.isBlack).length

    return <div className="text-sm p-0 pt-6 noselect" style={{
        marginTop: 150,
    }}>


        {/* 白鍵 */}
        <div className="flex" style={{
            height: 200,
            width: hakken_width,
            zIndex: 0,
            // backgroundColor: 'blue',
        }}>
            {klavier.keys.map(key => {
                if (key.isBlack) return null
                return <KlavierKeyEl gctx={gctx} thekey={key} key={key.notenum} />
            })}
        </div>

        {/* 黒鍵 */}
        <div className="" style={{
            height: 130,
            pointerEvents: 'none',
            zIndex: 2,
            marginTop: -200,
            marginLeft: hakken_width / hakken_num / 2
            // background: 'red'
        }}>
            {klavier.keys.map(key => {
                if (!key.isBlack) {
                    if (isNotenumHasFlat(key.notenum)) {
                        return null
                    } else {
                        return <div key={key.notenum} className="inline-block" style={{
                            width: hakken_width / hakken_num
                        }} ></div>
                    }
                }
                return <KlavierKeyEl gctx={gctx} thekey={key} key={key.notenum} />
            })}
        </div>

    </div>
}










export const KlavierKeyEl: React.FC<{
    gctx: Gctx
    thekey: Klavier['keys'][number]
}> = (props) => {
    const gctx = props.gctx
    const klavier = gctx.klavier
    const kokken_num = klavier.keys.filter(key => key.isBlack).length
    const hakken_num = klavier.keys.filter(key => !key.isBlack).length
    const key = props.thekey

    const colorOn = 'red'

    return <div key={key.notenum} className={key.isBlack ? 'inline-block' : "flex-1"} style={!key.isBlack ? {
        border: 'solid 1px black',
        backgroundColor: key.isDown ? colorOn : 'white',
        color: 'black',
    } : {
        border: 'solid 1px black',
        zIndex: 3,
        height: '100%',
        width: hakken_width / hakken_num - (kokken_margin * 2),
        marginLeft: kokken_margin,
        marginRight: kokken_margin,
        backgroundColor: key.isDown ? colorOn : 'black', 
        color: 'white',
        pointerEvents: 'auto',

    }}
        onMouseDown={() => {
            key.isDown = 1
            gctx.rerenderUI()
        }}
        onMouseUp={() => {
            key.isDown = 0
            gctx.rerenderUI()
        }}
        onMouseEnter={() => {
            if (!gctx.input.mouse.isDown) return
            key.isDown = 1
            gctx.rerenderUI()
        }}
        onMouseLeave={() => {
            if (!gctx.input.mouse.isDown) return
            key.isDown = 0
            gctx.rerenderUI()
        }}
    >
        {notenumToSolfa(key.notenum)}
    </div>

}