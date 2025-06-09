const ctxPizza = document.getElementById('graficoPizza').getContext('2d');
new Chart(ctxPizza, {
    type: 'pie',
    data: {
        labels: ['Alimentação', 'Transporte', 'Lazer'],
        datasets: [{
            data: [500, 200, 300],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    }
});

const ctxLinha = document.getElementById('graficoLinha').getContext('2d');
new Chart(ctxLinha, {
  type: 'line',
  data: {
    labels: ['01/06', '05/06', '10/06', '15/06'],
    datasets: [{
      label: 'Saldo',
      data: [2000, 1800, 2200, 2100],
      borderColor: '#4CAF50',
      fill: false
    }]
  }
});

document.getElementById('adicionarGasto').onclick = () => {
    document.getElementById('modalCadastro').style.display = 'block';
}

document.getElementById('fecharModal').onclick = () => {
    document.getElementById('modalCadastro').style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == document.getElementById('modalCadastro')) {
    document.getElementById('modalCadastro').style.display = 'none';
  }
};

document.getElementById('formCadastro').addEventListener('submit', function(e) {
  e.preventDefault();
  const tipo = document.getElementById('tipo').value;
  const valor = document.getElementById('valor').value;
  const data = document.getElementById('data').value;
  const categoria = document.getElementById('categoria').value;
  const descricao = document.getElementById('descricao').value;

  console.log(`Tipo: ${tipo}, Valor: R$${valor}, Data: ${data}, Categoria: ${categoria}, Descrição: ${descricao}`);

  document.getElementById('modalCadastro').style.display = 'none';

});

document.getElementById('verSugestoes').onclick = () => {
  document.getElementById('modalSugestoes').style.display = 'block';
};

document.getElementById('fecharSugestoes').onclick = () => {
  document.getElementById('modalSugestoes').style.display = 'none';
};

window.onclick = function(event) {
  if (event.target == document.getElementById('modalCadastro')) {
    document.getElementById('modalCadastro').style.display = 'none';
  } else if (event.target == document.getElementById('modalSugestoes')) {
    document.getElementById('modalSugestoes').style.display = 'none';
  }
};

const sugestoes = [
  'Diminua gastos com delivery para aumentar sua reserva.',
  'Tente usar transporte público ou apps de carona compartilhada.',
  'Faça uma planilha mensal para visualizar melhor os gastos fixos.',
  'Evite comprar no crédito sempre que possível.',
  'Defina um limite mensal para lazer e entretenimento.'
];

document.getElementById('novaSugestao').onclick = () => {
  const lista = document.getElementById('listaSugestoes');
  lista.innerHTML = ''; // Limpa lista anterior
  // Gera 3 sugestões aleatórias
  for (let i = 0; i < 3; i++) {
    const item = document.createElement('li');
    item.textContent = sugestoes[Math.floor(Math.random() * sugestoes.length)];
    lista.appendChild(item);
  }
};
