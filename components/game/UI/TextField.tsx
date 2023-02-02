import TextareaAutosize from "react-textarea-autosize"
import { Gctx } from "../../../game/Gctx"

export const TextField: React.FC<{
    gctx: Gctx
}> = (props) => {
    const gctx = props.gctx

    return <div className=" p-0">
      
        <TextareaAutosize 
            value={gctx.text}
            placeholder="コード記号を空白区切りで入力（例: Em G7 C）"
            className="prevent-shot p-1 resize-none w-full border border-gray-400 rounded" style={{
            lineHeight: 1.5,
            // fontSize: '16px'
        }} minRows={2} onChange={(e) => {
            gctx.setText(e.target.value)
        }}></TextareaAutosize>
    </div>
}