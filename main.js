// Elementos do DOM
const senhaGerada = document.getElementById('senha-gerada');
const barraForca = document.getElementById('barra-forca');
const mensagemForca = document.getElementById('mensagem-forca');
const btnGerar = document.getElementById('btn-gerar');
const btnCopiar = document.getElementById('btn-copiar');
const sliderTamanho = document.getElementById('tamanho');
const valorTamanho = document.getElementById('valor-tamanho');
const checkMaiusculas = document.getElementById('maiusculas');
const checkMinusculas = document.getElementById('minusculas');
const checkNumeros = document.getElementById('numeros');
const checkSimbolos = document.getElementById('simbolos');

// Caracteres disponíveis
const MAIUSCULAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const MINUSCULAS = 'abcdefghijklmnopqrstuvwxyz';
const NUMEROS = '0123456789';
const SIMBOLOS = '!@#$%^&*?-_';

// Atualizar valor do tamanho
sliderTamanho.addEventListener('input', (e) => {
    valorTamanho.textContent = e.target.value;
});

// Gerar senha aleatória
function gerarSenha() {
    let caracteres = '';
    
    if (checkMaiusculas.checked) caracteres += MAIUSCULAS;
    if (checkMinusculas.checked) caracteres += MINUSCULAS;
    if (checkNumeros.checked) caracteres += NUMEROS;
    if (checkSimbolos.checked) caracteres += SIMBOLOS;
    
    if (!caracteres) {
        alert('Selecione pelo menos um tipo de caractere!');
        return;
    }
    
    let senha = '';
    const tamanho = parseInt(sliderTamanho.value);
    
    for (let i = 0; i < tamanho; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        senha += caracteres[indice];
    }
    
    senhaGerada.value = senha;
    avaliarForca(senha);
}

// Avaliar força da senha
function avaliarForca(senha) {
    const tamanho = senha.length;
    const temMaiuscula = /[A-Z]/.test(senha);
    const temMinuscula = /[a-z]/.test(senha);
    const temNumero = /[0-9]/.test(senha);
    const temSimbolo = /[^A-Za-z0-9]/.test(senha);
    
    let pontuacao = 0;
    
    if (temMaiuscula) pontuacao++;
    if (temMinuscula) pontuacao++;
    if (temNumero) pontuacao++;
    if (temSimbolo) pontuacao++;
    if (tamanho >= 12) pontuacao++;
    
    barraForca.className = 'forca';
    
    if (tamanho < 6 || pontuacao <= 1) {
        barraForca.classList.add('fraca');
        mensagemForca.textContent = '🔴 Senha Fraca';
    } else if (pontuacao <= 3) {
        barraForca.classList.add('media');
        mensagemForca.textContent = '🟡 Senha Média';
    } else {
        barraForca.classList.add('forte');
        mensagemForca.textContent = '🟢 Senha Forte';
    }
}

// Copiar para área de transferência
btnCopiar.addEventListener('click', () => {
    if (senhaGerada.value) {
        navigator.clipboard.writeText(senhaGerada.value);
        btnCopiar.textContent = '✅';
        setTimeout(() => {
            btnCopiar.textContent = '📋';
        }, 2000);
    }
});

// Gerar ao clicar no botão
btnGerar.addEventListener('click', gerarSenha);

// Gerar ao pressionar Enter
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') gerarSenha();
});
