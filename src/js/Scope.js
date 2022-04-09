const styles = {
    lightGrey: 'rgb(229, 231, 235)'
}

export default class Scope {
    constructor(scopeId) {
        this.canvas = document.getElementById(scopeId)
        this.context = this.canvas.getContext('2d')
        this.data = {}

        this.zoom = 1
        this.anchor = 0
        this.offset = 0
        this.adjustment = 0

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
        const height = this.canvas.height
        const increments = this._pointToPixel(1)
        const scale = height / 2 / 2
        const offset = Math.max(0, this._pointToPixel(this.anchor) - this.offset)

        this.context.strokeStyle = color
        this.context.beginPath()

        this.context.moveTo(0, height / 2)

        data.forEach((value, i) => {
            this.context.lineTo(increments * i - offset + this.adjustment, value * -scale + height / 2)
        })

        this.context.stroke()
    }

    _startDrag(e) {
        const startX = e.screenX
        const startY = e.screenY
        const initZoom = this.zoom
        let initOffset = e.clientX - e.target.getBoundingClientRect().x;

        this.anchor = Math.max(0, this._viewportToPoint(initOffset))
        this.offset = initOffset

        e.preventDefault()

        const onMouseMove = (e) => {
            this.zoom = Math.max(initZoom + (e.screenY - startY) / 10, 1)
            this.adjustment = Math.max(0, this.canvas.width - (this._pointToPixel(this._getDataLength() - this.anchor) + this.offset))

            this._draw()
        }

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)

            this.offset += this.adjustment
            this.adjustment = 0
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    }

    _getDataLength() {
        const keys = Object.keys(this.data)

        if (!keys.length) {
            return 0
        }

        return this.data[keys[0]].length
    }

    _pointToPixel(point) {
        return this.canvas.width / this._getDataLength() * this.zoom * point
    }

    _pixelToPoint(pixel) {
        return pixel / this.canvas.width * this._getDataLength() / this.zoom
    }

    _viewportToPoint(pixel) {
        return Math.max(0, this.anchor - this._pixelToPoint(this.offset)) + this._pixelToPoint(pixel)
    }
}
