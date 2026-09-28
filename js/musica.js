/* ============================================
   MUSICA.JS — Hino do Haiti (La Dessalinienne)
   Quiz do Haiti · JBM
   ============================================ */

const HinoHaiti = {
  ctx: null,
  tocando: false,
  timeoutIds: [],

  // Notas do hino "La Dessalinienne" (versão simplificada)
  notas: [
    { nota: 'G4', dur: 0.5 }, { nota: 'C5', dur: 0.5 }, { nota: 'E5', dur: 0.5 }, { nota: 'D5', dur: 0.5 },
    { nota: 'C5', dur: 1.0 }, { nota: 'D5', dur: 0.5 }, { nota: 'E5', dur: 0.5 },
    { nota: 'G5', dur: 1.0 }, { nota: 'E5', dur: 0.5 }, { nota: 'D5', dur: 0.5 },
    { nota: 'C5', dur: 1.5 }, { nota: 'G4', dur: 0.5 },
    { nota: 'A4', dur: 0.5 }, { nota: 'D5', dur: 0.5 }, { nota: 'F5', dur: 0.5 }, { nota: 'E5', dur: 0.5 },
    { nota: 'D5', dur: 1.0 }, { nota: 'E5', dur: 0.5 }, { nota: 'F5', dur: 0.5 },
    { nota: 'A5', dur: 1.0 }, { nota: 'F5', dur: 0.5 }, { nota: 'E5', dur: 0.5 },
    { nota: 'D5', dur: 1.5 }, { nota: 'A4', dur: 0.5 },
    { nota: 'G4', dur: 0.5 }, { nota: 'B4', dur: 0.5 }, { nota: 'D5', dur: 0.5 }, { nota: 'G5', dur: 0.5 },
    { nota: 'F5', dur: 0.5 }, { nota: 'E5', dur: 0.5 }, { nota: 'D5', dur: 0.5 }, { nota: 'C5', dur: 0.5 },
    { nota: 'D5', dur: 1.0 }, { nota: 'G4', dur: 1.0 },
  ],

  frequencias: {
    'G4': 392.00, 'A4': 440.00, 'B4': 493.88, 'C5': 523.25,
    'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00
  },

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
    if (this.tocando) return;

    this.tocando = true;
    this.tocarLoop();
  },

  parar() {
    this.tocando = false;
    // Limpa todos os timeouts pendentes
    this.timeoutIds.forEach(id => clearTimeout(id));
    this.timeoutIds = [];
  },

  tocarLoop() {
    if (!this.tocando) return;

    let tempoTotal = 0;
    const velocidade = 0.45;

    this.notas.forEach((item) => {
      const freq = this.frequencias[item.nota];
      const duracao = item.dur * velocidade;

      const id = setTimeout(() => {
        if (!this.tocando) return;
        this.tocarNota(freq, duracao, 'triangle', 0.06);
        this.tocarNota(freq * 2, duracao, 'sine', 0.02);
      }, tempoTotal * 1000);
      this.timeoutIds.push(id);

      tempoTotal += duracao;
    });

    // Loop
    const loopId = setTimeout(() => {
      this.tocarLoop();
    }, (tempoTotal + 1) * 1000);
    this.timeoutIds.push(loopId);
  },

  tocarNota(frequencia, duracao, tipo, volume) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = tipo;
      osc.frequency.setValueAtTime(frequencia, this.ctx.currentTime);
      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duracao);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duracao);
    } catch (e) {
      // Silenciosamente falha
    }
  }
};

// ---------- MÚSICA DE VITÓRIA ----------
const MusicaVitoria = {
  ctx: null,

  tocar() {
    if (!this.ctx) {
      try {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        return;
      }
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    const notas = [
      { freq: 523.25, tempo: 0, dur: 0.15 },
      { freq: 659.25, tempo: 0.15, dur: 0.15 },
      { freq: 783.99, tempo: 0.3, dur: 0.15 },
      { freq: 1046.50, tempo: 0.45, dur: 0.3 },
      { freq: 783.99, tempo: 0.75, dur: 0.15 },
      { freq: 1046.50, tempo: 0.9, dur: 0.5 },
    ];

    notas.forEach(n => {
      setTimeout(() => {
        this.tocarNota(n.freq, n.dur, 'square', 0.08);
        this.tocarNota(n.freq / 2, n.dur, 'triangle', 0.04);
      }, n.tempo * 1000);
    });
  },

  tocarNota(frequencia, duracao, tipo, volume) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = tipo;
      osc.frequency.setValueAtTime(frequencia, this.ctx.currentTime);
      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duracao);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duracao);
    } catch (e) {}
  }
};

