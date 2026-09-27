// js/data.js
// Banco de dados central do Duelist Idle Academy.
// Todo o conteúdo do jogo (decks, ases, espíritos, itens, diálogos e exames)
// vive neste arquivo. game.js apenas lê estas estruturas.

const imgs = {
    hub: "https://images.ygoprodeck.com/images/cards/24094653.jpg", // Slifer Red Dorm
    hub_ra: "https://images.ygoprodeck.com/images/cards/32338002.jpg", // Ra Yellow
    hub_obelisk: "https://images.ygoprodeck.com/images/cards/10000000.jpg", // Obelisk Blue
    study: "https://images.ygoprodeck.com/images/cards/38033121.jpg",
    duel: "https://images.ygoprodeck.com/images/cards/46986414.jpg",
    threat: "https://images.ygoprodeck.com/images/cards/70781052.jpg",
    bg_slifer: "assets/images/slifer_red_dorm2.jpeg",
    bg_ra: "assets/images/ra_yellow_dorm.webp",
    bg_obelisk: "assets/images/obelisk_blue_dorm.jpg",
    bg_abandoned: "assets/images/abandoned_dorms.jpg",
    bg_academy: "assets/images/duel_academy.jpeg",
    bg_forest: "assets/images/Forest.webp",
    shop: "assets/images/pxArt.png"
};

// --- DECKS INICIAIS ---
const decksIniciais = [
    { id: 'hero', nome: 'Heróis Elementares', emoji: '🦸‍♂️', baseAtk: 15, baseInt: 5, hp: 4, padrao: true, lore: "O deck do próprio Jaden Yuki. Agressivo, versátil e cheio de fusões improvisadas." },
    { id: 'roid', nome: 'Veicroids', emoji: '🚁', baseAtk: 10, baseInt: 10, hp: 5, padrao: true, lore: "Máquinas equilibradas que recompensam quem sabe planejar cada movimento." },
    { id: 'koala', nome: 'Koalas', emoji: '🐨', baseAtk: 12, baseInt: 8, hp: 4, padrao: true, lore: "Bestas fofas por fora, implacáveis por dentro. Ótimas para intimidar valentões." },

    // DECK BLOQUEADO — desbloqueado ao vencer o Duelo de Aposta contra Chazz (exame do 1º Ano)
    { id: 'ojama', nome: 'Ojamas', emoji: '🩲', baseAtk: 5, baseInt: 20, hp: 6, padrao: false, dica: "Derrote Chazz Princeton no Exame do 1º Ano.", lore: "Ninguém escolhe os Ojamas — os Ojamas escolhem você. Irritantes, resistentes e surpreendentemente sábios." },

    // NOVO DECK BLOQUEADO — desbloqueado via amizade máxima com Zane Truesdale
    { id: 'cyber', nome: 'Cyber Dragões', emoji: '🐉', baseAtk: 20, baseInt: 3, hp: 3, padrao: false, dica: "Alcance Amizade Máxima (❤️❤️❤️❤️❤️) com Zane Truesdale.", lore: "O deck lendário do 'Kaiser' da Academia. Poder de sobra, margem de erro zero." }
];

// --- MONSTROS ÁS (1 para cada deck) ---
const asesIniciais = [
    { id: 'avian', deckReq: 'hero', nome: 'E-Hero Avian', desc: 'Tiro de Penas: ative para vencer um valentão automaticamente. 3 cargas por ano, recarregam na virada de ano letivo.', padrao: true, img: 'assets/images/avian.png' },
    { id: 'gyroid', deckReq: 'roid', nome: 'Gyroid', desc: 'Resiliência: 1 vez por mês, você não perde HP ao ser derrotado por um valentão em um Duelo de Aposta.', padrao: true, img: 'assets/images/gyroid.jpeg' },
    { id: 'des_koala', deckReq: 'koala', nome: 'Des Koala', desc: 'Intimidação Fofa: reduz permanentemente o poder de todos os valentões em 20%.', padrao: true, img: 'assets/images/des_koala.png' },
    { id: 'ojama_amarelo', deckReq: 'ojama', nome: 'Ojama Amarelo', desc: 'Distração Irritante: pagar DP para fugir de um Duelo de Aposta custa 50% menos.', padrao: false, img: 'assets/images/ojama_yellow.jpeg' },

    // NOVO ÁS — vem junto do deck Cyber Dragões
    { id: 'cyber_dragao', deckReq: 'cyber', nome: 'Cyber Dragão', desc: 'Fusão Instantânea: 25% de chance de reverter automaticamente uma derrota em um Duelo de Aposta em vitória.', padrao: false, img: 'assets/images/pxArt.png' }
];

