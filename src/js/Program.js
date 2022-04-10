export default class Program {
    static fromCode(code) {
        const program = new Program(
            () => (new Array(1000)).fill(0).map((v, i) => Math.sin(i / 10)),
            (input, output, bufferSize) => {
                for (let i = 0; i < bufferSize; i++) {
                    output[i] = input[i]
                }
            }
        )

        const functionCode = `
            const createParam = (name, value, min, max) => this.params[name] = { value, min, max }
            const getParam = (name) => this.params[name]?.value || 0
        
            ${code}
            
            if (typeof generate === 'function') { this.generator = generate }
            if (typeof process === 'function') { this.processor = process } 
        `

        const f = new Function(functionCode)
        f.apply(program)

        return program
    }

    constructor(generator, processor) {
        this.generator = generator
        this.processor = processor
        this.params = {}
    }

    getGenerator() {
        return this.generator
    }

    getProcessor() {
        return this.processor
    }
}
