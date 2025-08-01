const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs-extra');
const path = require('path');

// Configurações do bot
const CONFIG = {
    // IMPORTANTE: Substitua pelo número do dono (formato: 5511999999999@c.us)
    OWNER_NUMBER: '851553600@c.us', // Altere aqui para seu número
    
    // Configurações de arquivos
    SESSION_PATH: './session',
    GROUPS_FILE: './grupos.json',
    MESSAGES_FILE: './mensagens.json',
    
    // Configurações do bot
    BOT_NAME: '🤖 Bot Divulgação',
    PREFIX: '!', // Prefixo dos comandos
};

// Inicializar cliente WhatsApp
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "bot-divulgacao",
        dataPath: CONFIG.SESSION_PATH
    }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    }
});

// Variáveis globais
let grupos = [];
let mensagensSalvas = [];

// Funções auxiliares
function carregarDados() {
    try {
        if (fs.existsSync(CONFIG.GROUPS_FILE)) {
            grupos = JSON.parse(fs.readFileSync(CONFIG.GROUPS_FILE, 'utf8'));
        }
        if (fs.existsSync(CONFIG.MESSAGES_FILE)) {
            mensagensSalvas = JSON.parse(fs.readFileSync(CONFIG.MESSAGES_FILE, 'utf8'));
        }
    } catch (error) {
        console.log('Erro ao carregar dados:', error.message);
    }
}

function salvarDados() {
    try {
        fs.writeFileSync(CONFIG.GROUPS_FILE, JSON.stringify(grupos, null, 2));
        fs.writeFileSync(CONFIG.MESSAGES_FILE, JSON.stringify(mensagensSalvas, null, 2));
    } catch (error) {
        console.log('Erro ao salvar dados:', error.message);
    }
}

function isOwner(from) {
    return from === CONFIG.OWNER_NUMBER;
}

function formatarTempo() {
    return new Date().toLocaleString('pt-BR');
}

// Event listeners
client.on('qr', (qr) => {
    console.log('\n🔗 Escaneie o QR Code abaixo com seu WhatsApp:');
    qrcode.generate(qr, { small: true });
    console.log('\n📱 Abra o WhatsApp > Menu > Dispositivos conectados > Conectar dispositivo');
});

client.on('ready', async () => {
    console.log('\n✅ Bot conectado com sucesso!');
    console.log(`📱 Número: ${client.info.wid.user}`);
    console.log(`👤 Nome: ${client.info.pushname}`);
    console.log(`⏰ Conectado em: ${formatarTempo()}`);
    
    carregarDados();
    
    // Atualizar lista de grupos
    const chats = await client.getChats();
    const gruposAtuais = chats.filter(chat => chat.isGroup);
    
    grupos = gruposAtuais.map(grupo => ({
        id: grupo.id._serialized,
        name: grupo.name,
        participants: grupo.participants ? grupo.participants.length : 0,
        addedAt: new Date().toISOString()
    }));
    
    salvarDados();
    console.log(`📊 ${grupos.length} grupos detectados`);
});

client.on('message', async (message) => {
    const from = message.from;
    const body = message.body;
    const isGroup = message.from.endsWith('@g.us');
    
    // Verificar se é o dono
    if (!isOwner(message.author || from)) {
        return;
    }
    
    // Verificar se é comando
    if (!body.startsWith(CONFIG.PREFIX)) {
        return;
    }
    
    const args = body.slice(CONFIG.PREFIX.length).trim().split(' ');
    const command = args[0].toLowerCase();
    
    try {
        switch (command) {
            case 'menu':
                await enviarMenu(from);
                break;
                
            case 'grupos':
                await listarGrupos(from);
                break;
                
            case 'divulgar':
                const mensagem = args.slice(1).join(' ');
                if (!mensagem) {
                    await client.sendMessage(from, '❌ Use: !divulgar <mensagem>');
                    return;
                }
                await divulgarMensagem(from, mensagem);
                break;
                
            case 'salvar':
                const msgSalvar = args.slice(1).join(' ');
                if (!msgSalvar) {
                    await client.sendMessage(from, '❌ Use: !salvar <mensagem>');
                    return;
                }
                await salvarMensagem(from, msgSalvar);
                break;
                
            case 'mensagens':
                await listarMensagens(from);
                break;
                
            case 'usar':
                const indice = parseInt(args[1]);
                if (isNaN(indice)) {
                    await client.sendMessage(from, '❌ Use: !usar <número>');
                    return;
                }
                await usarMensagemSalva(from, indice);
                break;
                
            case 'deletar':
                const indiceDel = parseInt(args[1]);
                if (isNaN(indiceDel)) {
                    await client.sendMessage(from, '❌ Use: !deletar <número>');
                    return;
                }
                await deletarMensagem(from, indiceDel);
                break;
                
            case 'status':
                await mostrarStatus(from);
                break;
                
            case 'ajuda':
                await enviarAjuda(from);
                break;
                
            default:
                await client.sendMessage(from, '❌ Comando não reconhecido. Use !menu para ver os comandos disponíveis.');
        }
    } catch (error) {
        console.log('Erro ao processar comando:', error);
        await client.sendMessage(from, '❌ Erro ao processar comando. Tente novamente.');
    }
});

