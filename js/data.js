// js/data.js — Banco de dados do jogo (decks, itens, textos e imagens)

const imgs = {
    hub: "https://images.ygoprodeck.com/images/cards/24094653.jpg",       // Slifer Red Dorm
    hub_ra: "https://images.ygoprodeck.com/images/cards/32338002.jpg",    // Ra Yellow Dorm
    hub_obelisk: "https://images.ygoprodeck.com/images/cards/10000000.jpg", // Obelisk Blue Dorm
    study: "https://images.ygoprodeck.com/images/cards/38033121.jpg",
    duel: "https://images.ygoprodeck.com/images/cards/46986414.jpg",
    shop: "https://images.ygoprodeck.com/images/cards/55144522.jpg",
    threat: "https://images.ygoprodeck.com/images/cards/70781052.jpg",
    boss1: "https://images.ygoprodeck.com/images/cards/25311006.jpg",     // Exame Final
    victory: "https://images.ygoprodeck.com/images/cards/89631139.jpg",   // Formatura / vitória
    defeat: "https://images.ygoprodeck.com/images/cards/97077563.jpg"     // Eliminação
};

// --- DECKS ---
// dorm define a cor de destaque do card (usada no CSS via data-dorm)
const decksIniciais = [
    { id: 'hero',  nome: 'Herói Elementar',   baseAtk: 5, baseInt: 5, hp: 3, emoji: '🦸', dorm: 'ra',       desc: 'Equilíbrio entre ataque e estratégia.' },
    { id: 'roid',  nome: 'Veículos Roid',     baseAtk: 3, baseInt: 3, hp: 4, emoji: '🚁', dorm: 'obelisk',  desc: 'Mais resistente, começa mais devagar.' },
    { id: 'beast', nome: 'Bestas da Floresta', baseAtk: 8, baseInt: 2, hp: 3, emoji: '🐺', dorm: 'slifer',  desc: 'Agressivo, forte em ATK desde o início.' }
];

// --- MONSTROS ÁS (bônus passivo aplicado a vida toda) ---
const asesIniciais = [
    { id: 'avian',  deckReq: 'hero',  nome: 'E-Hero Avian', desc: 'Bônus passivo: +10% de ganho de INT.',              emoji: '🦅', efeito: { tipo: 'int_mult',       valor: 1.10 } },
    { id: 'gyroid', deckReq: 'roid',  nome: 'Gyroid',        desc: 'Bônus passivo: -10% no custo de tudo na Loja.',     emoji: '🚲', efeito: { tipo: 'loja_desconto',  valor: 0.10 } },
    { id: 'koala',  deckReq: 'beast', nome: 'Des Koala',     desc: 'Bônus passivo: +5 DP fixos em todo duelo vencido.', emoji: '🐨', efeito: { tipo: 'duelo_dp_flat',  valor: 5 } }
];

// --- ESPÍRITOS GUARDIÕES (bônus passivo de sobrevivência) ---
const espiritosIniciais = [
    { id: 'kuriboh', nome: 'Kuriboh',       emoji: '🌰', desc: 'Te salva automaticamente 1 vez de um golpe fatal.',        efeito: { tipo: 'salvar_morte_unica' } },
    { id: 'ojama',   nome: 'Ojama Amarelo', emoji: '🤪', desc: '15% de chance de dobrar o DP ganho no fim do dia.',        efeito: { tipo: 'dp_chance_dobro', valor: 0.15 } },
    { id: 'mokey',   nome: 'Mokey Mokey',   emoji: '☁️', desc: 'Ganha +8 INT sempre que perde HP.',                        efeito: { tipo: 'int_ao_perder_hp', valor: 8 } }
];

const diasDaSemana = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];

