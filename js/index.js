const criarCards = () => {

    let ul = document.querySelector('#listaProdutos')
    

    for(let i=0; i<data.length; i++){

        ul.innerHTML += `<li class="cardProduto">
        <img class="imgProduto" src=${data[i].img} alt="${data[i].nameItem}">
        <div class="conteudoProduto">
            <span class="tag">${data[i].tag}</span>
            
            <p class="productName">${data[i].nameItem}</p>
            
            <p class="descricao">${data[i].description}</p>
            
            <span class="price">${data[i].value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
            
            <button id="pr_${data[i].id} " class="productButton">${data[i].addCart}</button>
        </div>
        </li>`;

    }



}

criarCards()



let botoes = document.querySelectorAll('.productButton')
let qCount = 0
let valorTotal = 0

for (let i=0 ; i<botoes.length ; i++ ) {

    let botao = botoes[i];

    botao.addEventListener('click', function(e){

        let idProduto = e.target.id;
        let id = parseInt(idProduto.substring(3))

        if(document.querySelector('#r_'+id) == null){

            let produto = procuraProduto(id)
            console.log(produto)
            

            let card = criarCardCarrinho(produto)
            
            let lista = document.querySelector('#conteudoCarrinho')
            lista.appendChild(card);

            qCount++

            valorTotal += produto.value
            
            let quantidade = document.querySelector('#totalDeQuantidade')
            quantidade.innerHTML = qCount

            let resultadoTotal = document.querySelector('#resultadoTotal')
            resultadoTotal.innerHTML = valorTotal




        }else {
            alert('Produto já está no carrinho')
        }

    })


}

function procuraProduto(id) {

    

    for(let i=0; i<data.length; i++){
        let produto = data[i]
        if(id == produto.id ){
            return produto
        }
    }

    return 'Erro'

}

function criarCardCarrinho(produto) {

    let li = document.createElement('li');
    let img = document.createElement('img');
    let div = document.createElement('div');
    div.setAttribute('class','informacoesProdutoNoCarrinho')
    let p = document.createElement('p');
    p.setAttribute('class','nomeDoProdutoNoCarrinho')
    let price = document.createElement('span');
    price.classList.add('priceNoCarrinho')
    let button = document.createElement('button');

    li.setAttribute('class','itemJaNoCarrinho')
    li.id = 'r_'+produto.id

    img.src = produto.img;
    p.innerHTML = produto.nameItem;
    price.innerHTML = produto.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    button.innerHTML = 'Remover';
    button.id = 're_'+produto.id;
    button.setAttribute('class','buttonNoCarrinho');

    button.addEventListener('click',function(e){
        let li=document.querySelector('#r_'+produto.id);
        li.remove()

        qCount--

        valorTotal -= produto.value

        let quantidade = document.querySelector('#totalDeQuantidade')
        quantidade.innerHTML = qCount

        let resultadoTotal = document.querySelector('#resultadoTotal')
            resultadoTotal.innerHTML = valorTotal



    });

    div.appendChild(p)
    div.appendChild(price)
    div.appendChild(button)

    li.appendChild(img)
    li.appendChild(div)

    return li

    
}


