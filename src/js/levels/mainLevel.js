import Hero from '../characters/hero';

function createAliens (context, invaderType) {

    let xMultiply = 68, yMultiply =70;
    let scale = 0.35;
    let tweenX = 550;

    if(invaderType === 1){
        xMultiply = 78; 
        //yMultiply =90;
        scale = 0.25;
        tweenX = 500
    }

    if(invaderType === 2){
        xMultiply = 78; 
        //yMultiply =90;
        scale = 0.25;
        tweenX = 500

    }

    if(invaderType === 3){
        xMultiply = 85; 
        //yMultiply =90;
        scale = 0.35;
        tweenX = 500

    }

    for (var y = 0; y < 4; y++)
    {
        for (var x = 0; x < 10; x++)
        {
            var alien = context.aliens.create(x * xMultiply, y * yMultiply, 'invader'+invaderType);
            alien.scale.setTo(scale, scale);
            alien.anchor.setTo(0.5, 0.5);
            //alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
            //alien.play('fly');
            // if(tint){
            //     alien.tint = tint
            // }
            
            alien.body.moves = false;
        }
    }

    context.aliens.x = 100;
    context.aliens.y = 50;

    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
    var tween = context.game.add.tween(context.aliens).to( { x: tweenX }, 4000, Phaser.Easing.Linear.None, true, 0, 1000, true);
    tween.onRepeat.add(()=>{context.aliens.y += 30;}, this);
}

function enemyFires (context) {

    //  Grab the first bullet we can from the pool
    let enemyBullet = context.enemyBullets.getFirstExists(false);

    context.livingEnemies.length=0;

    context.aliens.forEachAlive(function(alien){

        // put every living enemy in an array
        context.livingEnemies.push(alien);
    });


    if (enemyBullet && context.livingEnemies.length > 0)
    {
        
        var random= context.game.rnd.integerInRange(0,context.livingEnemies.length-1);

        // randomly select one of them
        var shooter=context.livingEnemies[random];
        // And fire the bullet from this enemy
        enemyBullet.reset(shooter.body.x, shooter.body.y);

        let randomPlayer = Math.floor(Math.random() * 2)+1;

        if(context.levelConfig.players === 1){
            randomPlayer = 1;
        }

        if(randomPlayer === 1){
            context.game.physics.arcade.moveToObject(enemyBullet,context.player,120);
        } else {
            context.game.physics.arcade.moveToObject(enemyBullet,context.playerTwo,120);
        }
        
        context.firingTimer = context.game.time.now + 2000;
    }

}

function setupInvader (invader) {

    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');

}

function collisionHandler (bullet, alien) {

    //  When a bullet hits an alien we kill them both
    bullet.kill();
    alien.kill();
    //  Increase the score
    if(bullet.fromPlayer === 'one') {
        this.player.score += 20;
        this.player.scoreText.text = `Score: ${this.player.score}`;
    } else if(bullet.fromPlayer === 'two') {
        this.playerTwo.score += 20;
        this.playerTwo.scoreText.text = `Score: ${this.playerTwo.score}`;
    }
        

    //  And create an explosion :)
    this.game._sfx.impact.play();
    var explosion = this.explosions.getFirstExists(false);
    explosion.reset(alien.body.x, alien.body.y);
    explosion.play('kaboom', 30, false, true);

    if (this.aliens.countLiving() == 0)
    {
        this.player.bullets.callAll('kill');
        if(this.levelConfig.players === 2){
            this.playerTwo.bullets.callAll('kill');
        }
        this.enemyBullets.callAll('kill');
        //score += 1000;
        //scoreText.text = scoreString + score;

        //enemyBullets.callAll('kill',this);
        //stateText.text = " You Won, \n Click to restart";
        //stateText.visible = true;

        //the "click to restart" handler
        //game.input.onTap.addOnce(restart,this);
        if(this.waveCounter ===2){
            if(this.levelConfig.players === 2){
                let player = 0;
                let playerTwo = 0;

                this.player.lives.forEachAlive(()=>{
                    player =  player+1
                })
                this.playerTwo.lives.forEachAlive(()=>{
                    playerTwo =  playerTwo+1
                })
                this.game.state.start('bossLevel', true, false, {
                    players: this.levelConfig.players,
                    playerScore: this.player.score,
                    playerTwoScore: this.player.score,
                    playerLives: player,
                    playerTwoLives: playerTwo
                }, this.score); 
            } else {
                let player = 0;
                this.player.lives.forEachAlive(()=>{
                    player =  player+1
                })

                this.game.state.start('bossLevel', true, false, {
                    players: this.levelConfig.players,
                    playerScore: this.player.score,
                    playerLives: player
                }, this.score); 
            }

        } else {
            this.waveCounter++;
            createAliens(this, this.waveCounter);
        }
    }

}

