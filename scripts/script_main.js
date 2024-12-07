"use strict"

let mostradorContaAtual = document.querySelector("section.contaAtual>h1")
let mostradorResultadoConta = document.querySelector("section.resultadoConta>h1")
let númerosDigitadosNoMonento = []

function limparCalculadora(num) {
    switch (num) {
        case 0:
            númerosDigitadosNoMonento = []
            break
        case 1:
            númerosDigitadosNoMonento = []
            break
    }

    verificandoListaDeNúmerosDigitados()
}

function númeroClicado(num) {
    let númeroAtualClicado = Number(num)
    if (númerosDigitadosNoMonento == '') {
        númerosDigitadosNoMonento[0] = númeroAtualClicado
    } else {
        númerosDigitadosNoMonento.push(númeroAtualClicado)
    }

    verificandoListaDeNúmerosDigitados()
}

function verificandoListaDeNúmerosDigitados() {
    if (númerosDigitadosNoMonento == '') {
        mostradorContaAtual.innerText = 0
    } else {
        mostradorContaAtual.innerText = formatandoNúmerosDaLista()
    }
}

function formatandoNúmerosDaLista() {
    let resultadoFormataçãoDosNúmeros = ''
    for (let count = 0; count < númerosDigitadosNoMonento.length; count++) {
        resultadoFormataçãoDosNúmeros += `${númerosDigitadosNoMonento[count]}`
    }
    return resultadoFormataçãoDosNúmeros
}

verificandoListaDeNúmerosDigitados()