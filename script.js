let nav = document.querySelector("#link")
let botao = document.querySelector("#btn-link")
let inputTexto = document.querySelector("#texto-link")
let inputUrl = document.querySelector("#url-link")

let links = [ ]
let idContador = 0


function criarElementoDoLink(texto, url) {
    let a = document.createElement('a')
    a.textContent = texto
    a.href = url

    let btn = document.createElement('button')
    btn.textContent = "X"
    btn.dataset.id = String(idContador)
    idContador++
    localStorage.setItem("id-contador", idContador)

    let span = document.createElement('span')
    span.append(a, btn)

    btn.addEventListener("click", function () {
        nav.removeChild(span)
        links = links.filter(function (item) {
            return item.id != Number(btn.dataset.id) 
        })
        localStorage.setItem('links', JSON.stringify(links))
    })

    return span
}

function obterDadosDoLink() {
    return {
        texto: inputTexto.value,
        url: inputUrl.value
    }
}

function anexarLinkNaLista(elemento) {
    nav.appendChild(elemento)
}

function limparCampos() {
    inputTexto.value = ""
    inputUrl.value = ""
}

function aplicarFocusInicial() {
    inputTexto.focus()
}

function salvarLinks(links) {
    localStorage.setItem('links', JSON.stringify(links))
}

function carregarLinksDaMemoria() {
    let storage = localStorage.getItem('links')
    if (storage) {
        let objLinks =  JSON.parse(storage)
        links = objLinks
        for (let link of objLinks) {
            let el = criarElementoDoLink(link.texto, link.url)
            anexarLinkNaLista(el)
            limparCampos()
            aplicarFocusInicial()
        }
    }
}

function carregarIdDaMemoria() {
    let storage = localStorage.getItem("id-contador")
    if (storage) {
        idContador = Number(storage)
    }
}


botao.addEventListener("click", function () {
    let dadosDoLink = obterDadosDoLink()
    dadosDoLink.id = idContador
    let el = criarElementoDoLink(dadosDoLink.texto, dadosDoLink.url)
    links.push(dadosDoLink)
    anexarLinkNaLista(el)
    salvarLinks(links)
    limparCampos()
    aplicarFocusInicial()
})

document.addEventListener("DOMContentLoaded", function() {
    carregarLinksDaMemoria()
});