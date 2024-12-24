class TreasureMap {
    static async getInitialClue() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("在古老的图书馆里找到了第一个线索...");
            }, 1000);
        });
    }

    static async decodeAncientScript(clue) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!clue) {
                    reject("没有线索可以解码!");
                }
                resolve("解码成功!宝藏在一座古老的神庙中...");
            }, 1500);
        });
    }

    static async searchTemple(location) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.5) {
                    reject("糟糕!遇到了神庙守卫!");
                }
                resolve("找到了一个神秘的箱子...");
            }, 2000);
        });
    }

    static async solveTemplePuzzle() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.5) {
                    reject("谜题解答错误!");
                }
                resolve("谜题解答正确!箱子打开了...");
            }, 2000);
        });
    }

    static async openTreasureBox() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("恭喜!你找到了传说中的宝藏!");
            }, 1000);
        });
    }
    static updateGameHistory(result) {
        let gameHistory = localStorage.getItem('gameHistory');
        if (gameHistory) {
            gameHistory = JSON.parse(gameHistory);
        } else {
            gameHistory = [];
        }
        gameHistory.push(result);
        localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
    }
    static updateGameHistory(result) {
        let gameHistory = localStorage.getItem('gameHistory');
        if (gameHistory) {
            gameHistory = JSON.parse(gameHistory);
        } else {
            gameHistory = [];
        }
        gameHistory.push(result);
        localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
    }

    static setPlayerInfo(playerId, nickname) {
        localStorage.setItem('playerId', playerId);
        localStorage.setItem('nickname', nickname);
    }

    static getPlayerInfo() {
        return {
            playerId: localStorage.getItem('playerId'),
            nickname: localStorage.getItem('nickname'),
            gameHistory: JSON.parse(localStorage.getItem('gameHistory') || '[]')
        };
    }
}
function displayPlayerInfo() {
    const playerInfo = TreasureMap.getPlayerInfo();
    const playerElement = document.getElementById('playerInfo');
    playerElement.textContent = `玩家ID: ${playerInfo.playerId}, 昵称: ${playerInfo.nickname}`;
}
function displayGameHistory() {
    const gameHistory = TreasureMap.getPlayerInfo().gameHistory;
    const historyElement = document.getElementById('gameHistory');
    historyElement.innerHTML = gameHistory.map((item, index) => {
        return `<div>第${index + 1}次游戏：${item}</div>`;
    }).join('');
}

async function findTreasureWithAnimation() {
    const steps = document.querySelectorAll('.step');
    const errorDiv = document.getElementById('error');
    try {
        steps[0].classList.add('visible');
        const clue = await TreasureMap.getInitialClue();
        steps[0].textContent = clue;

        steps[1].classList.add('visible');
        const location = await TreasureMap.decodeAncientScript(clue);
        steps[1].textContent = location;

        steps[2].classList.add('visible');
        const box = await TreasureMap.searchTemple(location);
        steps[2].textContent = box;

        steps[3].classList.add('visible');
        const puzzle = await TreasureMap.solveTemplePuzzle();
        steps[3].textContent = puzzle;

        steps[4].classList.add('visible');
        const treasure = await TreasureMap.openTreasureBox();
        steps[4].textContent = treasure;

        steps[5].classList.add('visible');
        TreasureMap.updateGameHistory("找到宝藏");
    } catch (error) {
        errorDiv.textContent = error;
        errorDiv.classList.add('visible');
        TreasureMap.updateGameHistory(error);
    }
    displayGameHistory();
}
function setPlayerNickname() {
    const playerId = 'player1'; // 可以根据实际情况生成或指定玩家ID
    const nickname = document.getElementById('nickname').value; // 假设有一个输入框让用户输入昵称
    TreasureMap.setPlayerInfo(playerId, nickname);
    displayPlayerInfo();
}
document.addEventListener('DOMContentLoaded', function() {
    var audio = document.getElementById('backgroundMusic');
    var playButton = document.getElementById('playButton');
    var pauseButton = document.getElementById('pauseButton');

    playButton.addEventListener('click', function() {
        audio.play();
    });

    pauseButton.addEventListener('click', function() {
        audio.pause();
    });

    findTreasureWithAnimation();
    displayPlayerInfo(); // 显示玩家信息
    displayGameHistory(); // 显示游戏历史
});
