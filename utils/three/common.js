import * as THREE from 'three'
import * as OBJLoader from 'three-obj-loader'
OBJLoader(THREE)

class Common {
  constructor() {
    this.scene = null
    this.camera = null
    this.renderer = null
    this.path = null

    this.size = {
      windowW: null,
      windowH: null
    }

    this.clock = null

    this.time = {
      total: null,
      delta: null
    }
  }

  init($canvas, path) {
    this.setSize()
    this.path = path

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.size.windowW / this.size.windowH,
      0.1,
      10000
    )
    this.camera.position.set(0, 10, -10)
    this.camera.lookAt(this.scene.position)

    this.renderer = new THREE.WebGLRenderer({
      canvas: $canvas
    })

    this.renderer.setPixelRatio(window.devicePixelRatio)

    this.renderer.setClearColor(0xeaf2f5)
    this.renderer.setSize(this.size.windowW, this.size.windowH)

    this.setObj()

    this.clock = new THREE.Clock()
    this.clock.start()
  }

  setSize() {
    this.size = {
      windowW: 600,
      windowH: 400
    }
  }

  resize() {
    this.setSize()
    this.camera.aspect = this.size.windowW / this.size.windowH
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.size.windowW, this.size.windowH)
  }

  render() {
    this.time.delta = this.clock.getDelta()
    this.time.total += this.delta

    this.renderer.render(this.scene, this.camera)
  }

  setObj() {
    const path = this.path
    const objLoader = new THREE.OBJLoader()
    objLoader.load(path, (obj) => {
      const objmodel = obj.clone()
      objmodel.scale.set(100, 100, 100) // 縮尺の初期化
      objmodel.rotation.set(0, 0, 0) // 角度の初期化
      objmodel.position.set(0, 0, 0) // 位置の初期化

      // objをObject3Dで包む
      const obj3d = new THREE.Object3D()
      obj3d.add(objmodel)

      this.scene.add(obj3d) // sceneに追加
    })
  }
}

export default new Common()