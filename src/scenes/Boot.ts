import { Scene } from 'phaser';

export class BootScene extends Scene
{
    constructor ()
    {
        super('BootScene');
    }

    preload ()
    {
        this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });
        this.load.image('dragonblue', 'assets/dragonblue.png');
        this.load.image('dragonorrange', 'assets/dragonorrange.png');
    }

    create ()
    {
        this.scene.start('BattleScene');
    }
}
