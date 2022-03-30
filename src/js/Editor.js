import { basicSetup, EditorState, EditorView } from "@codemirror/basic-setup"
import { javascript } from "@codemirror/lang-javascript"
import { oneDark } from "@codemirror/theme-one-dark"

const preset = `// generate input waveform
function generate() {
  return (new Array(1000)).fill(0).map((v, i) => Math.sin(i / 10))
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

    getContent() {
        return this.view.state.doc.toString()
    }
}
