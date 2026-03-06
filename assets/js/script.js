function AbrirWhatsApp() {
    const numero = "5554999126702"
    const url = `https://wa.me/${numero}`
    window.open(url, '_blank')
}

const form = document.getElementById('formOrcamento')
form.addEventListener('submit', function(event) {
    event.preventDefault()

    if (validarFormulario()) {
        enviarWhatsAppPronto()
    }
})

function validarFormulario() {
    const nome = document.querySelector('input[placeholder="Nome"]').value.trim()
    const empresa = document.querySelector('input[placeholder="Empresa"]').value.trim()
    const email = document.querySelector('input[placeholder="Email para Contato"]').value.trim()
    const tipo = document.getElementById('tipoEtiqueta').value
    const detalhes = document.querySelector('textarea').value.trim()

    const alerta = document.getElementById('mensagem-alerta')

    if (!nome || !empresa || !email || !tipo || !detalhes) {
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
    const nome = document.querySelector('input[placeholder="Nome"]').value.trim()
    const empresa = document.querySelector('input[placeholder="Empresa"]').value.trim()
    const email = document.querySelector('input[placeholder="Email para Contato"]').value.trim()
    const tipo = document.getElementById('tipoEtiqueta').value
    const detalhes = document.querySelector('textarea').value.trim()
    
    const mensagem = `Olá, gostaria de um orçamento:

    Nome: ${nome}
    Empresa: ${empresa}
    Email: ${email}
    Tipo de etiqueta: ${tipo}
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
window.onscroll = function() {
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
    }else {
        return false
    }
}