// --- ESPÍRITOS GUARDIÕES (passivos escolhidos na criação de personagem) ---
const espiritosIniciais = [
    { id: 'kuriboh', nome: 'Kuriboh', img: 'assets/images/kuriboh.png', desc: 'Guardião Fiel: se sacrifica para te salvar de um golpe fatal. Efeito único por jornada — não recarrega.', padrao: true },
    { id: 'ojama', nome: 'Ojama Amarelo', img: 'assets/images/ojama_yellow.jpeg', desc: 'Mesada Camuflada: chance diária de render DP extra em dias de duelo (quando ele não está ocupado reclamando).', padrao: true },
    { id: 'mokey', nome: 'Mokey Mokey', img: 'assets/images/mokey_mokey.png', desc: 'Consolo Fofo: concede um bônus de INT sempre que você perde HP, transformando cada tropeço em aprendizado.', padrao: true },

    // ESPÍRITOS BLOQUEADOS
    { id: 'kuriboh_alado', nome: 'Kuriboh Alado', img: 'assets/images/pxArt.png', desc: 'Guardião Alado: evita a 1ª derrota fatal de cada mês, recarregando automaticamente no mês seguinte.', padrao: false, dica: "Alcance Amizade Máxima (❤️❤️❤️❤️❤️) com Jaden Yuki." },
    { id: 'des_sapo', nome: 'Des Sapo', img: 'assets/images/pxArt.png', desc: 'Mesada Garantida: concede +15 DP fixos toda semana, chova ou faça sol.', padrao: false, dica: "Chegue ao dormitório Rá Amarelo utilizando o deck Koalas." },
    { id: 'gato_resgate', nome: 'Gato de Resgate', img: 'assets/images/pxArt.png', desc: 'Resgate Felino: chance de recuperar 1 HP em vez de perdê-lo ao sofrer dano de um valentão.', padrao: false, dica: "Sobreviva à sua primeira eliminação de um valentão na Academia." },
    { id: 'jinzo', nome: 'Jinzo', img: 'assets/images/pxArt.png', desc: 'Campo de Negação: anula completamente qualquer penalidade sofrida em emboscadas.', padrao: false, dica: "Derrote Jinzo em um Duelo de Aposta no mapa noturno." },

    // NOVO ESPÍRITO BLOQUEADO — recompensa de formatura
    { id: 'dragao_olhos_azuis', nome: 'Dragão Branco de Olhos Azuis', img: 'assets/images/pxArt.png', desc: 'Poder Lendário: amplifica em +10% todos os ganhos diários de ATK, INT e DP, sem exceção.', padrao: false, dica: "Alcance o 3º Ano (Dormitório Obelisco Azul)." }
];

const diasDaSemana = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];

