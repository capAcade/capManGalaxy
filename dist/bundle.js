/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/characters/hero.js":
/*!***********************************!*\
  !*** ./src/js/characters/hero.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Hero; });\nconst getDefaultSettings = function(game){\r\n    return {\r\n        ship: 'ship1',\r\n        player: 'one',\r\n        positionHUD: 'left',\r\n        spawnPosition: {\r\n            x: 640,\r\n            y: 900\r\n        },\r\n        keys: game.input.keyboard.addKeys({\r\n            left: Phaser.KeyCode.LEFT,\r\n            right: Phaser.KeyCode.RIGHT,\r\n            fire: Phaser.KeyCode.CONTROL\r\n        })\r\n    };\r\n}\r\n\r\nclass Hero extends Phaser.Sprite {\r\n    constructor(game, settings = getDefaultSettings(game)) {\r\n        super(game, settings.spawnPosition.x, settings.spawnPosition.y, settings.ship);\r\n        this.settings = settings\r\n        this.score = 0;\r\n        this.scale.setTo(0.45, 0.45);\r\n        this.anchor.setTo(0.5, 0.5);\r\n        this.hasShield = false;\r\n        game.physics.enable(this, Phaser.Physics.ARCADE);\r\n\r\n        this.lives = game.add.group();\r\n        this.bulletTime= 0;\r\n        \r\n        //give hero random color tint\r\n       // this.tint = Math.floor(Math.random() * 1000) * 0xffffff;\r\n        \r\n        //  Our bullet group\r\n        this.bullets = game.add.group();\r\n        this.bullets.enableBody = true;\r\n        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;\r\n        this.bullets.createMultiple(30, 'bullet');\r\n        this.bullets.setAll('anchor.x', 0.5);\r\n        this.bullets.setAll('anchor.y', 1);\r\n        this.bullets.setAll('outOfBoundsKill', true);\r\n        this.bullets.setAll('checkWorldBounds', true);\r\n\r\n        //this.alive = true\r\n        this.createLives(3);\r\n    }\r\n    update(){\r\n        if (this.alive)\r\n        {\r\n            //  Reset the player, then check for movement keys\r\n            this.body.velocity.setTo(0, 0);\r\n    \r\n            if (this.settings.keys.left.isDown)\r\n            {\r\n                this.body.velocity.x = -200;\r\n            }\r\n            else if (this.settings.keys.right.isDown)\r\n            {\r\n                this.body.velocity.x = 200;\r\n            }\r\n\r\n            //  Firing?\r\n            if (this.settings.keys.fire.isDown)\r\n            {\r\n                this.fireBullet();\r\n            }\r\n\r\n\r\n            if(this.hasShield && this.shieldTimer < this.game.time.now){\r\n                this.hasShield = false;\r\n                this.tint = 0xffffff;\r\n            }\r\n        }\r\n    }\r\n    createLives(amount = 0 ){\r\n        if(this.settings.positionHUD === 'left'){\r\n            this.scoreText = this.game.add.text(10, 10, `Score: ${this.score}`, { font: '34px Arial', fill: '#fff' });\r\n            this.statusText = this.game.add.text(10, 60, ``, { font: '34px Arial', fill: '#fff' });\r\n        }else{\r\n            this.scoreText = this.game.add.text(this.game.world.width - 230, 10, `Score: ${this.score}`, { font: '34px Arial', fill: '#fff' });\r\n            this.statusText = this.game.add.text(this.game.world.width - 230, 60, ``, { font: '34px Arial', fill: '#fff' });\r\n        }\r\n        \r\n\r\n        for (var i = 0; i < amount; i++) \r\n        {\r\n            let ship;\r\n            if(this.settings.positionHUD === 'left'){\r\n                ship = this.lives.create(30 + (30 * i), 80, this.settings.ship);\r\n            } else {\r\n                ship = this.lives.create(this.game.world.width - 100 + (30 * i), 60, this.settings.ship);\r\n            }\r\n            \r\n            ship.scale.setTo(0.15, 0.15);\r\n            ship.anchor.setTo(0.5, 0.5);\r\n            ship.angle = 90;\r\n            ship.alpha = 0.4;\r\n        }\r\n    }\r\n    fireBullet(){\r\n        //  To avoid them being allowed to fire too fast we set a time limit\r\n        if (this.game.time.now > this.bulletTime)\r\n        {\r\n            //  Grab the first bullet we can from the pool\r\n            let bullet = this.bullets.getFirstExists(false);\r\n\r\n            if (bullet)\r\n            {\r\n                //  And fire it\r\n                this.game._sfx.shot.play();\r\n                bullet.reset(this.x, this.y + 8);\r\n                bullet.body.velocity.y = -400;\r\n                bullet.fromPlayer = this.settings.player;\r\n                this.bulletTime = this.game.time.now + 400;\r\n            }\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/js/characters/hero.js?");

/***/ }),

