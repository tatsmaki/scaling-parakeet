import { Scene, PerspectiveCamera, WebGLRenderer, Vector2, Raycaster, AmbientLight, ReinhardToneMapping } from 'three'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';

import { Component } from './components/component';
import { Background } from './components/background';
import { Cursor } from './components/cursor';
import { Names } from './names';
import './index.css'
import { Button } from './components/button';

class Darkme {
  scene = new Scene()
  camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new WebGLRenderer({ antialias: true });
  composer = new EffectComposer(this.renderer);
  mouse = new Vector2()
  raycaster = new Raycaster()

  constructor() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true
    this.renderer.physicallyCorrectLights = true
    this.renderer.toneMapping = ReinhardToneMapping
    document.body.appendChild(this.renderer.domElement);
    this.camera.position.set(0, 0, 100)
    // this.camera.lookAt(0, 0, 0)
    // this.scene.add(new AmbientLight(0xffffff, 0.5))
    this.composer.addPass(new RenderPass(this.scene, this.camera))

    this.animate()
    this.subscribe()
  }

  addComponent = (component: Component) => {
    this.scene.add(...component.build())
    return this
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    // this.renderer.render(this.scene, this.camera)
    this.composer.render()
  }

  handleMouseMove = (event: MouseEvent) => {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);

    const background = this.scene.getObjectByName(Names.Background)
    const intersection = this.raycaster.intersectObject(background);

    if (intersection.length) {
      const { point } = intersection[0]
      const cursor = this.scene.getObjectByName(Names.Cursor)
      cursor.position.set(point.x, point.y, 20)
    }
  }

  handleResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  subscribe = () => {
    window.onmousemove = this.handleMouseMove
    window.onresize = this.handleResize
  }
}

new Darkme()
  .addComponent(new Background())
  .addComponent(new Cursor())
  .addComponent(new Button())
