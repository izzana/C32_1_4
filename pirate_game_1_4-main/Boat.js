class Boat {
  constructor(x, y, width, height, boatPos, boatAnimation) {
    var options = {//alterar valores
      restitution: 0.8,
      friction: 1.0,
      density: 1.0,
    };

    //variável para a animação
    this.animation = boatAnimation;
    //adicionar velocidade
    this.speed = 0.05;
    this.width = width;
    this.height = height;
    this.body = Bodies.rectangle(x, y, width, height, options);
    //criar variável para obter as posições aleatórias do navio à partir do código
    this.boatPosition = boatPos  
    //carregar imagem nos navios
    this.image = loadImage("assets/boat.png");
    World.add(world, this.body);
  }

  animate() {
    this.speed += 0.05 % 1.1;
  }


  display() {
    var angle = this.body.angle;
    var pos = this.body.position;//obtendo posição do corpo
    var index = floor(this.speed % this.animation.length);//variável chamada para percorrer o conjunto de animações
    
    //salvar as novas configurações
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    // definir o imageMode como centro
    imageMode(CENTER)
    //mostrar a imagem
    image(this.animation[index], 0, this.boatPosition, this.width, this.height);
    //adicionar função pronta q remove o valor de preenchimento atual para exibir imagens
    noTint()
    //redefinir os estilos de desenho
    pop();
  }

}

  