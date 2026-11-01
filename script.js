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


/* Slide*/

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let current = 0;
let timer;

function showSlide(index) {
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  slides[index].classList.add('active');
  dots[index].classList.add('active');
  current = index;
}

function nextSlide() {
  showSlide((current + 1) % slides.length);
}

function startAuto() {
  timer = setInterval(nextSlide, 4000);
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    showSlide(i);
    clearInterval(timer);
    startAuto();
  });
});

startAuto();