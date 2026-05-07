// ─── Helpers: detectar formato e borda escolhidos no passo 2 ─────────────────

function getFormato() {
    const checked = document.querySelector('input[name="formato"]:checked')
    return checked ? checked.value : null // 'Etiqueta' | 'Rolo Contínuo' | null
}

function temBorda() {
    const checked = document.querySelector('input[name="borda-etiqueta"]:checked')
    return checked ? checked.value !== 'Sem borda' : false
}

// ─── Atualizar visibilidade do passo 3 conforme escolhas do passo 2 ──────────

function atualizarPasso3() {
    const formato = getFormato()
    const bordas = temBorda()

    const camposEtiqueta = document.getElementById('campos-etiqueta')
    const camposRolo = document.getElementById('campos-rolo')
    const wrapBordasEtiqueta = document.getElementById('wrap-bordas-etiqueta')
    const wrapBordasRolo = document.getElementById('wrap-bordas-rolo')

    if (formato === 'Rolo Contínuo') {
        camposEtiqueta.style.display = 'none'
        camposRolo.style.display = 'block'
        wrapBordasRolo.style.display = bordas ? 'block' : 'none'
    } else {
        // Etiqueta (ou nenhum selecionado — padrão)
        camposEtiqueta.style.display = 'block'
        camposRolo.style.display = 'none'
        wrapBordasEtiqueta.style.display = bordas ? 'block' : 'none'
    }

    // Limpar erros e valores dos campos ocultos
    if (!bordas) {
        const gapBordas = document.getElementById('GapBordas')
        const gapBordasRolo = document.getElementById('GapBordasRolo')
        if (gapBordas) { gapBordas.value = ''; document.getElementById('erro-GapBordas').textContent = '' }
        if (gapBordasRolo) { gapBordasRolo.value = ''; document.getElementById('erro-GapBordasRolo').textContent = '' }
    }
}

// Ouvir mudanças no passo 2 para atualizar o passo 3 em tempo real
document.querySelectorAll('input[name="formato"]').forEach(radio => {
    radio.addEventListener('change', atualizarPasso3)
})
document.querySelectorAll('input[name="borda-etiqueta"]').forEach(radio => {
    radio.addEventListener('change', atualizarPasso3)
})

// ─────────────────────────────────────────────────────────────────────────────

const EMAILJS_SERVICE_ID = 'service_8nvrcqd'
const EMAILJS_TEMPLATE_ID = 'template_wt2pbsh'

function enviarEmail() {
    const formatoSelecionado = document.querySelector('input[name="formato"]:checked')
    const tamanhoRoloSelecionado = document.querySelector('input[name="tamanho-rolo"]:checked')
    const bordaSelecionada = document.querySelector('input[name="borda-etiqueta"]:checked')
    const formato = formatoSelecionado ? formatoSelecionado.value : 'Não informado'
    const isRolo = formato === 'Rolo Contínuo'

    const templateParams = {
        nome: document.getElementById('nome').value.trim(),
        empresa: document.getElementById('empresa').value.trim(),
        email_usuario: document.getElementById('email').value.trim(),
        telefone: document.getElementById('telefone').value.trim(),
        tamanho_rolo: tamanhoRoloSelecionado ? tamanhoRoloSelecionado.value + 'm' : 'Não informado',
        qtd_etiquetas: document.getElementById('qtd-etiquetas').value.trim(),
        tipo_impressora: document.getElementById('tipo-impressora').value.trim() || 'Não informado',
        especificacoes: document.getElementById('especificacoes').value.trim() || 'Nenhuma',
        tipo_etiqueta: isRolo
            ? document.getElementById('tipoEtiquetaRolo').value
            : document.getElementById('tipoEtiqueta').value,
        largura: isRolo
            ? document.getElementById('larguraRolo').value.trim()
            : document.getElementById('largura').value.trim(),
        altura: isRolo ? 'N/A' : document.getElementById('altura').value.trim(),
        qtd_colunas: isRolo ? 'N/A' : document.getElementById('qtd-colunas').value.trim(),
        gap_colunas: isRolo ? 'N/A' : document.getElementById('GapColunas').value.trim(),
        gap_linhas: isRolo ? 'N/A' : document.getElementById('GapLinhas').value.trim(),
        gap_bordas: temBorda()
            ? (isRolo
                ? document.getElementById('GapBordasRolo').value.trim()
                : document.getElementById('GapBordas').value.trim())
            : 'Sem borda',
        formato: formato,
        borda_etiqueta: bordaSelecionada ? bordaSelecionada.value : 'Não informado',
    }

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(function (response) {
            console.log('Email enviado.', response.status)
        })
        .catch(function (error) {
            console.error('Erro ao enviar email.', error)
        })
}

