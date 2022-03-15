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
// import { OBJLoader } from 'three-obj-mtl-loader'
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

const OrbitControls = require('three-orbit-controls')(THREE)
// eslint-disable-next-line no-unused-vars
const scene = new THREE.Scene()
// eslint-disable-next-line no-unused-vars
export default {
  name: 'test',
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
    this.loadObj2()
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
      this.renderer.sortObjects = false

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
    // 外部模型加载函数
    loadObj () {
      // 包含材质
      new MTLLoader().setPath('/assets/obj/').load('Shirley.mtl', materials => {
        console.log('materials', materials)
        materials.preload()
        new OBJLoader().setMaterials(materials).setPath('/assets/obj/').load('Shirley.obj', obj => {
          obj.children[0].geometry.computeBoundingBox()
          obj.children[0].geometry.center()
          obj.scale.set(5, 5, 5)
          obj.position.set(5, 5, 0)
          obj.name = 'Shirley'
          scene.add(obj)
        })
      })
    },
    // loadObj2 () {
    //   // 包含材质
    //   new MTLLoader().setPath('/assets/obj/').load('Shirley.mtl', materials => {
    //     console.log('materials', materials)
    //     materials.preload()
    //     new OBJLoader().setMaterials(materials).setPath('/assets/obj/').load('Shirley.obj', obj => {
    //       obj.children[0].geometry.computeBoundingBox()
    //       obj.children[0].geometry.center()
    //       obj.scale.set(1, 1, 1)
    //       obj.position.set(5, 5, 0)
    //       scene.add(obj)
    //     })
    //   })
    // },
    // loadObj () {
    //  无材质
    //   let objloader = new OBJLoader()
    //   objloader.load('/assets/obj/BR_Squirtle.obj', function (obj) {
    //     obj.scale.set(1, 1, 1)
    //     obj.position.set(0, 0, 0)
    //     scene.add(obj)
    //   })
    // },
    loadObj2 () {
      // 无材质
      let objloader = new OBJLoader()
      // let material = new THREE.MeshPhongMaterial({
      //   transparent: true,
      //   opacity: 1,
      //   visible: true
      // })
      // objloader.setMaterials(material)
      objloader.load('/assets/obj/3.obj', function (obj) {
        obj.scale.set(1, 1, 1)
        obj.position.set(0, 0, 0)
        obj.name = '3'
        obj.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            // child.material.shininess=0;
            // 在加载树木模型时，树叶的材质必须是透明的
            child.material.transparent = true
            child.material.opacity = 0.2
            child.material.depthWrite = false
            child.material.side = THREE.FrontSide
            // child.shading=THREE.FlatShading
          }
        }
        )
        scene.add(obj)
      })
    },
    showPic () {
      const object = scene.getObjectByName('Shirley')
      object.visible = !object.visible
      // object.material.transparent = true
    },
    showPic2 () {
      const object = scene.getObjectByName('3')
      object.visible = !object.visible
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
