"use strict"

let grupoBtns = [...document.querySelectorAll('.botõesCalculadora div')]
let mostradorCalculadora =  document.querySelector('.mostradorCalculadora')
const operadores = ["+", "-", "x", "÷"]
const numeros = ["0","1","2","3","4","5","6","7","8","9",',','','+/-']
let númerosInformados = []
let númerosInformadosFloat = ''
let históricoOperação = []
const operações = [
    (v1, v2)=>{
        return v1 + v2
    },
    (v1, v2)=>{
        return v1 - v2
    },
    (v1, v2)=>{
        return v1 * v2
    },
    (v1, v2)=>{
        return v1 / v2
    }
]

const mostrarNúmerosInformados = (array)=>{
    if (array.length > 0) {
        array.map((e, p)=>{
            if (p > 0) {
                mostradorCalculadora.children[1].innerText += e
            } else {
                mostradorCalculadora.children[1].innerText = e
            }
        })
    } else {
        mostradorCalculadora.children[1].innerText = 0
    }
}

const tranformaçãoStringEmFloat = ()=>{
    if (númerosInformados.length > 0) {
        let junçãoString = ''
        númerosInformados.map((e)=>{
            if (e == ',') {
                e = '.'
            }
            junçãoString += e
        })
        númerosInformadosFloat = Number(junçãoString)
        númerosInformados = []
        mostrarNúmerosInformados(númerosInformados)
    }
}

const mostrarHistóricoOperação = (array)=>{
    if (array.length > 0) {
        array.map((e, p)=>{
            if (p > 0) {
                mostradorCalculadora.children[0].innerText += ` ${e}`
            } else {
                mostradorCalculadora.children[0].innerText = e
            }
        })
    } else {
        mostradorCalculadora.children[0].innerText = 'sem resultado ainda!'
    }
}

const organizadorHistóricoOperação = (operador)=>{
    if (númerosInformadosFloat != "" && históricoOperação.length < 1) {
        históricoOperação.push(númerosInformadosFloat)
        históricoOperação.push(operador)
        númerosInformadosFloat = ''
    } else if (históricoOperação.length == 2 && númerosInformadosFloat == "") {
        históricoOperação[1] = operador
    } else if (númerosInformadosFloat != "" && históricoOperação.length == 2) {
        históricoOperação.push(númerosInformadosFloat)
        númerosInformadosFloat = ''
        let resultado = ''
        operadores.some((e, p)=>{
            if (e == históricoOperação[1]) {
                resultado = operações[p](históricoOperação[0], históricoOperação[2])
            }
        })

        if (operador != "=") {
            históricoOperação = []
            históricoOperação.push(Number(resultado))
            históricoOperação.push(operador)
            resultado = ''
        } else {
            mostradorCalculadora.children[1].innerText = Number(resultado)
            resultado = ''
        }
    }
    mostrarHistóricoOperação(históricoOperação)
}

const organizadorNúmerosInformados = (numero)=>{
    if (numero == ''){
        númerosInformados.pop()
        if (númerosInformados[0] == '-' && númerosInformados.length == 1) {
            númerosInformados.pop()
        }
    } else if (numero == '+/-') {
        if (númerosInformados.length > 0) {if (númerosInformados[0] == '-') {
            númerosInformados.shift()
        } else {
            númerosInformados.unshift('-')
        }}
    } else if (numero == ',') {
        if (númerosInformados.indexOf(',') == -1 && númerosInformados.length > 0) {
            númerosInformados.push(numero)
        }
    } else {
        númerosInformados.push(numero)
    }
    mostrarNúmerosInformados(númerosInformados)
}

grupoBtns.map((elemento)=>{
    elemento.addEventListener('click', (evento)=>{
        numeros.some((e)=>{
            if (e == evento.target.innerText) {
                organizadorNúmerosInformados(evento.target.innerText)
                mostrarHistóricoOperação(históricoOperação)
                mostrarNúmerosInformados(númerosInformados)
            }
        })

        operadores.some((e)=>{
            if (e == evento.target.innerText) {
                tranformaçãoStringEmFloat()
                organizadorHistóricoOperação(evento.target.innerText)
                mostrarNúmerosInformados(númerosInformados)
            }
        })

        if(evento.target.innerText == 'CE') {
            númerosInformados = []
            mostrarNúmerosInformados(númerosInformados)
        }

        if(evento.target.innerText == 'C') {
            númerosInformados = []
            históricoOperação = []
            mostrarNúmerosInformados(númerosInformados)
            mostrarHistóricoOperação(históricoOperação)
        }

        if (evento.target.innerText == '=') {
            if (históricoOperação.length == 2 && númerosInformados.length > 0) {
                tranformaçãoStringEmFloat()
                organizadorHistóricoOperação(evento.target.innerText)
                históricoOperação = []
            }
        }
    })
})