// --- ITENS (loja, boosters, lanches e equipamentos) ---
const lojaItens = [
    // --- PRODUTOS DA PRATELEIRA (comprados diretamente com DP) ---
    { id: "compra_lanche", nome: "Sanduíche Surpresa", tipo: "consumivel", custo: 50, desc: "A embalagem é um mistério! Pode curar, machucar ou salvar sua vida.", naPrateleira: true, img: "assets/images/pxArt.png" },
    { id: "compra_booster_simples", nome: "Booster Simples (1 Carta)", tipo: "reliquia", custo: 150, desc: "Rasgue para revelar 1 Carta Mágica/Armadilha aleatória.", naPrateleira: true, img: "assets/images/pxArt.png" },
    { id: "compra_booster_triplo", nome: "Booster Triplo (3 Cartas)", tipo: "reliquia", custo: 400, desc: "Pacotão promocional com 3 Cartas aleatórias!", naPrateleira: true, img: "assets/images/pxArt.png" },
    { id: "compra_booster_premium", nome: "Booster Premium (5 Cartas)", tipo: "reliquia", custo: 650, desc: "A caixa mais cara da prateleira de Dona Dorothy. 5 Cartas aleatórias de uma só vez.", naPrateleira: true, img: "assets/images/pxArt.png" },
    { id: "deckbox_couro", nome: "Deckbox de Couro", tipo: "equipamento", custo: 250, desc: "+1 HP Máximo permanente.", naPrateleira: true, img: "assets/images/pxArt.png", bonusHp: 1 },
    { id: "deckbox_reforcada", nome: "Deckbox Reforçada", tipo: "equipamento", custo: 550, desc: "+2 HP Máximo permanente. Um upgrade direto da Deckbox de Couro.", naPrateleira: true, img: "assets/images/pxArt.png", bonusHp: 2 },
    { id: "disco_kaibacorp", nome: "Disco KaibaCorp", tipo: "equipamento", custo: 800, desc: "Equipamento de elite fabricado pela KaibaCorp. Aumenta em 25% todo ganho de ATK obtido em dias de duelo.", naPrateleira: true, img: "assets/images/pxArt.png", bonusAtkPct: 0.25 },

    // --- RECOMPENSAS DOS LANCHES (sorteadas ao comprar "Sanduíche Surpresa") ---
    { id: "sanduiche_estragado", nome: "Sanduíche Estragado", tipo: "consumivel_real", desc: "50% de chance de curar 1 HP, 50% de chance de perder 1 HP.", naPrateleira: false, img: "assets/images/pxArt.png" },
    { id: "sanduiche_ovo", nome: "Sanduíche de Ovo", tipo: "consumivel_real", desc: "Recupera 1 HP garantido.", naPrateleira: false, img: "assets/images/pxArt.png" },
    { id: "sanduiche_atum", nome: "Sanduíche de Atum", tipo: "consumivel_real", desc: "Uma receita caseira que recupera 2 HP garantidos.", naPrateleira: false, img: "assets/images/pxArt.png" },
    { id: "sanduiche_dourado", nome: "Sanduíche de Ovo Dourado", tipo: "consumivel_real", desc: "Lendário! Recupera TODO o seu HP instantaneamente.", naPrateleira: false, img: "assets/images/pxArt.png" },

    // --- RECOMPENSAS DOS BOOSTERS (cartas Mágicas e Armadilhas) ---
    { id: "pote_ganancia", nome: "Pote da Ganância", tipo: "reliquia_real", subTipo: "magia_normal", desc: "Ative para ganhar 400 DP imediatos.", naPrateleira: false, img: "assets/images/pot_of_greed.jpeg" },
    { id: "monster_reborn", nome: "Monster Reborn", tipo: "reliquia_real", subTipo: "magia_normal", desc: "Efeito duplo: ative a qualquer momento para curar todo o seu HP, ou deixe-a guardada na mão como uma rede de segurança — se seu HP chegar a 0, ela se ativa sozinha e te salva com 1 HP.", naPrateleira: false, img: "assets/images/monster_reborn.png" },
    { id: "forca_espelho", nome: "Força Espelho", tipo: "reliquia_real", subTipo: "armadilha", desc: "Ative durante um Duelo de Aposta para destruir o oponente e vencer automaticamente.", naPrateleira: false, img: "assets/images/mirror_force.jpeg" },
    { id: "espadas_luz", nome: "Espadas da Luz Reveladora", tipo: "reliquia_real", subTipo: "magia_normal", desc: "Ative para bloquear as próximas 3 emboscadas de valentões, não importa quando aconteçam.", naPrateleira: false, img: "assets/images/swords_of_revealing.jpeg" },
    { id: "tufao", nome: "Tufão Espacial Místico", tipo: "reliquia_real", subTipo: "magia_normal", desc: "Guarda-a para a Aula de Sexta: anula o teste-surpresa do Prof. Crowler e garante nota máxima.", naPrateleira: false, img: "assets/images/mystical_space.jpeg" },
    { id: "buraco_negro", nome: "Buraco Negro", tipo: "reliquia_real", subTipo: "magia_normal", desc: "Ative para varrer o campo: concede +20 ATK e +20 INT permanentes, instantaneamente.", naPrateleira: false, img: "assets/images/dark_hole.jpeg" },
    { id: "raigeki", nome: "Raigeki", tipo: "reliquia_real", subTipo: "magia_normal", desc: "Um raio divino incinera seus obstáculos. Ative para ganhar +50 ATK permanente na hora.", naPrateleira: false, img: "assets/images/pxArt.png" },
    { id: "tributo_torrencial", nome: "Tributo Torrencial", tipo: "reliquia_real", subTipo: "armadilha", desc: "Ative durante um Duelo de Aposta para inundar o campo: você escapa sem pagar DP e ainda leva metade da recompensa do valentão.", naPrateleira: false, img: "assets/images/pxArt.png" }
];

// --- SISTEMA SOCIAL ---
const parceiros = [
    {
        id: 'syrus', nome: 'Syrus Truesdale', anoReq: 1, raridade: 'Comum',
        bonusDesc: 'Reduz o custo de todos os itens da loja pela metade.', img: 'assets/images/pxArt.png'
    },
    {
        id: 'jaden', nome: 'Jaden Yuki', anoReq: 1, raridade: 'Raro',
        bonusDesc: 'Duelos automáticos no idle rendem o dobro de DP.', img: 'assets/images/pxArt.png'
    },
    {
        id: 'bastion', nome: 'Bastion Misawa', anoReq: 2, raridade: 'Épico',
        bonusDesc: '+50% de ganho de INT durante os focos de estudo.', img: 'assets/images/pxArt.png'
    },
    {
        id: 'zane', nome: 'Zane Truesdale', anoReq: 3, raridade: 'Lenda',
        bonusDesc: 'Dobra o ganho de ATK, mas custa -2 de HP máximo ao desbloquear.', img: 'assets/images/pxArt.png'
    }
];

