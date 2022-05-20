class Game {
  constructor() {
    this.movimento=false
    this.Reset = createButton("Reset");
  }

  gameover(){
   swal({
     title:"The Rock nao gostou >:( ",
     text:`Fim de jogo${player.qualquercoisa}º`,
     imageUrl: "https://c.tenor.com/IyweQyb3MhIAAAAi/the-rock-sus.gif",
     confirmButtonText:"aceito minha sentença 😪😫😫"
   }) 
  }
 
  vitoria(){
    swal({
      title:"Doguinho está contente beba um guaraná com ele :)",
      text:`Fim de jogo${player.qualquercoisa}º`,
      imageUrl:"https://i.kym-cdn.com/photos/images/original/001/484/432/7fb.jpg",
      confirmButtonText:"vou comprar um guaraná😎🤠"
    })
  }

  colisões(index){
    if(index==1){
   
    
    if(car2.displace(car1)){
      player.positionX-= 10;
    }
  }
    if(index==2){
      if(car1.displace(car2)){
        player.positionX+= 10;
      }
      
    }
  
  }

  botao(){
    this.Reset.position(width/ 2 - 650, height / 2 - 200);
    this.Reset.class("customButton");
    this.Reset.mousePressed(() => {
    database.ref("/").set({
     GameState:0,
     players:{},
     PlayerCount:0,
     Ranking: 0
      
    })
    
    window.location.reload();
    
  });
 }

  getState() {
    var gameStateRef = database.ref("GameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      GameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 2;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 2;

    cars = [car1, car2];
  
    grupo_de_moedas = new Group();


    grupo_de_gasolina = new Group();


    grupo_de_obstaculos = new Group();

    this.obstaculos(grupo_de_obstaculos,4,obstaculo1_img,0.3)
    this.obstaculos(grupo_de_obstaculos,4,obstaculo2_img,0.3)
    this.obstaculos(grupo_de_gasolina,2,gasolina_img,0.25)
    this.obstaculos(grupo_de_moedas,2,moeda_img,0.2)
  }

  coletardoguinho(index){
    cars[index-1].overlap(grupo_de_obstaculos,function(collector,collected){
      collected.remove();
    if (player.life>=0){
      player.life-=1;
    } 
    
    })
    if(player.life<0){
      this.gameover();
      gameState= 2;
    }
  }
 
  coletargasolina(index){
    cars[index-1].overlap(grupo_de_gasolina,function(collector,collected){
      collected.remove();
      player.gás=100;
      
    })
    if(player.gás>0 && this.movimento== true){
      player.gás-=0.3;
    }
    if(player.gás<=0){
      this.gameover()
      gameState= 2;
    }
  }
 
  coletarmoedas(index){
    cars[index-1].overlap(grupo_de_moedas,function(collector,collected){
      collected.remove();
      player.score+=1;
    })
  }
  
  obstaculos(grupo,quantidade,img,scale){
    for(var i = 0; i < quantidade; i++){
      var x = random(width / 2 + 150, width / 2 - 150)
      var y = random(-height * 5, height - 200)
      var sprite= createSprite(x,y);
      sprite.addImage(img)
      sprite.scale = scale
      grupo.add(sprite)  
    }    
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  mostrarvida(){
    image(life_img,width /2 -30, height - player.positionY- 200,20,20)
    rect(width/2 , height - player.positionY-200,player.life,20)
  }

  mostrargasolina(){
    image(gasolina_img,width /2 -30, height - player.positionY-250,20,20)
    rect(width/2 , height - player.positionY-250,player.gás,20)
  }



  play() {
    this.handleElements();

    this.botao();
    
    Player.getPlayersInfo();

    player.getRanking();

   // if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);
     this.mostrarvida();
     this.mostrargasolina();
      //índice da matriz
      var index = 0;
      for (var plr in allPlayers) {
        //adicione 1 ao índice para cada loop
        index = index + 1;

        //use os dados do banco de dados para exibir os carros nas direções x e y
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;
      
        if (index==player.index){
        camera.position.y=cars[index-1].position.y

        this.colisões(index);
        this.coletardoguinho(index);
        this.coletargasolina(index);
        this.coletarmoedas(index);

        ellipse(x,y,110,110)
        }
      
      }


      this.handlePlayerControls();

      const line = height * 6 - 100
      
      if (player.positionY >= line){
        gameState = 2
        player.qualquercoisa += 1;
        player.updateRanking(player.qualquercoisa)
        player.update();
        this.vitoria();
      }

      drawSprites();
    }
  //}

  handlePlayerControls() {
    //manipulando eventos de teclado
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10;
      player.update();
      this.movimento=true;
    }
  
    if (keyIsDown(DOWN_ARROW)) {
    player.positionY -= 10;
    player.update();
    }
   
    if (keyIsDown(LEFT_ARROW)&&player.positionX>=273) {
      player.positionX -= 10;
      player.update();
  }
  
  if (keyIsDown(RIGHT_ARROW)&&player.positionX<=1093 ) {
    player.positionX += 10;
    player.update();

  }
  }
}