// Funções dos comandos
async function enviarMenu(chatId) {
    const menu = `
🤖 *${CONFIG.BOT_NAME}*
📋 *MENU DE COMANDOS*

*📢 DIVULGAÇÃO:*
${CONFIG.PREFIX}divulgar <mensagem> - Enviar mensagem para todos os grupos
${CONFIG.PREFIX}grupos - Listar grupos conectados

*💾 MENSAGENS SALVAS:*
${CONFIG.PREFIX}salvar <mensagem> - Salvar mensagem
${CONFIG.PREFIX}mensagens - Listar mensagens salvas
${CONFIG.PREFIX}usar <número> - Usar mensagem salva
${CONFIG.PREFIX}deletar <número> - Deletar mensagem salva

*ℹ️ INFORMAÇÕES:*
${CONFIG.PREFIX}status - Status do bot
${CONFIG.PREFIX}ajuda - Ajuda detalhada
${CONFIG.PREFIX}menu - Este menu

⚡ *Bot ativo e pronto para uso!*
`;
    
    await client.sendMessage(chatId, menu);
}

async function listarGrupos(chatId) {
    if (grupos.length === 0) {
        await client.sendMessage(chatId, '❌ Nenhum grupo encontrado.');
        return;
    }
    
    let lista = `📊 *GRUPOS CONECTADOS (${grupos.length})*\n\n`;
    
    grupos.forEach((grupo, index) => {
        lista += `${index + 1}. *${grupo.name}*\n`;
        lista += `   👥 ${grupo.participants} participantes\n`;
        lista += `   🆔 ${grupo.id}\n\n`;
    });
    
    await client.sendMessage(chatId, lista);
}

