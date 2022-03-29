import Editor from "./Editor";
import Scope from "./Scope";

export default class App {
    constructor(editorId, scopeId) {
        this.editor = new Editor(editorId)
        this.scope = new Scope(scopeId)
        this.scope.draw()

        window.onresize = () => this.resize()
    }

    resize() {
        this.scope.resize()
    }
}
