import { Mesh, PointLight, SpotLight } from "three";
import { Component } from "./component";
import { Names } from "../names";

export class Cursor extends Component {
  name = Names.Cursor
  mesh = new PointLight()
  // light = new SpotLight()

  constructor() {
    super()
    this.mesh.position.z = 40
    this.mesh.castShadow = true
    // this.light.penumbra = 0.5
    this.mesh.intensity = 500
    // this.light.target = this.mesh
  }

  build = () => {
    this.inject()
    return [this.mesh]
  }
}
