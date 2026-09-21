document.addEventListener('DOMContentLoaded', () => {

  // ==============================
  // 0. INTERAÇÃO NOS CARDS ODS
  // ==============================

  const cardsODS = document.querySelectorAll('.card-ods');

  cardsODS.forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.toggle('ativo');
    });
  });


  // ==============================
  // 1. LÓGICA DO QUIZ
  // ==============================

  const botoesValidar =
    document.querySelectorAll('.btn-validar');


  botoesValidar.forEach((botao) => {

    botao.addEventListener('click', () => {


      // Descobre qual pergunta está sendo respondida
      const nomePergunta =
        botao.dataset.pergunta;


      // Descobre qual é a resposta correta
      const respostaCorreta =
        botao.dataset.resposta;


      // Pega as opções daquela pergunta
      const opcoes =
        document.getElementsByName(nomePergunta);


      let respostaSelecionada = null;


      // Verifica qual opção foi selecionada
      opcoes.forEach((opcao) => {

        if (opcao.checked) {

          respostaSelecionada =
            opcao.value;

        }

      });


      // Encontra a caixa da pergunta atual
      const quizBox =
        botao.closest('.quiz-box');


      // Encontra o local onde será mostrado o resultado
      const resultado =
        quizBox.querySelector('.feedback');


      // ==============================
      // Nenhuma resposta selecionada
      // ==============================

      if (!respostaSelecionada) {

        resultado.style.color =
          '#ff9800';

        resultado.textContent =
          'Por favor, selecione uma resposta antes de enviar.';

        return;

      }


      // ==============================
      // Resposta correta
      // ==============================

      if (respostaSelecionada === respostaCorreta) {

        resultado.style.color =
          '#4caf50';

        resultado.textContent =
          'Resposta Correta! Muito bem! Você demonstrou um bom conhecimento sobre atendimento e vendas.';

      }


      // ==============================
      // Resposta incorreta
      // ==============================

      else {

        resultado.style.color =
          '#e50914';

        resultado.textContent =
          'Resposta Incorreta. Tente novamente e pense na melhor prática para atender e ajudar o cliente.';

      }

    });

  });



  // ==============================
  // 2. LÓGICA DO MURAL
  // ==============================

  const formVaga =
    document.getElementById('form-vaga');


  const listaOportunidades =
    document.getElementById('lista-oportunidades');


  if (!formVaga || !listaOportunidades) {

    return;

  }



  // ==============================
  // Oportunidades iniciais
  // ==============================

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
        localStorage.getItem(
          'capacita_oportunidades'
        );


      if (salvas) {

        return JSON.parse(salvas);

      }

    }

    catch (erro) {

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

    const oportunidades =
      obterOportunidades();


    listaOportunidades.innerHTML =
      '';


    if (oportunidades.length === 0) {

      listaOportunidades.innerHTML =
        '<p>Nenhuma oportunidade cadastrada no momento.</p>';

      return;

    }


    oportunidades.forEach((item) => {


      const card =
        document.createElement('div');


      card.className =
        'card-vaga';



      // Título
      const titulo =
        document.createElement('h4');


      titulo.textContent =
        item.titulo;



      // Categoria
      const categoria =
        document.createElement('span');


      categoria.innerHTML =
        `<strong>Categoria:</strong> ${item.categoria}`;



      // Quebra de linha
      const quebraLinha =
        document.createElement('br');



      // Contato
      const contato =
        document.createElement('span');


      contato.innerHTML =
        `<strong>Contato:</strong> ${item.contato}`;



      // Monta o card
      card.appendChild(titulo);

      card.appendChild(categoria);

      card.appendChild(quebraLinha);

      card.appendChild(contato);



      // Adiciona o card na lista
      listaOportunidades.appendChild(card);

    });

  }



  // ==============================
  // Adicionar nova oportunidade
  // ==============================

  formVaga.addEventListener(
    'submit',
    (e) => {


      // Evita recarregar a página
      e.preventDefault();



      // Pega os dados do formulário
      const titulo =
        document
          .getElementById('titulo')
          .value
          .trim();


      const categoria =
        document
          .getElementById('categoria')
          .value;


      const contato =
        document
          .getElementById('contato')
          .value
          .trim();



      // ==============================
      // Validação
      // ==============================

      if (!titulo || !categoria || !contato) {

        alert(
          'Preencha todos os campos.'
        );

        return;

      }



      // ==============================
      // Cria nova oportunidade
      // ==============================

      const novaOportunidade = {

        titulo: titulo,

        categoria: categoria,

        contato: contato

      };



      // Pega oportunidades existentes
      const oportunidades =
        obterOportunidades();



      // Coloca a nova no início da lista
      oportunidades.unshift(
        novaOportunidade
      );



      // ==============================
      // Salvar no navegador
      // ==============================

      try {

        localStorage.setItem(

          'capacita_oportunidades',

          JSON.stringify(
            oportunidades
          )

        );

      }


      catch (erro) {

        console.error(

          'Erro ao salvar oportunidade:',

          erro

        );


        alert(

          'Não foi possível salvar a oportunidade no navegador.'

        );


        return;

      }



      // Limpa o formulário
      formVaga.reset();



      // Atualiza a lista
      renderizarOportunidades();

    }

  );



  // ==============================
  // Inicializa o mural
  // ==============================

  renderizarOportunidades();

});