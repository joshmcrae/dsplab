const styles = {
    lightGrey: 'rgb(229, 231, 235)'
}

export default class Scope {
    constructor(scopeId) {
        this.canvas = document.getElementById(scopeId)
        this.context = this.canvas.getContext('2d')
        this.data = {}

        this.zoom = 1
        this.offset = 0

        this.resize()
        this.canvas.onmousedown = (e) => this._startDrag(e)
    }

    setData(name, data) {
        this.data[name] = data
        this._draw()
    }

    resize() {
        this.canvas.width = this.canvas.clientWidth
        this.canvas.height = this.canvas.clientHeight

        this._draw()
    }

    _draw() {
        this._drawBackground()

        for (const [key, value] of Object.entries(this.data)) {
            this._plotData(value, key)
        }
    }

    _drawBackground() {
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

    _plotData(data, color) {
        const width = this.canvas.width
        const height = this.canvas.height
        const increments = width / data.length * this.zoom
        const scale = height / 2 / 2

        this.context.strokeStyle = color
        this.context.beginPath()

        this.context.moveTo(0, height / 2)
        data.forEach((value, i) => {
            this.context.lineTo(increments * i, value * -scale + height / 2)
        })

        this.context.stroke()
    }

    _startDrag(e) {
        const startX = e.screenX
        const startY = e.screenY
        const initZoom = this.zoom

        const onMouseMove = (e) => {
            this.offset = Math.min(e.screenX - startX, 0)
            this.zoom = Math.max(initZoom + (e.screenY - startY) / 10, 1)

            this._draw()
        }

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    }
}
