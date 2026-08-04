document.addEventListener('DOMContentLoaded', () => {
    const retangulo1 = document.getElementById('retangulo1');
    const retangulo2 = document.getElementById('retangulo2');

    if (!retangulo1 || !retangulo2) {
        return;
    }

    function moverRetangulo() {
        const margem = 16;
        const largura = retangulo2.offsetWidth;
        const altura = retangulo2.offsetHeight;
        const maxX = Math.max(margem, window.innerWidth - largura - margem);
        const maxY = Math.max(margem, window.innerHeight - altura - margem);

        retangulo2.style.position = 'fixed';
        retangulo2.style.left = `${Math.floor(Math.random() * (maxX - margem + 1)) + margem}px`;
        retangulo2.style.top = `${Math.floor(Math.random() * (maxY - margem + 1)) + margem}px`;
        retangulo2.style.zIndex = '1000';
    }

    function manterNaTela() {
        if (retangulo2.style.position !== 'fixed') {
            return;
        }

        const margem = 16;
        const largura = retangulo2.offsetWidth;
        const altura = retangulo2.offsetHeight;
        const maxX = Math.max(margem, window.innerWidth - largura - margem);
        const maxY = Math.max(margem, window.innerHeight - altura - margem);
        const leftAtual = Number.parseFloat(retangulo2.style.left) || margem;
        const topAtual = Number.parseFloat(retangulo2.style.top) || margem;

        retangulo2.style.left = `${Math.min(Math.max(leftAtual, margem), maxX)}px`;
        retangulo2.style.top = `${Math.min(Math.max(topAtual, margem), maxY)}px`;
    }

    retangulo1.addEventListener('click', () => {
        window.location.href = '../pages/pagina2.html';
    });

    retangulo2.addEventListener('click', moverRetangulo);
    window.addEventListener('resize', manterNaTela);
    window.addEventListener('orientationchange', manterNaTela);
});