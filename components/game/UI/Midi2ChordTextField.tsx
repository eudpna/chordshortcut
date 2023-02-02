import TextareaAutosize from "react-textarea-autosize"
import { Gctx } from "../../../game/Gctx"

import {v4 as uudiv4} from 'uuid'

export const Midi2ChordTextField: React.FC<{
    gctx: Gctx
}> = (props) => {
    const gctx = props.gctx

    return <div className="rounded border-gray-400 px-2 pt-2" style={{
        backgroundColor: '#eee',
    }}>
        <div className="font-bold text-sm pb-2" style={{
            color: '#444',
            // fontSize: '0.0rem'
        }}>
            MIDI鍵盤をコードに割り当てる
        </div>

        <div className=" p-2 pt-1">
            <div className="flex">
                <div>
                    <TextareaAutosize
                        value={gctx.midi2chordText}
                        // spellcheck="false"
                        placeholder=""
                        className="prevent-shot p-1 bg-white resize-none  border border-gray-400 rounded"
                        style={{
                            width: 200,
                            lineHeight: 1.5,
                            // fontSize: '16px'
                        }} minRows={2} onChange={(e) => {
                            gctx.setMidi2ChordText(e.target.value)
                        }}></TextareaAutosize>
                </div>
                <div>
                    <div className="inline-block  p-1">
                        {gctx.midi2chord.map((m,i) => {                                             return <div key={m===null?i:m.noteNumbers+m.chordName} className="" style={{
                                lineHeight: 1.5,
                                color: '#26e045'
                            }}>
                                <span className="text-sm">
                                {m === null ? '　' : '有効'}
                                </span>
                            </div>
                        })}
                    </div>
                </div>

            </div>
           
             
        </div>
    </div>
    
}