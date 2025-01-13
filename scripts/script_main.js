"use strict"

let grupoBtns = [...document.querySelectorAll('div')]
let mostradorCalculadora =  document.querySelector('.mostradorCalculadora')
let btnSelecionado = ''
let grupoNúmerosSelecionados = []

let organizaçãoNúmerosSelecionados = (btn)=>{
    let númeroSelecionado = btn
    if (grupoNúmerosSelecionados.indexOf(',') == -1) {
        grupoNúmerosSelecionados.push(númeroSelecionado)
    } else {
        if (númeroSelecionado != ',') {
            grupoNúmerosSelecionados.push(númeroSelecionado)
        }
    }
    console.log(grupoNúmerosSelecionados + " .1")
}

grupoBtns.map((elemento)=>{
    elemento.addEventListener('click', (evento)=>{
        btnSelecionado = evento.target.innerHTML

        if (evento.target.classList != 'destaque') {
            organizaçãoNúmerosSelecionados(btnSelecionado)
        } else {
            grupoNúmerosSelecionados = []
        }

        console.log(grupoNúmerosSelecionados + " .2")
        if (grupoNúmerosSelecionados.length > 0) {
            grupoNúmerosSelecionados.map((elemento, indice)=>{
                if (indice == 0) {
                    mostradorCalculadora.children.innerHTML = elemento
                } else {
                    mostradorCalculadora.children.innerHTML += elemento
                }
            })
        }
    })
})