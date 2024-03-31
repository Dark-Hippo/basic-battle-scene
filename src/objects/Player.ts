import { Unit } from "./Unit";

export class PlayerCharacter extends Unit {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    frame: string | number | undefined,
    type: string,
    hp: any,
    damage: any
  ) {
    super(scene, x, y, texture, frame, type, hp, damage);
    this.flipX = true;
    this.setScale(2);
  }
}
