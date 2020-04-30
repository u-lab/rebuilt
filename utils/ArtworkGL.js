import Common from '@/utils/three/common'

// three.jsの処理を書いていく
export default class ArtworkGL {
  constructor(props, path) {
    this.props = props
    this.path = path
    this.init()
  }

  init() {
    Common.init(this.props.$canvas, this.path)
  }

  resize() {
    Common.resize()
  }

  loop() {
    this.render()
    requestAnimationFrame(this.loop.bind(this))
  }

  render() {
    Common.render()
  }
}