function AbrirWhatsApp() {
    const numero = "5511941370042"
    const url = `https://wa.me/${numero}`
    window.open(url, '_blank')
}

document.querySelectorAll('.whats').forEach(elemento => {
    elemento.addEventListener('click', AbrirWhatsApp)
})

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
    const telefone = document.getElementById('telefone')
    const qtdEtiquetas = document.getElementById('qtd-etiquetas')
    const alerta = document.getElementById('mensagem-alerta')

    const isRolo = getFormato() === 'Rolo Contínuo'
    const bordas = temBorda()

    // Campos comuns (passo 1 e 2)
    const campos = [
        { input: nome, erroId: 'erro-nome', mensagem: 'Informe o nome.' },
        { input: empresa, erroId: 'erro-empresa', mensagem: 'Informe a empresa.' },
        { input: email, erroId: 'erro-email', mensagem: 'Informe um email válido.' },
        { input: telefone, erroId: 'erro-telefone', mensagem: 'Informe o telefone para contato.' },
        { input: qtdEtiquetas, erroId: 'erro-qtd-etiquetas', mensagem: 'Informe a quantidade total de etiquetas.' },
    ]

    // Campos do passo 3 conforme formato
    if (isRolo) {
        campos.push({ input: document.getElementById('tipoEtiquetaRolo'), erroId: 'erro-tipoEtiquetaRolo', mensagem: 'Selecione o tipo de etiqueta.' })
        campos.push({ input: document.getElementById('larguraRolo'), erroId: 'erro-larguraRolo', mensagem: 'Informe a largura do rolo.' })
        if (bordas) campos.push({ input: document.getElementById('GapBordasRolo'), erroId: 'erro-GapBordasRolo', mensagem: 'Informe o tamanho das bordas.' })
    } else {
        campos.push({ input: document.getElementById('tipoEtiqueta'), erroId: 'erro-tipoEtiqueta', mensagem: 'Selecione o tipo de etiqueta.' })
        campos.push({ input: document.getElementById('largura'), erroId: 'erro-largura', mensagem: 'Informe a largura da etiqueta.' })
        campos.push({ input: document.getElementById('altura'), erroId: 'erro-altura', mensagem: 'Informe a altura da etiqueta.' })
        campos.push({ input: document.getElementById('qtd-colunas'), erroId: 'erro-qtd-colunas', mensagem: 'Informe a quantidade de colunas.' })
        campos.push({ input: document.getElementById('GapColunas'), erroId: 'erro-GapColunas', mensagem: 'Informe o espaço entre colunas.' })
        campos.push({ input: document.getElementById('GapLinhas'), erroId: 'erro-GapLinhas', mensagem: 'Informe o espaço entre linhas.' })
        if (bordas) campos.push({ input: document.getElementById('GapBordas'), erroId: 'erro-GapBordas', mensagem: 'Informe o tamanho das bordas.' })
    }

    campos.forEach(campo => {
        campo.input.classList.remove('erro')
        const spanErro = document.getElementById(campo.erroId)
        if (spanErro) spanErro.textContent = ''
    })

    let valido = true

    campos.forEach(campo => {
        if (!campo.input.value.trim()) {
            campo.input.classList.add('erro')
            const spanErro = document.getElementById(campo.erroId)
            if (spanErro) spanErro.textContent = campo.mensagem
            valido = false
        }
    })

    // Validação do telefone (mínimo 10 dígitos numéricos)
    const telDigitos = telefone.value.replace(/\D/g, '')
    if (telDigitos.length < 10) {
        telefone.classList.add('erro')
        const spanErroTel = document.getElementById('erro-telefone')
        if (spanErroTel) spanErroTel.textContent = 'Informe o telefone para contato.'
        valido = false
    }

    // Validação do email
    const emailValor = email.value.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (emailValor && !emailRegex.test(emailValor)) {
        email.classList.add('erro')
        const spanErroEmail = document.getElementById('erro-email')
        if (spanErroEmail) spanErroEmail.textContent = 'Informe um email válido (ex.: seuemail@empresa.com).'
        valido = false
    }

    // Validação dos grupos de radio (passo 2)
    const radioGrupos = [
        { name: 'formato', erroId: 'erro-formato', mensagem: 'Selecione o formato do produto.' },
        { name: 'tamanho-rolo', erroId: 'erro-tamanho-rolo', mensagem: 'Selecione o tamanho do rolo.' },
        { name: 'borda-etiqueta', erroId: 'erro-borda-etiqueta', mensagem: 'Selecione o tipo de borda.' }
    ]
    radioGrupos.forEach(grupo => {
        const selecionado = document.querySelector(`input[name="${grupo.name}"]:checked`)
        const spanErro = document.getElementById(grupo.erroId)
        if (!selecionado) {
            if (spanErro) spanErro.textContent = grupo.mensagem
            valido = false
        } else {
            if (spanErro) spanErro.textContent = ''
        }
    })

    if (!valido) {
        alerta.textContent = 'Por favor, preencha ou corrija os campos destacados em todos os passos.'
        alerta.style.display = 'block'
        setTimeout(() => { alerta.style.display = 'none' }, 3000)
        return false
    }

    if (verificarBot()) {
        alerta.textContent = 'Erro ao processar sua solicitação. Tente novamente.'
        alerta.style.display = 'block'
        setTimeout(() => { alerta.style.display = 'none' }, 3000)
        return false
    }

    return true
}

