function AbrirWhatsApp() {
    const numero = "5554999126702"
    const url = `https://wa.me/${numero}`
    window.open(url, '_blank')
}

function enviarWhatsAppPronto() {
    const nome = document.querySelector('input[placeholder="Nome"]').value
    const empresa = document.querySelector('input[placeholder="Empresa"]').value
    const email = document.querySelector('input[placeholder="Email para Contato"]').value
    const tipo = document.getElementById('tipoEtiqueta').value
    const detalhes = document.querySelector('textarea').value

    if (!nome.trim() || !empresa.trim() || !email.trim() || !tipo || !detalhes.trim()) {
        const alerta = document.getElementById('mensagem-alerta')
        alerta.style.display = 'block'
        
        setTimeout(() => {
            alerta.style.display = 'none'
        }, 3000)
        return
    }

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
    const nav = document.getElementById('header')
    const btn = document.querySelector('.menu')

    nav.classList.toggle('active')

    if (nav.classList.contains('active')) {
        btn.style.color = 'black'
        btn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    } else {
        btn.style.color = 'black'
        btn.innerHTML = '<i class="fa-solid fa-bars"></i>'
    }
}