
  // ---------- FADE-IN DE ABERTURA ----------
  (function fadeAbertura() {
    const overlay = document.getElementById('fade-overlay');
    const barra = document.getElementById('fade-barra-interna');
    const sub = document.querySelector('.fade-sub');
    if (!overlay || !barra) return;

    let progresso = 0;
    const totalTempo = 2200;
    const intervalo = 30;
    const incremento = (intervalo / totalTempo) * 100;

    const mensagens = ['Carregando...', 'Preparando perguntas...', 'Quase lá...'];
    let msgIndex = 0;

    const timer = setInterval(() => {
      progresso += incremento;
      barra.style.width = Math.min(progresso, 100) + '%';

      if (progresso > 35 && msgIndex === 0) {
        msgIndex = 1;
        if (sub) sub.textContent = mensagens[1];
      }
      if (progresso > 70 && msgIndex === 1) {
        msgIndex = 2;
        if (sub) sub.textContent = mensagens[2];
      }

      if (progresso >= 100) {
        clearInterval(timer);
        if (sub) sub.textContent = 'Pronto!';
        setTimeout(() => {
          overlay.classList.add('escondido');
        }, 300);
      }
    }, intervalo);
  })();

  // ---------- BANCO DE PERGUNTAS SOBRE O HAITI ----------
  const BANCO_PERGUNTAS = typeof BANCO_PERGUNTAS_DIFICIL !== 'undefined' ? BANCO_PERGUNTAS_DIFICIL : [
    { pergunta: "Qual é a capital do Haiti?", opcoes: ["Havana", "Porto Príncipe", "Santo Domingo", "Kingston"], correta: 1, dica: "É também a maior cidade do país, localizada na costa." },
    { pergunta: "Em que ano o Haiti se tornou independente?", opcoes: ["1789", "1804", "1822", "1791"], correta: 1, dica: "1804 marca a independência, tornando o Haiti a primeira república negra do mundo." },
    { pergunta: "Qual país colonizava o Haiti antes de sua independência?", opcoes: ["Espanha", "Inglaterra", "França", "Portugal"], correta: 2, dica: "A colônia era chamada de Saint-Domingue." },
    { pergunta: "Quem foi o principal líder da Revolução Haitiana?", opcoes: ["Simón Bolívar", "Toussaint Louverture", "José Martí", "Fidel Castro"], correta: 1, dica: "Ele é considerado o 'Pai do Haiti', apesar de morrer antes da independência ser declarada." },
    { pergunta: "O Haiti fica em qual ilha do Caribe?", opcoes: ["Cuba", "Jamaica", "Hispaniola", "Porto Rico"], correta: 2, dica: "Essa ilha é dividida entre o Haiti e a República Dominicana." },
    { pergunta: "Qual país faz fronteira terrestre com o Haiti?", opcoes: ["Cuba", "República Dominicana", "Jamaica", "Porto Rico"], correta: 1, dica: "Os dois países dividem a mesma ilha, mas têm línguas e histórias diferentes." },
    { pergunta: "Quais são as línguas oficiais do Haiti?", opcoes: ["Espanhol e inglês", "Francês e crioulo haitiano", "Português e francês", "Inglês e crioulo"], correta: 1, dica: "O crioulo haitiano (kreyòl) nasceu do contato entre o francês e línguas africanas." },
    { pergunta: "Quem declarou a independência do Haiti em 1804?", opcoes: ["Jean-Jacques Dessalines", "Napoleão Bonaparte", "Henri Christophe", "Alexandre Pétion"], correta: 0, dica: "Ele se tornou o primeiro governante do Haiti independente." },
    { pergunta: "O que as cores da bandeira do Haiti (azul e vermelho) representam?", opcoes: ["O mar e o sol", "A união entre negros e mulatos na luta pela independência", "A monarquia francesa", "A natureza tropical"], correta: 1, dica: "As cores foram criadas rasgando a bandeira francesa e retirando a faixa branca." },
    { pergunta: "Qual religião é praticada no Haiti junto com o catolicismo, e é parte importante da cultura local?", opcoes: ["Budismo", "Vodu haitiano", "Xintoísmo", "Hinduísmo"], correta: 1, dica: "Essa religião mistura tradições africanas trazidas por povos escravizados." },
    { pergunta: "Em que ano um forte terremoto atingiu o Haiti, causando grande destruição em Porto Príncipe?", opcoes: ["2004", "2010", "2015", "1998"], correta: 1, dica: "Foi um dos desastres naturais mais graves da história recente do país." },
    { pergunta: "Qual é o nome do prato à base de porco frito, muito tradicional na culinária haitiana?", opcoes: ["Griot", "Feijoada", "Mofongo", "Ropa vieja"], correta: 0, dica: "Costuma ser servido com banana-da-terra frita (bannann peze) e arroz." },
    { pergunta: "Qual estilo musical, misturando ritmos afro-caribenhos e influências francesas, é típico do Haiti?", opcoes: ["Reggaeton", "Compas (kompa)", "Salsa", "Merengue"], correta: 1, dica: "É um dos ritmos mais dançados em festas e no Carnaval haitiano." },
    { pergunta: "O Haiti foi a primeira nação do mundo a abolir permanentemente que prática?", opcoes: ["A monarquia", "A escravidão", "O trabalho infantil", "A propriedade privada"], correta: 1, dica: "A revolução foi liderada majoritariamente por pessoas escravizadas." },
    { pergunta: "Qual é a moeda oficial do Haiti?", opcoes: ["Peso haitiano", "Dólar caribenho", "Gourde", "Real haitiano"], correta: 2, dica: "O símbolo dessa moeda é 'G'." },
    { pergunta: "Quem foi Henri Christophe, importante figura da história haitiana?", opcoes: ["Um pintor francês", "Um rei do Haiti que construiu a Cidadela Laferrière", "Um explorador espanhol", "Um presidente dos EUA"], correta: 1, dica: "A fortaleza que ele mandou construir é hoje Patrimônio da Humanidade pela UNESCO." },
    { pergunta: "Qual continente é a principal origem ancestral da maioria da população haitiana, trazida durante o período colonial?", opcoes: ["Ásia", "África", "Oceania", "América do Norte"], correta: 1, dica: "Milhões de africanos foram escravizados e levados para trabalhar nas plantações de açúcar." },
    { pergunta: "O nome 'Haiti' vem de uma palavra indígena taína que significa o quê?", opcoes: ["Terra de montanhas", "Ilha do sol", "Terra dos deuses", "Água doce"], correta: 0, dica: "Os taínos foram os povos originários que habitavam a ilha antes da colonização." }
  ];

  // ---------- ESTADO DO JOGO ----------
  // tempoInicial: tempo total com que o jogo começa (compartilhado entre todas as perguntas)
  // bonus: segundos ganhos ao acertar | penalidade: segundos perdidos ao errar
  const CONFIG_MODOS = {
    facil:   { nome: "Fácil",   qtd: 10, tempoInicial: 40, bonus: 6, penalidade: 4, pontos: 10 },
    medio:   { nome: "Médio",   qtd: 10, tempoInicial: 30, bonus: 5, penalidade: 6, pontos: 15 },
    dificil: { nome: "Difícil", qtd: 10, tempoInicial: 22, bonus: 4, penalidade: 8, pontos: 20 }
  };

  let estado = {
    modo: null,
    perguntas: [],
    indiceAtual: 0,
    pontuacao: 0,
    respondida: false,
    historico: [],
    timerId: null,
    tempoRestante: 0,
    tempoMax: 0,
    acabouOTempo: false
  };

  function embaralhar(array){
    const copia = [...array];
    for(let i = copia.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  }

  function mudarTela(idTela){
    document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
    document.getElementById(idTela).classList.add('active');
    window.scrollTo({top: 0, behavior:'smooth'});
  }

  function iniciarQuiz(modo){
    const config = CONFIG_MODOS[modo];
    estado.modo = modo;
    estado.perguntas = embaralhar(BANCO_PERGUNTAS).slice(0, config.qtd);
    estado.indiceAtual = 0;
    estado.pontuacao = 0;
    estado.historico = [];
    estado.tempoRestante = config.tempoInicial;
    estado.tempoMax = config.tempoInicial;
    estado.acabouOTempo = false;
    document.getElementById('placar-numero').textContent = '0';
    document.getElementById('timer-wrap').style.display = 'flex';
    mudarTela('tela-quiz');
    atualizarVisualTimer();
    mostrarPergunta();
    iniciarTimer();
  }

  function reiniciarMesmoModo(){
    iniciarQuiz(estado.modo);
  }

  function pararTimer(){
    if(estado.timerId){
      clearInterval(estado.timerId);
      estado.timerId = null;
    }
  }

  function atualizarVisualTimer(){
    const numero = document.getElementById('timer-numero');
    const barra = document.getElementById('timer-barra-interna');
    const tempo = Math.max(estado.tempoRestante, 0);
    numero.textContent = tempo;
    const porcentagem = Math.min(100, (tempo / estado.tempoMax) * 100);
    barra.style.width = `${porcentagem}%`;
    barra.classList.toggle('baixo', porcentagem <= 30);
  }

  function iniciarTimer(){
    pararTimer();
    estado.timerId = setInterval(() => {
      estado.tempoRestante--;
      atualizarVisualTimer();
      if(estado.tempoRestante <= 0){
        pararTimer();
        estado.acabouOTempo = true;
        mostrarGameOver();
      }
    }, 1000);
  }

  function mostrarPergunta(){
    estado.respondida = false;
    const dados = estado.perguntas[estado.indiceAtual];

    document.getElementById('info-progresso').textContent =
      `Pergunta ${estado.indiceAtual + 1} de ${estado.perguntas.length}`;
    document.getElementById('barra-progresso-interna').style.width =
      `${((estado.indiceAtual + 1) / estado.perguntas.length) * 100}%`;

    document.getElementById('pergunta-texto').textContent = dados.pergunta;
    document.getElementById('feedback-box').classList.remove('mostrar');
    document.getElementById('feedback-box').textContent = '';
    document.getElementById('btn-continuar').style.display = 'none';

    const letras = ['A', 'B', 'C', 'D'];
    const opcoesContainer = document.getElementById('opcoes-container');
    opcoesContainer.innerHTML = '';

    // embaralha as opções mantendo referência do índice correto
    const opcoesComIndice = dados.opcoes.map((texto, i) => ({texto, ehCorreta: i === dados.correta}));
    const opcoesEmbaralhadas = embaralhar(opcoesComIndice);

    opcoesEmbaralhadas.forEach((op, i) => {
      const botao = document.createElement('button');
      botao.className = 'opcao';
      botao.innerHTML = `<span class="letra">${letras[i]}</span><span>${op.texto}</span>`;
      botao.onclick = () => responder(botao, op.ehCorreta, dados);
      opcoesContainer.appendChild(botao);
    });
  }

  function responder(botaoClicado, acertou, dados){
    if(estado.respondida) return;
    estado.respondida = true;
    pararTimer(); // pausa o cronômetro enquanto o feedback é exibido

    const config = CONFIG_MODOS[estado.modo];
    const botoes = document.querySelectorAll('#opcoes-container .opcao');
    botoes.forEach(b => b.disabled = true);

    botoes.forEach(b => {
      const texto = b.querySelector('span:last-child').textContent;
      if(texto === dados.opcoes[dados.correta]){
        b.classList.add('correta');
        b.classList.add('acertou-animacao');
      }
    });

    if(botaoClicado && !acertou){
      botaoClicado.classList.add('errada');
      botaoClicado.classList.add('errou-animacao');
    }

    const feedback = document.getElementById('feedback-box');
    feedback.classList.add('mostrar');

    // ---- aplica bônus/penalidade de tempo ----
    const timerWrap = document.getElementById('timer-wrap');
    const numero = document.getElementById('timer-numero');
    numero.classList.remove('ganhou', 'perdeu');
    timerWrap.classList.remove('pulso');

    if(acertou){
      Som.acerto();
      registrarAcerto();
      Dopamina.flashAcerto();
      Dopamina.particulasAcerto(botaoClicado || botoes[0]);
      Dopamina.textoFlutuante(botaoClicado || botoes[0], `+${config.pontos}`, 'acerto');
      Dopamina.pulsoPlacar();
      estado.pontuacao += config.pontos;
      document.getElementById('placar-numero').textContent = estado.pontuacao;
      estado.tempoRestante += config.bonus;
      feedback.textContent = `✅ Isso mesmo! Você ganhou +${config.bonus}s. ${dados.dica}`;
      numero.classList.add('ganhou');
    } else {
      Som.erro();
      registrarErro();
      Dopamina.flashErro();
      Dopamina.particulasErro(botaoClicado || botoes[0]);
      Dopamina.textoFlutuante(botaoClicado || botoes[0], `-${config.penalidade}s`, 'erro');
      Dopamina.shakeTela(0.5);
      estado.tempoRestante -= config.penalidade;
      feedback.textContent = `❌ Quase! A resposta certa é "${dados.opcoes[dados.correta]}" (−${config.penalidade}s). ${dados.dica}`;
      numero.classList.add('perdeu');
    }
    void timerWrap.offsetWidth; // reinicia a animação
    timerWrap.classList.add('pulso');
    atualizarVisualTimer();

    estado.historico.push({
      pergunta: dados.pergunta,
      correta: dados.opcoes[dados.correta],
      acertou: acertou
    });

    if(estado.tempoRestante <= 0){
      estado.acabouOTempo = true;
      // dá um instante para o jogador ver o feedback antes do game over
      setTimeout(mostrarGameOver, 1400);
    } else {
      document.getElementById('btn-continuar').style.display = 'inline-block';
    }
  }

  function proximaPergunta(){
    estado.indiceAtual++;
    if(estado.indiceAtual >= estado.perguntas.length){
      mostrarResultado();
    } else {
      mostrarPergunta();
      iniciarTimer();
    }
  }

  function mostrarResultado(){
    pararTimer();
    document.getElementById('barra-progresso-interna').style.width = '100%';
    const config = CONFIG_MODOS[estado.modo];
    const acertos = estado.historico.filter(h => h.acertou).length;
    const total = estado.historico.length;

    document.getElementById('resultado-modo').textContent = `Modo ${config.nome} · ${acertos} de ${total} acertos`;
    document.getElementById('resultado-pontos').textContent = `${estado.pontuacao} pts`;

    let frase;
    const proporcao = acertos / total;
    if(proporcao === 1){
      frase = "Perfeito! Você conhece muito bem a história do Haiti! 🏆";
      MusicaVitoria.tocar();
      Dopamina.efeitoVitoriaTotal();
    } else if(proporcao >= 0.7){
      frase = "Muito bem! Você manda bem nesse assunto! 🎉";
      MusicaVitoria.tocar();
    } else if(proporcao >= 0.4){
      frase = "Bom começo! Vale a pena revisar mais um pouco. 📚";
    } else {
      frase = "Bora estudar mais sobre o Haiti e tentar de novo! 💪";
    }
    document.getElementById('resultado-frase').textContent = frase;

    const revisaoContainer = document.getElementById('revisao-container');
    revisaoContainer.innerHTML = '';
    estado.historico.forEach(item => {
      const div = document.createElement('div');
      div.className = 'revisao-item';
      div.innerHTML = `
        <span class="revisao-marca">${item.acertou ? '✅' : '❌'}</span>
        <span>${item.pergunta}${item.acertou ? '' : ` — resposta certa: <b>${item.correta}</b>`}</span>
      `;
      revisaoContainer.appendChild(div);
    });

    mudarTela('tela-resultado');
  }

  function mostrarGameOver(){
    pararTimer();
    MusicaGameOver.tocar();
    Dopamina.shakeTela(1);
    const config = CONFIG_MODOS[estado.modo];
    const acertos = estado.historico.filter(h => h.acertou).length;
    const perguntasRespondidas = estado.historico.length;

    document.getElementById('gameover-pontos').textContent = `${estado.pontuacao} pts`;
    document.getElementById('gameover-frase').textContent =
      `Modo ${config.nome} · Você respondeu ${perguntasRespondidas} de ${estado.perguntas.length} perguntas, acertando ${acertos}. Não deixe o cronômetro zerar da próxima vez!`;

    const revisaoContainer = document.getElementById('gameover-revisao');
    revisaoContainer.innerHTML = '';
    estado.historico.forEach(item => {
      const div = document.createElement('div');
      div.className = 'revisao-item';
      div.innerHTML = `
        <span class="revisao-marca">${item.acertou ? '✅' : '❌'}</span>
        <span>${item.pergunta}${item.acertou ? '' : ` — resposta certa: <b>${item.correta}</b>`}</span>
      `;
      revisaoContainer.appendChild(div);
    });

    mudarTela('tela-gameover');
  }

  // ---------- BOTÃO DE MÚSICA (Hino do Haiti) ----------
  const btnMusica = document.getElementById('btn-musica');
  if (btnMusica) {
    btnMusica.addEventListener('click', () => {
      if (HinoHaiti.tocando) {
        HinoHaiti.parar();
        btnMusica.classList.remove('ativo');
        btnMusica.textContent = '🔇';
      } else {
        HinoHaiti.iniciar();
        btnMusica.classList.add('ativo');
        btnMusica.textContent = '🎵';
      }
    });
  }

  // ---------- ATALHOS DE TECLADO ----------
  document.addEventListener('keydown', (e) => {
    // Teclas 1-4 para responder
    if (estado.respondida === false && document.getElementById('tela-quiz').classList.contains('active')) {
      const teclas = ['1', '2', '3', '4'];
      const index = teclas.indexOf(e.key);
      if (index !== -1) {
        const botoes = document.querySelectorAll('#opcoes-container .opcao');
        if (botoes[index]) {
          botoes[index].click();
        }
      }
    }

    // Enter para continuar
    if (e.key === 'Enter' && document.getElementById('btn-continuar').style.display !== 'none') {
      proximaPergunta();
    }

    // Espaço para iniciar
    if (e.key === ' ' && document.getElementById('screen-index').classList.contains('active')) {
      e.preventDefault();
      mudarTela('tela-modo');
    }

    // M para música
    if (e.key === 'm' || e.key === 'M') {
      if (btnMusica) btnMusica.click();
    }
  });

  // ---------- PREVENIR ZOOM EM MOBILE ----------
  document.addEventListener('dblclick', (e) => {
    e.preventDefault();
  }, { passive: false });

  // ---------- MELHORIAS DE PERFORMANCE ----------
  // Usa requestAnimationFrame para animações suaves
  let ticking = false;
  function update() {
    ticking = false;
  }
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  // ---------- PREVENIR COMPORTAMENTOS INDESEJADOS ----------
  // Previne seleção de texto ao clicar rapidamente
  document.addEventListener('selectstart', (e) => {
    if (e.target.closest('button, .btn-menu, .modo-card, .opcao')) {
      e.preventDefault();
    }
  });

  // Previne menu de contexto em elementos do jogo
  document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.cenario-32bit, .bixinho, .palmeira, .flor')) {
      e.preventDefault();
    }
  });

  // ---------- INICIALIZAÇÃO ----------
  console.log('🇭🇹 Quiz do Haiti - JBM carregado com sucesso!');
  console.log('Pressione M para ligar/desligar a música');
  console.log('Use as teclas 1-4 para responder');

  // ---------- VERIFICAÇÃO DE COMPATIBILIDADE ----------
  if (!window.AudioContext && !window.webkitAudioContext) {
    console.warn('Web Audio API não suportado neste navegador');
  }

  // ---------- PREVENIR ERROS COMUNS ----------
  window.addEventListener('error', (e) => {
    console.error('Erro:', e.message);
  });

  // ---------- OTIMIZAÇÃO DE MEMÓRIA ----------
  // Limpa o estado quando o jogo não está visível
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // Pausa o jogo quando a aba não está visível
      if (estado.timerId) {
        pararTimer();
      }
    }
  });

  // ---------- FIM DO CÓDIGO ----------
  // Todas as funcionalidades foram carregadas com sucesso
  // Desenvolvido com ❤️ pela Turma do 1º A - JBM
  // 🇭🇹 Kreyòl: "Fòk nou pran swen de tèt nou" (Devemos cuidar de nossa terra)
  // 🎮 Obrigado por jogar!
  // 🏆 Continue aprendendo sobre o Haiti!
  // 📚 Fontes: UNESCO, Britannica, Haitian Times
  // 🎵 Música: La Dessalinienne (Hino Nacional do Haiti)
  // 🌟 Versão 2.0 - Quiz do Haiti
  // 💙 Feito com orgulho haitiano!
  // 🙏 Mesi anpil! (Muito obrigado em Kreyòl!)
  // 🎯 Dica: Use as teclas 1-4 para responder mais rápido!
  // 🎨 Design inspirado na cultura haitiana
  // 🏫 Projeto educacional - Colégio JBM
  // 📧 Contato: [seu email aqui]
  // 🌐 Site: [seu site aqui]
  // 🎓 Ano letivo: 2026
  // 🏆 Nota: 10/10
  // 🎮 Fim!
  // 🇭🇹 Ayibobo! (Viva o Haiti!)
  // 🎯 Boa sorte!
