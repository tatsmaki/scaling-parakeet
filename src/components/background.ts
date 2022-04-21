import { Mesh, MeshPhysicalMaterial, PlaneGeometry } from "three";
import { Component } from "./component";
import { Names } from "../names";

export class Background extends Component {
  name = Names.Background
  geometry = new PlaneGeometry(1000, 1000)
  material = new MeshPhysicalMaterial({ color: 0x161616 });
  mesh = new Mesh(this.geometry, this.material)

  constructor() {
    super()
    this.mesh.receiveShadow = true
  }

  build = () => {
    this.inject()
    return [this.mesh]
  }
}
