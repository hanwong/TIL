new Vue ({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        attack: function() {
            this.playerHealth -= this.calcDamage(3,10);
            this.monsterHealth -= this.calcDamage(3,10);
            this.checkWin();
        },
        specialAttack: function() {

        },
        heal: function() {

        },
        giveUp: function() {

        },
        calcDamage: function(min, max) {
            return Math.max(Math.floor(Math.random()*max)+1, min);
        },
        checkWin: function() {
            if(this.playerHealth <= 0) {
                this.playerHealth = 0;
                if(confirm('You lost... New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return;
            } else if (this.monsterHealth <= 0) {
                this.monsterHealth = 0;
                if(confirm('You Win!!! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return;
            }
            return;
        }

    }
});
