  class Validator {

    constructor() {
      this.validations = [
        'data-min-length',
        'data-max-length',
        'data-only-letters',
        'data-email-validate',
        'data-required',
        'data-equal',
        'data-password-validate',
      ]
    }
    
    // inicia a validação de todos os campos
    validate(form) {
      let teste_de_validacao = true //variavel de teste de validacao, liberar acesso caso esteja tudo certo
  
      // limpa todas as validações antigas
      let currentValidations = document.querySelectorAll('form .error-validation');
   
      if(currentValidations.length) {
        this.cleanValidations(currentValidations);
      }
  
      // pegar todos inputs
      let inputs = form.getElementsByTagName('input');
      // transformar HTMLCollection em arr
      let inputsArray = [...inputs];
  
      // loop nos inputs e validação mediante aos atributos encontrados
      inputsArray.forEach(function(input, obj) {
        

        // fazer validação de acordo com o atributo do input
        for(let i = 0; this.validations.length > i; i++) {
          if(input.getAttribute(this.validations[i]) != null) {
  
            // limpa string para saber o método
            let method = this.validations[i].replace("data-", "").replace("-", "");
  
            // valor do input
            let value = input.getAttribute(this.validations[i])
  
            // invoca o método
            if( this[method](input,value) == false)
              teste_de_validacao = false;//modificacao da variavel para false
  
          }
        }
  
      }, this);
      return teste_de_validacao //variavel de teste de validacao, liberar acesso caso esteja tudo certo
    }//fim validate
  
    // método para validar se tem um mínimo de caracteres
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
  
    // método para validar se passou do máximo de caracteres
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
  
    // método para validar strings que só contem letras
    onlyletters(input) {
      let teste_de_validacao = true //variavel de teste de validacao, liberar acesso caso esteja tudo certo

      let re = /^[A-Za-z]+$/;;
  
      let inputValue = input.value;
  
      let errorMessage = `Este campo não aceita números nem caracteres especiais`;
  
      if(!re.test(inputValue)) {
        this.printMessage(input, errorMessage);
        return false
      }
      return teste_de_validacao //variavel de teste de validacao, liberar acesso caso esteja tudo certo
    }
  
    // método para validar e-mail
    emailvalidate(input) {
      let teste_de_validacao = true //variavel de teste de validacao, liberar acesso caso esteja tudo certo

      let re = /\S+@\S+\.\S+/;
  
      let email = input.value;
  
      let errorMessage = `Insira um e-mail no padrão x@email.com`;
  
      if(!re.test(email)) {
        this.printMessage(input, errorMessage);
        return false
      }
      return teste_de_validacao //variavel de teste de validacao, liberar acesso caso esteja tudo certo
    }
  
    // verificar se um campo está igual o outro
    equal(input, inputName) {
      let teste_de_validacao = true //variavel de teste de validacao, liberar acesso caso esteja tudo certo
  
      let inputToCompare = document.getElementsByName(inputName)[0];
  
      let errorMessage = `Este campo precisa estar igual ao ${inputName}`;
  
      if(input.value != inputToCompare.value) {
        this.printMessage(input, errorMessage);
        return false
      }
      return teste_de_validacao //variavel de teste de validacao, liberar acesso caso esteja tudo certo
    }
    
    // método para exibir inputs que são necessários
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
  
    // validando o campo de senha
    passwordvalidate(input) {
      let teste_de_validacao = true //variavel de teste de validacao, liberar acesso caso esteja tudo certo
   
      // explodir string em array
      let charArr = input.value.split("");
  
      let uppercases = 0;
      let numbers = 0;
  
      for(let i = 0; charArr.length > i; i++) {
        if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
          uppercases++;
        } else if(! isNaN(parseInt(charArr[i]))) {
          numbers++;
        }//end else if
      }//end for
  
      if(uppercases === 0 || numbers === 0) {
        let errorMessage = `A senha precisa um caractere maiúsculo e um número`;
  
        this.printMessage(input, errorMessage);
        return false
      }//end if
      return teste_de_validacao //variavel de teste de validacao, liberar acesso caso esteja tudo certo
    }//fim password validate
  

    // método /funcao para imprimir mensagens de erro
    printMessage(input, msg) {
    
      // checa os erros presentes no input
      let errorsQty = input.parentNode.querySelector('.error-validation');
  
      // imprimir erro só se não tiver erros
      if(errorsQty === null) {
        let template = document.querySelector('.error-validation').cloneNode(true);
  
        template.textContent = msg;
    
        let inputParent = input.parentNode;
    
        template.classList.remove('template');
    
        inputParent.appendChild(template);
      }//end if
  
    }//end print messsage
  
    // remove todas as validações para fazer a checagem novamente
    cleanValidations(validations) {
      validations.forEach(el => el.remove()); //limpar a caixa de validacoes 
    }//fim clean validations
  
  }//fim da classe
  
  let form = document.getElementById('register-form');
  let submit = document.getElementById('btn-submit');
  
  let validator = new Validator(); //evoca a classe em uam variavel
  
  function redirecionamento(){
    window.location.href = 'index2.html'
  }

  // evento de envio do form, que valida os inputs
  submit.addEventListener('click', function(a) {
    a.preventDefault(); //nao recarregar a pagina
    
    if((validator.validate(form)) == true) {
      redirecionamento()
    }
  });

  
  