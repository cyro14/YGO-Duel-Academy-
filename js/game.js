// js/game.js — Motor do jogo

const SAVE_KEY = 'ygoLifeSave_v2';

// Estado Global do Jogador
let player = {
    name: "", deck: "", ace: "", spirit: "",
    hp: 3, maxHp: 3, dp: 0, atk: 0, int: 0,
    diaIndex: 0, semana: 1, mes: 1,
    foco: 'duelo',
    reliquias: [],
    equipamentos: [],
    consumiveis: [],
    kuribohUsado: false,
    espadasAtivasAteMes: 0,
    tufaoAtivo: false
};

// Variáveis temporárias para a tela de criação
let selecaoAtual = { deck: null, ace: null, spirit: null };

let idleTimer = null;
let duracaoDiaMs = 2000; // duração base de 1 dia no jogo (ajustada por equipamentos)

const ui = {};

function cacheUI() {
    ui.creation = document.getElementById('screen-creation');
    ui.hud = document.getElementById('hud');
    ui.stage = document.getElementById('stage');
    ui.dialog = document.getElementById('dialog-box');
    ui.actions = document.getElementById('action-panel');
    ui.ending = document.getElementById('screen-ending');
    ui.img = document.getElementById('stage-image');
    ui.overlay = document.getElementById('stage-overlay');
    ui.focoOverlay = document.getElementById('foco-overlay');
    ui.progContainer = document.getElementById('idle-progress-container');
    ui.progBar = document.getElementById('idle-progress-bar');
    ui.hand = document.getElementById('player-hand');
}

// ==================== TELA DE CRIAÇÃO ====================

function renderizarMenuInicial() {
    cacheUI();

    const deckGrid = document.getElementById('deck-grid');
    const spiritGrid = document.getElementById('spirit-grid');

    deckGrid.innerHTML = decksIniciais.map(d => `
        <div class="card-item" data-dorm="${d.dorm}" id="deck-${d.id}" onclick="selecionarOpcao('deck', '${d.id}')">
            <div class="card-emoji">${d.emoji}</div>
            <div class="card-name">${d.nome}</div>
            <div class="card-desc">${d.desc}</div>
            <div class="card-stats">⚔️ ${d.baseAtk} &nbsp; 🧠 ${d.baseInt} &nbsp; ❤️ ${d.hp}</div>
        </div>
    `).join('');

    spiritGrid.innerHTML = espiritosIniciais.map(s => `
        <div class="card-item" id="spirit-${s.id}" onclick="selecionarOpcao('spirit', '${s.id}')">
            <div class="card-emoji">${s.emoji}</div>
            <div class="card-name">${s.nome}</div>
            <div class="card-desc">${s.desc}</div>
        </div>
    `).join('');

    // Se existir um jogo salvo, oferece continuar
    const salvo = localStorage.getItem(SAVE_KEY);
    if (salvo) {
        const btnContinuar = document.createElement('button');
        btnContinuar.className = 'btn-primary';
        btnContinuar.style.marginBottom = '15px';
        btnContinuar.innerText = '▶ Continuar Jornada Salva';
        btnContinuar.onclick = continuarJogoSalvo;
        ui.creation.insertBefore(btnContinuar, ui.creation.children[2]);
    }
}

function selecionarOpcao(tipo, id) {
    selecaoAtual[tipo] = id;

    let itens = document.querySelectorAll(`[id^="${tipo}-"]`);
    itens.forEach(el => el.classList.remove('active'));
    document.getElementById(`${tipo}-${id}`).classList.add('active');

    if (tipo === 'deck') {
        let asesDoDeck = asesIniciais.filter(a => a.deckReq === id);
        document.getElementById('ace-grid').innerHTML = asesDoDeck.map(a => `
            <div class="card-item" id="ace-${a.id}" onclick="selecionarOpcao('ace', '${a.id}')">
                <div class="card-emoji">${a.emoji}</div>
                <div class="card-name">${a.nome}</div>
                <div class="card-desc">${a.desc}</div>
            </div>
        `).join('');

        selecaoAtual.ace = null;
    }

    let btnStart = document.getElementById('btn-start');
    if (selecaoAtual.deck && selecaoAtual.ace && selecaoAtual.spirit) {
        btnStart.disabled = false;
        btnStart.innerText = "Matricular-se na Academia";
    } else {
        btnStart.disabled = true;
        btnStart.innerText = "Selecionar Cartas para Iniciar";
    }
}

