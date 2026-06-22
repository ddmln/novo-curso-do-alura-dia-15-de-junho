const senhaInput = document.getElementById('senha');
const barraForca = document.getElementById('barra-forca');
const mensagemForca = document.getElementById('mensagem-forca');

function avaliarForcaDaSenha(senha) {
    const possuiMaiuscula = /[A-Z]/.test(senha);
    const possuiMinuscula = /[a-z]/.test(senha);
    const possuiNumero = /[0-9]/.test(senha);
    const possuiSimbolo = /[^A-Za-z0-9]/.test(senha);

    let pontuacao = 0;

    if (senha.length >= 6) pontuacao += 1;
    if (senha.length >= 10) pontuacao += 1;
    if (possuiMaiuscula) pontuacao += 1;
    if (possuiMinuscula) pontuacao += 1;
    if (possuiNumero) pontuacao += 1;
    if (possuiSimbolo) pontuacao += 1;

    if (senha.length === 0) {
        return { nivel: 'vazio', texto: 'Digite uma senha para ver a força.', classe: '' };
    }

    if (pontuacao <= 2 || senha.length < 6) {
        return { nivel: 'fraca', texto: 'Senha fraca', classe: 'fraca' };
    }

    if (pontuacao <= 4) {
        return { nivel: 'media', texto: 'Senha média', classe: 'media' };
    }

    return { nivel: 'forte', texto: 'Senha forte', classe: 'forte' };
}

function atualizarInterfaceForca() {
    const senha = senhaInput.value.trim();
    const resultado = avaliarForcaDaSenha(senha);

    barraForca.className = 'forca';
    if (resultado.classe) {
        barraForca.classList.add(resultado.classe);
    }

    mensagemForca.textContent = resultado.texto;
}

senhaInput.addEventListener('input', atualizarInterfaceForca);
