"use strict"

let btnClicado = ''
let btns = ['+/-', 'delConta', 'delTudo', 'delUm', '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '+', '.', '0', '=', '-']
let mostradorContaAtual = document.querySelector('.contaAtual>h1')
let mostradorResultadoConta = document.querySelector('.resultadoConta>h1')
let númerosClicados = []
let númerosClicadosUnidos = ''
let históricoConta = []
let históricoContaFormatado = ''

function ativaçãoDoIgual() {
    if (númerosClicados != '' && históricoConta.length == 2) {
        if (númerosClicados[0] != '-') {
            históricoConta.push(Number(númerosClicadosUnidos))
            mostrarHistóricoContaFormatado()
            deletarListaDeNúmerosClicados()
        } else if (númerosClicados[1] != '') {
            históricoConta.push(Number(númerosClicadosUnidos))
            mostrarHistóricoContaFormatado()
            deletarListaDeNúmerosClicados()
        }
    }
    calcular()
}

function calcular() {
    let resuladoConta = 0

    switch (históricoConta[1]) {
        case 'x'://multiplicação
            resuladoConta = históricoConta[0] * históricoConta[2]
            break
        case '÷'://divisão
            resuladoConta = históricoConta[0] / históricoConta[2]
            break
        case '+'://adição
            resuladoConta = históricoConta[0] + históricoConta[2]
            break
        case '-'://subtração
            resuladoConta = históricoConta[0] - históricoConta[2]
            break
    }

    númerosClicadosUnidos = String(resuladoConta)
    mostradorContaAtual.innerText = númerosClicadosUnidos.replace('.', ',')
}

function mostrarHistóricoContaFormatado() {
    históricoContaFormatado = ''
    for (let count=0; count < históricoConta.length; count++) {
        if (count == 1 || count == 2) {
            históricoContaFormatado += ' ' + históricoConta[count]
        } else {
            históricoContaFormatado = históricoConta[count]
        }

    }
    mostradorResultadoConta.innerText = históricoContaFormatado
}

function subirParaOHistórico(operaçãoClicada) {
    if (númerosClicados != '' && históricoConta == '') {
        históricoConta.push(Number(númerosClicadosUnidos))
        históricoConta.push(operaçãoClicada)
        mostrarHistóricoContaFormatado()
        deletarListaDeNúmerosClicados()
    } else if (históricoConta.length == 2 && históricoConta[1] != operaçãoClicada && númerosClicados == '') {
        históricoConta.pop()
        históricoConta.push(operaçãoClicada)
        mostrarHistóricoContaFormatado()
    } else if (históricoConta.length == 2 && númerosClicados != '') {
        console.log('chegou aqui 1') 
        históricoConta.push(Number(númerosClicadosUnidos))
        calcular()
        históricoConta[0] = Number(númerosClicadosUnidos)
        históricoConta[1] = operaçãoClicada
        históricoConta.splice(2, 1)
        mostrarHistóricoContaFormatado()
        deletarListaDeNúmerosClicados()
    } else if (históricoConta.length == 3 && númerosClicadosUnidos != '') {
        deletarListaDoHistóricoConta()
        históricoConta.push(Number(númerosClicadosUnidos))
        históricoConta.push(operaçãoClicada)
        mostrarHistóricoContaFormatado()
        deletarListaDeNúmerosClicados()
    }
}

function uniãoListaNúmerosClicados() {
    númerosClicadosUnidos = ''
    for (let count = 0; count < númerosClicados.length; count++) {
        númerosClicadosUnidos += númerosClicados[count]
    }

    if (númerosClicados[0] == '-'  && númerosClicados.length == 1) {
        mostradorContaAtual.innerText = `${númerosClicados}0`
    } else  if (númerosClicados == '') {
        mostradorContaAtual.innerText = 0
    } else {
        mostradorContaAtual.innerText = númerosClicadosUnidos.replace('.', ',')
    }
}

function mudançaDePositivoOuNegativoNúmeroClicado() {
    if (númerosClicados.indexOf('-') == -1) {
        númerosClicados.splice(0, 0, '-')
    } else if (númerosClicados.indexOf('-') == 0) {
        númerosClicados.splice(0, 1)
    }
    uniãoListaNúmerosClicados()
}

function deletarListaDoHistóricoConta() {
    históricoConta = []
    históricoContaFormatado = ''
    mostradorResultadoConta.innerText = 'sem resultado ainda!'
}

function deletarListaDeNúmerosClicados() {
    númerosClicados = []
    númerosClicadosUnidos = ''
    mostradorContaAtual.innerText = 0
}

function númeroAcionado(num) {
    númerosClicados.push(num)
    uniãoListaNúmerosClicados()
}

function deletarúltimoNúmeroAdicionado() {
    if (númerosClicados.length > 1) {
        númerosClicados.pop()
    } else if (númerosClicados[0] != '-') {
        númerosClicados.pop()
    }
    uniãoListaNúmerosClicados()

    if (númerosClicados == '') {
        mostradorContaAtual.innerText = 0
    }
}

function verificarEAdiconarAVírgula() {
    if (númerosClicados.indexOf('.') == -1) {
        númerosClicados.push('.')
    }
    uniãoListaNúmerosClicados()
}

function analisador() {
    switch (btnClicado) {
        case btns[0]://+/-
            mudançaDePositivoOuNegativoNúmeroClicado()
            break
        case btns[1]://delConta
            deletarListaDeNúmerosClicados()
            break
        case btns[2]://delTudo
            deletarListaDeNúmerosClicados()
            deletarListaDoHistóricoConta()
            break
        case btns[3]://delUm
            deletarúltimoNúmeroAdicionado()
            break
        case btns[4]://7
            númeroAcionado("7")
            break
        case btns[5]://8
            númeroAcionado("8")
            break
        case btns[6]://9
            númeroAcionado("9")
            break
        case btns[7]:// /
            subirParaOHistórico('÷')
            break
        case btns[8]://4
            númeroAcionado("4")
            break
        case btns[9]://5
            númeroAcionado("5")
            break
        case btns[10]://6
            númeroAcionado("6")
            break
        case btns[11]:// *
            subirParaOHistórico('x')
            break
        case btns[12]://1
            númeroAcionado("1")
            break
        case btns[13]://2
            númeroAcionado("2")
            break
        case btns[14]://3
            númeroAcionado("3")
            break
        case btns[15]:// +
            subirParaOHistórico('+')
            break
        case btns[16]:// .
            verificarEAdiconarAVírgula()
            break
        case btns[17]://0
            númeroAcionado("0")
            break
        case btns[18]:// =
            ativaçãoDoIgual()
            break
        case btns[19]:// -
            subirParaOHistórico('-') 
            break
    }
}

function botãoClicado(btn) {
    btnClicado = btn
    analisador()
}