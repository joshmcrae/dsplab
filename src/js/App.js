import Editor from "./Editor"
import Scope from "./Scope"
import Program from "./Program";

export default class App {
    constructor(editorId, scopeId) {
        this.editor = new Editor(editorId)
        this.scope = new Scope(scopeId)
        this.scope.draw()

        this.inputData = []

        window.onresize = () => this.resize()
        this.scope.onClick(() => this.runCode())
    }

    resize() {
        this.scope.resize()
    }

    runCode() {
        const program = Program.fromCode(this.editor.getContent())
        this.inputData = program.generator()

        this.scope.setData('input', this.inputData)
    }
}