const camposMedida = document.querySelectorAll('.validar-max')

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
    const impressora = document.querySelector('input[id="tipo-impressora"]').value.trim()
    const detalhes = document.querySelector('textarea[id="especificacoes"]').value.trim()
    const qtdEtiquetas = document.querySelector('input[id="qtd-etiquetas"]').value.trim()

    const formatoSelecionado = document.querySelector('input[name="formato"]:checked')
    const formato = formatoSelecionado ? formatoSelecionado.value : 'Não informado'
    const isRolo = formato === 'Rolo Contínuo'
    const bordas = temBorda()

    const tamanhoRoloSelecionado = document.querySelector('input[name="tamanho-rolo"]:checked')
    const tamanho = tamanhoRoloSelecionado ? tamanhoRoloSelecionado.value + 'm' : 'Não informado'

    const bordaSelecionada = document.querySelector('input[name="borda-etiqueta"]:checked')
    const borda = bordaSelecionada ? bordaSelecionada.value : 'Não informado'

    let mensagem

    if (isRolo) {
        const tipo = document.getElementById('tipoEtiquetaRolo').value
        const larguraRolo = document.getElementById('larguraRolo').value.trim()
        const gapBordasRolo = bordas ? document.getElementById('GapBordasRolo').value.trim() : null

        mensagem = `Olá, me chamo *${nome}* sou da *${empresa}* e gostaria de solicitar um orçamento:

        *Dados de contato:*
        • Email: ${email}
        • Telefone: ${telefone}

        *Quantidade e Formato:*
        • Formato: ${formato}
        • Tamanho do Rolo: ${tamanho}
        • Tipo de Borda: ${borda}
        • Quantidade de Rolos: ${qtdEtiquetas}
        • Impressora: ${impressora || 'Não informado'}
        • Detalhes: ${detalhes || 'Nenhum'}

        *Informações do Rolo Contínuo:*
        • Tipo: ${tipo}
        • Largura do Rolo: ${larguraRolo}mm
        ${gapBordasRolo ? `• Bordas: ${gapBordasRolo}mm` : '• Bordas: Sem borda'}
        
        Aguardamos o retorno com o orçamento. Obrigado(a)!`
    } else {
        const tipo = document.getElementById('tipoEtiqueta').value
        const largura = document.querySelector('input[id="largura"]').value.trim()
        const altura = document.querySelector('input[id="altura"]').value.trim()
        const colunas = document.querySelector('input[id="qtd-colunas"]').value.trim()
        const gapColunas = document.querySelector('input[id="GapColunas"]').value.trim()
        const gapLinhas = document.querySelector('input[id="GapLinhas"]').value.trim()
        const gapBordas = bordas ? document.getElementById('GapBordas').value.trim() : null

        const vLargura = parseFloat(largura) || 0
        const vColunas = parseInt(colunas) || 0
        const vGapCol = parseFloat(gapColunas) || 0
        const vBorda = parseFloat(gapBordas) || 0
        const larguraTotal = (vLargura * vColunas) + (vGapCol * (vColunas - 1)) + (vBorda * 2)

        mensagem = `Olá, me chamo *${nome}* sou da *${empresa}* e gostaria de solicitar um orçamento:

        *Dados de contato:*
        • Email: ${email}
        • Telefone: ${telefone}

        *Quantidade e Formato:*
        • Formato: ${formato}
        • Tamanho do Rolo: ${tamanho}
        • Tipo de Borda: ${borda}
        • Quantidade de Rolos: ${qtdEtiquetas}
        • Impressora: ${impressora || 'Não informado'}
        • Detalhes: ${detalhes || 'Nenhum'}

        *Informações da etiqueta:*
        • Tipo: ${tipo}
        • Tamanho: ${largura}mm x ${altura}mm
        • Colunas: ${colunas}
        • Espaçamentos (Gap): C: ${gapColunas}mm / L: ${gapLinhas}mm
        ${gapBordas ? `• Bordas: ${gapBordas}mm` : '• Bordas: Sem borda'}
        • *Largura Total:* ${larguraTotal}mm
        
        Aguardamos o retorno com o orçamento. Obrigado(a)!`
    }

    // const numero = "5511941370042"
    const numero = "5554999126702"
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
    window.open(url, '_blank')

    abrirModal()
    enviarEmail()
}