function startGame() {
    player.name = document.getElementById('playerName').value.trim() || "Novato";
    player.deck = selecaoAtual.deck;
    player.ace = selecaoAtual.ace;
    player.spirit = selecaoAtual.spirit;

    let deckBase = decksIniciais.find(d => d.id === player.deck);
    player.atk = deckBase.baseAtk;
    player.int = deckBase.baseInt;
    player.hp = deckBase.hp;
    player.maxHp = deckBase.hp;

    mostrarTelaJogo();
    updateHUD();
    abrirBoosterInicial();
}

function mostrarTelaJogo() {
    ui.creation.style.display = 'none';
    ui.hud.style.display = 'flex';
    ui.progContainer.style.display = 'block';
    ui.stage.style.display = 'flex';
    ui.dialog.style.display = 'block';
    ui.actions.style.display = 'flex';
    ui.hand.style.display = 'flex';
}

function continuarJogoSalvo() {
    const dados = JSON.parse(localStorage.getItem(SAVE_KEY));
    if (!dados) return;
    player = dados;
    mostrarTelaJogo();
    updateHUD();
    renderizarMao();
    showDialog(`Bem-vindo de volta, <b>${player.name}</b>! Sua jornada continua de onde parou.`, imgs.hub);
    renderButtons(`<button onclick="iniciarIdleLoop()" class="btn-success">Continuar Rotina</button>`);
}

function salvarJogo() {
    try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(player));
    } catch (e) { /* armazenamento indisponível — segue sem salvar */ }
}

// ==================== INVENTÁRIO / MÃO ====================

function renderizarMao() {
    if (!ui.hand) return;

    let ativaveis = player.reliquias.filter(id => {
        let item = lojaItens.find(i => i.id === id);
        return item && item.tipo === 'reliquia';
    });

    if (ativaveis.length === 0) {
        ui.hand.innerHTML = `<div class="hand-empty">Nenhuma relíquia na mão</div>`;
        return;
    }

    ui.hand.innerHTML = ativaveis.map((relId) => {
        let item = lojaItens.find(i => i.id === relId);
        let index = player.reliquias.indexOf(relId);
        let ehArmadilha = item.subTipo === 'armadilha';
        return `
            <div class="hand-card ${ehArmadilha ? 'hand-card-trap' : 'hand-card-spell'}" onclick="tentarAtivarCarta('${relId}', ${index})">
                <span class="hand-card-emoji">${item.emoji || '🎴'}</span>
                <span>${item.nome}</span>
            </div>
        `;
    }).join('');
}

function tentarAtivarCarta(relId, index) {
    let item = lojaItens.find(i => i.id === relId);
    if (!item) return;

    if (item.subTipo === 'armadilha') {
        alert("Armadilhas só podem ser ativadas em resposta a um evento (ex: durante emboscadas)!");
        return;
    }

    if (item.id === 'pote_ganancia') {
        player.dp += 200;
        showDialog(`Você ativou a Magia <b>Pote da Ganância</b> e comprou 200 DP diretamente para o seu bolso!`, imgs.hub);
    } else if (item.id === 'monster_reborn') {
        if (player.hp >= player.maxHp) {
            alert("Seu HP já está no máximo!");
            return;
        }
        player.hp = player.maxHp;
        showDialog(`Você ativou <b>Monster Reborn</b>! Uma aura de luz restaurou completamente seus Pontos de Vida.`, imgs.hub);
    } else if (item.id === 'espadas_luz') {
        player.espadasAtivasAteMes = player.mes;
        showDialog(`Você ativou <b>Espadas da Luz Reveladora</b>! Nenhuma emboscada vai te atrapalhar pelo resto deste mês.`, imgs.hub);
    } else if (item.id === 'tufao') {
        player.tufaoAtivo = true;
        showDialog(`Você ativou <b>Tufão Espacial Místico</b>! O próximo duelo vencido no Idle renderá DP em dobro.`, imgs.hub);
    }

    player.reliquias.splice(player.reliquias.indexOf(relId), 1);
    updateHUD();
    renderizarMao();
    salvarJogo();
}

