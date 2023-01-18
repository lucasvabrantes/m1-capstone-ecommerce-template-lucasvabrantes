const criarCards = (data) => {
  let ul = document.querySelector("#listaProdutos");

  for (let i = 0; i < data.length; i++) {
    ul.innerHTML += `<li class="cardProduto">
        <img class="imgProduto" src=${data[i].img} alt="${data[i].nameItem}">
        <div class="conteudoProduto">
            <span class="tag">${data[i].tag}</span>
            
            <p class="productName">${data[i].nameItem}</p>
            
            <p class="descricao">${data[i].description}</p>
            
            <span class="price">${data[i].value.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}</span>
            
            <button id="pr_${data[i].id} " class="productButton">${data[i].addCart}</button>
        </div>
        </li>`;
  }
};

criarCards(dataAll);


let divRodape = document.querySelector(".rodapeCarrinho");

let qCount = 0;
let valorTotal = 0;

function FuncaoBotoes () {

let botoes = document.querySelectorAll(".productButton");
for (let i = 0; i < botoes.length; i++) {
  let botao = botoes[i];

  botao.addEventListener("click", function (e) {
    let idProduto = e.target.id;
    let id = parseInt(idProduto.substring(3));

    if (document.querySelector("#r_" + id) == null) {
      let produto = procuraProduto(id);

      let card = criarCardCarrinho(produto);

      let lista = document.querySelector("#conteudoCarrinho");
      lista.appendChild(card);

      qCount++;

      valorTotal += produto.value;

      let quantidade = document.querySelector("#totalDeQuantidade");
      quantidade.innerHTML = qCount;

      let valorTotalatualizado = valorTotal.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });

      let resultadoTotal = document.querySelector("#resultadoTotal");
      resultadoTotal.innerHTML = valorTotalatualizado;

      let mensagemCarrinho = document.querySelector(".hide");
      let divRodape = document.querySelector(".rodapeCarrinho");

      if (qCount == 0) {
        divRodape.style = "display:none";
        mensagemCarrinho.style = "display:flex";
      } else {
        divRodape.style = "display:flex";
        mensagemCarrinho.style = "display:none";
      }
    } else {
        let produto = procuraProduto(id);

        let card = criarCardCarrinho(produto);
  
        let lista = document.querySelector("#conteudoCarrinho");
        lista.appendChild(card);
  
        qCount++;
  
        valorTotal += produto.value;
  
        let quantidade = document.querySelector("#totalDeQuantidade");
        quantidade.innerHTML = qCount;
  
        let valorTotalatualizado = valorTotal.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        });
  
        let resultadoTotal = document.querySelector("#resultadoTotal");
        resultadoTotal.innerHTML = valorTotalatualizado;
  
        let mensagemCarrinho = document.querySelector(".hide");
        let divRodape = document.querySelector(".rodapeCarrinho");
  
        if (qCount == 0) {
          divRodape.style = "display:none";
          mensagemCarrinho.style = "display:flex";
        } else {
          divRodape.style = "display:flex";
          mensagemCarrinho.style = "display:none";
        }
    }
  });
}
}

FuncaoBotoes()





function procuraProduto(id) {
  for (let i = 0; i < dataAll.length; i++) {
    let produto = dataAll[i];
    if (id == produto.id) {
      return produto;
    }
  }

  return "Erro";
}

function criarCardCarrinho(produto) {
  let li = document.createElement("li");
  let img = document.createElement("img");
  let div = document.createElement("div");
  div.setAttribute("class", "informacoesProdutoNoCarrinho");
  let p = document.createElement("p");
  p.setAttribute("class", "nomeDoProdutoNoCarrinho");
  let price = document.createElement("span");
  price.classList.add("priceNoCarrinho");
  let button = document.createElement("button");

  li.setAttribute("class", "itemJaNoCarrinho");
  li.id = "r_" + produto.id;

  img.src = produto.img;
  p.innerHTML = produto.nameItem;
  price.innerHTML = produto.value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  button.innerHTML = "Remover";
  button.id = "re_" + produto.id;
  button.setAttribute("class", "buttonNoCarrinho");

  button.addEventListener("click", function (e) {
    let li = document.querySelector("#r_" + produto.id);
    li.remove();

    qCount--;

    valorTotal -= produto.value;

    let valorTotalatualizado = valorTotal.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });

    let quantidade = document.querySelector("#totalDeQuantidade");
    quantidade.innerHTML = qCount;

    let resultadoTotal = document.querySelector("#resultadoTotal");
    resultadoTotal.innerHTML = valorTotalatualizado;

    let mensagemCarrinho = document.querySelector(".hide");
    let divRodape = document.querySelector(".rodapeCarrinho");

    if (qCount == 0) {
      divRodape.style = "display:none";
      mensagemCarrinho.style = "display:flex";
    } else {
      divRodape.style = "display:flex";
      mensagemCarrinho.style = "display:none";
    }
  });

  div.appendChild(p);
  div.appendChild(price);
  div.appendChild(button);

  li.appendChild(img);
  li.appendChild(div);

  return li;
}




