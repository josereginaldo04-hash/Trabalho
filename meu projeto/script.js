document.addEventListener('DOMContentLoaded', () => {

  // --- 1. LÓGICA DO QUIZ (ODS 4) ---
  const btnValidar = document.getElementById('btn-validar');
  const quizResultado = document.getElementById('quiz-resultado');

  btnValidar.addEventListener('click', () => {
    const opcoes = document.getElementsByName('resposta');
    let respostaSelecionada = null;

    opcoes.forEach(opcao => {
      if (opcao.checked) {
        respostaSelecionada = opcao.value;
      }
    });

    if (!respostaSelecionada) {
      quizResultado.style.color = '#ff9800';
      quizResultado.textContent = 'Por favor, selecione uma resposta antes de enviar.';
      return;
    }

    if (respostaSelecionada === 'B') {
      quizResultado.style.color = '#4caf50';
      quizResultado.textContent = 'Resposta Correta! Você demonstrou excelente inteligência emocional e foco na solução.';
    } else {
      quizResultado.style.color = '#e50914';
      quizResultado.textContent = 'Resposta Incorreta. O foco deve ser sempre ouvir o cliente e resolver o problema de forma empática.';
    }
  });


  // --- 2. LÓGICA DO MURAL DE VAGAS/SERVIÇOS (ODS 1 & 8) ---
  const formVaga = document.getElementById('form-vaga');
  const listaOportunidades = document.getElementById('lista-oportunidades');

  // Vagas padrão de exemplo
  const oportunidadesIniciais = [
    { titulo: 'Atendente de Lanchonete', categoria: 'Atendimento', contato: '(81) 98888-1111' },
    { titulo: 'Pintura de Fachada / Residência', categoria: 'Serviços Gerais', contato: '(81) 97777-2222' }
  ];

  // Carregar oportunidades salvas no localStorage ou usar as iniciais
  function obterOportunidades() {
    const salvas = localStorage.getItem('capacita_oportunidades');
    return salvas ? JSON.parse(salvas) : oportunidadesIniciais;
  }

  // Renderizar a lista na tela
  function renderizarOportunidades() {
    const oportunidades = obterOportunidades();
    listaOportunidades.innerHTML = '';

    if (oportunidades.length === 0) {
      listaOportunidades.innerHTML = '<p>Nenhuma oportunidade cadastrada no momento.</p>';
      return;
    }

    oportunidades.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card-vaga';
      card.innerHTML = `
        <h4>${item.titulo}</h4>
        <span><strong>Categoria:</strong> ${item.categoria}</span><br>
        <span><strong>Contato:</strong> ${item.contato}</span>
      `;
      listaOportunidades.appendChild(card);
    });
  }

  // Adicionar nova oportunidade
  formVaga.addEventListener('submit', (e) => {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value.trim();
    const categoria = document.getElementById('categoria').value;
    const contato = document.getElementById('contato').value.trim();

    if (titulo && categoria && contato) {
      const novaOportunidade = { titulo, categoria, contato };
      const oportunidades = obterOportunidades();
      
      // Adiciona no topo da lista
      oportunidades.unshift(novaOportunidade);

      // Salva no localStorage
      localStorage.setItem('capacita_oportunidades', JSON.stringify(oportunidades));

      // Limpa formulário e atualiza tela
      formVaga.reset();
      renderizarOportunidades();
    }
  });

  // Inicializa o mural ao carregar a página
  renderizarOportunidades();
});