function abrirInventario() {
    let inv = document.getElementById('modal-inventario');
    let cont = document.getElementById('inv-conteudo');

    let html = `<b>🥪 Consumíveis:</b><br>`;
    if (player.consumiveis.length === 0) html += `<i>Vazio</i><br>`;
    player.consumiveis.forEach((item, index) => {
        html += `- ${item.nome} <button onclick="usarConsumivel(${index})" class="btn-inline">Usar</button><br>`;
    });

    html += `<br><b>🎴 Relíquias:</b><br>`;
    if (player.reliquias.length === 0) html += `<i>Vazio</i><br>`;
    player.reliquias.forEach(r => {
        let item = lojaItens.find(i => i.id === r);
        html += `- ${item ? item.nome : r}<br>`;
    });

    html += `<br><b>💼 Equipamentos:</b><br>`;
    if (player.equipamentos.length === 0) html += `<i>Vazio</i><br>`;
    player.equipamentos.forEach(e => {
        let item = lojaItens.find(i => i.id === e);
        html += `- ${item ? item.nome : e}<br>`;
    });

    cont.innerHTML = html;
    inv.style.display = 'block';
}

function fecharInventario() {
    document.getElementById('modal-inventario').style.display = 'none';
}

function ganharHP(qtd) {
    player.hp = Math.min(player.maxHp, player.hp + qtd);
}

// Centraliza toda perda de HP: aplica bônus de espírito e checa morte
function perderHP(qtd) {
    player.hp -= qtd;

    if (player.spirit === 'mokey') {
        let efeito = espiritosIniciais.find(s => s.id === 'mokey').efeito;
        player.int += efeito.valor;
    }

    updateHUD();

    if (player.hp <= 0) {
        checarMorte();
        return true; // sinaliza que o jogo tratou uma possível morte
    }
    return false;
}

function usarConsumivel(index) {
    let item = player.consumiveis[index];
    if (player.hp >= player.maxHp) {
        alert("Seu HP já está cheio!");
        return;
    }
    ganharHP(item.cura || 1);
    player.consumiveis.splice(index, 1);
    updateHUD();
    salvarJogo();
    abrirInventario();
}

// ==================== HUD / DIÁLOGO ====================

function updateHUD() {
    document.getElementById('v-hp').innerText = `${player.hp}/${player.maxHp}`;
    document.getElementById('v-dp').innerText = player.dp;
    document.getElementById('v-atk').innerText = player.atk;
    document.getElementById('v-int').innerText = player.int;

    ui.overlay.innerHTML = `Mês ${player.mes} - Sem ${player.semana} - <span style="color:#fff">${diasDaSemana[player.diaIndex]}</span>`;
    ui.focoOverlay.innerText = `Foco: ${player.foco === 'duelo' ? "⚔️ Duelos" : "📚 Estudos"}`;
}

function showDialog(text, bgUrl = imgs.hub) {
    ui.dialog.innerHTML = text;
    ui.img.src = bgUrl;
}

function renderButtons(buttonsHTML) {
    ui.actions.innerHTML = buttonsHTML;
}

// ==================== BOOSTER INICIAL ====================

