export class Unit extends Phaser.GameObjects.Sprite {
  maxHp: any;
  hp: any;
  damage: any;
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
    super(scene, x, y, texture, frame);
    this.type = type;
    this.maxHp = this.hp = hp;
    this.damage = damage;
  }
  
  attack(target: any) {
    target.takeDamage(this.damage);
  }
  
  takeDamage(damage: any) {
    this.hp -= damage;
  }
}