document.querySelector('.menu').addEventListener('click', function () {
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
})

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

const campoParaBots = document.getElementById('bot')
function verificarBot() {
    return campoParaBots.value.trim() ? true : false
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
        const exemploContainer = document.getElementById('exemplo-container')
        const rect = exemploContainer.getBoundingClientRect()
        const containerW = rect.width
        const containerH = rect.height

        const areaMaxW = containerW * 0.48
        const areaMaxH = containerH * 0.50

        const proporcaoGrade = (numColunas * vLargura) / (numLinhas * vAltura)

        let finalW = areaMaxW
        let finalH = finalW / proporcaoGrade

        if (finalH > areaMaxH) {
            finalH = areaMaxH
            finalW = finalH * proporcaoGrade
        }

        containerGrade.style.width = finalW + "px"
        containerGrade.style.height = finalH + "px"
        containerGrade.style.gridTemplateColumns = `repeat(${numColunas}, 1fr)`
        containerGrade.style.gridTemplateRows = `repeat(${numLinhas}, 1fr)`
        containerGrade.style.columnGap = vGapColunas + "px"
        containerGrade.style.rowGap = vGapLinhas + "px"
        containerGrade.style.padding = vGapBordas + "px"
        containerGrade.style.boxSizing = "border-box"
        containerGrade.style.top = (containerH * 0.40) + "px"
        containerGrade.style.left = (containerW * 0.16) + "px"

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
GapLinhas.addEventListener('input', atualizarPrevia)

const maxLarguraOriginal = parseFloat(Largura.max) || 200

function recalcularMaxLargura() {
    const numColunas = parseInt(Colunas.value) || 1
    const vBordas = parseFloat(GapBordas.value) || 0
    const vGapCol = parseFloat(GapColunas.value) || 0

    const larguraMaxPorColuna = Math.floor((maxLarguraOriginal - (vBordas * 2) - (vGapCol * (numColunas - 1))) / numColunas)
    Largura.max = larguraMaxPorColuna

    if (parseFloat(Largura.value) > larguraMaxPorColuna) {
        Largura.value = larguraMaxPorColuna
    }
}

Colunas.addEventListener('input', () => {
    recalcularMaxLargura()
    atualizarPrevia()
})

GapBordas.addEventListener('input', () => {
    recalcularMaxLargura()
    atualizarPrevia()
})

GapColunas.addEventListener('input', () => {
    recalcularMaxLargura()
    atualizarPrevia()
})

const exemploContainerEl = document.getElementById('exemplo-container')
if (exemploContainerEl && typeof ResizeObserver !== 'undefined') {
    const resizeObserver = new ResizeObserver(() => {
        atualizarPrevia()
    })
    resizeObserver.observe(exemploContainerEl)
}

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

    if (numeroArray.length > 0) {
        numeroFormatado += `(${numeroArray.slice(0, 2).join("")})`
    }
    if (numeroArray.length > 2) {
        numeroFormatado += ` ${numeroArray.slice(2, 7).join("")}`
    }
    if (numeroArray.length > 7) {
        numeroFormatado += `-${numeroArray.slice(7, 11).join("")}`
    }

    telefone.value = numeroFormatado
})

