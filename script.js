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
const dots = document.querySelectorAll('.slider .dot');
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

// Slider dos projetos (cada card tem o seu)
document.querySelectorAll('.projeto-slider').forEach((slider, i) => {
    const fotos = slider.querySelectorAll('.projeto-slide');
    let atual = 0;

    function proxima() {
        fotos[atual].classList.remove('ativo');
        atual = (atual + 1) % fotos.length;
        fotos[atual].classList.add('ativo');
    }

    // atraso diferente em cada card para não trocarem todos ao mesmo tempo
    setTimeout(() => setInterval(proxima, 3500), i * 800);
});


/* Carrossel de projetos: setas passam de 3 em 3 (1 em 1 no celular) */

(function () {
    const carrossel = document.querySelector('.projetos-carrossel');
    if (!carrossel) return;

    const janela = carrossel.querySelector('.projetos-janela');
    const trilho = carrossel.querySelector('.projetos-grid');
    const cards = trilho.querySelectorAll('.projeto-card');
    const setaEsq = carrossel.querySelector('.seta-esq');
    const setaDir = carrossel.querySelector('.seta-dir');
    const telaPequena = window.matchMedia('(max-width: 900px)');

    let pagina = 0;

    function porPagina() {
        return telaPequena.matches ? 1 : 3;
    }

    function totalPaginas() {
        return Math.max(1, Math.ceil(cards.length / porPagina()));
    }

    function atualizar() {
        const total = totalPaginas();
        pagina = Math.min(pagina, total - 1);

        const espaco = parseFloat(getComputedStyle(trilho).columnGap) || 0;
        const largura = janela.clientWidth;
        const maximo = Math.max(trilho.scrollWidth - largura, 0);
        const deslocamento = Math.min(pagina * (largura + espaco), maximo);

        trilho.style.transform = 'translateX(-' + deslocamento + 'px)';

        setaEsq.disabled = pagina === 0;
        setaDir.disabled = pagina >= total - 1;
    }

    function ir(direcao) {
        const novaPagina = pagina + direcao;
        if (novaPagina < 0 || novaPagina > totalPaginas() - 1) return;
        pagina = novaPagina;
        atualizar();
    }

    setaEsq.addEventListener('click', () => ir(-1));
    setaDir.addEventListener('click', () => ir(1));

    // Arrastar com o dedo no celular
    let inicioX = 0;
    let inicioY = 0;

    janela.addEventListener('touchstart', (e) => {
        inicioX = e.touches[0].clientX;
        inicioY = e.touches[0].clientY;
    }, { passive: true });

    janela.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].clientX - inicioX;
        const dy = e.changedTouches[0].clientY - inicioY;
        // só conta se foi um arrasto horizontal de verdade
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
            ir(dx < 0 ? 1 : -1);
        }
    }, { passive: true });

    // Recalcula ao girar o celular / redimensionar a janela
    window.addEventListener('resize', atualizar);
    window.addEventListener('load', atualizar);

    atualizar();
})();