function enemyHitsPlayer (player,bullet) {
    
    bullet.kill();

    let live = player.lives.getFirstAlive();
    if (live && !player.hasShield)
    {
        player.kill();
        live.kill();
    }

    //  And create an explosion :)
    this.game._sfx.impact.play();
    var explosion = this.explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play('kaboom', 30, false, true);

    // When the player dies
    if (player.lives.countLiving() < 1)
    {
        player.kill();
        player.statusText.text = 'No more lives';
    }else {
        if(!player.hasShield){
            player.reviveAble = true;
            player.revivePenalty = this.game.time.now + 3000;
        }
    }

    if(this.levelConfig.players === 2){
        if(this.player.lives.countLiving() <1 && this.playerTwo.lives.countLiving() <1){
            let gstateText = this.game.add.text(this.game.world.centerX,this.game.world.centerY,'Game OVer ', { font: '84px Arial', fill: '#fff' });
            gstateText.anchor.setTo(0.5, 0.5);

            if(this.score.isScoreMoreThenLast(this.player.score)){
                this.game.state.start('enterName', true, false, this.score, this.player.score, ()=>{
                    if(this.score.isScoreMoreThenLast(this.playerTwo.score)){
                        this.game.state.start('enterName', true, false, this.score, this.playerTwo.score, ()=>{
                            this.game.state.start('showScore', true, false, this.score);
                        });
                    } else {
                        this.game.state.start('showScore', true, false, this.score);
                    }
                });
            } else if(this.score.isScoreMoreThenLast(this.playerTwo.score)){
                this.game.state.start('enterName', true, false, this.score, this.playerTwo.score, ()=>{
                    this.game.state.start('showScore', true, false, this.score);
                });
            }
            else {
                this.game.state.start('showScore', true, false, this.score); 
            }


        }
    } else {
        if(this.player.lives.countLiving() <1 ){
            let gstateText = this.game.add.text(this.game.world.centerX,this.game.world.centerY,'Game OVer ', { font: '84px Arial', fill: '#fff' });
            gstateText.anchor.setTo(0.5, 0.5);

            if(this.score.isScoreMoreThenLast(this.player.score)){
                this.game.state.start('enterName', true, false, this.score, this.player.score, ()=>{
                    this.game.state.start('showScore', true, false, this.score);
                });
            } else {
                this.game.state.start('showScore', true, false, this.score); 
            }
        }
    }



}



export default class MainLevel {
    constructor() {
        this.player;
        this.aliens;
        this.bullets;
        this.bulletTime = 0;
        this.cursors;
        this.fireButton;
        this.explosions;
        this.starfield;
        this.lives;
        this.enemyBullet;
        this.firingTimer = 0;
        this.stateText;
        this.livingEnemies = [];
        this.waveCounter = 0;
    }
    preload() {
        this.game.load.image('bullet', 'assets/img/bullet.png');
        this.game.load.image('enemyBullet', 'assets/img/enemy-bullet.png');
        this.game.load.image('invader1', 'assets/img/bug1.svg');
        this.game.load.image('invader2', 'assets/img/bug2.svg');
        this.game.load.image('invader3', 'assets/img/bug3.svg');
        this.game.load.image('invader4', 'assets/img/bug4.svg');
        this.game.load.spritesheet('kaboom', 'assets/img/explode.png', 128, 128);
        this.game.load.image('starfield', 'assets/img/starfield2.png');
        this.game.load.image('starfield2', 'assets/img/starfield3.png');
    }
    init(config, score) {
        this.game.renderer.renderSession.roundPixels = true;
        this.levelConfig = config;
        this.score = score;
        console.log(this.levelConfig, this.score);
    }

