class validator {

  constructor() {
    this.validations = [
      'data-min-length',
      'data-required',
      'data-max-length',

    ]//fim this validations
    
  }//fim do constructor

  //inicio da valdiacao
  valdiate(form){
    let teste_de_validacao = true

      // limpa todas as validações antigas
      let currentValidations = document.querySelectorAll('form .error-validation');
   
      if(currentValidations.length) {
        this.cleanValidations(currentValidations);
      }
  
      // pegar todos inputs do formualrio
      let inputs = form.getElementsByTagName('input');
      // transformar HTMLCollection em array como rest operator
      let inputsArray = [...inputs];

      // loop nos inputs e validação mediante aos atributos encontrados
      inputsArray.forEach(function(input) {
        
        // fazer validação de acordo com o atributo do input
        for(let i = 0; this.validations.length > i; i++) {
          //pegar atributos do input
          if(input.getAttribute(this.validations[i]) != null) {
  
            // limpa string para saber o método (data-min-length --> minlength)
            let method = this.validations[i].replace("data-", "").replace("-", "");
  
            // valor do input
            let value = input.getAttribute(this.validations[i])
  
            // invoca o método
            if( this[method](input,value) == false)
              return teste_de_validacao = false;//modificacao da variavel para false
  
          }//fim if
        }//fim for
      }, this);
      return teste_de_validacao //variavel de teste de validacao, liberar acesso caso esteja tudo certo
  }//fim validate

  //limpa a caixa de validacoes
  cleanValidations(validations) {
    validations.forEach(el => el.remove()); //limpar a caixa de validacoes 
  }//fim clean validations

  //input a ser inserido a mensagem e a mensagem a ser mostrada
  printMessage(input, msg) {
    
    // checa os erros presentes no input
    let errorsQty = input.parentNode.querySelector('.error-validation');

    // imprimir erro só se não tiver erros
    if(errorsQty === null) {
      //pega o elemento no html error-validation e clona a mensagem dele, agr é um elemento a parte
      let template = document.querySelector('.error-validation').cloneNode(true);

      template.textContent = msg; //template alterado para a mensagem de erro que vio
  
      let inputParent = input.parentNode;//coloca o input no half/full box
  
      template.classList.remove('template');//apaga a classe template pra poder aparecer na tela  
  
      inputParent.appendChild(template);//coloca a mensagem no half ou full box
    }//end if

  }//end print messsage

  minlength(input, minValue) {
    let teste_de_validacao = true //variavel de teste de validacao, liberar acesso caso esteja tudo certo

    let inputLength = input.value.length;

    let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

    if(inputLength < minValue) {
      this.printMessage(input, errorMessage);
      return false //teste de validacao
    }
    return teste_de_validacao //variavel de teste de validacao, liberar acesso caso esteja tudo certo
  }

  maxlength(input, maxValue) {
    let teste_de_validacao = true //variavel de teste de validacao, liberar acesso caso esteja tudo certo

    let inputLength = input.value.length;

    let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;

    if(inputLength > maxValue) {
      this.printMessage(input, errorMessage);
      return  false
    } 
    return teste_de_validacao //variavel de teste de validacao, liberar acesso caso esteja tudo certo
  }

  required(input) {
    let teste_de_validacao = true //variavel de teste de validacao, liberar acesso caso esteja tudo certo

    let inputValue = input.value;

    if(inputValue === '') {
      let errorMessage = `Este campo é obrigatório`;

      this.printMessage(input, errorMessage);
      return false
    }
    return teste_de_validacao //variavel de teste de validacao, liberar acesso caso esteja tudo certo

  }
}//fim da classe

//funcao sqlite
//funcao para sqlite
//declaracao do banco
/*
let db = openDatabase('Agenda', '1.0', 'Agenda de contatos :)', 2* 1024 * 1024);

db.transaction(function(tx){
  tx.executeSql('CREATE TABLE Agenda ( id INTEGER PRIMARY KEY, nome TEXT, celular INTEGER, telefone INTEGER, cep INTEGER, endereco TEXT, cep2 INTEGER, endereco2 TEEXT');
});

function salvar(){
  let nome = document.getElementById('nome')
  let celular = document.getElementById('celular')
  let telefone = document.getElementById('telefone')
  let cep = document.getElementById('cep')
  let cep2 = document.getElementById('cep2')
  let endereco = document.getElementById('endereco')
  let endereco2 = document.getElementById('endereco2')

  db.transaction(function(tx){
    tx.executeSql('INSERT INTO Agenda (nome, celular, telefone, cep, endereco, cep2, endereco2) VALUES(?,?,?,?,?,?,?)'[nome, celular, telefone, cep, cep2, endereco, endereco2]);
  });
}
*/
/************************************************************************ */
let form = document.getElementById('formulario-de-registro')
let submit = document.getElementById('botao')

let validacao = new validator()

submit.addEventListener('click', function(a) {
  a.preventDefault(); //nao recarregar a pagina
  if(validacao.valdiate(form) == true){
    //salvar()
    window.location.href = 'google.com'
  }
})