/***/ "./src/js/levels/mainLevel.js":
/*!************************************!*\
  !*** ./src/js/levels/mainLevel.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MainLevel; });\n/* harmony import */ var _characters_hero__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../characters/hero */ \"./src/js/characters/hero.js\");\n\r\nfunction createAliens (context, invaderType) {\r\n\r\n    let xMultiply = 68, yMultiply =70;\r\n    let scale = 0.35;\r\n    let tweenX = 550;\r\n\r\n    if(invaderType === 1){\r\n        xMultiply = 78; \r\n        //yMultiply =90;\r\n        scale = 0.25;\r\n        tweenX = 500\r\n    }\r\n\r\n    if(invaderType === 2){\r\n        xMultiply = 78; \r\n        //yMultiply =90;\r\n        scale = 0.25;\r\n        tweenX = 500\r\n\r\n    }\r\n\r\n    if(invaderType === 3){\r\n        xMultiply = 85; \r\n        //yMultiply =90;\r\n        scale = 0.35;\r\n        tweenX = 500\r\n\r\n    }\r\n\r\n    for (var y = 0; y < 4; y++)\r\n    {\r\n        for (var x = 0; x < 10; x++)\r\n        {\r\n            var alien = context.aliens.create(x * xMultiply, y * yMultiply, 'invader'+invaderType);\r\n            alien.scale.setTo(scale, scale);\r\n            alien.anchor.setTo(0.5, 0.5);\r\n            //alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);\r\n            //alien.play('fly');\r\n            // if(tint){\r\n            //     alien.tint = tint\r\n            // }\r\n            \r\n            alien.body.moves = false;\r\n        }\r\n    }\r\n\r\n    context.aliens.x = 100;\r\n    context.aliens.y = 50;\r\n\r\n    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.\r\n    var tween = context.game.add.tween(context.aliens).to( { x: tweenX }, 4000, Phaser.Easing.Linear.None, true, 0, 1000, true);\r\n    tween.onRepeat.add(()=>{context.aliens.y += 30;}, this);\r\n}\r\n\r\nfunction enemyFires (context) {\r\n\r\n    //  Grab the first bullet we can from the pool\r\n    let enemyBullet = context.enemyBullets.getFirstExists(false);\r\n\r\n    context.livingEnemies.length=0;\r\n\r\n    context.aliens.forEachAlive(function(alien){\r\n\r\n        // put every living enemy in an array\r\n        context.livingEnemies.push(alien);\r\n    });\r\n\r\n\r\n    if (enemyBullet && context.livingEnemies.length > 0)\r\n    {\r\n        \r\n        var random= context.game.rnd.integerInRange(0,context.livingEnemies.length-1);\r\n\r\n        // randomly select one of them\r\n        var shooter=context.livingEnemies[random];\r\n        // And fire the bullet from this enemy\r\n        enemyBullet.reset(shooter.body.x, shooter.body.y);\r\n\r\n        let randomPlayer = Math.floor(Math.random() * 2)+1;\r\n\r\n        if(randomPlayer === 1){\r\n            context.game.physics.arcade.moveToObject(enemyBullet,context.player,120);\r\n        } else {\r\n            context.game.physics.arcade.moveToObject(enemyBullet,context.playerTwo,120);\r\n        }\r\n        \r\n        context.firingTimer = context.game.time.now + 2000;\r\n    }\r\n\r\n}\r\n\r\nfunction setupInvader (invader) {\r\n\r\n    invader.anchor.x = 0.5;\r\n    invader.anchor.y = 0.5;\r\n    invader.animations.add('kaboom');\r\n\r\n}\r\n\r\nfunction collisionHandler (bullet, alien) {\r\n\r\n    //  When a bullet hits an alien we kill them both\r\n    bullet.kill();\r\n    alien.kill();\r\n    //  Increase the score\r\n    if(bullet.fromPlayer === 'one') {\r\n        this.player.score += 20;\r\n        this.player.scoreText.text = `Score: ${this.player.score}`;\r\n    } else if(bullet.fromPlayer === 'two') {\r\n        this.playerTwo.score += 20;\r\n        this.playerTwo.scoreText.text = `Score: ${this.playerTwo.score}`;\r\n    }\r\n        \r\n\r\n    //  And create an explosion :)\r\n    this.game._sfx.impact.play();\r\n    var explosion = this.explosions.getFirstExists(false);\r\n    explosion.reset(alien.body.x, alien.body.y);\r\n    explosion.play('kaboom', 30, false, true);\r\n\r\n    if (this.aliens.countLiving() == 0)\r\n    {\r\n        this.player.bullets.callAll('kill');\r\n        this.playerTwo.bullets.callAll('kill');\r\n        this.enemyBullets.callAll('kill');\r\n        //score += 1000;\r\n        //scoreText.text = scoreString + score;\r\n\r\n        //enemyBullets.callAll('kill',this);\r\n        //stateText.text = \" You Won, \\n Click to restart\";\r\n        //stateText.visible = true;\r\n\r\n        //the \"click to restart\" handler\r\n        //game.input.onTap.addOnce(restart,this);\r\n        if(this.waveCounter ===2){\r\n            console.log('new state');\r\n        } else {\r\n            this.waveCounter++;\r\n            createAliens(this, this.waveCounter);\r\n        }\r\n    }\r\n\r\n}\r\n\r\nfunction enemyHitsPlayer (player,bullet) {\r\n    \r\n    bullet.kill();\r\n\r\n    let live = player.lives.getFirstAlive();\r\n    if (live && !player.hasShield)\r\n    {\r\n        player.kill();\r\n        live.kill();\r\n    }\r\n\r\n    //  And create an explosion :)\r\n    this.game._sfx.impact.play();\r\n    var explosion = this.explosions.getFirstExists(false);\r\n    explosion.reset(player.body.x, player.body.y);\r\n    explosion.play('kaboom', 30, false, true);\r\n\r\n    // When the player dies\r\n    if (player.lives.countLiving() < 1)\r\n    {\r\n        player.kill();\r\n        player.statusText.text = 'No more lives';\r\n    }else {\r\n        if(!player.hasShield){\r\n            player.reviveAble = true;\r\n            player.revivePenalty = this.game.time.now + 3000;\r\n        }\r\n    }\r\n\r\n    if(this.player.lives.countLiving() <1 && this.playerTwo.lives.countLiving() <1){\r\n        let gstateText = this.game.add.text(this.game.world.centerX,this.game.world.centerY,'Game OVer ', { font: '84px Arial', fill: '#fff' });\r\n        gstateText.anchor.setTo(0.5, 0.5);\r\n    }\r\n\r\n}\r\n\r\n\r\n\r\nclass MainLevel {\r\n    constructor() {\r\n        this.player;\r\n        this.aliens;\r\n        this.bullets;\r\n        this.bulletTime = 0;\r\n        this.cursors;\r\n        this.fireButton;\r\n        this.explosions;\r\n        this.starfield;\r\n        this.lives;\r\n        this.enemyBullet;\r\n        this.firingTimer = 0;\r\n        this.stateText;\r\n        this.livingEnemies = [];\r\n        this.waveCounter = 0;\r\n    }\r\n    preload() {\r\n        this.game.load.image('bullet', 'assets/img/bullet.png');\r\n        this.game.load.image('enemyBullet', 'assets/img/enemy-bullet.png');\r\n        this.game.load.image('invader1', 'assets/img/bug1.svg');\r\n        this.game.load.image('invader2', 'assets/img/bug2.svg');\r\n        this.game.load.image('invader3', 'assets/img/bug3.svg');\r\n        this.game.load.image('invader4', 'assets/img/bug4.svg');\r\n        this.game.load.spritesheet('kaboom', 'assets/img/explode.png', 128, 128);\r\n        this.game.load.image('starfield', 'assets/img/starfield.png');\r\n    }\r\n    init() {\r\n        this.game.renderer.renderSession.roundPixels = true;\r\n    }\r\n    create() {\r\n    \r\n        this.game.physics.startSystem(Phaser.Physics.ARCADE);\r\n    \r\n        //  The scrolling starfield background\r\n        this.starfield = this.game.add.tileSprite(0, 0, 1280, 1024, 'starfield');\r\n        //this.starfield.tint = (Math.floor(Math.random() * 1000)+700) * 0xffffff;\r\n\r\n    \r\n        //  The hero!\r\n        this.player =  new _characters_hero__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.game, {\r\n            ship: 'ship1',\r\n            player: 'one',\r\n            positionHUD: 'left',\r\n            spawnPosition: {\r\n                x: 240,\r\n                y: 900\r\n            },\r\n            keys: this.game.input.keyboard.addKeys({\r\n                left: Phaser.KeyCode.LEFT,\r\n                right: Phaser.KeyCode.RIGHT,\r\n                fire: Phaser.KeyCode.CONTROL\r\n            })\r\n        });\r\n        this.game.add.existing(this.player);\r\n\r\n        this.playerTwo =  new _characters_hero__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.game, {\r\n            ship: 'ship2',\r\n            player: 'two',\r\n            positionHUD: 'right',\r\n            spawnPosition: {\r\n                x: 1040,\r\n                y: 900\r\n            },\r\n            keys: this.game.input.keyboard.addKeys({\r\n                left: Phaser.KeyCode.A,\r\n                right: Phaser.KeyCode.D,\r\n                fire: Phaser.KeyCode.F\r\n            })\r\n        });\r\n        this.game.add.existing(this.playerTwo);\r\n\r\n    \r\n        //  The baddies!\r\n        this.aliens = this.game.add.group();\r\n        this.aliens.enableBody = true;\r\n        this.aliens.physicsBodyType = Phaser.Physics.ARCADE;\r\n    \r\n        createAliens(this, 4);\r\n        //  An explosion pool\r\n        this.explosions = this.game.add.group();\r\n        this.explosions.createMultiple(30, 'kaboom');\r\n        this.explosions.forEach(setupInvader, this);\r\n        this.game._sfx.boden.loop = true;\r\n        this.game._sfx.boden.play();\r\n\r\n\r\n\r\n                // The enemy's bullets\r\n        this.enemyBullets = this.game.add.group();\r\n        this.enemyBullets.enableBody = true;\r\n        this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;\r\n        this.enemyBullets.createMultiple(30, 'enemyBullet');\r\n        this.enemyBullets.setAll('anchor.x', 0.5);\r\n        this.enemyBullets.setAll('anchor.y', 1);\r\n        this.enemyBullets.setAll('outOfBoundsKill', true);\r\n        this.enemyBullets.setAll('checkWorldBounds', true);\r\n\r\n    }\r\n    update () {\r\n        this.starfield.tilePosition.y += 2;\r\n\r\n        if (this.game.time.now > this.firingTimer)\r\n        {\r\n            enemyFires(this);\r\n        }\r\n\r\n        this.game.physics.arcade.overlap(this.player.bullets, this.aliens, collisionHandler, null, this);\r\n        this.game.physics.arcade.overlap(this.playerTwo.bullets, this.aliens, collisionHandler, null, this);\r\n        this.game.physics.arcade.overlap(this.enemyBullets, this.player, enemyHitsPlayer, null, this);\r\n        this.game.physics.arcade.overlap(this.enemyBullets, this.playerTwo, enemyHitsPlayer, null, this);\r\n\r\n        if(this.player.reviveAble && this.player.revivePenalty < this.game.time.now){\r\n            this.player.revive();\r\n            this.player.tint = 500 * 0xffffff;\r\n            this.player.reviveAble = false;\r\n            this.player.hasShield = true;\r\n            this.player.shieldTimer = this.game.time.now + 2000;\r\n        }\r\n        if(this.playerTwo.reviveAble && this.playerTwo.revivePenalty < this.game.time.now){\r\n            this.playerTwo.revive();\r\n            this.playerTwo.tint = 500 * 0xffffff;\r\n            this.playerTwo.reviveAble = false;\r\n            this.playerTwo.hasShield = true;\r\n            this.playerTwo.shieldTimer = this.game.time.now + 2000;\r\n        }\r\n\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/js/levels/mainLevel.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _levels_mainLevel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./levels/mainLevel */ \"./src/js/levels/mainLevel.js\");\n\r\nvar game = new Phaser.Game(1280, 1024, Phaser.AUTO, 'capManGalaxy');\r\n\r\nfunction preload() {\r\n    game.load.image('bullet', 'assets/img/bullet.png');\r\n    game.load.image('enemyBullet', 'assets/img/enemy-bullet.png');\r\n    game.load.image('invader', 'assets/img/bug4.svg');\r\n    game.load.image('ship', 'assets/img/Jet-top.svg');\r\n    game.load.spritesheet('kaboom', 'assets/img/explode.png', 128, 128);\r\n    game.load.image('starfield', 'assets/img/starfield.png');\r\n    this.game.load.audio('sfx:shot', 'assets/audio/shot.wav');\r\n    this.game.load.audio('sfx:impact', 'assets/audio/impact.wav');\r\n}\r\n\r\nvar player;\r\nvar aliens;\r\nvar bullets;\r\nvar bulletTime = 0;\r\nvar cursors;\r\nvar fireButton;\r\nvar explosions;\r\nvar starfield;\r\nvar score = 0;\r\nvar scoreString = '';\r\nvar scoreText;\r\nvar lives;\r\nvar enemyBullet;\r\nvar firingTimer = 0;\r\nvar stateText;\r\nvar livingEnemies = [];\r\nvar sfx;\r\n\r\nfunction create() {\r\n\r\n    sfx = {\r\n        shot: this.game.add.audio('sfx:shot'),\r\n        impact: this.game.add.audio('sfx:impact')\r\n    };\r\n\r\n    game.physics.startSystem(Phaser.Physics.ARCADE);\r\n\r\n    //  The scrolling starfield background\r\n    starfield = game.add.tileSprite(0, 0, 1280, 1024, 'starfield');\r\n\r\n    //  Our bullet group\r\n    bullets = game.add.group();\r\n    bullets.enableBody = true;\r\n    bullets.physicsBodyType = Phaser.Physics.ARCADE;\r\n    bullets.createMultiple(30, 'bullet');\r\n    bullets.setAll('anchor.x', 0.5);\r\n    bullets.setAll('anchor.y', 1);\r\n    bullets.setAll('outOfBoundsKill', true);\r\n    bullets.setAll('checkWorldBounds', true);\r\n\r\n    // The enemy's bullets\r\n    enemyBullets = game.add.group();\r\n    enemyBullets.enableBody = true;\r\n    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;\r\n    enemyBullets.createMultiple(30, 'enemyBullet');\r\n    enemyBullets.setAll('anchor.x', 0.5);\r\n    enemyBullets.setAll('anchor.y', 1);\r\n    enemyBullets.setAll('outOfBoundsKill', true);\r\n    enemyBullets.setAll('checkWorldBounds', true);\r\n\r\n    //  The hero!\r\n    player = game.add.sprite(640, 900, 'ship');\r\n    player.scale.setTo(0.45, 0.45);\r\n    player.anchor.setTo(0.5, 0.5);\r\n    game.physics.enable(player, Phaser.Physics.ARCADE);\r\n\r\n    //  The baddies!\r\n    aliens = game.add.group();\r\n    aliens.enableBody = true;\r\n    aliens.physicsBodyType = Phaser.Physics.ARCADE;\r\n\r\n    createAliens();\r\n\r\n    //  The score\r\n    scoreString = 'Score : ';\r\n    scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });\r\n\r\n    //  Lives\r\n    lives = game.add.group();\r\n    game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });\r\n\r\n    //  Text\r\n    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });\r\n    stateText.anchor.setTo(0.5, 0.5);\r\n    stateText.visible = false;\r\n\r\n    for (var i = 0; i < 3; i++) \r\n    {\r\n        var ship = lives.create(game.world.width - 100 + (30 * i), 60, 'ship');\r\n        ship.scale.setTo(0.15, 0.15);\r\n        ship.anchor.setTo(0.5, 0.5);\r\n        ship.angle = 90;\r\n        ship.alpha = 0.4;\r\n    }\r\n\r\n    //  An explosion pool\r\n    explosions = game.add.group();\r\n    explosions.createMultiple(30, 'kaboom');\r\n    explosions.forEach(setupInvader, this);\r\n\r\n    //  And some controls to play the game with\r\n    cursors = game.input.keyboard.createCursorKeys();\r\n    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);\r\n    \r\n}\r\n\r\nfunction createAliens () {\r\n\r\n    for (var y = 0; y < 4; y++)\r\n    {\r\n        for (var x = 0; x < 10; x++)\r\n        {\r\n            var alien = aliens.create(x * 68, y * 70, 'invader');\r\n            alien.scale.setTo(0.35, 0.35);\r\n            alien.anchor.setTo(0.5, 0.5);\r\n            //alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);\r\n            //alien.play('fly');\r\n            alien.body.moves = false;\r\n        }\r\n    }\r\n\r\n    aliens.x = 100;\r\n    aliens.y = 50;\r\n\r\n    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.\r\n    var tween = game.add.tween(aliens).to( { x: 550 }, 4000, Phaser.Easing.Linear.None, true, 0, 1000, true);\r\n\r\n    //  When the tween loops it calls descend\r\n    tween.onRepeat.add(descend, this);\r\n}\r\n\r\nfunction setupInvader (invader) {\r\n\r\n    invader.anchor.x = 0.5;\r\n    invader.anchor.y = 0.5;\r\n    invader.animations.add('kaboom');\r\n\r\n}\r\n\r\nfunction descend() {\r\n    aliens.y += 30;\r\n\r\n}\r\n\r\nfunction update() {\r\n\r\n    //  Scroll the background\r\n    starfield.tilePosition.y += 2;\r\n\r\n    if (player.alive)\r\n    {\r\n        //  Reset the player, then check for movement keys\r\n        player.body.velocity.setTo(0, 0);\r\n\r\n        if (cursors.left.isDown)\r\n        {\r\n            player.body.velocity.x = -200;\r\n        }\r\n        else if (cursors.right.isDown)\r\n        {\r\n            player.body.velocity.x = 200;\r\n        }\r\n\r\n        //  Firing?\r\n        if (fireButton.isDown)\r\n        {\r\n            fireBullet();\r\n        }\r\n\r\n        if (game.time.now > firingTimer)\r\n        {\r\n            enemyFires();\r\n        }\r\n\r\n        //  Run collision\r\n        game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);\r\n        game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);\r\n    }\r\n\r\n}\r\n\r\nfunction render() {\r\n\r\n    // for (var i = 0; i < aliens.length; i++)\r\n    // {\r\n    //     game.debug.body(aliens.children[i]);\r\n    // }\r\n\r\n}\r\n\r\nfunction collisionHandler (bullet, alien) {\r\n\r\n    //  When a bullet hits an alien we kill them both\r\n    bullet.kill();\r\n    alien.kill();\r\n\r\n    //  Increase the score\r\n    score += 20;\r\n    scoreText.text = scoreString + score;\r\n\r\n    //  And create an explosion :)\r\n    sfx.impact.play();\r\n    var explosion = explosions.getFirstExists(false);\r\n    explosion.reset(alien.body.x, alien.body.y);\r\n    explosion.play('kaboom', 30, false, true);\r\n\r\n    if (aliens.countLiving() == 0)\r\n    {\r\n        score += 1000;\r\n        scoreText.text = scoreString + score;\r\n\r\n        enemyBullets.callAll('kill',this);\r\n        stateText.text = \" You Won, \\n Click to restart\";\r\n        stateText.visible = true;\r\n\r\n        //the \"click to restart\" handler\r\n        game.input.onTap.addOnce(restart,this);\r\n    }\r\n\r\n}\r\n\r\nfunction enemyHitsPlayer (player,bullet) {\r\n    \r\n    bullet.kill();\r\n\r\n    live = lives.getFirstAlive();\r\n\r\n    if (live)\r\n    {\r\n        live.kill();\r\n    }\r\n\r\n    //  And create an explosion :)\r\n    sfx.impact.play();\r\n    var explosion = explosions.getFirstExists(false);\r\n    explosion.reset(player.body.x, player.body.y);\r\n    explosion.play('kaboom', 30, false, true);\r\n\r\n    // When the player dies\r\n    if (lives.countLiving() < 1)\r\n    {\r\n        player.kill();\r\n        enemyBullets.callAll('kill');\r\n\r\n        stateText.text=\" GAME OVER \\n Click to restart\";\r\n        stateText.visible = true;\r\n\r\n        //the \"click to restart\" handler\r\n        game.input.onTap.addOnce(restart,this);\r\n    }\r\n\r\n}\r\n\r\nfunction enemyFires () {\r\n\r\n    //  Grab the first bullet we can from the pool\r\n    enemyBullet = enemyBullets.getFirstExists(false);\r\n\r\n    livingEnemies.length=0;\r\n\r\n    aliens.forEachAlive(function(alien){\r\n\r\n        // put every living enemy in an array\r\n        livingEnemies.push(alien);\r\n    });\r\n\r\n\r\n    if (enemyBullet && livingEnemies.length > 0)\r\n    {\r\n        \r\n        var random=game.rnd.integerInRange(0,livingEnemies.length-1);\r\n\r\n        // randomly select one of them\r\n        var shooter=livingEnemies[random];\r\n        // And fire the bullet from this enemy\r\n        enemyBullet.reset(shooter.body.x, shooter.body.y);\r\n\r\n        game.physics.arcade.moveToObject(enemyBullet,player,120);\r\n        firingTimer = game.time.now + 2000;\r\n    }\r\n\r\n}\r\n\r\nfunction fireBullet () {\r\n\r\n    //  To avoid them being allowed to fire too fast we set a time limit\r\n    if (game.time.now > bulletTime)\r\n    {\r\n        //  Grab the first bullet we can from the pool\r\n        bullet = bullets.getFirstExists(false);\r\n\r\n        if (bullet)\r\n        {\r\n            //  And fire it\r\n            sfx.shot.play();\r\n            bullet.reset(player.x, player.y + 8);\r\n            bullet.body.velocity.y = -400;\r\n            bulletTime = game.time.now + 200;\r\n        }\r\n    }\r\n\r\n}\r\n\r\nfunction resetBullet (bullet) {\r\n\r\n    //  Called if the bullet goes out of the screen\r\n    bullet.kill();\r\n\r\n}\r\n\r\nfunction restart () {\r\n\r\n    //  A new level starts\r\n    \r\n    //resets the life count\r\n    lives.callAll('revive');\r\n    //  And brings the aliens back from the dead :)\r\n    aliens.removeAll();\r\n    createAliens();\r\n\r\n    //revives the player\r\n    player.revive();\r\n    //hides the text\r\n    stateText.visible = false;\r\n\r\n}\r\n\r\n    var preloader = {\r\n        preload: function(){\r\n            game.load.image('ship1', 'assets/img/Jet-top.svg');\r\n            game.load.image('ship2', 'assets/img/Jet2-top.svg');\r\n            game.load.audio('sfx:shot', 'assets/audio/shot.wav');\r\n            game.load.audio('sfx:impact', 'assets/audio/impact.wav');\r\n            game.load.audio('sfx:boden', 'assets/audio/boden.ogg');\r\n        },\r\n        create: function(){\r\n            game._sfx = {\r\n                shot: this.game.add.audio('sfx:shot'),\r\n                impact: this.game.add.audio('sfx:impact'),\r\n                boden: this.game.add.audio('sfx:boden'),\r\n                //boden: new Phaser.Sound(game,'sfx:boden',1,true)\r\n            };\r\n            game.state.start('main1', true, false, {level: 0});\r\n        }\r\n    }\r\n\r\n\r\n    var main1 = new _levels_mainLevel__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n    game.state.add('main1', main1);\r\n    //game.state.add('mainLevel',  { preload: preload, create: create, update: update, render: render });\r\n    game.state.add('preloader', preloader)\r\n    game.state.start('preloader', true, false, {level: 0});\r\n\n\n//# sourceURL=webpack:///./src/js/main.js?");

/***/ })

/******/ });