import {basicSetup, EditorState, EditorView} from "@codemirror/basic-setup";
import {javascript} from "@codemirror/lang-javascript";
import {oneDark} from "@codemirror/theme-one-dark";

export default class Editor {
    constructor(editorId) {
        this.view = new EditorView({
            parent: document.getElementById(editorId),
            state: EditorState.create({
                doc: ``,
                extensions: [basicSetup, javascript(), oneDark],
            })
        })
    }
}