async function divulgarMensagem(chatId, mensagem) {
    if (grupos.length === 0) {
        await client.sendMessage(chatId, '❌ Nenhum grupo encontrado para divulgação.');
        return;
    }
    
    await client.sendMessage(chatId, `🚀 Iniciando divulgação para ${grupos.length} grupos...`);
    
    let sucessos = 0;
    let erros = 0;
    
    for (const grupo of grupos) {
        try {
            await client.sendMessage(grupo.id, mensagem);
            sucessos++;
            
            // Delay entre mensagens para evitar spam
            await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (error) {
            console.log(`Erro ao enviar para ${grupo.name}:`, error.message);
            erros++;
        }
    }
    
    const resultado = `
✅ *DIVULGAÇÃO CONCLUÍDA*

📊 *Resultados:*
✅ Sucessos: ${sucessos}
❌ Erros: ${erros}
📱 Total de grupos: ${grupos.length}

⏰ Concluído em: ${formatarTempo()}
`;
    
    await client.sendMessage(chatId, resultado);
}

async function salvarMensagem(chatId, mensagem) {
    const novaMensagem = {
        id: mensagensSalvas.length + 1,
        texto: mensagem,
        criadaEm: new Date().toISOString()
    };
    
    mensagensSalvas.push(novaMensagem);
    salvarDados();
    
    await client.sendMessage(chatId, `✅ Mensagem salva com ID: ${novaMensagem.id}`);
}

async function listarMensagens(chatId) {
    if (mensagensSalvas.length === 0) {
        await client.sendMessage(chatId, '❌ Nenhuma mensagem salva.');
        return;
    }
    
    let lista = `💾 *MENSAGENS SALVAS (${mensagensSalvas.length})*\n\n`;
    
    mensagensSalvas.forEach((msg, index) => {
        const preview = msg.texto.length > 50 ? msg.texto.substring(0, 50) + '...' : msg.texto;
        lista += `${index + 1}. ${preview}\n`;
        lista += `   📅 ${new Date(msg.criadaEm).toLocaleString('pt-BR')}\n\n`;
    });
    
    lista += `\n💡 Use ${CONFIG.PREFIX}usar <número> para enviar uma mensagem salva`;
    
    await client.sendMessage(chatId, lista);
}

async function usarMensagemSalva(chatId, indice) {
    const mensagem = mensagensSalvas[indice - 1];
    
    if (!mensagem) {
        await client.sendMessage(chatId, '❌ Mensagem não encontrada.');
        return;
    }
    
    await divulgarMensagem(chatId, mensagem.texto);
}

async function deletarMensagem(chatId, indice) {
    if (indice < 1 || indice > mensagensSalvas.length) {
        await client.sendMessage(chatId, '❌ Número inválido.');
        return;
    }
    
    const mensagemDeletada = mensagensSalvas.splice(indice - 1, 1)[0];
    salvarDados();
    
    await client.sendMessage(chatId, `✅ Mensagem deletada: "${mensagemDeletada.texto.substring(0, 30)}..."`);
}

async function mostrarStatus(chatId) {
    const uptime = process.uptime();
    const horas = Math.floor(uptime / 3600);
    const minutos = Math.floor((uptime % 3600) / 60);
    
    const status = `
📊 *STATUS DO BOT*

🤖 *Bot:* ${CONFIG.BOT_NAME}
📱 *Número:* ${client.info.wid.user}
👤 *Nome:* ${client.info.pushname}

📈 *Estatísticas:*
📱 Grupos conectados: ${grupos.length}
💾 Mensagens salvas: ${mensagensSalvas.length}
⏰ Tempo ativo: ${horas}h ${minutos}m

🔧 *Sistema:*
📅 Data/Hora: ${formatarTempo()}
💻 Node.js: ${process.version}
🔄 Status: ✅ Online
`;
    
    await client.sendMessage(chatId, status);
}

async function enviarAjuda(chatId) {
    const ajuda = `
❓ *AJUDA - BOT DIVULGAÇÃO*

*🎯 COMO USAR:*

1️⃣ *Divulgar mensagem instantânea:*
   ${CONFIG.PREFIX}divulgar Sua mensagem aqui

2️⃣ *Salvar mensagem para uso posterior:*
   ${CONFIG.PREFIX}salvar Mensagem que será salva

3️⃣ *Ver mensagens salvas:*
   ${CONFIG.PREFIX}mensagens

4️⃣ *Usar mensagem salva:*
   ${CONFIG.PREFIX}usar 1 (número da mensagem)

5️⃣ *Ver grupos conectados:*
   ${CONFIG.PREFIX}grupos

*⚠️ IMPORTANTE:*
• Apenas o dono pode usar comandos
• O bot precisa estar nos grupos para divulgar
• Há delay de 2s entre cada envio
• Mensagens são salvas automaticamente

*🔧 CONFIGURAÇÃO:*
• Edite o número do dono no arquivo bot.js
• Linha: OWNER_NUMBER: 'seu_numero@c.us'

*📞 SUPORTE:*
• Verifique os logs no terminal
• Reinicie o bot se necessário
`;
    
    await client.sendMessage(chatId, ajuda);
}

// Inicializar bot
console.log('🚀 Iniciando Bot de Divulgação WhatsApp...');
console.log('📋 Configurações:');
console.log(`   👤 Dono: ${CONFIG.OWNER_NUMBER}`);
console.log(`   🔧 Prefixo: ${CONFIG.PREFIX}`);
console.log('');

client.initialize();