// --- LOJA ---
// tipo: consumivel | equipamento | reliquia
// subTipo (apenas relíquias): magia_normal (ativável a qualquer momento) | armadilha (ativável só em gatilho)
const lojaItens = [
    // Consumíveis
    { id: "sanduiche_estragado", nome: "Sanduíche Estragado",        tipo: "consumivel", custo: 30,  emoji: "🥪", desc: "50% de chance de curar 1 HP, 50% de perder 1 HP." },
    { id: "sanduiche_ovo",       nome: "Sanduíche de Ovo Padrão",    tipo: "consumivel", custo: 80,  emoji: "🍳", desc: "Recupera 1 HP na hora (ou vai pra mochila se HP estiver cheio)." },
    { id: "sanduiche_dourado",   nome: "Sanduíche Dourado",          tipo: "consumivel", custo: 300, emoji: "🌟", desc: "Restaura o HP máximo por completo." },

    // Equipamentos (efeito permanente, comprado uma única vez)
    { id: "deckbox_couro", nome: "Deckbox de Couro",           tipo: "equipamento", custo: 250, emoji: "💼", desc: "+1 HP Máximo permanente.",         efeito: { tipo: "hp_max", valor: 1 } },
    { id: "disco_kaiba",   nome: "Disco de Duelos KaibaCorp",  tipo: "equipamento", custo: 800, emoji: "💽", desc: "Velocidade do modo Idle +25%.",   efeito: { tipo: "idle_speed", valor: 0.25 } },

    // Relíquias — Magias (ativáveis a qualquer momento pela mão)
    { id: "pote_ganancia", nome: "Pote da Ganância", tipo: "reliquia", subTipo: "magia_normal", custo: 400, emoji: "🏺", desc: "Ative para ganhar 200 DP imediatos." },
    { id: "monster_reborn", nome: "Monster Reborn",  tipo: "reliquia", subTipo: "magia_normal", custo: 600, emoji: "🌀", desc: "Ative para curar seu HP por completo." },
    { id: "espadas_luz", nome: "Espadas da Luz Reveladora", tipo: "reliquia", subTipo: "magia_normal", custo: 350, emoji: "⚔️", desc: "Bloqueia emboscadas pelo resto do mês em que for usada." },
    { id: "tufao", nome: "Tufão Espacial Místico", tipo: "reliquia", subTipo: "magia_normal", custo: 250, emoji: "🌪️", desc: "Ative para dobrar o DP do próximo duelo vencido no Idle." },

    // Relíquias — Armadilhas (só podem ser ativadas em resposta a uma emboscada)
    { id: "forca_espelho", nome: "Força Espelho", tipo: "reliquia", subTipo: "armadilha", custo: 500, emoji: "🪞", desc: "Ative durante uma emboscada para destruir o oponente e vencer na hora." },
];

const bancoTrivia = [
    { q: "Qual o Nível do Mago Negro?", opções: ["Nível 6", "Nível 7", "Nível 8"], correta: 1 },
    { q: "Quantos Pontos de Vida (PV) se começa em um duelo oficial de Batalha da Cidade?", opções: ["2000 PV", "4000 PV", "8000 PV"], correta: 1 },
    { q: "Qual o Nível do Elemental HERO Flame Wingman?", opções: ["Nível 6", "Nível 7", "Nível 8"], correta: 0 },
    { q: "Quantos Pontos de Vida (PV) se começa em um duelo oficial no TCG?", opções: ["2000 PV", "4000 PV", "8000 PV"], correta: 2 },
    { q: "Qual carta mágica permite comprar duas cartas do deck sem custo?", opções: ["Pote da Ganância", "Buraco Negro", "Monstro Reborn"], correta: 0 },
    { q: "Qual carta armadilha reflete o ATK do monstro atacante para destruí-lo?", opções: ["Mirror Force", "Trap Hole", "Spellbinding Circle"], correta: 0 },
    { q: "Quantas cartas compõem a mão inicial em um duelo padrão?", opções: ["4 cartas", "5 cartas", "6 cartas"], correta: 1 },
    { q: "Qual destes NÃO é um Espírito conhecido do anime?", opções: ["Kuriboh", "Ojama Amarelo", "Exodia"], correta: 2 },
    { q: "Qual o nome do disco de duelos usado em Duel Academy?", opções: ["Duel Disk", "Duel Gazer", "Solid Vision"], correta: 0 },
    { q: "Monster Reborn é uma carta de qual tipo?", opções: ["Magia", "Armadilha", "Monstro"], correta: 0 }
];

// --- RANKING FINAL ---
// Usado na tela de encerramento para classificar a carreira do jogador
const ranksFinais = [
    { min: 260, titulo: "🏆 REI DOS JOGOS",       cor: "#d4af37" },
    { min: 180, titulo: "⭐ DUELISTA LENDÁRIO",    cor: "#3498db" },
    { min: 120, titulo: "🎓 DUELISTA PROFISSIONAL", cor: "#2ecc71" },
    { min: 60,  titulo: "📘 DUELISTA PROMISSOR",   cor: "#f1c40f" },
    { min: 0,   titulo: "🥉 CALOURO DE ACADEMIA",  cor: "#95a5a6" }
];