function abrirBoosterInicial() {
    let poolReliquias = lojaItens.filter(i => i.tipo === 'reliquia');
    let draft = poolReliquias.sort(() => 0.5 - Math.random()).slice(0, 3);

    let nomesHTML = [];
    draft.forEach(item => {
        player.reliquias.push(item.id);
        nomesHTML.push(`${item.emoji || '🎴'} <b>${item.nome}</b>: <span style="font-size:12px; color:#ccc;">${item.desc}</span>`);
    });

    showDialog(`<span style="color:var(--gold)">🎁 PACOTE DE MATRÍCULA!</span><br>O Reitor Sheppard te entregou 3 cartas raras para iniciar sua jornada:<br><br>${nomesHTML.join('<br><br>')}`, imgs.hub);

    renderizarMao();
    salvarJogo();
    renderButtons(`<button onclick="iniciarIdleLoop()" class="btn-success">Vestir Uniforme e Começar</button>`);
}

// ==================== MOTOR DE TEMPO (CALENDÁRIO) ====================

function iniciarIdleLoop() {
    if (player.hp <= 0) return dispararGameOver("Ficou sem Pontos de Vida.");

    showDialog(`<b>${diasDaSemana[player.diaIndex]}!</b><br>O semestre está correndo. Administre seu tempo e cuidado com a aula de sexta!`, player.foco === 'duelo' ? imgs.duel : imgs.study);

    renderButtons(`
        <button onclick="mudarFoco()" class="btn-primary">Mudar Foco (Atual: ${player.foco === 'duelo' ? 'Duelos' : 'Estudos'})</button>
        <button onclick="acaoLoja()">🛒 Visitar Dona Dorothy</button>
    `);

    clearInterval(idleTimer);
    ui.progBar.style.transition = 'none';
    ui.progBar.style.width = '0%';

    let duracaoReal = duracaoDiaMs;
    if (player.equipamentos.includes('disco_kaiba')) duracaoReal *= 0.75;

    setTimeout(() => {
        ui.progBar.style.transition = `width ${duracaoReal}ms linear`;
        ui.progBar.style.width = '100%';
    }, 50);

    idleTimer = setInterval(() => {
        processarFimDoDia();
    }, duracaoReal);
}

function processarFimDoDia() {
    clearInterval(idleTimer);

    if (player.foco === 'duelo') {
        let ganhoAtk = Math.floor(Math.random() * 3) + 1;
        let ganhoDp = Math.floor(Math.random() * 15) + 10;

        if (player.ace === 'koala') ganhoDp += 5;

        if (player.tufaoAtivo) {
            ganhoDp *= 2;
            player.tufaoAtivo = false;
        }

        if (player.spirit === 'ojama' && Math.random() < 0.15) {
            ganhoDp *= 2;
            showDialog(`<span style="color:var(--gold)">Ojama Amarelo não reclamou hoje!</span> DP em dobro no duelo de hoje.`, imgs.duel);
        }

        player.atk += ganhoAtk;
        player.dp += ganhoDp;
    } else {
        let ganhoInt = Math.floor(Math.random() * 4) + 2;
        if (player.ace === 'avian') ganhoInt = Math.round(ganhoInt * 1.10);
        player.int += ganhoInt;
    }

    player.diaIndex++;
    if (player.diaIndex > 6) {
        player.diaIndex = 0;
        player.semana++;
        if (player.semana > 4) {
            player.semana = 1;
            player.mes++;
            if (player.mes > 3) {
                return iniciarExameFinal();
            }
        }
    }

    updateHUD();
    salvarJogo();

    let diaAtual = diasDaSemana[player.diaIndex];

    if (diaAtual === "Sexta-feira") {
        setTimeout(eventoAulaSexta, 100);
    } else if (diaAtual !== "Sábado" && diaAtual !== "Domingo") {
        if (dispararEventoAleatorio()) return;
        iniciarIdleLoop();
    } else {
        iniciarIdleLoop();
    }
}

function mudarFoco() {
    player.foco = player.foco === 'duelo' ? 'estudo' : 'duelo';
    updateHUD();
    iniciarIdleLoop();
}

// ==================== EVENTOS ESPECIAIS ====================

