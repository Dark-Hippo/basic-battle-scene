import { Enemy } from "../Enemy";
import { PlayerCharacter } from "../Player";
import { MenuItem } from "./MenuItem";

export class Menu extends Phaser.GameObjects.Container {
  menuItems: any;
  menuItemIndex: number;
  heroes: any;
  constructor(x: number, y: number, scene: Phaser.Scene, heroes?: any) {
    super(scene, x, y);
    this.menuItems = [];
    this.menuItemIndex = 0;
    this.heroes = heroes;
    this.x = x;
    this.y = y;
  }
  addMenuItem(unit: string) {
    const menuItem = new MenuItem(0, this.menuItems.length * 20, unit, this.scene);
    this.menuItems.push(menuItem);
    this.add(menuItem);
  }
  moveSelectionUp() {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex--;
    if(this.menuItemIndex < 0) {
      this.menuItemIndex = this.menuItems.length - 1;
    }
    this.menuItems[this.menuItemIndex].select();
  }
  moveSelectionDown() {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex++;
    if(this.menuItemIndex >= this.menuItems.length) {
      this.menuItemIndex = 0;
    }
    this.menuItems[this.menuItemIndex].select();
  }
  select(index: number) {
    if(!index) {
      index = 0;
    }
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = index;
    this.menuItems[this.menuItemIndex].select();
  }
  deselect() {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = 0;
  }
  confirm() {
    // when the player confirms his slection, do the action
  }
  clear() {
    for(let i = 0; i < this.menuItems.length; i++) {
      this.menuItems[i].destroy();
    }
    this.menuItems.length = 0;
    this.menuItemIndex = 0;
  }
  remap(units: Enemy[] | PlayerCharacter[]) {
    this.clear();
    for(let i = 0; i < units.length; i++) {
      const unit = units[i];
      this.addMenuItem(unit.type);
    }
  }
}