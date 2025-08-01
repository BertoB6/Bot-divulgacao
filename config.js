// Configurações do Bot de Divulgação WhatsApp
// Edite este arquivo para personalizar seu bot

module.exports = {
    // ⚠️ IMPORTANTE: Configure seu número aqui (formato: 5511999999999@c.us)
    // Para descobrir seu número, inicie o bot e veja no terminal
    OWNER_NUMBER: '5511999999999@c.us', // ALTERE AQUI!
    
    // Nome do bot (aparece nas mensagens)
    BOT_NAME: '🤖 Bot Divulgação',
    
    // Prefixo dos comandos (! é padrão)
    PREFIX: '!',
    
    // Delay entre mensagens (em milissegundos)
    // 2000 = 2 segundos (recomendado para evitar spam)
    MESSAGE_DELAY: 2000,
    
    // Configurações de arquivos
    SESSION_PATH: './session',
    GROUPS_FILE: './grupos.json',
    MESSAGES_FILE: './mensagens.json',
    
    // Configurações do Puppeteer (para Termux)
    PUPPETEER_CONFIG: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu',
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor'
        ]
    },
    
    // Mensagens personalizadas
    MESSAGES: {
        WELCOME: '🤖 Bot de Divulgação ativo!',
        UNAUTHORIZED: '❌ Apenas o dono pode usar comandos.',
        COMMAND_NOT_FOUND: '❌ Comando não reconhecido. Use !menu para ver os comandos.',
        NO_GROUPS: '❌ Nenhum grupo encontrado.',
        DIVULGATION_START: '🚀 Iniciando divulgação...',
        DIVULGATION_COMPLETE: '✅ Divulgação concluída!'
    }
};

