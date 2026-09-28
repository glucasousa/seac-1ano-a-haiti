/* ============================================
   EFEITOS.JS — Sons, Partículas e Interatividade
   Quiz do Haiti · JBM
   ============================================ */

// ---------- SISTEMA DE SONS (Web Audio API) ----------
const Som = {
  ctx: null,
  volumeGeral: 0.5,

  iniciar() {
    if (!this.ctx) {
      try {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        console.warn('Web Audio API não suportado');
        return;
      }
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  },

  tocar(frequencia, duracao, tipo = 'square', volume = 0.1) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = tipo;
      osc.frequency.setValueAtTime(frequencia, this.ctx.currentTime);
      gain.gain.setValueAtTime(volume * this.volumeGeral, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duracao);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duracao);
    } catch (e) {
      // Silenciosamente falha se o áudio não estiver disponível
    }
  },

  clique() {
    this.iniciar();
    this.tocar(800, 0.08, 'square', 0.06);
  },

  acerto() {
    this.iniciar();
    this.tocar(523, 0.1, 'square', 0.08);
    setTimeout(() => this.tocar(659, 0.1, 'square', 0.08), 100);
    setTimeout(() => this.tocar(784, 0.15, 'square', 0.08), 200);
  },

  erro() {
    this.iniciar();
    this.tocar(200, 0.2, 'sawtooth', 0.08);
    setTimeout(() => this.tocar(150, 0.3, 'sawtooth', 0.08), 150);
  },

  gameOver() {
    this.iniciar();
    this.tocar(400, 0.2, 'triangle', 0.08);
    setTimeout(() => this.tocar(350, 0.2, 'triangle', 0.08), 200);
    setTimeout(() => this.tocar(300, 0.2, 'triangle', 0.08), 400);
    setTimeout(() => this.tocar(250, 0.4, 'triangle', 0.08), 600);
  },

  vitoria() {
    this.iniciar();
    const notas = [523, 659, 784, 1047];
    notas.forEach((nota, i) => {
      setTimeout(() => this.tocar(nota, 0.2, 'square', 0.08), i * 150);
    });
  },

  tempoBaixo() {
    this.iniciar();
    this.tocar(440, 0.1, 'sine', 0.04);
  }
};

// Inicia o áudio no primeiro clique do usuário
document.addEventListener('click', () => Som.iniciar(), { once: true });
document.addEventListener('touchstart', () => Som.iniciar(), { once: true });
document.addEventListener('keydown', () => Som.iniciar(), { once: true });

// ---------- PARTÍCULAS FLUTUANTES NO CENÁRIO ----------
function criarParticulas() {
  const cenario = document.querySelector('.cenario-32bit');
  if (!cenario) return;

  const cores = ['#f4c05a', '#e0294a', '#2ea36f', '#fffaf0'];

  for (let i = 0; i < 20; i++) {
    const particula = document.createElement('div');
    particula.className = 'cenario-particula';
    particula.style.left = Math.random() * 100 + '%';
    particula.style.top = Math.random() * 100 + '%';
    particula.style.width = (Math.random() * 6 + 3) + 'px';
    particula.style.height = particula.style.width;
    particula.style.background = cores[Math.floor(Math.random() * cores.length)];
    particula.style.animationDuration = (Math.random() * 4 + 2) + 's';
    particula.style.animationDelay = (Math.random() * 3) + 's';
    cenario.appendChild(particula);
  }
}

