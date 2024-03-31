import { BootScene } from './scenes/Boot';
import { BattleScene } from './scenes/BattleScene';
import { UIScene } from './scenes/UI';

import { Game, Types } from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 320,
    height: 240,
    parent: 'game-container',
    zoom: 2,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0, x: 0 },
            debug: true,
        }
    },
    scene: [
        BootScene,BattleScene,UIScene
    ]
};

export default new Game(config);
