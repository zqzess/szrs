<template>
  <div id="container">
  </div>
  <div>
    <el-button @click="showPic">隐藏1</el-button>
    <el-button @click="showPic2">隐藏2</el-button>
  </div>
</template>

<script>
import * as THREE from 'three'
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'
// import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

const OrbitControls = require('three-orbit-controls')(THREE)
// eslint-disable-next-line no-unused-vars
const scene = new THREE.Scene()
// eslint-disable-next-line no-unused-vars
export default {
  name: 'test2',
  data () {
    return {
      // scene: '',
      light: '',
      camera: '',
      controls: '',
      renderer: '',
      hemisphereLight: '',
      isShow: true
    }
  },
  created () {
  },
  mounted () {
    this.init()
    this.loadObj()
    // this.loadObj2()
    this.animate()
  },
  methods: {
    init () {
      scene.add(new THREE.AmbientLight(0x999999))// 环境光
      // 第一个参数 Hex:光的颜色 第二个参数 Intensity：光源的强度，默认是1.0，如果为0.5，则强度是一半，意思是颜色会淡一些
      // 第三个参数 Distance：光线的强度，从最大值衰减到0，需要的距离。 默认为0，表示光不衰减，如果非0，则表示从光源的位置到Distance的距离，光都在线性衰减。到离光源距离Distance时，光源强度为0.
      this.light = new THREE.DirectionalLight(0xdfebff, 1)// 从正上方（不是位置）照射过来的平行光，0.45的强度
      // this.light.position.set(400, 500, -200)// 光源的向量，即光源的位置
      this.light.position.set(50, 200, 100)
      // this.light.position.multiplyScalar(0.3)
      scene.add(this.light)
      const helper = new THREE.DirectionalLightHelper(this.light, 50, 0xFFFFFF)
      scene.add(helper)
      // this.hemisphereLight = new HemisphereLight(0xffffff, 0xffffff, 1)
      // this.hemisphereLight.position.set(50, 200, 100)
      // scene.add(this.hemisphereLight)
      // 初始化相机
      /* 透视照相机参数设置
      var fov = 45,// 拍摄距离  视野角值越大，场景中的物体越小
        near = 1,// 相机离视体积最近的距离
        far = 1000,// 相机离视体积最远的距离
        aspect =  window.innerWidth / window.innerHeight; // 纵横比 */

      this.camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 1, 1000)
      this.camera.position.set(10, 90, 65)
      this.camera.lookAt(scene.position)
      // 初始化控制器
      this.controls = new OrbitControls(this.camera)
      this.controls.target.set(0, 0, 0)
      this.controls.minDistance = 80
      this.controls.maxDistance = 400
      this.controls.maxPolarAngle = Math.PI / 3
      this.controls.update()
      // 渲染
      this.renderer = new THREE.WebGLRenderer({
        alpha: true
      })
      this.renderer.setClearColor(0x6495ED, 0.5)// 设置渲染器的清除色和背景透明度
      this.renderer.setPixelRatio(window.devicePixelRatio)// 为了兼容高清屏幕
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.shadowMap.enabled = true // 告诉渲染器需要阴影效果
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap

      const container = document.getElementById('container')
      container.appendChild(this.renderer.domElement)
      window.addEventListener('resize', this.onWindowResize, false)// 添加窗口监听事件（resize-onresize即窗口或框架被重新调整大小）
    },
    // 窗口监听函数
    onWindowResize () {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    },
    animate () {
      requestAnimationFrame(this.animate)
      this.render()
    },
    render () {
      this.renderer.render(scene, this.camera)
    },
    loadObj () {
      let MTLLoaders = new MTLLoader()
      let OBJLoaders = new OBJLoader()
      MTLLoaders.load(
        '/assets/obj/Shirley.mtl',
        (materials) => {
          console.log(materials)
          materials.preload()
          OBJLoaders.load(
            '/assets/obj/Shirley.obj',
            (object) => {
              console.log(object)
              // 设置旋转中心点
              object.children[0].geometry.computeBoundingBox()
              object.children[0].geometry.center()
              object.scale.set(3, 3, 3)
              object.position.y = 0
              // this.scene.add(materials);
              scene.add(object)
              this.renderer.render(scene, this.camera)
            }
          )
        }
      )
    },
    showPic () {
      const object2 = scene.getObjectByName('Shirley')
      object2.visible = false
    },
    showPic2 () {
      const object = scene.getObjectByName('Shirley')
      object.visible = false
    }
  }
}
</script>
<style scoped>
#container {
  width: 1200px;
  margin: 0 auto;
  height: 800px;
  overflow: hidden;
}
</style>
