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
            ${code}
            
            if (typeof generate === 'function') { this.generator = generate }
            if (typeof process === 'function') { this.processor = process } 
        `

        const f = new Function(functionCode)
        f.apply(program)
        f()

        return program
    }

    constructor(generator, processor) {
        this.generator = generator
        this.processor = processor
    }

    getGenerator() {
        return this.generator
    }

    getProcessor() {
        return this.processor
    }
}
