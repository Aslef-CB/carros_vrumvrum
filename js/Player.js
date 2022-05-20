class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    this.gás = 100;
    this.score = 0;
    this.life = 3;
    this.qualquercoisa = 0; //ranking
  }
 
  addPlayer() {
    var playerIndex = "players/player" + this.index;

    if (this.index === 1) {
      this.positionX = width / 2 - 100;
    } else {
      this.positionX = width / 2 + 100;
    }

    database.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
      score:this.score,
      Ranking:this.qualquercoisa
    });
  }

  getCount() {
    var playerCountRef = database.ref("PlayerCount");
    playerCountRef.on("value", data => {
      playerCount = data.val();
    });
  }

  updateCount(count) {
    database.ref("/").update({
      PlayerCount: count
    });
  }

  getRanking() {
    var playerCountRef = database.ref("Ranking");
    playerCountRef.on("value", data => {
      this.qualquercoisa = data.val();
    });
  }

  updateRanking(count) {
    database.ref("/").update({
     Ranking: count
    });
  }

  update() {
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).update({
      positionX: this.positionX,
      positionY: this.positionY,
      score:this.score,
      Ranking:this.qualquercoisa
    });
  }

  static getPlayersInfo() {
    var playerInfoRef = database.ref("players");
    playerInfoRef.on("value", data => {
      allPlayers = data.val();
    });
  }
}