const steps = document.querySelectorAll('.form-step')
let passoAtual = 1

const camposPorPasso = {
    1: [
        { id: 'nome', erroId: 'erro-nome', mensagem: 'Informe o nome.' },
        { id: 'empresa', erroId: 'erro-empresa', mensagem: 'Informe a empresa.' },
        { id: 'email', erroId: 'erro-email', mensagem: 'Informe um email válido.' },
        { id: 'telefone', erroId: 'erro-telefone', mensagem: 'Informe o telefone para contato.' }
    ],
    2: [
        { id: 'qtd-etiquetas', erroId: 'erro-qtd-etiquetas', mensagem: 'Informe a quantidade total de etiquetas.' }
    ]
}

// Passo 3 é dinâmico — calculado em tempo real dentro de validarPasso

function validarPasso(passo) {
    const campos = (camposPorPasso[passo] || []).slice() // cópia
    const alerta = document.getElementById('mensagem-alerta')
    let valido = true

    // Campos dinâmicos do passo 3
    if (passo === 3) {
        const isRolo = getFormato() === 'Rolo Contínuo'
        const bordas = temBorda()
        if (isRolo) {
            campos.push({ id: 'tipoEtiquetaRolo', erroId: 'erro-tipoEtiquetaRolo', mensagem: 'Selecione o tipo de etiqueta.' })
            campos.push({ id: 'larguraRolo', erroId: 'erro-larguraRolo', mensagem: 'Informe a largura do rolo.' })
            if (bordas) campos.push({ id: 'GapBordasRolo', erroId: 'erro-GapBordasRolo', mensagem: 'Informe o tamanho das bordas.' })
        } else {
            campos.push({ id: 'tipoEtiqueta', erroId: 'erro-tipoEtiqueta', mensagem: 'Selecione o tipo de etiqueta.' })
            campos.push({ id: 'largura', erroId: 'erro-largura', mensagem: 'Informe a largura da etiqueta.' })
            campos.push({ id: 'altura', erroId: 'erro-altura', mensagem: 'Informe a altura da etiqueta.' })
            campos.push({ id: 'qtd-colunas', erroId: 'erro-qtd-colunas', mensagem: 'Informe a quantidade de colunas.' })
            campos.push({ id: 'GapColunas', erroId: 'erro-GapColunas', mensagem: 'Informe o espaço entre colunas.' })
            campos.push({ id: 'GapLinhas', erroId: 'erro-GapLinhas', mensagem: 'Informe o espaço entre linhas.' })
            if (bordas) campos.push({ id: 'GapBordas', erroId: 'erro-GapBordas', mensagem: 'Informe o tamanho das bordas.' })
        }
    }

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
        // Validação do telefone (mínimo 10 dígitos)
        const telInput = document.getElementById('telefone')
        const digitos = telInput.value.replace(/\D/g, '')
        if (digitos.length < 10) {
            telInput.classList.add('erro')
            const spanErroTel = document.getElementById('erro-telefone')
            if (spanErroTel) spanErroTel.textContent = 'Informe o telefone para contato.'
            valido = false
        }

        // Validação do email
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

    if (passo === 2) {
        // Validação dos grupos de radio
        const radioGrupos = [
            { name: 'formato', erroId: 'erro-formato', mensagem: 'Selecione o formato do produto.' },
            { name: 'tamanho-rolo', erroId: 'erro-tamanho-rolo', mensagem: 'Selecione o tamanho do rolo.' },
            { name: 'borda-etiqueta', erroId: 'erro-borda-etiqueta', mensagem: 'Selecione o tipo de borda.' }
        ]
        radioGrupos.forEach(grupo => {
            const selecionado = document.querySelector(`input[name="${grupo.name}"]:checked`)
            const spanErro = document.getElementById(grupo.erroId)
            if (!selecionado) {
                if (spanErro) spanErro.textContent = grupo.mensagem
                valido = false
            } else {
                if (spanErro) spanErro.textContent = ''
            }
        })
    }

    if (!valido && alerta) {
        alerta.textContent = 'Por favor, preencha ou corrija os campos destacados.'
        alerta.style.display = 'block'
        setTimeout(() => { alerta.style.display = 'none' }, 3000)
    }

    return valido
}