function resolveProblema() {

    let divRodape = document.querySelector('.rodapeCarrinho')
    let mensagemCarrinho = document.querySelector('.hide')
    if(qCount==0){
        divRodape.style = 'display:none;'
        mensagemCarrinho.style = 'display:flex;'
    }
}

resolveProblema()

    
function FiltroNavBar() {
    
    
    let listaDeProdutos = document.querySelector('#listaProdutos')
    let navTodos = document.getElementById('todos')
    let navFitaK7 = document.getElementById('fitak7')
    let navDiscos = document.getElementById('discos')
    let navCamisetas = document.getElementById('camisetas')

    

    navTodos.addEventListener('click', function(e){

        listaDeProdutos.innerHTML = ''
        
        criarCards(dataAll)

        FuncaoBotoes()
        
    })

    navFitaK7.addEventListener('click', function(e){


        listaDeProdutos.innerHTML = ''

        

            for (let i = 0; i < dataAll.length; i++) {

                if(dataAll[i].tag == 'FitaK7'){

                    listaDeProdutos.innerHTML += `<li class="cardProduto">
                        <img class="imgProduto" src=${dataAll[i].img} alt="${dataAll[i].nameItem}">
                        <div class="conteudoProduto">
                            <span class="tag">${dataAll[i].tag}</span>
                            
                            <p class="productName">${dataAll[i].nameItem}</p>
                            
                            <p class="descricao">${dataAll[i].description}</p>
                            
                            <span class="price">${dataAll[i].value.toLocaleString("pt-br", {
                            style: "currency",
                            currency: "BRL",
                            })}</span>
                            
                            <button id="pr_${dataAll[i].id} " class="productButton">${dataAll[i].addCart}</button>
                        </div>
                        </li>`;
                }
                    
            }   

    
        FuncaoBotoes()   
    })

    navDiscos.addEventListener('click', function(e){
        
        listaDeProdutos.innerHTML = ''

        

            for (let i = 0; i < dataAll.length; i++) {

                if(dataAll[i].tag == 'Discos'){

                    listaDeProdutos.innerHTML += `<li class="cardProduto">
                        <img class="imgProduto" src=${dataAll[i].img} alt="${dataAll[i].nameItem}">
                        <div class="conteudoProduto">
                            <span class="tag">${dataAll[i].tag}</span>
                            
                            <p class="productName">${dataAll[i].nameItem}</p>
                            
                            <p class="descricao">${dataAll[i].description}</p>
                            
                            <span class="price">${dataAll[i].value.toLocaleString("pt-br", {
                            style: "currency",
                            currency: "BRL",
                            })}</span>
                            
                            <button id="pr_${dataAll[i].id} " class="productButton">${dataAll[i].addCart}</button>
                        </div>
                        </li>`;
                }
                    
            }

            FuncaoBotoes()  

    })

    navCamisetas.addEventListener('click', function(e){
        listaDeProdutos.innerHTML = ''

        

            for (let i = 0; i < dataAll.length; i++) {

                if(dataAll[i].tag == 'Camisetas'){

                    listaDeProdutos.innerHTML += `<li class="cardProduto">
                        <img class="imgProduto" src=${dataAll[i].img} alt="${dataAll[i].nameItem}">
                        <div class="conteudoProduto">
                            <span class="tag">${dataAll[i].tag}</span>
                            
                            <p class="productName">${dataAll[i].nameItem}</p>
                            
                            <p class="descricao">${dataAll[i].description}</p>
                            
                            <span class="price">${dataAll[i].value.toLocaleString("pt-br", {
                            style: "currency",
                            currency: "BRL",
                            })}</span>
                            
                            <button id="pr_${dataAll[i].id} " class="productButton">${dataAll[i].addCart}</button>
                        </div>
                        </li>`;
                }
                    
            }

            FuncaoBotoes()  

    })



    

}

FiltroNavBar()

function pesquisaItens() {

    

    let textoTag = document.querySelectorAll('tag')

    let textoP = document.querySelectorAll('.productName')

    let inputBusca = document.querySelector('#inputBusca')

    

    
    inputBusca.addEventListener('keyup', function(e){

        let cardProduto = document.querySelectorAll('.cardProduto')

        let inputValue = inputBusca.value

        let conteudoAComparar = document.getElementsByClassName('tag')

        let outroConteudoAComparar = document.getElementsByClassName('productName')


        for(let i = 0; i<dataAll.length ; i++){
            
            if(conteudoAComparar[i].innerHTML.toLowerCase().includes(inputValue.toLowerCase()) || outroConteudoAComparar[i].innerHTML.toLowerCase().includes(inputValue.toLowerCase()) ){

                cardProduto[i].style = 'display:'
    
                
            }else{
                cardProduto[i].style = 'display:none'
            }

        }

        


    })

    
}

pesquisaItens()