function dispararEventoAleatorio() {
    if (player.reliquias.includes('espadas_luz')) return false;
    if (player.espadasAtivasAteMes === player.mes) return false;

    let chance = Math.random();
    if (chance < 0.7) return false;

    clearInterval(idleTimer);

    let reqAtk = 5 + (player.mes * 4) + (player.semana * 2) + Math.floor(Math.random() * 5);
    let custoFuga = 15 + (player.mes * 20);

    showDialog(`<span style="color:var(--danger)">⚠️ EMBOSCADA!</span><br>Um veterano furioso bloqueia seu caminho! "Pague o pedágio de ${custoFuga} DP ou duele!"<br><br><i>A postura dele é intimidadora. Seu ATK atual é ${player.atk}...</i>`, imgs.threat);

    let botoes = `
        <button onclick="resolverEventoAtaque(${reqAtk})" class="btn-danger">Arriscar Duelo</button>
        <button onclick="pagarValentao(${custoFuga})" style="background:#f39c12">Pagar ${custoFuga} DP e Fugir</button>
    `;

    if (player.reliquias.includes('forca_espelho')) {
        botoes += `<button onclick="ativarArmadilhaBatalha('forca_espelho')" class="btn-trap">Ativar Armadilha: Força Espelho</button>`;
    }

    renderButtons(botoes);
    return true;
}

function ativarArmadilhaBatalha(id) {
    if (id === 'forca_espelho') {
        let index = player.reliquias.indexOf('forca_espelho');
        player.reliquias.splice(index, 1);
        renderizarMao();

        let recompensa = 25 * player.mes;
        player.dp += recompensa;
        updateHUD();
        salvarJogo();

        showDialog(`<b>VOCÊ ATIVOU UMA CARTA ARMADILHA!</b><br>A <b>Força Espelho</b> estilhaçou o ataque do veterano e varreu o campo dele! Você venceu instantaneamente e pegou ${recompensa} DP!`, imgs.duel);
        renderButtons(`<button onclick="iniciarIdleLoop()" class="btn-success">Continuar Rotina</button>`);
    }
}

function resolverEventoAtaque(requisito) {
    if (player.atk >= requisito) {
        let recompensa = 25 * player.mes;
        if (player.ace === 'koala') recompensa += 5;

        player.dp += recompensa;
        updateHUD();
        salvarJogo();
        showDialog(`<span style="color:var(--success)"><b>VITÓRIA ESMAGADORA!</b></span><br>Você superou as expectativas e venceu! Recolheu <b>${recompensa} DP</b> do veterano.`, imgs.duel);
        renderButtons(`<button onclick="iniciarIdleLoop()" class="btn-success">Continuar Rotina</button>`);
        return;
    }

    if (player.reliquias.includes('forca_espelho')) {
        player.reliquias = player.reliquias.filter(r => r !== 'forca_espelho');
        renderizarMao();
        salvarJogo();
        showDialog(`<b>DERROTA IMINENTE... MAS ESPERE!</b><br>Sua <b>Força Espelho</b> foi ativada automaticamente, destruindo os monstros do oponente antes do ataque final! Você saiu ileso, mas a carta foi consumida.`, imgs.duel);
        renderButtons(`<button onclick="iniciarIdleLoop()" class="btn-success">Continuar Rotina</button>`);
        return;
    }

    let morreu = perderHP(1);
    salvarJogo();
    if (!morreu) {
        showDialog(`<span style="color:var(--danger)"><b>DERROTA!</b></span><br>Os monstros dele eram muito mais fortes (${requisito} ATK). Você apanhou no duelo e perdeu <b>1 HP</b> pelo desgaste.`, imgs.threat);
        renderButtons(`<button onclick="iniciarIdleLoop()" class="btn-success">Continuar Rotina</button>`);
    }
}

