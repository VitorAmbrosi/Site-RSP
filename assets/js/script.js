function AbrirWhatsApp() {
    const numero = "5554999126702"
    const url = `https://wa.me/${numero}`
    window.open(url, '_blank')
}

const form = document.getElementById('formOrcamento')
form.addEventListener('submit', function (event) {
    event.preventDefault()

    if (validarFormulario()) {
        enviarWhatsAppPronto()
    }
})

function validarFormulario() {
    const nome = document.querySelector('input[id="nome"]').value.trim()
    const empresa = document.querySelector('input[id="empresa"]').value.trim()
    const email = document.querySelector('input[id="email"]').value.trim()
    const tipo = document.getElementById('tipoEtiqueta').value
    const largura = document.querySelector('input[id="largura"]').value.trim()
    const altura = document.querySelector('input[id="altura"]').value.trim()
    const colunas = document.querySelector('input[id="qtd-colunas"]').value.trim()
    const tamanho = document.querySelector('input[id="tamanho-rolo"]').value.trim()
    const impressora = document.querySelector('input[id="tipo-impressora"]').value.trim()

    const alerta = document.getElementById('mensagem-alerta')

    if (!nome || !empresa || !email || !tipo || !largura || !altura || !colunas || !tamanho || !impressora) {
        alerta.textContent = 'Por favor, preencha todos os campos.'
        alerta.style.display = 'block'

        setTimeout(() => {
            alerta.style.display = 'none'
        }, 3000)

        return false
    }

    if (verificarBot()) {
        alerta.textContent = 'Erro ao processar sua solicitação. Tente novamente.'
        alerta.style.display = 'block'

        setTimeout(() => {
            alerta.style.display = 'none'
        }, 3000)

        return false
    }

    return true
}

function enviarWhatsAppPronto() {
    const nome = document.querySelector('input[id="nome"]').value.trim()
    const empresa = document.querySelector('input[id="empresa"]').value.trim()
    const email = document.querySelector('input[id="email"]').value.trim()
    const tipo = document.getElementById('tipoEtiqueta').value
    const largura = document.querySelector('input[id="largura"]').value.trim()
    const altura = document.querySelector('input[id="altura"]').value.trim()
    const colunas = document.querySelector('input[id="qtd-colunas"]').value.trim()
    const tamanho = document.querySelector('input[id="tamanho-rolo"]').value.trim()
    const impressora = document.querySelector('input[id="tipo-impressora"]').value.trim()
    const detalhes = document.querySelector('textarea[id="especificacoes"]').value.trim()

    const mensagem = `Olá, gostaria de um orçamento:

    Nome: ${nome}
    Empresa: ${empresa}
    Email: ${email}
    Tipo de etiqueta: ${tipo}
    Largura da etiqueta: ${largura} mm
    Altura da etiqueta: ${altura} mm
    Quantidade de colunas: ${colunas}
    Tamanho do rolo: ${tamanho} m
    Tipo de impressora: ${impressora}
    Detalhes: ${detalhes}`

    const numero = "5554999126702";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
    window.open(url, '_blank')
}

function alterarMenu() {
    const header = document.getElementById('header')
    const menu = document.querySelector('.menu')

    header.classList.toggle('active')

    if (header.classList.contains('active')) {
        menu.innerHTML = '<i class="fa-solid fa-xmark"></i>'
        menu.setAttribute('aria-expanded', 'true')
    } else {
        menu.innerHTML = '<i class="fa-solid fa-bars"></i>'
        menu.setAttribute('aria-expanded', 'false')
    }
}

btnTopo = document.getElementById('btn-topo')
window.onscroll = function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btnTopo.style.display = 'block'
    } else {
        btnTopo.style.display = 'none'
    }
}
function voltarAoTopo() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

const campoParaBots = document.getElementById('bot')
function verificarBot() {
    if (campoParaBots.value.trim()) {
        console.log("Bot detectado, envio cancelado")
        return true
    } else {
        return false
    }
}

const inLargura = document.getElementById('largura');
const inAltura = document.getElementById('altura');
const inColunas = document.getElementById('qtd-colunas');
const displayLargura = document.getElementById('txt-largura');
const displayAltura = document.getElementById('txt-altura');
const containerGrade = document.getElementById('grade-colunas');

function atualizarPrevia() {
    const vLargura = parseFloat(inLargura.value) || 0
    const vAltura = parseFloat(inAltura.value) || 0
    const numColunas = parseInt(inColunas.value) || 0
    const numLinhas = 2

    displayLargura.textContent = vLargura > 0 ? `${vLargura}mm` : ''
    displayAltura.textContent = vAltura > 0 ? `${vAltura}mm` : ''

    containerGrade.innerHTML = ''

    if (numColunas > 0 && vLargura > 0 && vAltura > 0) {
        const vLargura = parseFloat(inLargura.value) || 0
        const vAltura = parseFloat(inAltura.value) || 0
        const numColunas = parseInt(inColunas.value) || 0
        const numLinhas = 2

        displayLargura.textContent = vLargura > 0 ? `${vLargura}mm` : ''
        displayAltura.textContent = vAltura > 0 ? `${vAltura}mm` : ''

        containerGrade.innerHTML = ''

        if (numColunas > 0 && vLargura > 0 && vAltura > 0) {
            let fatorEscala = 9
            const larguraTotalSimulada = vLargura * numColunas
            const alturaTotalSimulada = vAltura * numLinhas

            const maxPorcentagemW = 45
            const maxPorcentagemH = 50

            let finalW = larguraTotalSimulada * (fatorEscala / 10)
            let finalH = alturaTotalSimulada * (fatorEscala / 10)

            if (finalW > maxPorcentagemW || finalH > maxPorcentagemH) {
                const escalaW = maxPorcentagemW / larguraTotalSimulada
                const escalaH = maxPorcentagemH / alturaTotalSimulada
                const novaEscala = Math.min(escalaW, escalaH)

                finalW = larguraTotalSimulada * novaEscala
                finalH = alturaTotalSimulada * novaEscala
            }

            containerGrade.style.width = `${finalW}%`
            containerGrade.style.height = `${finalH}%`

            containerGrade.style.display = 'grid'
            containerGrade.style.gridTemplateColumns = `repeat(${numColunas}, 1fr)`
            containerGrade.style.gridTemplateRows = `repeat(${numLinhas}, 1fr)`
            containerGrade.style.gap = '7px'

            const totalQuadrados = numColunas * numLinhas

            for (let i = 0; i < totalQuadrados; i++) {
                const divQuadrado = document.createElement('div')
                divQuadrado.classList.add('quadrado-coluna')
                divQuadrado.style.backgroundColor = 'white'
                divQuadrado.style.border = '2px solid #0a3d91'
                divQuadrado.style.borderRadius = '7px'
                divQuadrado.style.width = '100%'
                divQuadrado.style.height = '100%'

                containerGrade.appendChild(divQuadrado)
            }
        } else {
            containerGrade.style.width = "45%"
            containerGrade.style.height = "50%"
        }
    }
}

inLargura.addEventListener('input', atualizarPrevia);
inAltura.addEventListener('input', atualizarPrevia);
inColunas.addEventListener('input', atualizarPrevia);