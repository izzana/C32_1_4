//criar classe
class Tower {
  constructor(x, y, width, height) {
    var options = {
      isStatic: true//torando o corpo estático
    }
    //adicionar a imagem da torre
    this.image = loadImage("assets/tower.png")
    this.width = width;//cada propriedade da classe irá receber um parâmetro passado quando o objeto for criado
    this.height = height;
    this.body = Bodies.rectangle(x, y, this.width, this.height, options);//criando o corpo para o protótipo
    //adicionar corpo/body ao mundo
    World.add(world, this.body);
  }

  //criar function para mostrar a torre
  display(){
    var pos = this.body.position;//para a posição
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);//passando posição x e y
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, 0, this.width, this.height)
    pop();
  }
}