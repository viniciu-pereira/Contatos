//incio da classe
class validator {

    constructor() {

        this.validations = [
            'data-nome-validate',
            'data-min-length',
            'data-max-length',
            'data-required',


        ]//fim array constructor

    }//fim constructor

    //incio da validacao dos campos
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
        // transformar HTMLCollection em array
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
              if( this[method](input,value) == false) //modificado para teste de validacao
                teste_de_validacao = false;//modificacao da variavel para false
            }
          }
    
        }, this);//fim do loop nos arrays
        return teste_de_validacao //variavel de teste de validacao, liberar acesso caso esteja tudo certo

    }//fim validate

      //Método para validação do minimo de caracteres
      // método para validar se tem um mínimo de caracteres
    minlength(input, minValue) {
        let teste_de_validacao = true //variavel de teste de validacao, liberar acesso caso esteja tudo certo
  
        let inputLength = input.value.length; //tamanho do que esta escrito no input
    
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


//inicio do recebimento e chamada da classe
let form = document.getElementById('formulario-de-registro')
let submit = document.getElementById('botao')

let validar = new validator()

//evento de envio do form, que valida os inputs
submit.addEventListener('click', function(a) {
    a.preventDefault(); //nao recarregar a pagina

    if((validar.validate(form)) == true) {
    console.log('deu bom')
    }
})