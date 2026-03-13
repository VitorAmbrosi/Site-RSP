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
    const gapColunas = document.querySelector('input[id="inGapColunas"]').value.trim()
    const gapLinhas = document.querySelector('input[id="inGapLinhas"]').value.trim()
    const gapBordas = document.querySelector('input[id="inGapBordas"]').value.trim()
    const impressora = document.querySelector('input[id="tipo-impressora"]').value.trim()


    const alerta = document.getElementById('mensagem-alerta')

    if (!nome || !empresa || !email || !tipo || !largura || !altura || !colunas || !gapColunas || !gapLinhas || !gapBordas || !tamanho || !impressora) {
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
    const gapColunas = document.querySelector('input[id="inGapColunas"]').value.trim()
    const gapLinhas = document.querySelector('input[id="inGapLinhas"]').value.trim()
    const gapBordas = document.querySelector('input[id="inGapBordas"]').value.trim()
    const impressora = document.querySelector('input[id="tipo-impressora"]').value.trim()
    const detalhes = document.querySelector('textarea[id="especificacoes"]').value.trim()

    const vLargura = parseFloat(largura) || 0
    const vColunas = parseInt(colunas) || 0
    const vGapCol = parseFloat(gapColunas) || 0
    const vBorda = parseFloat(gapBordas) || 0

    const larguraTotal = (vLargura * vColunas) + (vGapCol * (vColunas - 1)) + (vBorda * 2)

    const mensagem = `Olá, gostaria de um orçamento:

    *DADOS:
    Nome: ${nome}
    Empresa: ${empresa}
    Email: ${email}

    
    *METRAGEM E EQUIPAMENTOS:
    Tamanho do Rolo: ${tamanho} metros
    Tipo de Impressora: ${impressora}
    Detalhes: ${detalhes || 'Nenhuma'} 

    *INFORMAÇÕES DA ETIQUETA:
    Tipo de Etiqueta: ${tipo}
    Tamanho da Etiqueta: ${largura} mm X ${altura} mm
    Quantidade de Colunas: ${colunas}
    Espaço entre Colunas: ${gapColunas} mm
    Espaço entre Linhas: ${gapLinhas} mm
    Tamanho das Bordas: ${gapBordas} mm
    Largura Total: ${larguraTotal} mm`

    const numero = "5554999126702"
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


const inLargura = document.getElementById('largura')
const inAltura = document.getElementById('altura')
const inColunas = document.getElementById('qtd-colunas')
const displayLargura = document.getElementById('txt-largura')
const displayAltura = document.getElementById('txt-altura')
const containerGrade = document.getElementById('grade-colunas')
const inGapColunas = document.getElementById('inGapColunas')
const inGapLinhas = document.getElementById('inGapLinhas')
const displayRolo = document.getElementById('txt-rolo')
const inGapBordas = document.getElementById('inGapBordas')

function atualizarPrevia() {
    const vLargura = parseFloat(inLargura.value) || 0
    const vAltura = parseFloat(inAltura.value) || 0
    const numColunas = parseInt(inColunas.value) || 0
    const vGapColunas = parseFloat(inGapColunas.value) || 0
    const vGapLinhas = parseFloat(inGapLinhas.value) || 0
    const vGapBordas = parseFloat(inGapBordas.value) || 0
    const numLinhas = 2

    displayLargura.textContent = vLargura > 0 ? `${vLargura}mm` : 'Largura'
    displayAltura.textContent = vAltura > 0 ? `${vAltura}mm` : 'Altura'

    if (vLargura > 0 && numColunas > 0) {
        const larguraTotalRolo = (vLargura * numColunas) + (vGapColunas * (numColunas - 1)) + (vGapBordas * 2)
        displayRolo.textContent = `${larguraTotalRolo}mm`
    } else {
        displayRolo.textContent = 'Largura Total'
    }

    containerGrade.innerHTML = ''

    if (numColunas > 0 && vLargura > 0 && vAltura > 0) {
        const larguraMaximaGrade = 48
        const alturaMaximaGrade = 50

        const proporcaoEtiqueta = vAltura / vLargura

        let finalW = larguraMaximaGrade;
        let finalH = (finalW / numColunas) * proporcaoEtiqueta * numLinhas

        if (finalH > alturaMaximaGrade) {
            const fatorAjuste = alturaMaximaGrade / finalH
            finalH = alturaMaximaGrade
            finalW = finalW * fatorAjuste
        }

        containerGrade.style.width = finalW + "%"
        containerGrade.style.height = finalH + "%"
        containerGrade.style.gridTemplateColumns = `repeat(${numColunas}, 1fr)`
        containerGrade.style.gridTemplateRows = `repeat(${numLinhas}, 1fr)`

        containerGrade.style.columnGap = vGapColunas + "px"
        containerGrade.style.rowGap = vGapLinhas + "px"

        containerGrade.style.padding = `${vGapBordas}px`
        containerGrade.style.boxSizing = "border-box"

        const totalQuadrados = numColunas * numLinhas
        for (let i = 0; i < totalQuadrados; i++) {
            const divQuadrado = document.createElement('div')
            divQuadrado.classList.add('quadrado-coluna')
            containerGrade.appendChild(divQuadrado)
        }
    } else {
        containerGrade.style.width = "45%"
        containerGrade.style.height = "50%"
        containerGrade.style.padding = "0"
    }
}

inLargura.addEventListener('input', atualizarPrevia)
inAltura.addEventListener('input', atualizarPrevia)
inColunas.addEventListener('input', atualizarPrevia)
inGapColunas.addEventListener('input', atualizarPrevia)
inGapLinhas.addEventListener('input', atualizarPrevia)
inGapBordas.addEventListener('input', atualizarPrevia)


const select = document.getElementById('tipoEtiqueta')

function mudarCorSelect() {
    if (select.value !== "") {
        select.style.setProperty('color', 'black', 'important')
    } else {
        select.style.setProperty('color', 'grey', 'important')
    }
}

select.addEventListener('change', mudarCorSelect)