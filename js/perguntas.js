/* ============================================
   PERGUNTAS.JS — Banco de Perguntas Difíceis
   Quiz do Haiti · JBM
   ============================================ */

const BANCO_PERGUNTAS_DIFICIL = [
  {
    pergunta: "Qual foi o nome da colônia francesa que se tornou o Haiti?",
    opcoes: ["Saint-Domingue", "Martinica", "Guadalupe", "Nova França"],
    correta: 0,
    dica: "O nome vem de 'Santo Domingo' em espanhol, mas os franceses o adaptaram."
  },
  {
    pergunta: "Quanto tempo durou a Revolução Haitiana?",
    opcoes: ["5 anos", "8 anos", "13 anos", "20 anos"],
    correta: 2,
    dica: "Durou de 1791 a 1804, mais de uma década de luta."
  },
  {
    pergunta: "Qual era o nome indígena taíno da ilha que hoje é Haiti e República Dominicana?",
    opcoes: ["Hispaniola", "Borikén", "Kiskeya", "Cuba"],
    correta: 2,
    dica: "Os taínos chamavam a ilha de 'Kiskeya', que significa 'terra de montanhas'."
  },
  {
    pergunta: "Quem foi a única mulher a comandar tropas na Revolução Haitiana?",
    opcoes: ["Marie-Jeanne Lamartinier", "Sanité Bélair", "Catherine Flon", "Cécile Fatiman"],
    correta: 1,
    dica: "Ela foi capturada e executada pelos franceses em 1802."
  },
  {
    pergunta: "Qual foi o primeiro país a reconhecer a independência do Haiti?",
    opcoes: ["Estados Unidos", "França", "Reino Unido", "Nenhum por décadas"],
    correta: 3,
    dica: "O Haiti foi isolado internacionalmente por medo de inspirar outras revoltas de escravos."
  },
  {
    pergunta: "O que era o 'Code Noir' (Código Negro)?",
    opcoes: ["Uma constituição haitiana", "Lei francesa sobre escravidão", "Um tratado de paz", "Um código militar"],
    correta: 1,
    dica: "Era um decreto de 1685 que regulava a vida dos escravos nas colônias francesas."
  },
  {
    pergunta: "Qual era o principal produto de exportação do Haiti colonial que o tornou tão lucrativo para a França?",
    opcoes: ["Café", "Algodão", "Açúcar", "Tabaco"],
    correta: 2,
    dica: "Saint-Domingue era a maior produtora mundial desse produto no século XVIII."
  },
  {
    pergunta: "Quem era o governador francês que tentou restaurar a escravidão em 1802?",
    opcoes: ["Napoleão Bonaparte", "Charles Leclerc", "Louis XVIII", "Victor Hugues"],
    correta: 1,
    dica: "Era cunhado de Napoleão e morreu de febre amarela no Haiti."
  },
  {
    pergunta: "Qual era o nome dado aos haitianos de ascendência mista (africana e europeia)?",
    opcoes: ["Mulatos", "Gens de couleur", "Affranchis", "Todos os anteriores"],
    correta: 3,
    dica: "Esses termos descreviam diferentes grupos sociais na hierarquia colonial."
  },
  {
    pergunta: "O que aconteceu com Toussaint Louverture após sua captura pelos franceses?",
    opcoes: ["Foi executado", "Morreu na prisão na França", "Fugiu para o Brasil", "Foi exilado na Jamaica"],
    correta: 1,
    dica: "Ele morreu no Forte de Joux, nos Alpes franceses, em 1803."
  },
  {
    pergunta: "Qual foi a 'guerra de independência' que Dessalines liderou em 1803?",
    opcoes: ["Batalha de Vertières", "Batalha de Savane", "Cerco de Jacmel", "Batalha de Gonaïves"],
    correta: 0,
    dica: "A última batalha decisiva ocorreu em 18 de novembro de 1803."
  },
  {
    pergunta: "Por que o Haiti teve que pagar 'reparação' à França após a independência?",
    opcoes: ["Para manter relações diplomáticas", "Para compensar proprietários de escravos", "Para comprar armas", "Para construir infraestrutura"],
    correta: 1,
    dica: "A dívida de 150 milhões de francos quase arruinou o país."
  },
  {
    pergunta: "Qual era o papel das 'védoves' no vodu haitiano?",
    opcoes: ["Sacerdotisas", "Guerreiras", "Curandeiras", "Todas as anteriores"],
    correta: 3,
    dica: "As védoves eram figuras centrais nas cerimônias religiosas."
  },
  {
    pergunta: "O que foi a 'Tratado de Ryswick' de 1697?",
    opcoes: ["Divisão da ilha entre França e Espanha", "Fim da escravidão", "Independência do Haiti", "Aliança com os taínos"],
    correta: 0,
    dica: "O terço ocidental da ilha (Saint-Domingue) ficou com a França."
  },
  {
    pergunta: "Quem era Henri Christophe antes de se tornar rei?",
    opcoes: ["Um general revolucionário", "Um comerciante", "Um padre", "Um diplomata"],
    correta: 0,
    dica: "Ele lutou ao lado de Dessalines e depois se proclamou Henri I."
  },
  {
    pergunta: "Qual era a língua franca usada no comércio colonial de Saint-Domingue?",
    opcoes: ["Crioulo haitiano", "Francês", "Espanhol", "Inglês"],
    correta: 0,
    dica: "O kreyòl nasceu da mistura do francês com línguas africanas."
  },
  {
    pergunta: "O que eram os 'maroons' na história haitiana?",
    opcoes: ["Escravizados fugidos que formavam comunidades", "Comerciantes franceses", "Indígenas taínos", "Missionários"],
    correta: 0,
    dica: "Os maroons se escondiam nas montanhas e resistiam aos colonizadores."
  },
  {
    pergunta: "Qual era o nome do exército de escravos rebeldes em 1791?",
    opcoes: ["Armée Indigène", "Forças Armadas do Povo", "Exército da Liberdade", "Milícia Revolucionária"],
    correta: 0,
    dica: "Significava 'exército indígena' no contexto colonial."
  },
  {
    pergunta: "Qual era a principal religião trazida pelos escravos africanos que influenciou o vodu?",
    opcoes: ["Vodun da África Ocidental", "Islamismo", "Hinduísmo", "Budismo"],
    correta: 0,
    dica: "O vodun se misturou com o catolicismo para criar o vodu haitiano."
  },
  {
    pergunta: "Qual era o nome do porto mais importante do Haiti colonial?",
    opcoes: ["Port-au-Prince", "Cap-Haïtien", "Port-de-Paix", "Les Cayes"],
    correta: 1,
    dica: "Era chamado de Cap-Français durante o período colonial."
  }
];
