import { Group, Light, Mesh } from "three"

type Object = Mesh | Group | Light

export abstract class Component {
  abstract name: string
  abstract mesh: Object

  abstract build(): Object[]

  inject = () => {
    this.mesh.name = this.name
  }
}
