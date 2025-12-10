function mudarCor(cor) {
    const imagem = document.getElementById('carro-img');
    const texto = document.getElementById('nome-cor');

    if (cor === 'vermelho') {
        imagem.src = 'carro-vermelho.png'; // Você precisa ter essa imagem na pasta
        texto.innerText = 'Vermelho Guarda';
    } else if (cor === 'preto') {
        imagem.src = 'carro-preto.png';
        texto.innerText = 'Preto Jet';
    } else {
        imagem.src = 'carro-prata.png';
        texto.innerText = 'Prata Metálico';
    }
}




// Função para mudar a cor DENTRO do Modal (agora recebe o ID da imagem específica)
function mudarCorModal(cor, idImagem, idTexto, nomeCarro) {
    const img = document.getElementById(idImagem);
    const texto = document.getElementById(idTexto);
    
    // Troque os links abaixo pelas suas imagens reais
    if (cor === 'vermelho') {
        img.src = `https://placehold.co/800x400/ce0000/white?text=${nomeCarro}+Vermelho`;
        texto.innerText = 'Vermelho Guarda';
    } else if (cor === 'preto') {
        img.src = `https://placehold.co/800x400/111/white?text=${nomeCarro}+Preto`;
        texto.innerText = 'Preto Jet Metálico';
    } else {
        img.src = `https://placehold.co/800x400/silver/white?text=${nomeCarro}+Prata`;
        texto.innerText = 'Prata Metálico';
    }
}

// Função do Botão Comprar
function comprar(modelo) {
    // Aqui você pode redirecionar para o WhatsApp ou mostrar um alerta
    alert(`Ótima escolha! Você iniciou a compra do ${modelo}. Um vendedor entrará em contato.`);
    // Exemplo WhatsApp: window.open(`https://wa.me/5511999999999?text=Quero comprar o ${modelo}`);
}



function calcularFinanciamento() {
    // 1. Pegar valores
    const valorVeiculo = Number(document.getElementById('selectVeiculo').value);
    const entrada = Number(document.getElementById('inputEntrada').value);
    const parcelas = Number(document.getElementById('inputParcelas').value);
    const divResultado = document.getElementById('resultado-financiamento');
    const formatoMoeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    // 2. Validação básica
    if (valorVeiculo === 0) {
        alert("Por favor, selecione um veículo primeiro.");
        return;
    }

    // --- CENÁRIO A: PAGAMENTO À VISTA (NOVO) ---
    if (parcelas === 1) {
        const desconto = 0.05; // 5% de desconto
        const valorComDesconto = valorVeiculo * (1 - desconto);
        const economia = valorVeiculo - valorComDesconto;

        divResultado.innerHTML = `
            <div class="text-success">
                <h5 class="fw-bold mb-1">Preço Final: ${formatoMoeda.format(valorComDesconto)}</h5>
                <small>Pagamento único à vista</small>
            </div>
            <hr>
            <small class="text-muted">Você economizou: <strong>${formatoMoeda.format(economia)}</strong> (5% OFF)</small>
        `;
        divResultado.classList.remove('d-none');
        return; // Para a função aqui, não precisa calcular juros
    }

    // --- CENÁRIO B: FINANCIAMENTO (Lógica anterior) ---
    
    // Valida entrada apenas se for financiado
    if (entrada >= valorVeiculo) {
        alert("A entrada não pode ser maior que o valor do carro.");
        return;
    }

    // Definir Juros
    let taxaJuros = 0;
    if (parcelas === 24) taxaJuros = 0.0099;
    else if (parcelas === 36) taxaJuros = 0.0119;
    else if (parcelas > 36) taxaJuros = 0.0149;

    const valorFinanciado = valorVeiculo - entrada;
    let valorParcela = 0;

    if (taxaJuros === 0) {
        valorParcela = valorFinanciado / parcelas;
    } else {
        valorParcela = (valorFinanciado * taxaJuros) / (1 - Math.pow(1 + taxaJuros, -parcelas));
    }

    const totalPagar = (valorParcela * parcelas) + entrada;

    divResultado.innerHTML = `
        <h5 class="fw-bold mb-1">Valor da Parcela: ${formatoMoeda.format(valorParcela)}</h5>
        <small class="text-muted">Em ${parcelas}x com entrada de ${formatoMoeda.format(entrada)}</small>
        <hr>
        <small>Total a prazo: ${formatoMoeda.format(totalPagar)}</small>
    `;
    divResultado.classList.remove('d-none');
}