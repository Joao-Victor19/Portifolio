function digitar(elemento, velocidade = 75, pausa = 1500) {
    const texto = elemento.textContent;
    const letras = texto.split('');

    function escrever() {
        elemento.textContent = '';

        letras.forEach((letra, i) => {
            setTimeout(() => {
                elemento.textContent += letra;
            }, velocidade * i);
        });

        // reinicia depois que terminar de digitar + uma pausa
        setTimeout(escrever, velocidade * letras.length + pausa);
    }

    escrever();
}

const titulo = document.querySelector('.Dig');
digitar(titulo);