function atualizarIndicadorProgresso(passo) {
    for (let i = 1; i <= steps.length; i++) {
        const bolha = document.getElementById(`bolha-${i}`)
        if (!bolha) continue
        bolha.classList.remove('active', 'concluido')
        if (i < passo) bolha.classList.add('concluido')
        else if (i === passo) bolha.classList.add('active')
    }
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

    if (btnVoltar) btnVoltar.disabled = passo === 1
    if (btnProximo) btnProximo.textContent = passo === steps.length ? 'Revisar dados' : 'Próximo'

    atualizarIndicadorProgresso(passo)

    // Atualiza campos do passo 3 conforme escolhas do passo 2
    if (passo === 3) atualizarPasso3()
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

function abrirModal() {
    document.querySelector('header').style.position = 'fixed'
    document.getElementById('modal').classList.add('ativo')
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
}

const btnModal = document.getElementById('btn-modal')

btnModal.addEventListener('click', function () {
    document.querySelector('header').style.position = 'sticky'
    document.getElementById('modal').classList.remove('ativo')
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
})

document.querySelectorAll('input[step="0.1"]').forEach(input => {
    input.addEventListener('input', function () {
        let v = this.value.replace(/[^0-9.]/g, '')

        const parts = v.split('.')
        if (parts.length > 2) {
            v = parts[0] + '.' + parts.slice(1).join('')
        }
        if (parts.length > 1) {
            v = parts[0] + '.' + parts[1].substring(0, 1)
        }

        this.value = v
    })
})

document.querySelectorAll('input:not([step="0.1"])').forEach(input => {
    if (input.type === 'number' || input.type === 'tel') {
        input.addEventListener('keydown', function (e) {
            if (['.', ',', '+', '-', 'e'].includes(e.key)) {
                e.preventDefault()
            }
        })
    }
})

// Highlight visual dos cards de radio
document.querySelectorAll('.opcoes-card-grupo').forEach(grupo => {
    grupo.querySelectorAll('.opcao-card').forEach(card => {
        card.addEventListener('click', () => {
            const radio = card.querySelector('input[type="radio"]')
            if (!radio) return
            document.querySelectorAll(`input[name="${radio.name}"]`).forEach(r => {
                r.closest('.opcao-card').classList.remove('opcao-card--selecionado')
            })
            card.classList.add('opcao-card--selecionado')
        })
    })
})
