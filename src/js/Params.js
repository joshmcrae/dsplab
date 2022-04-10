export default class Params {
    constructor(paramId) {
        this.container = document.getElementById(paramId)
        this.program = null
        this.callback = null
    }

    setProgram(program) {
        this.program = program
        this._draw()
    }

    onParamChanged(callback) {
        this.callback = callback
    }

    _draw() {
        this.container.innerHTML = ''

        const params = Object.keys(this.program.params)

        params.forEach(param => {
            const input = document.createElement('input')
            input.type = 'range'
            input.min = this.program.params[param].min
            input.max = this.program.params[param].max
            input.step = (input.max - input.min) / 100

            input.oninput = (e) => {
                this.program.params[param].value = e.target.value

                if (this.callback) {
                    this.callback()
                }
            }

            this.container.append(input)
        })
    }
}