function pagarValentao(custo) {
    if (player.dp >= custo) {
        player.dp -= custo;
        updateHUD();
        salvarJogo();
        showDialog(`Você entregou os ${custo} DP. O valentão riu e te deixou passar. A dignidade dói, mas os Pontos de Vida estão intactos.`, imgs.threat);
        renderButtons(`<button onclick="iniciarIdleLoop()" class="btn-primary">Engolir o orgulho e continuar</button>`);
    } else {
        showDialog(`Você não tem ${custo} DP! O valentão percebeu que você está quebrado e atacou!`, imgs.threat);
        renderButtons(`<button onclick="resolverEventoAtaque(9999)" class="btn-danger">Sofrer as consequências</button>`);
    }
}

function eventoAulaSexta() {
    let t = bancoTrivia[Math.floor(Math.random() * bancoTrivia.length)];

    showDialog(`<span style="color:var(--gold)">🎓 AULA DE SEXTA!</span><br>Prof. Crowler exige sua atenção:<br><br><b>${t.q}</b>`, imgs.study);

    let botoes = t.opções.map((opc, index) => `<button onclick="responderTrivia(${index}, ${t.correta})">${opc}</button>`).join("");
    renderButtons(botoes);
}

function responderTrivia(escolha, correta) {
    if (escolha === correta) {
        let ganho = player.ace === 'avian' ? Math.round(15 * 1.10) : 15;
        player.int += ganho;
        updateHUD();
        salvarJogo();
        showDialog(`<span style="color:var(--success)"><b>CORRETO!</b></span> +${ganho} INT. Você pode aproveitar o fim de semana agora.`, imgs.hub);
        player.diaIndex++;
        updateHUD();
        salvarJogo();
        renderButtons(`<button onclick="iniciarIdleLoop()" class="btn-success">Aproveitar Fim de Semana</button>`);
        return;
    }

    let morreu = perderHP(1);
    salvarJogo();
    if (!morreu) {
        showDialog(`<span style="color:var(--danger)"><b>ERRADO!</b></span> Detenção mental. Perdeu 1 HP.`, imgs.threat);
        player.diaIndex++;
        updateHUD();
        salvarJogo();
        renderButtons(`<button onclick="iniciarIdleLoop()" class="btn-success">Aproveitar Fim de Semana</button>`);
    }
}

// ==================== LOJA ====================

function acaoLoja() {
    clearInterval(idleTimer);
    showDialog("Dona Dorothy: 'Temos lanches novos e algumas cartas raras hoje. O que vai levar?'", imgs.shop);
    renderizarPainelLoja();
}

function custoComDesconto(custoBase) {
    if (player.ace === 'gyroid') return Math.ceil(custoBase * 0.90);
    return custoBase;
}

function renderizarPainelLoja() {
    const grupos = [
        { titulo: '🥪 Consumíveis', tipo: 'consumivel' },
        { titulo: '💼 Equipamentos', tipo: 'equipamento' },
        { titulo: '🎴 Relíquias', tipo: 'reliquia' }
    ];

    let html = '<div class="loja-lista">';
    grupos.forEach(grupo => {
        let itensDoGrupo = lojaItens.filter(i => i.tipo === grupo.tipo);
        html += `<div class="loja-grupo-titulo">${grupo.titulo}</div>`;
        itensDoGrupo.forEach(item => {
            let jaTem = (grupo.tipo === 'equipamento' && player.equipamentos.includes(item.id));
            let custo = custoComDesconto(item.custo);
            html += `
                <button class="loja-item-btn" ${jaTem ? 'disabled' : ''} onclick="comprarLoja('${item.id}')">
                    <span>${item.emoji || '🎴'} ${item.nome}</span>
                    <span class="loja-item-custo">${jaTem ? 'Adquirido' : custo + ' DP'}</span>
                </button>`;
        });
    });
    html += '</div><button onclick="iniciarIdleLoop()" class="btn-primary">Sair da Loja</button>';

    renderButtons(html);
}

