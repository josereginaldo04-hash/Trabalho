document.addEventListener('DOMContentLoaded', () => {

  // ==============================
  // 1. LÓGICA DO QUIZ
  // ==============================

  const btnValidar = document.getElementById('btn-validar');
  const quizResultado = document.getElementById('quiz-resultado');

  if (btnValidar && quizResultado) {

    btnValidar.addEventListener('click', () => {

      const opcoes = document.getElementsByName('resposta');
      let respostaSelecionada = null;

      opcoes.forEach((opcao) => {
        if (opcao.checked) {
          respostaSelecionada = opcao.value;
        }
      });

      if (!respostaSelecionada) {
        quizResultado.style.color = '#ff9800';
        quizResultado.textContent =
          'Por favor, selecione uma resposta antes de enviar.';
        return;
      }

      if (respostaSelecionada === 'B') {

        quizResultado.style.color = '#4caf50';
        quizResultado.textContent =
          'Resposta Correta! Você demonstrou excelente inteligência emocional e foco na solução.';

      } else {

        quizResultado.style.color = '#e50914';
        quizResultado.textContent =
          'Resposta Incorreta. O foco deve ser sempre ouvir o cliente e resolver o problema de forma empática.';

      }

    });

  }


  // ==============================
  // 2. LÓGICA DO MURAL
  // ==============================

  const formVaga = document.getElementById('form-vaga');
  const listaOportunidades =
    document.getElementById('lista-oportunidades');

  if (!formVaga || !listaOportunidades) {
    return;
  }


  // Oportunidades iniciais
  const oportunidadesIniciais = [
    {
      titulo: 'Atendente de Lanchonete',
      categoria: 'Atendimento',
      contato: '(81) 98888-1111'
    },
    {
      titulo: 'Pintura de Fachada / Residência',
      categoria: 'Serviços Gerais',
      contato: '(81) 97777-2222'
    }
  ];


  // ==============================
  // Obter oportunidades
  // ==============================

  function obterOportunidades() {

    try {

      const salvas =
        localStorage.getItem('capacita_oportunidades');

      if (salvas) {
        return JSON.parse(salvas);
      }

    } catch (erro) {

      console.error(
        'Erro ao carregar oportunidades:',
        erro
      );

    }

    return [...oportunidadesIniciais];
  }


  // ==============================
  // Renderizar oportunidades
  // ==============================

  function renderizarOportunidades() {

    const oportunidades = obterOportunidades();

    listaOportunidades.innerHTML = '';

    if (oportunidades.length === 0) {

      listaOportunidades.innerHTML =
        '<p>Nenhuma oportunidade cadastrada no momento.</p>';

      return;
    }

    oportunidades.forEach((item) => {

      const card = document.createElement('div');

      card.className = 'card-vaga';

      const titulo = document.createElement('h4');
      titulo.textContent = item.titulo;

      const categoria = document.createElement('span');
      categoria.innerHTML =
        `<strong>Categoria:</strong> ${item.categoria}`;

      const quebraLinha = document.createElement('br');

      const contato = document.createElement('span');
      contato.innerHTML =
        `<strong>Contato:</strong> ${item.contato}`;

      card.appendChild(titulo);
      card.appendChild(categoria);
      card.appendChild(quebraLinha);
      card.appendChild(contato);

      listaOportunidades.appendChild(card);

    });

  }


  // ==============================
  // Adicionar nova oportunidade
  // ==============================

  formVaga.addEventListener('submit', (e) => {

    e.preventDefault();

    const titulo =
      document.getElementById('titulo').value.trim();

    const categoria =
      document.getElementById('categoria').value;

    const contato =
      document.getElementById('contato').value.trim();


    if (!titulo || !categoria || !contato) {

      alert('Preencha todos os campos.');

      return;
    }


    const novaOportunidade = {
      titulo: titulo,
      categoria: categoria,
      contato: contato
    };


    const oportunidades = obterOportunidades();

    oportunidades.unshift(novaOportunidade);


    try {

      localStorage.setItem(
        'capacita_oportunidades',
        JSON.stringify(oportunidades)
      );

    } catch (erro) {

      console.error(
        'Erro ao salvar oportunidade:',
        erro
      );

      alert(
        'Não foi possível salvar a oportunidade no navegador.'
      );

      return;
    }


    formVaga.reset();

    renderizarOportunidades();

  });


  // Inicializa o mural
  renderizarOportunidades();

});