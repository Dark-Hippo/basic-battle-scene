import { Enemy } from "../objects/Enemy";
import { PlayerCharacter } from "../objects/Player";

export class BattleScene extends Phaser.Scene {
  graphics: Phaser.GameObjects.Graphics;
  heroes: PlayerCharacter[];
  enemies: Enemy[];
  units: PlayerCharacter[];
  index: number;
  constructor() {
    super("BattleScene");
  }

  create() {
    // change the background to green
    this.cameras.main.setBackgroundColor("rgba(0, 200, 0, 0.5)");

    // player character - warrior
    const warrior = new PlayerCharacter(
      this,
      250,
      50,
      "player",
      1,
      "Warrior",
      100,
      20
    );
    this.add.existing(warrior);

    // player character - mage
    const mage = new PlayerCharacter(
      this,
      250,
      100,
      "player",
      4,
      "Mage",
      80,
      8
    );
    this.add.existing(mage);

    const dragonblue = new Enemy(
      this,
      50,
      50,
      "dragonblue",
      undefined,
      "Dragon",
      50,
      3
    );
    this.add.existing(dragonblue);

    const dragonorrange = new Enemy(
      this,
      50,
      100,
      "dragonorrange",
      undefined,
      "Dragon2",
      50,
      3
    );
    this.add.existing(dragonorrange);

    // array with heroes
    this.heroes = [warrior, mage];

    // array with enemies
    this.enemies = [dragonblue, dragonorrange];

    // array with both parties, who will attack
    this.units = this.heroes.concat(this.enemies);

    this.scene.launch("UIScene");

    this.index = -1;
  }

  nextTurn () {
    this.index++;
    
    // if there are no more units, we start again from the first one
    if(this.index >= this.units.length) {
      this.index = 0;
    }

    if(this.units[this.index]) {
      // if it's a player hero
      if(this.units[this.index] instanceof PlayerCharacter) {
        this.events.emit("PlayerSelect", this.index);
      } else { // else if it's an enemy
        const enemy: Enemy = this.units[this.index];
        
        // pick a random hero as the target
        const r = Math.floor(Math.random() * this.heroes.length);

        // call the enemy's attack function
        enemy.attack(this.heroes[r]);
        this.events.emit("Message", `${enemy.type} attacks ${this.heroes[r].type} for ${enemy.damage} damage`);

        // add timer for the next turn, so will have smooth gameplay
        this.time.addEvent({
          delay: 3000, 
          callback: this.nextTurn,
          callbackScope: this
        });
      }
    }
  }

  receivePlayerSelection(action: string, target: number) {
    const unit = this.units[this.index];
    if(action === 'attack') {
      unit.attack(this.enemies[target]);
      this.events.emit('Message', `${unit.type} attacks enemy for ${unit.damage} damage`);
    }
    this.time.addEvent({
      delay: 3000,
      callback: this.nextTurn,
      callbackScope: this
    })
  }
}
