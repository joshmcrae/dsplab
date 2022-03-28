import { basicSetup, EditorState, EditorView } from "@codemirror/basic-setup";
import { javascript } from "@codemirror/lang-javascript"
import { oneDark } from "@codemirror/theme-one-dark"

const state = EditorState.create({
    doc: ``,
    extensions: [basicSetup, javascript(), oneDark],
})

const view = new EditorView({
    parent: document.getElementById('editor'),
    state
})