const bancoConversas = [
    {
        fala: "Qual você acha que é a qualidade mais importante de um duelista?",
        certa: "Acreditar no Coração das Cartas.",
        erradas: ["Comprar as cartas mais caras da loja.", "Humilhar o oponente sem dó."]
    },
    {
        fala: "O que você faria se comprasse uma mão inicial péssima?",
        certa: "Pensaria numa estratégia defensiva e manteria a calma.",
        erradas: ["Desistiria do duelo na hora.", "Reclamaria que o meu deck me odeia."]
    },
    {
        fala: "Qual é a melhor forma de se preparar para o Exame Prático?",
        certa: "Duelar com amigos para testar a sinergia dos combos.",
        erradas: ["Copiar o deck de alguém do Obelisco Azul.", "Subornar o Professor Crowler."]
    },
    {
        fala: "Um valentão te desafia para um Duelo de Aposta que você claramente vai perder. O que fazer?",
        certa: "Avaliar o risco com calma e decidir se vale a pena fugir ou arriscar.",
        erradas: ["Aceitar de olhos fechados só por orgulho.", "Culpar a sorte antes mesmo de duelar."]
    },
    {
        fala: "Na sua opinião, o que faz um deck ser realmente forte?",
        certa: "A sinergia entre as cartas, não apenas o poder individual de cada uma.",
        erradas: ["Ter só monstros com o maior ATK possível.", "Copiar exatamente o deck de um campeão."]
    }
];

const bancoTrivia = [
    { q: "Qual o Nível do Mago Negro?", opções: ["Nível 6", "Nível 7", "Nível 8"], correta: 1 },
    { q: "Qual é o nome do dormitório reservado para os alunos com o desempenho mais baixo, associado à cor vermelha?", opções: ["Obelisco Vermelho", "Rá Vermelho", "Slifer Vermelho"], correta: 2 },
    { q: "Quantos Pontos de Vida (PV) se começa em um duelo oficial de Batalha da Cidade?", opções: ["2000 PV", "4000 PV", "8000 PV"], correta: 1 },
    { q: "Qual o Nível do Elemental HERO Flame Wingman?", opções: ["Nível 6", "Nível 7", "Nível 8"], correta: 0 },
    { q: "Quantos Pontos de Vida (PV) se começa em um duelo oficial no TCG?", opções: ["2000 PV", "4000 PV", "8000 PV"], correta: 2 },
    { q: "Qual carta mágica permite comprar duas cartas do deck sem custo?", opções: ["Pote da Ganância", "Buraco Negro", "Monstro Reborn"], correta: 0 },
    { q: "Qual destas é uma Carta de Armadilha, e não uma Carta Mágica?", opções: ["Força Espelho", "Monster Reborn", "Pote da Ganância"], correta: 0 },
    { q: "Qual destas cartas destrói TODOS os monstros no campo, dos dois lados?", opções: ["Espadas da Luz Reveladora", "Buraco Negro", "Tufão Espacial Místico"], correta: 1 },
    { q: "Quem é o mascote de bolinha marrom mais fiel de Jaden Yuki?", opções: ["Winged Kuriboh", "Ojama Amarelo", "Des Koala"], correta: 0 },
    { q: "Qual destes dormitórios é considerado o de elite, associado à cor azul?", opções: ["Obelisco Azul", "Rá Amarelo", "Slifer Vermelho"], correta: 0 }
];