function comprarLoja(itemId) {
    let item = lojaItens.find(i => i.id === itemId);
    if (!item) return;

    let custo = custoComDesconto(item.custo);

    if (player.dp < custo) {
        showDialog("Dona Dorothy: 'Você não tem DP suficiente para isso, querido.'", imgs.shop);
        renderizarPainelLoja();
        return;
    }

    if (item.tipo === 'equipamento' && player.equipamentos.includes(item.id)) {
        return; // já possui, botão desabilitado
    }

    player.dp -= custo;

    if (item.tipo === 'consumivel') {
        if (item.id === 'sanduiche_estragado') {
            if (Math.random() < 0.5) {
                ganharHP(1);
                showDialog("Foi uma delícia! Você recuperou 1 HP.", imgs.shop);
                updateHUD(); salvarJogo(); renderizarPainelLoja();
            } else {
                let morreu = perderHP(1);
                salvarJogo();
                if (!morreu) { showDialog("Ugh... O recheio estava vencido. Você perdeu 1 HP.", imgs.threat); renderizarPainelLoja(); }
                return;
            }
        } else if (item.id === 'sanduiche_ovo') {
            if (player.hp < player.maxHp) {
                ganharHP(1);
                showDialog("Você comeu na hora e recuperou 1 HP.", imgs.shop);
            } else {
                player.consumiveis.push({ id: item.id, nome: item.nome, cura: 1 });
                showDialog("Seu HP está cheio! Você guardou o sanduíche na mochila.", imgs.shop);
            }
            updateHUD(); salvarJogo(); renderizarPainelLoja();
        } else if (item.id === 'sanduiche_dourado') {
            player.hp = player.maxHp;
            showDialog("Um brilho dourado percorre seu corpo... HP máximo restaurado!", imgs.shop);
            updateHUD(); salvarJogo(); renderizarPainelLoja();
        }
        return;
    }

    if (item.tipo === 'equipamento') {
        player.equipamentos.push(item.id);
        if (item.efeito.tipo === 'hp_max') {
            player.maxHp += item.efeito.valor;
            player.hp += item.efeito.valor;
            showDialog(`Você equipou <b>${item.nome}</b>! Seu HP máximo aumentou permanentemente.`, imgs.shop);
        } else if (item.efeito.tipo === 'idle_speed') {
            showDialog(`Você equipou <b>${item.nome}</b>! Seus dias agora passam 25% mais rápido.`, imgs.shop);
        }
        updateHUD(); salvarJogo(); renderizarPainelLoja();
        return;
    }

    if (item.tipo === 'reliquia') {
        player.reliquias.push(item.id);
        showDialog(`Você comprou a relíquia <b>${item.nome}</b>! ${item.desc}`, imgs.shop);
        renderizarMao();
        updateHUD(); salvarJogo(); renderizarPainelLoja();
        return;
    }
}

// ==================== EXAME FINAL ====================

function iniciarExameFinal() {
    clearInterval(idleTimer);
    showDialog(`<b>MÊS DO EXAME FINAL!</b><br>O ano letivo chegou ao fim. Você é convocado para o Duelo de Formatura contra o campeão da Academia. Escolha sua estratégia:`, imgs.boss1);
    renderButtons(`
        <button onclick="resolverExameFinal('agressiva')" class="btn-danger">⚔️ Estratégia Agressiva (usa ATK)</button>
        <button onclick="resolverExameFinal('analitica')" class="btn-primary">🧠 Estratégia Analítica (usa INT)</button>
        <button onclick="resolverExameFinal('equilibrada')" class="btn-success">⚖️ Estratégia Equilibrada (usa ATK+INT)</button>
    `);
}

