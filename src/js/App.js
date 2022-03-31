import Editor from "./Editor"
import Scope from "./Scope"
import Program from "./Program";

const BUFFER_SIZE = 64;

export default class App {
    constructor(editorId, scopeId) {
        this.editor = new Editor(editorId)
        this.scope = new Scope(scopeId)
        this.scope.draw()

        this.program = null
        this.inputData = []
        this.outputData = []

        window.onresize = () => this.resize()
        this.scope.onClick(() => this.runCode())
    }

    resize() {
        this.scope.resize()
    }

    runCode() {
        this.program = Program.fromCode(this.editor.getContent())
        this.inputData = this.program.generator()

        this.scope.setData('red', this.inputData)
        this.analyze()
    }

    analyze() {
        const buffers = Math.ceil(this.inputData.length / BUFFER_SIZE)
        this.outputData = []

        for (let i = 0; i < buffers; i++) {
            const input = this.inputData.slice(i * BUFFER_SIZE, i * BUFFER_SIZE + BUFFER_SIZE)
            const output = (new Array(input.length)).fill(0)

            this.program.processor(input, output, input.length)

            this.outputData = this.outputData.concat(output)
        }

        this.scope.setData('blue', this.outputData)
    }
}