// ---------- MÚSICA DE GAME OVER ----------
const MusicaGameOver = {
  ctx: null,

  tocar() {
    if (!this.ctx) {
      try {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        return;
      }
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    const notas = [
      { freq: 392.00, tempo: 0, dur: 0.3 },
      { freq: 349.23, tempo: 0.3, dur: 0.3 },
      { freq: 329.63, tempo: 0.6, dur: 0.3 },
      { freq: 293.66, tempo: 0.9, dur: 0.6 },
      { freq: 261.63, tempo: 1.5, dur: 1.0 },
    ];

    notas.forEach(n => {
      setTimeout(() => {
        this.tocarNota(n.freq, n.dur, 'sawtooth', 0.06);
        this.tocarNota(n.freq / 2, n.dur, 'triangle', 0.03);
      }, n.tempo * 1000);
    });
  },

  tocarNota(frequencia, duracao, tipo, volume) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = tipo;
      osc.frequency.setValueAtTime(frequencia, this.ctx.currentTime);
      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duracao);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duracao);
    } catch (e) {}
  }
};

// ---------- EFEITOS DE DOPAMINA ----------
const Dopamina = {
  // Flash verde ao acertar
  flashAcerto() {
    const flash = document.createElement('div');
    flash.className = 'flash-dopamina flash-acerto';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 400);
  },

  // Flash vermelho ao errar
  flashErro() {
    const flash = document.createElement('div');
    flash.className = 'flash-dopamina flash-erro';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 400);
  },

  // Partículas de acerto
  particulasAcerto(elemento) {
    const rect = elemento.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    for (let i = 0; i < 12; i++) {
      const particula = document.createElement('div');
      particula.className = 'dopamina-particula acerto';
      particula.style.left = x + 'px';
      particula.style.top = y + 'px';
      particula.style.setProperty('--tx', (Math.random() - 0.5) * 200 + 'px');
      particula.style.setProperty('--ty', (Math.random() - 0.5) * 200 + 'px');
      particula.style.background = ['#2ea36f', '#6de3a8', '#f4c05a'][Math.floor(Math.random() * 3)];
      document.body.appendChild(particula);
      setTimeout(() => particula.remove(), 800);
    }
  },

  // Partículas de erro
  particulasErro(elemento) {
    const rect = elemento.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    for (let i = 0; i < 8; i++) {
      const particula = document.createElement('div');
      particula.className = 'dopamina-particula erro';
      particula.style.left = x + 'px';
      particula.style.top = y + 'px';
      particula.style.setProperty('--tx', (Math.random() - 0.5) * 150 + 'px');
      particula.style.setProperty('--ty', (Math.random() - 0.5) * 150 + 'px');
      particula.style.background = ['#e0294a', '#ff4d6a', '#c81f3c'][Math.floor(Math.random() * 3)];
      document.body.appendChild(particula);
      setTimeout(() => particula.remove(), 600);
    }
  },

  // Texto flutuante "+10" ou "-5"
  textoFlutuante(elemento, texto, classe) {
    const rect = elemento.getBoundingClientRect();
    const el = document.createElement('div');
    el.className = `texto-flutuante ${classe}`;
    el.textContent = texto;
    el.style.left = (rect.left + rect.width / 2) + 'px';
    el.style.top = rect.top + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  },

  // Shake na tela
  shakeTela(intensidade = 1) {
    document.body.style.animation = `shakeTela ${0.3 * intensidade}s ease`;
    setTimeout(() => document.body.style.animation = '', 300);
  },

  // Pulso no placar
  pulsoPlacar() {
    const placar = document.querySelector('.placar');
    if (placar) {
      placar.style.animation = 'pulse 0.3s ease';
      setTimeout(() => placar.style.animation = '', 300);
    }
  },

  // Efeito de combo
  efeitoCombo(nivel) {
    const combo = document.createElement('div');
    combo.className = 'combo-dopamina';
    combo.innerHTML = `
      <div class="combo-numero">x${nivel}</div>
      <div class="combo-texto">COMBO!</div>
    `;
    document.body.appendChild(combo);
    setTimeout(() => combo.classList.add('visivel'), 10);
    setTimeout(() => {
      combo.classList.remove('visivel');
      setTimeout(() => combo.remove(), 300);
    }, 1200);
  },

  // Efeito de vitória total
  efeitoVitoriaTotal() {
    // Chuva de confetes
    for (let i = 0; i < 80; i++) {
      setTimeout(() => {
        const confete = document.createElement('div');
        confete.className = 'confete-vitoria';
        confete.style.left = Math.random() * 100 + '%';
        confete.style.background = ['#f4c05a', '#e0294a', '#2ea36f', '#fffaf0', '#4d96ff'][Math.floor(Math.random() * 5)];
        confete.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
        document.body.appendChild(confete);
        setTimeout(() => confete.remove(), 3500);
      }, i * 25);
    }

    // Flash dourado
    const flash = document.createElement('div');
    flash.className = 'flash-dopamina flash-vitoria';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 600);
  }
};
