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
    const nome = document.getElementById('nome')
    const empresa = document.getElementById('empresa')
    const email = document.getElementById('email')
    const tipoSelect = document.getElementById('tipoEtiqueta')
    const largura = document.getElementById('largura')
    const altura = document.getElementById('altura')
    const colunas = document.getElementById('qtd-colunas')
    const tamanho = document.getElementById('tamanho-rolo')
    const gapColunas = document.getElementById('GapColunas')
    const gapLinhas = document.getElementById('GapLinhas')
    const gapBordas = document.getElementById('GapBordas')
    const impressora = document.getElementById('tipo-impressora')

    const alerta = document.getElementById('mensagem-alerta')

    const campos = [
        { input: nome, erroId: 'erro-nome', mensagem: 'Informe o nome.' },
        { input: empresa, erroId: 'erro-empresa', mensagem: 'Informe a empresa.' },
        { input: email, erroId: 'erro-email', mensagem: 'Informe um email válido.' },
        { input: tipoSelect, erroId: 'erro-tipoEtiqueta', mensagem: 'Selecione o tipo de etiqueta.' },
        { input: largura, erroId: 'erro-largura', mensagem: 'Informe a largura da etiqueta.' },
        { input: altura, erroId: 'erro-altura', mensagem: 'Informe a altura da etiqueta.' },
        { input: colunas, erroId: 'erro-qtd-colunas', mensagem: 'Informe a quantidade de colunas.' },
        { input: tamanho, erroId: 'erro-tamanho-rolo', mensagem: 'Informe o tamanho do rolo.' },
        { input: gapColunas, erroId: 'erro-GapColunas', mensagem: 'Informe o espaço entre colunas.' },
        { input: gapLinhas, erroId: 'erro-GapLinhas', mensagem: 'Informe o espaço entre linhas.' },
        { input: gapBordas, erroId: 'erro-GapBordas', mensagem: 'Informe o tamanho das bordas.' },
        { input: impressora, erroId: 'erro-tipo-impressora', mensagem: 'Informe o tipo de impressora.' }
    ]

    campos.forEach(campo => {
        campo.input.classList.remove('erro')
        const spanErro = document.getElementById(campo.erroId)
        if (spanErro) {
            spanErro.textContent = ''
        }
    })

    let valido = true

    campos.forEach(campo => {
        if (!campo.input.value.trim()) {
            campo.input.classList.add('erro')
            const spanErro = document.getElementById(campo.erroId)
            if (spanErro) {
                spanErro.textContent = campo.mensagem
            }
            valido = false
        }
    })

    const emailValor = email.value.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (emailValor && !emailRegex.test(emailValor)) {
        email.classList.add('erro')
        const spanErroEmail = document.getElementById('erro-email')
        if (spanErroEmail) {
            spanErroEmail.textContent = 'Informe um email válido (ex.: seuemail@empresa.com).'
        }
        valido = false
    }

    if (!valido) {
        alerta.textContent = 'Por favor, preencha ou corrija os campos destacados.'
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

const camposMedida = document.querySelectorAll('.validar-max');

camposMedida.forEach(campo => {
    campo.addEventListener('input', (e) => {
        const valor = parseFloat(e.target.value)
        const max = parseFloat(e.target.max)
        const min = parseFloat(e.target.min) || 1

        if (valor > max) {
            e.target.value = max
        } else if (valor < min) {
            e.target.value = min
        }
    })
})

function enviarWhatsAppPronto() {
    const nome = document.querySelector('input[id="nome"]').value.trim()
    const empresa = document.querySelector('input[id="empresa"]').value.trim()
    const email = document.querySelector('input[id="email"]').value.trim()
    const telefone = document.querySelector('input[id="telefone"]').value.trim()
    const tipo = document.getElementById('tipoEtiqueta').value
    const largura = document.querySelector('input[id="largura"]').value.trim()
    const altura = document.querySelector('input[id="altura"]').value.trim()
    const colunas = document.querySelector('input[id="qtd-colunas"]').value.trim()
    const tamanho = document.querySelector('input[id="tamanho-rolo"]').value.trim()
    const gapColunas = document.querySelector('input[id="GapColunas"]').value.trim()
    const gapLinhas = document.querySelector('input[id="GapLinhas"]').value.trim()
    const gapBordas = document.querySelector('input[id="GapBordas"]').value.trim()
    const impressora = document.querySelector('input[id="tipo-impressora"]').value.trim()
    const detalhes = document.querySelector('textarea[id="especificacoes"]').value.trim()

    const vLargura = parseFloat(largura) || 0
    const vColunas = parseInt(colunas) || 0
    const vGapCol = parseFloat(gapColunas) || 0
    const vBorda = parseFloat(gapBordas) || 0

    const larguraTotal = (vLargura * vColunas) + (vGapCol * (vColunas - 1)) + (vBorda * 2)

    const mensagem = `Olá, gostaria de um orçamento:

    *DADOS:*
    Nome: ${nome}
    Empresa: ${empresa}
    Email: ${email}
    Telefone: ${telefone || 'Número não informado'}

    *METRAGEM E EQUIPAMENTOS:*
    Tamanho do Rolo: ${tamanho} metros
    Tipo de Impressora: ${impressora}
    Detalhes: ${detalhes || 'Nenhum detalhe informado'} 

    *INFORMAÇÕES DA ETIQUETA:*
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
        document.body.style.overflow = 'hidden'
    } else {
        menu.innerHTML = '<i class="fa-solid fa-bars"></i>'
        menu.setAttribute('aria-expanded', 'false')
        document.body.style.overflow = ''
    }
}

function fecharMenuMobile() {
    const header = document.getElementById('header')
    const menu = document.querySelector('.menu')
    if (header && header.classList.contains('active')) {
        header.classList.remove('active')
    }
    if (menu) {
        menu.innerHTML = '<i class="fa-solid fa-bars"></i>'
        menu.setAttribute('aria-expanded', 'false')
    }
    document.body.style.overflow = ''
}

document.querySelectorAll('#header .opcoes').forEach(link => {
    link.addEventListener('click', function () {
        if (window.innerWidth <= 900) {
            fecharMenuMobile()
        }
    })
})

window.addEventListener('resize', function () {
    if (window.innerWidth > 900) {
        document.body.style.overflow = ''
    }
})

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
        return true
    } else {
        return false
    }
}


const Largura = document.getElementById('largura')
const Altura = document.getElementById('altura')
const Colunas = document.getElementById('qtd-colunas')
const displayLargura = document.getElementById('txt-largura')
const displayAltura = document.getElementById('txt-altura')
const containerGrade = document.getElementById('grade-colunas')
const GapColunas = document.getElementById('GapColunas')
const GapLinhas = document.getElementById('GapLinhas')
const displayRolo = document.getElementById('txt-rolo')
const GapBordas = document.getElementById('GapBordas')

function atualizarPrevia() {
    const vLargura = parseFloat(Largura.value) || 0
    const vAltura = parseFloat(Altura.value) || 0
    const numColunas = parseInt(Colunas.value) || 0
    const vGapColunas = parseFloat(GapColunas.value) || 0
    const vGapLinhas = parseFloat(GapLinhas.value) || 0
    const vGapBordas = parseFloat(GapBordas.value) || 0
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

Largura.addEventListener('input', atualizarPrevia)
Altura.addEventListener('input', atualizarPrevia)
Colunas.addEventListener('input', atualizarPrevia)
GapColunas.addEventListener('input', atualizarPrevia)
GapLinhas.addEventListener('input', atualizarPrevia)
GapBordas.addEventListener('input', atualizarPrevia)


const select = document.getElementById('tipoEtiqueta')

function mudarCorSelect() {
    if (select.value !== "") {
        select.style.setProperty('color', 'black', 'important')
    } else {
        select.style.setProperty('color', 'grey', 'important')
    }
}

select.addEventListener('change', mudarCorSelect)

let telefone = document.getElementById('telefone')

telefone.addEventListener('input', () => {
    let telefoneLimpo = telefone.value.replace(/\D/g, "").substring(0, 11)
    let numeroArray = telefoneLimpo.split("")
    let numeroFormatado = ""
    
    if(numeroArray.length > 0) {
        numeroFormatado += `(${numeroArray.slice(0,2).join("")})`
    } if (numeroArray.length > 2) {
        numeroFormatado += ` ${numeroArray.slice(2,7).join("")}`
    } if (numeroArray.length > 7) {
        numeroFormatado += `-${numeroArray.slice(7,11).join("")}`
    }

    telefone.value = numeroFormatado
})

const steps = document.querySelectorAll('.form-step')
let passoAtual = 1


const camposPorPasso = {
    1: [
        { id: 'nome', erroId: 'erro-nome', mensagem: 'Informe o nome.' },
        { id: 'empresa', erroId: 'erro-empresa', mensagem: 'Informe a empresa.' },
        { id: 'email', erroId: 'erro-email', mensagem: 'Informe um email válido.' }
    ],
    2: [
        { id: 'tamanho-rolo', erroId: 'erro-tamanho-rolo', mensagem: 'Informe o tamanho do rolo.' },
        { id: 'tipo-impressora', erroId: 'erro-tipo-impressora', mensagem: 'Informe o tipo de impressora.' }
    ],
    3: [
        { id: 'tipoEtiqueta', erroId: 'erro-tipoEtiqueta', mensagem: 'Selecione o tipo de etiqueta.' },
        { id: 'largura', erroId: 'erro-largura', mensagem: 'Informe a largura da etiqueta.' },
        { id: 'altura', erroId: 'erro-altura', mensagem: 'Informe a altura da etiqueta.' },
        { id: 'qtd-colunas', erroId: 'erro-qtd-colunas', mensagem: 'Informe a quantidade de colunas.' },
        { id: 'tamanho-rolo', erroId: 'erro-tamanho-rolo', mensagem: 'Informe o tamanho do rolo.' },
        { id: 'GapColunas', erroId: 'erro-GapColunas', mensagem: 'Informe o espaço entre colunas.' },
        { id: 'GapLinhas', erroId: 'erro-GapLinhas', mensagem: 'Informe o espaço entre linhas.' },
        { id: 'GapBordas', erroId: 'erro-GapBordas', mensagem: 'Informe o tamanho das bordas.' }
    ]
}

function validarPasso(passo) {
    const campos = camposPorPasso[passo] || []
    const alerta = document.getElementById('mensagem-alerta')
    let valido = true

    campos.forEach(campo => {
        const input = document.getElementById(campo.id)
        const spanErro = document.getElementById(campo.erroId)
        if (input) input.classList.remove('erro')
        if (spanErro) spanErro.textContent = ''
    })

    campos.forEach(campo => {
        const input = document.getElementById(campo.id)
        const spanErro = document.getElementById(campo.erroId)
        if (input && !input.value.trim()) {
            input.classList.add('erro')
            if (spanErro) spanErro.textContent = campo.mensagem
            valido = false
        }
    })


    if (passo === 1) {
        const emailInput = document.getElementById('email')
        const emailValor = emailInput ? emailInput.value.trim() : ''
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (emailValor && !emailRegex.test(emailValor)) {
            emailInput.classList.add('erro')
            const spanErroEmail = document.getElementById('erro-email')
            if (spanErroEmail) spanErroEmail.textContent = 'Informe um email válido (ex.: seuemail@empresa.com).'
            valido = false
        }
    }

    if (!valido && alerta) {
        alerta.textContent = 'Por favor, preencha ou corrija os campos destacados.'
        alerta.style.display = 'block'
        setTimeout(() => { alerta.style.display = 'none' }, 3000)
    }

    return valido
}

const nomesPasso = {
    1: 'Dados e contato',
    2: 'Metragem e equipamento',
    3: 'Informações da etiqueta'
}

function atualizarIndicadorProgresso(passo) {
    const barra = document.getElementById('barra-progresso')
    const numEl = document.getElementById('passo-atual-num')
    const nomeEl = document.getElementById('passo-nome')
    const total = steps.length

    if (barra) barra.style.width = `${(passo / total) * 100}%`
    if (numEl) numEl.textContent = passo
    if (nomeEl) nomeEl.textContent = nomesPasso[passo] || ''
}

function mostrarPasso(passo) {
    steps.forEach(step => {
        if (parseInt(step.getAttribute('data-step')) === passo) {
            step.classList.add('active')
        } else {
            step.classList.remove('active')
        }
    })

    const btnVoltar = document.getElementById('btn-voltar')
    const btnProximo = document.getElementById('btn-proximo')

    if (btnVoltar) {
        btnVoltar.disabled = passo === 1
    }

    if (btnProximo) {
        btnProximo.textContent = passo === steps.length ? 'Revisar dados' : 'Próximo'
    }

    atualizarIndicadorProgresso(passo)
}

const btnVoltar = document.getElementById('btn-voltar')
const btnProximo = document.getElementById('btn-proximo')

if (steps.length > 0) {
    mostrarPasso(passoAtual)
}

if (btnVoltar) {
    btnVoltar.addEventListener('click', function () {
        if (passoAtual > 1) {
            passoAtual--
            mostrarPasso(passoAtual)
        }
    })
}

if (btnProximo) {
    btnProximo.addEventListener('click', function () {
        if (!validarPasso(passoAtual)) return
        if (passoAtual < steps.length) {
            passoAtual++
            mostrarPasso(passoAtual)
        }
    })
}
