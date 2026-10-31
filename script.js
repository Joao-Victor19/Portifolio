
function ativaletr(elemento){
    const arrTexto = elemento.innerHTML.split("");
    elemento.innerHTML = '';    
    arrTexto.forEach((letra, i)=> {
        setTimeout(()=>{
            elemento.innerHTML += letra;
        })
    })
}

ativaLetra(titulo);


const titulo = document.querySelector('.digitando');