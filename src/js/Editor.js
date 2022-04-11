import { basicSetup, EditorState, EditorView } from "@codemirror/basic-setup"
import { javascript } from "@codemirror/lang-javascript"
import { oneDark } from "@codemirror/theme-one-dark"

const preset = `createParam('gain', 1, 0, 1)

// generate input waveform
function generate() {
  return (new Array(1000)).fill(0).map((v, i) => Math.sin(i / 10))
}

function process(input, output, bufferSize) {
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.atan(input[i] * 9) * 0.3
  }
}
`

export default class Editor {
    constructor(editorId) {
        this.view = new EditorView({
            parent: document.getElementById(editorId),
            state: EditorState.create({
                doc: preset,
                extensions: [basicSetup, javascript(), oneDark],
            })
        })
    }

    setContent(code) {
        const transaction = this.view.state.update({
            changes: {
                from: 0,
                to: this.view.state.doc.length,
                insert: code
            }
        })

        this.view.update([transaction])
    }

    getContent() {
        return this.view.state.doc.toString()
    }

    onBlur(callback) {
        this.view.contentDOM.onblur = callback
    }
}
