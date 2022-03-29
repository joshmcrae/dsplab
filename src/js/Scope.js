const styles = {
    lightGrey: 'rgb(229, 231, 235)'
}

export default class Scope {
    constructor(scopeId) {
        this.canvas = document.getElementById(scopeId)
        this.context = this.canvas.getContext('2d')

        this.resize()
    }

    resize() {
        this.canvas.width = this.canvas.clientWidth
        this.canvas.height = this.canvas.clientHeight

        this.draw()
    }

    draw() {
        this.drawBackground()
    }

    drawBackground() {
        const width = this.canvas.width
        const height = this.canvas.height

        this.context.strokeStyle = styles.lightGrey
        this.context.beginPath()
        this.context.moveTo(0, height / 2)
        this.context.lineTo(width, height / 2)
        this.context.closePath()
        this.context.stroke()
    }
}