function resolverExameFinal(estrategia) {
    let dificuldade = 90;
    let poder;
    if (estrategia === 'agressiva') poder = player.atk * 1.4;
    else if (estrategia === 'analitica') poder = player.int * 1.4;
    else poder = (player.atk + player.int) * 0.8;

    let venceu = poder >= dificuldade;

    if (venceu) {
        player.dp += 300;
        showDialog(`<span style="color:var(--success)"><b>VITÓRIA NA FORMATURA!</b></span><br>Sua estratégia funcionou perfeitamente. Você venceu o campeão e se formou com honras!`, imgs.victory);
    } else {
        showDialog(`<span style="color:var(--danger)"><b>DERROTA NA FORMATURA!</b></span><br>Foi por pouco, mas o campeão levou a melhor. Ainda assim, sua jornada até aqui foi memorável.`, imgs.defeat);
    }

    updateHUD();
    renderButtons(`<button onclick="dispararGameOver('${venceu ? 'Formado com honras!' : 'Não passou no exame final.'}', ${venceu})">Ver Resultado Final</button>`);
}

// ==================== FIM DE JOGO ====================

function checarMorte() {
    if (player.reliquias.includes('monster_reborn')) {
        player.hp = 1;
        player.reliquias = player.reliquias.filter(r => r !== 'monster_reborn');
        updateHUD();
        renderizarMao();
        salvarJogo();
        showDialog(`<b>GOLPE FATAL!</b><br>Mas a magia da sua carta <b>Monster Reborn</b> ativou! Você sobreviveu com 1 HP!`, imgs.duel);
        renderButtons(`<button onclick="iniciarIdleLoop()" class="btn-success">Ufa, voltar à rotina!</button>`);
        return;
    }

    if (player.spirit === 'kuriboh' && !player.kuribohUsado) {
        player.kuribohUsado = true;
        player.hp = 1;
        updateHUD();
        salvarJogo();
        showDialog(`<b>GOLPE FATAL!</b><br>Seu Espírito Guardião <b>Kuriboh</b> se sacrificou para te proteger! Você sobreviveu com 1 HP. Ele não poderá fazer isso de novo.`, imgs.duel);
        renderButtons(`<button onclick="iniciarIdleLoop()" class="btn-success">Ufa, voltar à rotina!</button>`);
        return;
    }

    dispararGameOver("Seus Pontos de Vida chegaram a zero.", false);
}

function calcularRank() {
    let pontuacao = player.atk + player.int + Math.floor(player.dp / 10);
    let rank = ranksFinais.find(r => pontuacao >= r.min) || ranksFinais[ranksFinais.length - 1];
    return { pontuacao, rank };
}

function dispararGameOver(motivo, formado) {
    clearInterval(idleTimer);
    localStorage.removeItem(SAVE_KEY);

    ui.hud.style.display = 'none'; ui.stage.style.display = 'none';
    ui.progContainer.style.display = 'none'; ui.dialog.style.display = 'none';
    ui.actions.style.display = 'none'; ui.hand.style.display = 'none';
    ui.ending.style.display = 'flex';

    let { pontuacao, rank } = calcularRank();

    document.getElementById('id-name').innerText = player.name;
    document.getElementById('id-deck').innerText = decksIniciais.find(d => d.id === player.deck)?.nome.toUpperCase() || player.deck.toUpperCase();
    document.getElementById('id-atk').innerText = player.atk;
    document.getElementById('id-int').innerText = player.int;
    document.getElementById('id-year').innerText = formado ? "Formado" : "Eliminado";

    let rankTitleEl = document.getElementById('id-rank-title');
    rankTitleEl.innerText = `${rank.titulo} — Pontuação: ${pontuacao}`;
    rankTitleEl.style.background = rank.cor;
    rankTitleEl.style.color = '#111';

    let motivoEl = document.getElementById('id-motivo');
    if (motivoEl) motivoEl.innerText = motivo;
}

function baixarCarteirinha() {
    const card = document.getElementById('id-card');
    if (!card || typeof html2canvas === 'undefined') return;
    html2canvas(card, { backgroundColor: '#121212', scale: 2 }).then(canvas => {
        let link = document.createElement('a');
        link.download = `carteirinha-${player.name || 'duelista'}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}

function reiniciarJogo() {
    localStorage.removeItem(SAVE_KEY);
    location.reload();
}

// Inicialização
window.onload = renderizarMenuInicial;
