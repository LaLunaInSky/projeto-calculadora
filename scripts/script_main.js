"use strict"

let grupoBtns = [...document.querySelectorAll('div')]
let mostradorCalculadora =  document.querySelector('.mostradorCalculadora')
let btnSelecionado = ''
let grupoNúmerosSelecionados = []
let grupoHistóricoOperação = []
let conjuntoStringGrupoNúmerosSelecionados = ''

let organizaçãoNúmerosSelecionados = (btn)=>{
    let númeroSelecionado = btn
    if (grupoNúmerosSelecionados.indexOf(',') == -1) {
        grupoNúmerosSelecionados.push(númeroSelecionado)
    } else {
        if (númeroSelecionado != ',') {
            grupoNúmerosSelecionados.push(númeroSelecionado)
        }
    }
}

let organizaçãoHistórico = (string) => {
    if (string != '') {
        grupoHistóricoOperação.push(string)
        if (grupoHistóricoOperação.length > 0) {
            if (btnSelecionado == 'x' || btnSelecionado == '+' || btnSelecionado == '÷' || btnSelecionado == '-') {
                console.log(grupoHistóricoOperação.length)
                grupoHistóricoOperação.push(btnSelecionado)
            }
        }
    } else {
        if (grupoHistóricoOperação.length > 1) {
            if (grupoHistóricoOperação[1] == 'x' || grupoHistóricoOperação[1] == '+' || grupoHistóricoOperação[1] == '÷' || grupoHistóricoOperação[1] == '-') {
                if (btnSelecionado == 'x' || btnSelecionado == '+' || btnSelecionado == '÷' || btnSelecionado == '-') {
                    grupoHistóricoOperação[1] = btnSelecionado
                }
            }
        }
    }
    
    grupoHistóricoOperação.map((elemento, indice)=>{
        if (indice > 0) {
            mostradorCalculadora.children[0].innerHTML += ` ${elemento}`
        } else {
            mostradorCalculadora.children[0].innerHTML = elemento
        }
    })
    
    console.log(grupoHistóricoOperação)
}

grupoBtns.map((elemento)=>{
    elemento.addEventListener('click', (evento)=>{
        btnSelecionado = evento.target.innerHTML

        if (evento.target.classList != 'destaque') {
            organizaçãoNúmerosSelecionados(btnSelecionado)
        } else {
            grupoNúmerosSelecionados = []
            organizaçãoHistórico(conjuntoStringGrupoNúmerosSelecionados)
            conjuntoStringGrupoNúmerosSelecionados = ''
        }
        
        if (grupoNúmerosSelecionados.length > 0) {
            grupoNúmerosSelecionados.map((elemento, indice)=>{
                if (indice > 0) {
                    conjuntoStringGrupoNúmerosSelecionados += elemento
                    mostradorCalculadora.children[1].innerHTML += elemento
                } else {
                    conjuntoStringGrupoNúmerosSelecionados = elemento
                    mostradorCalculadora.children[1].innerHTML = elemento
                }
            })
        } else {
            mostradorCalculadora.children[1].innerHTML = 0
        }
        console.log(conjuntoStringGrupoNúmerosSelecionados)
    })
})