// --- PUZZLES DOS EXAMES (Admissão = índice 0, depois 1 por ano letivo) ---
const puzzlesExame = {
    0: { // EXAME DE ADMISSÃO
        bossName: "Prof. Crowler (Avaliador Surpresa)",
        bossImg: "assets/images/pxArt.png",
        hero: {
            texto: "Você chegou atrasado e perdeu a prova teórica! O Prof. Crowler, irritado, decidiu te avaliar pessoalmente. Ele invocou o 'Golem das Engrenagens Antigas' (3000 ATK). Seu 'Homem-Pássaro Chama' tem apenas 2100 ATK. Como você sobrevive?",
            opcoes: [
                { texto: "Usar o terreno 'Arranha-Céu' para ganhar vantagem (Exige 5 INT)", stat: 'int', req: 5, correto: true, msg: "Você usou o cenário a seu favor! O ataque superou o Golem e Crowler ficou boquiaberto." },
                { texto: "Ataque frontal com força bruta (Exige 20 ATK)", stat: 'atk', req: 20, correto: true, msg: "Isso exigiria uma força que você ainda não tem." },
                { texto: "Correr e desistir do duelo", stat: 'int', req: 0, correto: false, msg: "Você fugiu da arena. Crowler riu e carimbou sua reprovação." }
            ]
        },
        roid: {
            texto: "Você perdeu a prova teórica! Para entrar, precisa impressionar o Prof. Crowler no duelo prático. Ele bloqueou sua linha de frente com monstros imensos. Você tem 'Gyroid' e 'Brocaroid'.",
            opcoes: [
                { texto: "Atacar diretamente com força bruta (Exige 10 ATK)", stat: 'atk', req: 10, correto: true, msg: "Seus Roids aceleraram com tudo e furaram a defesa dele! Você garantiu sua vaga na Academia." },
                { texto: "Usar manobras evasivas e efeito de perfuração (Exige 3 INT)", stat: 'int', req: 3, correto: true, msg: "Jogada tática perfeita! Você contornou a defesa pesada dele e causou dano direto, garantindo sua vaga!" },
                { texto: "Apertar botões aleatórios dos Roids", stat: 'int', req: 0, correto: false, msg: "Seu Gyroid pifou no meio da arena. Reprovado sumariamente." }
            ]
        },
        koala: {
            texto: "Após zerar a prova teórica por falta de presença, Crowler exige um duelo prático perfeito. Ele encheu o campo de cartas viradas para baixo (armadilhas) para conter suas feras.",
            opcoes: [
                { texto: "Investida brutal com 'Rei Tigre Wanghu' (Exige 8 ATK)", stat: 'atk', req: 8, correto: true, msg: "A agressividade do seu deck destruiu a estratégia dele antes que as armadilhas pudessem ser ativadas! Aprovado!" },
                { texto: "Tentar desarmar as armadilhas com magia (Exige 10 INT)", stat: 'int', req: 10, correto: true, msg: "Você não tem o intelecto necessário para essa jogada sutil." },
                { texto: "Recuar os monstros para defesa", stat: 'int', req: 0, correto: false, msg: "Bestas não recuam! Crowler aproveitou sua hesitação e obliterou seus monstros." }
            ]
        },
        ojama: {
            texto: "Crowler olhou torto para o seu deck e riu na sua cara: 'Ojamas? Sério?'. Ele invocou um monstro imponente só para te humilhar antes mesmo de começar. Seus Ojamas encaram o campo, prontos para provar que a aparência engana.",
            opcoes: [
                { texto: "Deixar os Ojamas absorverem o golpe e contra-atacar com efeitos (Exige 15 INT)", stat: 'int', req: 15, correto: true, msg: "Os Ojamas suportaram tudo sem se abalar e viraram o jogo com pura teimosia tática. Crowler ficou sem palavras — aprovado!" },
                { texto: "Forçar um ataque direto de puro orgulho (Exige 25 ATK)", stat: 'atk', req: 25, correto: true, msg: "Seus Ojamas mal têm força para empurrar uma cadeira, quanto mais isso." },
                { texto: "Implorar para o Crowler ter pena do deck", stat: 'int', req: 0, correto: false, msg: "Crowler não teve pena nenhuma. 'Nem os Ojamas merecem isso', ele disse, reprovando você." }
            ]
        },
        cyber: {
            texto: "Crowler encarou o brilho metálico do seu deck com um sorriso maldoso: 'Achando que já é o próximo Kaiser, novato?'. Ele invocou uma muralha de monstros de defesa só para testar sua paciência.",
            opcoes: [
                { texto: "Atropelar a muralha com pura potência de fogo (Exige 18 ATK)", stat: 'atk', req: 18, correto: true, msg: "Seu Cyber Dragão rasgou a muralha ao meio sem esforço. Crowler engoliu em seco — aprovado!" },
                { texto: "Calcular a rota perfeita de ataque (Exige 10 INT)", stat: 'int', req: 10, correto: true, msg: "Você ainda não tem paciência de sobra para cálculos tão finos. Isso vai levar tempo." },
                { texto: "Recuar e esperar uma abertura que nunca vem", stat: 'int', req: 0, correto: false, msg: "Enquanto você esperava, Crowler fechou o cerco. Reprovado por hesitação." }
            ]
        }
    },

    1: {
        bossName: "Chazz Princeton",
        bossImg: "assets/images/pxArt.png",
        hero: {
            texto: "Chazz invocou o 'Dragão Armado LV7' (2800 ATK) e preparou-se para destruir o teu lado do campo! Tens o 'Homem-Pássaro Chama' em campo, e 'Arranha-Céu' na mão. Qual é a tua jogada?",
            opcoes: [
                { texto: "Ativar Arranha-Céu e atacar (Exige 40 ATK)", stat: 'atk', req: 40, correto: true, msg: "O teu Herói usou o terreno para superar o ataque do Dragão e venceste o duelo!" },
                { texto: "Tentar controlar com armadilhas (Exige 60 INT)", stat: 'int', req: 60, correto: true, msg: "Foste inteligente! Usaste armadilhas para anular o efeito do Dragão Armado." },
                { texto: "Mudar para Defesa e rezar", stat: 'int', req: 0, correto: false, msg: "O efeito do Dragão Armado destruiu a tua defesa e perdeste pontos de vida diretos!" }
            ]
        },
        roid: {
            texto: "Chazz invocou o 'Rei Ojama' e bloqueou 3 zonas de monstros tuas! Tens 'Gyroid' no campo e 'Brocaroid' na mão.",
            opcoes: [
                { texto: "Invocação-Tributo de Força (Exige 60 ATK)", stat: 'atk', req: 60, correto: true, msg: "Superaste o bloqueio com pura força bruta e esmagaste o Rei Ojama!" },
                { texto: "Mudar Gyroid para Defesa (Exige 40 INT)", stat: 'int', req: 40, correto: true, msg: "O efeito do Gyroid manteve-o vivo. No turno seguinte conseguiste espaço para virar o jogo!" },
                { texto: "Atacar o Rei Ojama diretamente", stat: 'atk', req: 0, correto: false, msg: "O Rei Ojama absorveu o ataque e sofres dano de recuo!" }
            ]
        },
        koala: {
            texto: "Chazz colocou 3 cartas viradas para baixo e invocou 'Ojama Amarelo'. É uma isca óbvia! O teu 'Des Koala' está pronto a agir.",
            opcoes: [
                { texto: "Atacar com Força Máxima (Exige 60 ATK)", stat: 'atk', req: 60, correto: true, msg: "Eras tão forte que a Força Espelho dele não foi suficiente para te parar!" },
                { texto: "Efeito de Dano Direto (Exige 40 INT)", stat: 'int', req: 40, correto: true, msg: "Percebeste a armadilha! Usaste o efeito do Des Koala para vencer sem iniciar a fase de batalha." },
                { texto: "Invocar mais monstros para ajudar", stat: 'int', req: 0, correto: false, msg: "Ele ativou 'Tributo Torrencial' e limpou todo o teu campo!" }
            ]
        },
        ojama: {
            texto: "Chazz ficou furioso ao ver os Ojamas no teu campo: 'Isso é uma piada pessoal?!'. Ele invocou 'Armed Dragon LV5' num ataque de fúria cega, tentando acabar contigo rápido.",
            opcoes: [
                { texto: "Deixar os Ojamas bloquearem tudo e ativar seus efeitos (Exige 45 INT)", stat: 'int', req: 45, correto: true, msg: "Os Ojamas seguraram a fúria de Chazz sem esforço e contra-atacaram com efeitos irritantemente eficazes. Vitória!" },
                { texto: "Tentar um ataque de puro orgulho (Exige 70 ATK)", stat: 'atk', req: 70, correto: true, msg: "Os Ojamas simplesmente não nasceram para brigar de igual para igual em força bruta." },
                { texto: "Trocar de deck no meio do duelo", stat: 'int', req: 0, correto: false, msg: "Isso é contra as regras! Desqualificado na hora por Chazz, aos gritos de 'Ojama trapaceiro!'" }
            ]
        },
        cyber: {
            texto: "Chazz reconheceu o brilho do seu deck: 'Cyber Dragão? Achando que é o Zane, garoto?'. Ele invocou uma parede dupla de defesa, tentando te provocar para um erro.",
            opcoes: [
                { texto: "Fundir e atropelar a parede dupla (Exige 70 ATK)", stat: 'atk', req: 70, correto: true, msg: "Seu Cyber Dragão se fundiu em pleno ar e varreu a parede dupla sem dó. Vitória esmagadora!" },
                { texto: "Calcular o ângulo perfeito de penetração (Exige 55 INT)", stat: 'int', req: 55, correto: true, msg: "Com precisão cirúrgica, você encontrou a brecha entre os dois monstros e causou dano direto!" },
                { texto: "Aceitar a provocação e atacar sem pensar", stat: 'int', req: 0, correto: false, msg: "Você caiu direto na armadilha de Chazz e pagou caro pela impulsividade." }
            ]
        }
    },

    2: {
        bossName: "Bastion Misawa",
        bossImg: "assets/images/pxArt.png",
        hero: {
            texto: "Bastion calculou as suas jogadas e invocou o 'Dragão da Água' (2800 ATK), reduzindo o ATK do seu 'Homem-Pássaro Chama' a 0 pela habilidade natural! Você tem 'Polimerização' e 'Explosão de Herói' na mão.",
            opcoes: [
                { texto: "Fundir um novo Herói imune (Exige 250 ATK)", stat: 'atk', req: 250, correto: true, msg: "A força bruta do seu novo Herói Elementar superou os cálculos de Bastion e esmagou o Dragão da Água!" },
                { texto: "Usar Explosão de Herói com precisão (Exige 130 INT)", stat: 'int', req: 130, correto: true, msg: "Você previu a tática dele! A magia destruiu o Dragão da Água contornando a diferença de ataque." },
                { texto: "Atacar o Dragão da Água cegamente", stat: 'atk', req: 0, correto: false, msg: "Bastion riu da sua jogada ilógica. Seu monstro foi destruído e você levou dano massivo!" }
            ]
        },
        roid: {
            texto: "Bastion ativou cartas de Controle de Gravidade. Seu 'Gyroid' está preso e ele prepara um ataque letal matemático. Seu 'Super Veicroid - Conexão Furtiva' está pronto no Extra Deck.",
            opcoes: [
                { texto: "Invocar Super Veicroid e atropelar (Exige 250 ATK)", stat: 'atk', req: 250, correto: true, msg: "O motor do Veicroid superaqueceu e ignorou a gravidade, causando dano perfurante fatal!" },
                { texto: "Ativar Zona de Conexão Veicroid (Exige 130 INT)", stat: 'int', req: 130, correto: true, msg: "Gênio! A Zona de Conexão tornou sua fusão imune aos efeitos de controle dele." },
                { texto: "Esperar a fase final dele", stat: 'int', req: 0, correto: false, msg: "Você hesitou demais. As fórmulas de Bastion limparam seu campo antes do seu turno!" }
            ]
        },
        koala: {
            texto: "Bastion ativou 'Cilindro Mágico' no seu ataque principal! Você está prestes a tomar o reflexo do próprio dano, mas tem efeitos feras engatilhados.",
            opcoes: [
                { texto: "Invocar Babuíno Verde em resposta (Exige 250 ATK)", stat: 'atk', req: 250, correto: true, msg: "O rugido do Babuíno Verde cancelou a armadilha com pura brutalidade física, despedaçando o campo de Bastion!" },
                { texto: "Redirecionar o dano com sabedoria (Exige 130 INT)", stat: 'int', req: 130, correto: true, msg: "Estratégia perfeita! Você absorveu o impacto e usou os efeitos de bestas no cemitério para contra-atacar." },
                { texto: "Aceitar o dano passivamente", stat: 'int', req: 0, correto: false, msg: "O Cilindro Mágico refletiu 3000 de dano direto. A matemática de Bastion foi implacável!" }
            ]
        },
        ojama: {
            texto: "Bastion analisou os Ojamas com curiosidade científica: 'Estatisticamente, vocês não deveriam vencer nada... vamos provar isso'. Ele monta uma equação de campo perfeita para te encurralar.",
            opcoes: [
                { texto: "Deixar a equação dele esbarrar na teimosia Ojama (Exige 130 INT)", stat: 'int', req: 130, correto: true, msg: "Bastion esqueceu uma variável: os Ojamas não seguem lógica nenhuma. A equação dele desmoronou!" },
                { texto: "Tentar um ataque de força bruta improvável (Exige 250 ATK)", stat: 'atk', req: 250, correto: true, msg: "Nem em mil anos os Ojamas alcançariam esse número de ATK sozinhos." },
                { texto: "Concordar educadamente com a lógica dele", stat: 'int', req: 0, correto: false, msg: "Ao concordar, você caiu direto na armadilha estatística de Bastion. Derrota calculada." }
            ]
        },
        cyber: {
            texto: "Bastion sorriu com respeito: 'Cyber Dragão... um clássico elegante'. Ele monta uma barreira de cálculo perfeito, testando se você confia mais em números ou em instinto.",
            opcoes: [
                { texto: "Confiar no instinto e atropelar com pura potência (Exige 250 ATK)", stat: 'atk', req: 250, correto: true, msg: "Às vezes a força bruta é mais rápida que qualquer equação. Seu Cyber Dragão varreu a barreira!" },
                { texto: "Vencer Bastion no próprio jogo dos números (Exige 130 INT)", stat: 'int', req: 130, correto: true, msg: "Você calculou uma rota que nem o próprio Bastion previu. Ele aplaudiu a própria derrota!" },
                { texto: "Tentar blefar sem plano nenhum", stat: 'int', req: 0, correto: false, msg: "Bastion não cai em blefe. Sua falta de plano custou o duelo." }
            ]
        }
    },

    3: { // EXAME DE GRADUAÇÃO — 3º Ano
        bossName: "Zane Truesdale (Duelo de Graduação)",
        bossImg: "assets/images/pxArt.png",
        hero: {
            texto: "O 'Kaiser' da Academia em pessoa te espera no centro do ginásio lotado. Zane invoca 'Cyber End Dragão' (4000 ATK) sem sequer piscar. Este é o duelo que decide se você se forma com honras ou sai pela porta dos fundos.",
            opcoes: [
                { texto: "Fundir seus Heróis no maior combo já visto (Exige 550 ATK)", stat: 'atk', req: 550, correto: true, msg: "Anos de treino explodiram em um único golpe. Você derrubou o Cyber End Dragão e a plateia foi ao delírio!" },
                { texto: "Explorar a única brecha lógica do combo dele (Exige 280 INT)", stat: 'int', req: 280, correto: true, msg: "Você enxergou o que ninguém mais viu: uma fresta no plano perfeito de Zane. Vitória cirúrgica!" },
                { texto: "Congelar de nervoso diante do Kaiser", stat: 'int', req: 0, correto: false, msg: "O peso do momento foi grande demais. Zane encerrou o duelo sem dó, mas com respeito no olhar." }
            ]
        },
        roid: {
            texto: "Zane encara seus Veicroids com um leve aceno de respeito antes de invocar 'Cyber End Dragão'. As engrenagens tremem, mas não param — este é o duelo de uma vida inteira de treino.",
            opcoes: [
                { texto: "Sincronizar todos os Roids num ataque coordenado (Exige 550 ATK)", stat: 'atk', req: 550, correto: true, msg: "Cada Roid disparou no exato milissegundo certo. A precisão mecânica superou o poder bruto do Kaiser!" },
                { texto: "Recalcular a rota de conexão em tempo real (Exige 280 INT)", stat: 'int', req: 280, correto: true, msg: "Você reprogramou a jogada no meio do duelo. Zane ergueu uma sobrancelha, impressionado." },
                { texto: "Seguir o manual de instruções à risca", stat: 'int', req: 0, correto: false, msg: "Contra o Kaiser, não existe manual que sirva. Sua rigidez foi sua queda." }
            ]
        },
        koala: {
            texto: "Zane olha para as feras fofas no seu campo sem qualquer sorriso: 'Fofura não vence duelos'. 'Cyber End Dragão' surge, imponente, pronto para provar o próprio ponto.",
            opcoes: [
                { texto: "Provar que fofura ESMAGA com pura força (Exige 550 ATK)", stat: 'atk', req: 550, correto: true, msg: "Suas bestas avançaram sem medo e provaram, de uma vez por todas, que fofura também esmaga. Vitória histórica!" },
                { texto: "Explorar a intimidação psicológica ao extremo (Exige 280 INT)", stat: 'int', req: 280, correto: true, msg: "Você virou o próprio jogo mental de Zane contra ele mesmo. Ele nunca tinha visto essa jogada." },
                { texto: "Recuar tudo para defesa e torcer", stat: 'int', req: 0, correto: false, msg: "Contra o Kaiser, recuar é o mesmo que se render. Duelo encerrado." }
            ]
        },
        ojama: {
            texto: "Zane fecha os olhos por um segundo ao ver os Ojamas: 'Vocês chegaram longe demais para uma piada'. Ele invoca 'Cyber End Dragão', decidido a encerrar essa história ali mesmo.",
            opcoes: [
                { texto: "Deixar os Ojamas absorverem TUDO e revidar em uníssono (Exige 280 INT)", stat: 'int', req: 280, correto: true, msg: "Os Ojamas suportaram o peso do Cyber End Dragão inteiro e ainda encontraram uma brecha para revidar. Impossível... mas aconteceu!" },
                { texto: "Apostar tudo num ataque de puro orgulho Ojama (Exige 550 ATK)", stat: 'atk', req: 550, correto: true, msg: "Contra todas as probabilidades, os Ojamas reuniram força suficiente para um milagre ofensivo. Zane ficou boquiaberto!" },
                { texto: "Desistir por vergonha do próprio deck", stat: 'int', req: 0, correto: false, msg: "Zane balançou a cabeça, desapontado: 'Nunca desista do que te fez chegar até aqui'. Duelo perdido por desistência." }
            ]
        },
        cyber: {
            texto: "Zane reconhece o próprio reflexo no seu campo: 'Então é você quem vai herdar o nome Cyber'. Ele invoca 'Cyber End Dragão' num duelo espelho — o mestre contra o aprendiz que o superou.",
            opcoes: [
                { texto: "Fundir seu próprio Cyber End Dragão e superar o mestre (Exige 550 ATK)", stat: 'atk', req: 550, correto: true, msg: "Dois Cyber End Dragões colidiram — e o seu, forjado com mais coração, levou a melhor. Zane sorriu pela primeira vez em anos." },
                { texto: "Prever cada jogada dele antes que aconteça (Exige 280 INT)", stat: 'int', req: 280, correto: true, msg: "Você estudou cada duelo de Zane e antecipou cada carta. O mestre foi superado pelo próprio manual." },
                { texto: "Copiar as jogadas dele sem entender o porquê", stat: 'int', req: 0, correto: false, msg: "Imitar sem compreender nunca é o bastante contra o original. Zane venceu com facilidade." }
            ]
        }
    }
};
