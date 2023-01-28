import { useEffect, useRef } from "react"
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

    return <div className="text-sm p-0 noselect" style={{
        // marginTop: 150,
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
    const klavierKey = props.thekey

    const colorOn = '#fbb'

    // 押されている　または その音が鳴っている
    const isDown = klavierKey.isDown || gctx.isSoundingTheNote(klavierKey.notenum)


    const isInChordNote = gctx.soundingNoteAsChord().includes(klavierKey.notenum)


    const ref = useRef(null)

    useEffect(() => {
        if (ref) {
            klavierKey.ref = ref
            gctx.rerenderUI()
        }
        return () => {
            klavierKey.ref = null
        };
    }, [ref]);

    return <div id={'#klavierKey-'+klavierKey.id} key={klavierKey.notenum} className={'cursor-pointer '+(klavierKey.isBlack ? 'inline-block relative' : "flex-1 relative")} style={!klavierKey.isBlack ? {
        border: 'solid 1px black',
        // backgroundColor: isDown ? colorOn : 'white',
        backgroundColor: klavierKey.isDown ? 'red' : (gctx.isSoundingTheNote(klavierKey.notenum) ? 'blue' : 'white'),
        color: 'black',
    } : {
        border: 'solid 1px black',
        zIndex: 3,
        height: '100%',
        width: hakken_width / hakken_num - (kokken_margin * 2),
        marginLeft: kokken_margin,
        marginRight: kokken_margin,
            // backgroundColor: isDown ? colorOn : 'black', 
            backgroundColor: klavierKey.isDown ? 'red' : (gctx.isSoundingTheNote(klavierKey.notenum) ? 'blue' : 'black'),
        color: 'white',
        pointerEvents: 'auto',

    }}
        onMouseDown={() => {
            klavierKey.down()
        }}
        onMouseUp={() => {
            klavierKey.up()
        }}
        onMouseEnter={() => {
            if (!gctx.input.mouse.isDown) return
            klavierKey.down()
        }}
        onMouseLeave={() => {
            if (!gctx.input.mouse.isDown) return
            klavierKey.up()
        }}
    >
        {notenumToSolfa(klavierKey.notenum)}
        {isInChordNote ? 
        <div className="absolute rounded-full" style={{
            width: 20,
            height: 20,
            backgroundColor: 'red',
            left: (hakken_width/hakken_num)/2 - 10 + (klavierKey.isBlack ? -9 : -1),
            bottom: 20,
        }}> 
        </div>  : null}
    </div>

}