    reset() {
        this.waveCounter = 0;
    }

    create() {
        this.reset()
        this.game.stage.backgroundColor = "#000000";
    
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
        //  The scrolling starfield background
        this.starfield = this.game.add.tileSprite(0, 0, 1280, 1024, 'starfield');
        this.starfield2 = this.game.add.tileSprite(0, 0, 1280, 1024, 'starfield2');
    
        //  The hero!
        this.player =  new Hero(this.game, {
            ship: 'ship1',
            player: 'one',
            lives: 3,
            positionHUD: 'left',
            spawnPosition: {
                x: 240,
                y: 900
            },
            keys: this.game.input.keyboard.addKeys({
                left: Phaser.KeyCode.LEFT,
                right: Phaser.KeyCode.RIGHT,
                fire: Phaser.KeyCode.CONTROL
            })
        });
        this.game.add.existing(this.player);
        if(this.levelConfig.players === 2) {
            this.playerTwo =  new Hero(this.game, {
                ship: 'ship2',
                player: 'two',
                lives: 3,
                positionHUD: 'right',
                spawnPosition: {
                    x: 1040,
                    y: 900
                },
                keys: this.game.input.keyboard.addKeys({
                    left: Phaser.KeyCode.D,
                    right: Phaser.KeyCode.G,
                    fire: Phaser.KeyCode.A
                })
            });
            this.game.add.existing(this.playerTwo);
        }

        //  The baddies!
        this.aliens = this.game.add.group();
        this.aliens.enableBody = true;
        this.aliens.physicsBodyType = Phaser.Physics.ARCADE;
    
        createAliens(this, 4);
        //  An explosion pool
        this.explosions = this.game.add.group();
        this.explosions.createMultiple(30, 'kaboom');
        this.explosions.forEach(setupInvader, this);
        this.game._sfx.boden.loop = true;
        this.game._sfx.boden.play();

        // The enemy's bullets
        this.enemyBullets = this.game.add.group();
        this.enemyBullets.enableBody = true;
        this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.enemyBullets.createMultiple(30, 'enemyBullet');
        this.enemyBullets.setAll('anchor.x', 0.5);
        this.enemyBullets.setAll('anchor.y', 1);
        this.enemyBullets.setAll('outOfBoundsKill', true);
        this.enemyBullets.setAll('checkWorldBounds', true);
    }

    update () {
        this.starfield.tilePosition.y += 1;
        this.starfield2.tilePosition.y += 2;

        if (this.game.time.now > this.firingTimer)
        {
            enemyFires(this);
        }

        this.game.physics.arcade.overlap(this.player.bullets, this.aliens, collisionHandler, null, this);
        this.game.physics.arcade.overlap(this.enemyBullets, this.player, enemyHitsPlayer, null, this);

        if(this.player.reviveAble && this.player.revivePenalty < this.game.time.now){
            this.player.revive();
            this.player.tint = 500 * 0xffffff;
            this.player.reviveAble = false;
            this.player.hasShield = true;
            this.player.shieldTimer = this.game.time.now + 2000;
        }

        if(this.levelConfig.players === 2) {
            this.game.physics.arcade.overlap(this.enemyBullets, this.playerTwo, enemyHitsPlayer, null, this);
            this.game.physics.arcade.overlap(this.playerTwo.bullets, this.aliens, collisionHandler, null, this);
            if(this.playerTwo.reviveAble && this.playerTwo.revivePenalty < this.game.time.now){
                this.playerTwo.revive();
                this.playerTwo.tint = 500 * 0xffffff;
                this.playerTwo.reviveAble = false;
                this.playerTwo.hasShield = true;
                this.playerTwo.shieldTimer = this.game.time.now + 2000;
            }
        }
    }
}
