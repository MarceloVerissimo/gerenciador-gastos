let transacoes = [];
let graficoPizza;
let graficoLinha;

function renderizarGraficoPizza() {
  const categorias = {};
  
  // Somar valores por categoria
  transacoes.forEach((t) => {
    if (!categorias[t.categoria]) {
      categorias[t.categoria] = 0;
    }
    categorias[t.categoria] += t.valor;
  });

  const ctx = document.getElementById('graficoPizza').getContext('2d');

  if (graficoPizza) graficoPizza.destroy();

  graficoPizza = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(categorias),
      datasets: [{
        label: 'Gastos por Categoria',
        data: Object.values(categorias),
        backgroundColor: gerarCores(Object.keys(categorias).length),
        borderColor: '#fff',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: R$ ${context.parsed.toFixed(2)}`;
            }
          }
        }
      }
    }
  });
}

function gerarCores(qtd) {
  const cores = [];

  for (let i = 0; i < qtd; i++) {
    const cor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
    cores.push(cor);
  }

  return cores;
}

function renderizarGraficoLinha() {
  let saldoAcumulado = 0;
  const saldos = [];
  const datas = [];

  transacoes.forEach((t) => {
    if (t.tipo === 'entrada') {
      saldoAcumulado += t.valor;
    } else {
      saldoAcumulado -= t.valor;
    }
    saldos.push(saldoAcumulado);
    datas.push(t.data);
  });

  const ctx = document.getElementById('graficoLinha').getContext('2d');

  if (graficoLinha) graficoLinha.destroy();

  graficoLinha = new Chart(ctx, {
    type: 'line',
    data: {
      labels: datas,
      datasets: [{
        label: 'Saldo Acumulado',
        data: saldos,
        backgroundColor: 'rgba(103, 58, 183, 0.2)',
        borderColor: '#673ab7',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

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
  const valor = parseFloat(document.getElementById('valor').value);
  const data = document.getElementById('data').value;
  const categoria = document.getElementById('categoria').value;
  const descricao = document.getElementById('descricao').value;

  const novaTransacao = {
    tipo,
    valor,
    data,
    categoria,
    descricao
  };

  transacoes.push(novaTransacao);

  atualizarDashboard();
  document.getElementById('formCadastro').reset();
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
  lista.innerHTML = '';

  for (let i = 0; i < 3; i++) {
    const item = document.createElement('li');
    item.textContent = sugestoes[Math.floor(Math.random() * sugestoes.length)];
    lista.appendChild(item);
  }
};

function atualizarDashboard() {
  let entradas = 0;
  let saidas = 0;

  const tabelaBody = document.querySelector('#tabelaTransacoes tbody');
  tabelaBody.innerHTML = '';

  transacoes.forEach((t) => {
    if (t.tipo === 'entrada') {
      entradas += t.valor;
    } else {
      saidas += t.valor;
    }

    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>${t.tipo}</td>
      <td>R$ ${t.valor.toFixed(2)}</td>
      <td>${t.data}</td>
      <td>${t.categoria}</td>
      <td>${t.descricao}</td>
    `;
    tabelaBody.appendChild(linha);
  });

  const saldo = entradas - saidas;

  document.getElementById('valorEntradas').textContent = `R$ ${entradas.toFixed(2)}`;
  document.getElementById('valorSaidas').textContent = `R$ ${saidas.toFixed(2)}`;
  document.getElementById('valorSaldo').textContent = `R$ ${saldo.toFixed(2)}`;


  renderizarGraficoPizza();
  renderizarGraficoLinha();
}


