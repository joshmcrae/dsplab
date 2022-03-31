const styles = {
    lightGrey: 'rgb(229, 231, 235)'
}

export default class Scope {
    constructor(scopeId) {
        this.canvas = document.getElementById(scopeId)
        this.context = this.canvas.getContext('2d')
        this.data = {}

        this.resize()
    }

    onClick(callback) {
        this.canvas.onclick = callback
    }

    setData(name, data) {
        this.data[name] = data
        this.draw()
    }

    resize() {
        this.canvas.width = this.canvas.clientWidth
        this.canvas.height = this.canvas.clientHeight

        this.draw()
    }

    draw() {
        this.drawBackground()

        for (const [key, value] of Object.entries(this.data)) {
            this.plotData(value, key)
        }
    }

    drawBackground() {
        const width = this.canvas.width
        const height = this.canvas.height

        this.context.clearRect(0, 0, width, height)

        this.context.strokeStyle = styles.lightGrey
        this.context.beginPath()
        this.context.moveTo(0, height / 2)
        this.context.lineTo(width, height / 2)
        this.context.closePath()
        this.context.stroke()
    }

    plotData(data, color) {
        const width = this.canvas.width
        const height = this.canvas.height
        const increments = width / data.length
        const scale = height / 2 / 2

        this.context.strokeStyle = color
        this.context.beginPath()

        this.context.moveTo(0, height / 2)
        data.forEach((value, i) => {
            this.context.lineTo(increments * i, value * -scale + height / 2)
        })

        this.context.stroke()
    }
}