// ---------- INTERATIVIDADE DO CENÁRIO ----------
function adicionarInteratividadeCenario() {
  // Clique nas casas = elas piscam
  document.querySelectorAll('.casa').forEach(casa => {
    casa.addEventListener('click', () => {
      Som.clique();
      casa.style.animation = 'pulse 0.3s ease';
      setTimeout(() => casa.style.animation = '', 300);
    });
  });

  // Clique no sol = ele brilha mais
  const sol = document.querySelector('.sol');
  if (sol) {
    sol.addEventListener('click', () => {
      Som.clique();
      sol.style.animation = 'glow 0.5s ease';
      setTimeout(() => sol.style.animation = '', 500);
    });
  }

  // Clique no tanbou = som de tambor
  const tanbou = document.querySelector('.tanbou');
  if (tanbou) {
    tanbou.addEventListener('click', () => {
      Som.tocar(150, 0.15, 'triangle', 0.2);
      tanbou.style.transform = 'scale(0.9)';
      setTimeout(() => tanbou.style.transform = '', 150);
    });
  }

  // Clique nas palmeiras = elas balançam mais
  document.querySelectorAll('.palmeira').forEach(palmeira => {
    palmeira.addEventListener('click', () => {
      Som.clique();
      palmeira.style.animation = 'float 0.5s ease';
      setTimeout(() => palmeira.style.animation = '', 500);
    });
  });

  // Clique nas flores = elas crescem
  document.querySelectorAll('.flor').forEach(flor => {
    flor.addEventListener('click', () => {
      Som.clique();
      flor.style.transform = 'scale(1.5)';
      setTimeout(() => flor.style.transform = '', 300);
    });
  });
}

// ---------- SISTEMA DE COMBO ----------
let comboAtual = 0;
let melhorCombo = 0;

function registrarAcerto() {
  comboAtual++;
  if (comboAtual > melhorCombo) {
    melhorCombo = comboAtual;
  }
  if (comboAtual >= 3) {
    mostrarCombo();
  }
}

function registrarErro() {
  comboAtual = 0;
}

function mostrarCombo() {
  const comboEl = document.createElement('div');
  comboEl.className = 'combo-popup';
  comboEl.textContent = `🔥 Combo x${comboAtual}!`;
  document.body.appendChild(comboEl);

  setTimeout(() => comboEl.classList.add('visivel'), 10);
  setTimeout(() => {
    comboEl.classList.remove('visivel');
    setTimeout(() => comboEl.remove(), 300);
  }, 1500);
}

// ---------- EFEITO DE VITÓRIA ----------
function efeitoVitoria() {
  const cenario = document.querySelector('.cenario-32bit');
  if (!cenario) return;

  // Cria confetes
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const confete = document.createElement('div');
      confete.className = 'confete';
      confete.style.left = Math.random() * 100 + '%';
      confete.style.background = ['#f4c05a', '#e0294a', '#2ea36f', '#fffaf0'][Math.floor(Math.random() * 4)];
      confete.style.animationDuration = (Math.random() * 2 + 1) + 's';
      cenario.appendChild(confete);
      setTimeout(() => confete.remove(), 3000);
    }, i * 30);
  }
}

// ---------- EFEITO DE GAME OVER ----------
function efeitoGameOver() {
  document.body.classList.add('gameover-efeito');
  setTimeout(() => document.body.classList.remove('gameover-efeito'), 500);
}

// ---------- MÚSICA DE FUNDO (opcional) ----------
const Musica = {
  tocando: false,
  intervalo: null,

  iniciar() {
    if (this.tocando) return;
    this.tocando = true;

    // Melodia simples inspirada em ritmos caribenhos
    const melodia = [
      262, 294, 330, 349, 392, 349, 330, 294,
      262, 294, 330, 392, 440, 392, 330, 294
    ];

    let i = 0;
    this.intervalo = setInterval(() => {
      if (!this.tocando) return;
      Som.tocar(melodia[i % melodia.length], 0.2, 'sine', 0.03);
      i++;
    }, 400);
  },

  parar() {
    this.tocando = false;
    if (this.intervalo) {
      clearInterval(this.intervalo);
      this.intervalo = null;
    }
  }
};

// ---------- INICIALIZAÇÃO ----------
document.addEventListener('DOMContentLoaded', () => {
  criarParticulas();
  adicionarInteratividadeCenario();

  // Adiciona som de clique em todos os botões
  document.querySelectorAll('button, .btn-menu, .modo-card').forEach(el => {
    el.addEventListener('click', () => Som.clique());
  });
});
