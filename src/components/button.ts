import { BoxGeometry, MeshPhysicalMaterial, Mesh } from "three";
import { Names } from "../names";
import { Component } from "./component";

export class Button extends Component {
  name = Names.Button
  geometry = new BoxGeometry(30, 15, 5)
  material = new MeshPhysicalMaterial({ color: 0x161616 });
  mesh = new Mesh(this.geometry, this.material)

  constructor() {
    super()
    this.mesh.position.set(-40, 40, 5)
    this.mesh.receiveShadow = true
    this.mesh.castShadow = true
  }

  build = () => {
    this.inject()
    return [this.mesh]
  }
}