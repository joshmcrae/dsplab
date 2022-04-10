import Editor from "./Editor"
import Scope from './Scope'
import Program from "./Program"
import Params from "./Params"

const BUFFER_SIZE = 64
const INPUT_COLOR = '#f87171'
const OUTPUT_COLOR = '#3b82f6'

export default class App {
    constructor(editorId, scopeId, paramsId) {
        this.editor = new Editor(editorId)
        this.scope = new Scope(scopeId)
        this.params = new Params(paramsId)

        this.program = null
        this.inputData = []
        this.outputData = []

        window.onresize = () => this.resize()
        this.editor.onBlur(() => this.runCode())
        this.params.onParamChanged(() => this.analyze())

        this.runCode()
    }

    resize() {
        this.scope.resize()
    }

    runCode() {
        this.program = Program.fromCode(this.editor.getContent())
        this.inputData = this.program.generator()

        this.scope.setData(INPUT_COLOR, this.inputData)
        this.params.setProgram(this.program)

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

        this.scope.setData(OUTPUT_COLOR, this.outputData)
    }
}
