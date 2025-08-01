# 🤖 Bot de Divulgação WhatsApp

Bot automatizado para divulgação de mensagens em grupos do WhatsApp, controlado exclusivamente pelo dono e compatível com Termux.

## 📋 Características

- ✅ Divulgação automática para todos os grupos
- 🔐 Controle exclusivo pelo número do dono
- 💾 Sistema de mensagens salvas
- 📱 Compatível com Termux (Android)
- 🚀 Fácil instalação e configuração
- 📊 Relatórios de envio detalhados

## 🚀 Instalação Rápida

### No Termux (Android)

1. **Baixe e extraia os arquivos do bot**
2. **Execute a instalação:**
   ```bash
   ./install-termux.sh
   ```
3. **Configure seu número no arquivo `bot.js`:**
   ```javascript
   OWNER_NUMBER: '5511999999999@c.us' // Seu número aqui
   ```
4. **Inicie o bot:**
   ```bash
   ./start.sh
   ```
5. **Escaneie o QR Code com seu WhatsApp**

## 📱 Comandos Disponíveis

### 📢 Divulgação
- `!divulgar <mensagem>` - Enviar mensagem para todos os grupos
- `!grupos` - Listar grupos conectados

### 💾 Mensagens Salvas
- `!salvar <mensagem>` - Salvar mensagem para uso posterior
- `!mensagens` - Listar todas as mensagens salvas
- `!usar <número>` - Usar mensagem salva (ex: !usar 1)
- `!deletar <número>` - Deletar mensagem salva

### ℹ️ Informações
- `!menu` - Mostrar menu de comandos
- `!status` - Status do bot e estatísticas
- `!ajuda` - Ajuda detalhada

## 🔧 Configuração

Edite o arquivo `config.js` para personalizar:

```javascript
OWNER_NUMBER: '5511999999999@c.us', // Seu número
BOT_NAME: '🤖 Bot Divulgação',       // Nome do bot
PREFIX: '!',                         // Prefixo dos comandos
MESSAGE_DELAY: 2000,                 // Delay entre mensagens (ms)
```

## 📊 Como Usar

1. **Adicione o bot aos grupos desejados**
2. **Use comandos apenas no privado ou grupos onde você é admin**
3. **Exemplo de divulgação:**
   ```
   !divulgar 🔥 PROMOÇÃO ESPECIAL! 
   Produtos com 50% de desconto!
   Aproveite: www.exemplo.com
   ```

## ⚠️ Importante

- Apenas o número configurado como dono pode usar comandos
- O bot precisa estar presente nos grupos para divulgar
- Há delay de 2 segundos entre cada envio para evitar spam
- Mantenha o Termux ativo durante o uso

## 🛠️ Scripts Disponíveis

- `./start.sh` - Iniciar o bot
- `./stop.sh` - Parar o bot
- `./install-termux.sh` - Instalar dependências

## 📞 Suporte

Para problemas ou dúvidas:
1. Verifique os logs na pasta `logs/`
2. Consulte o arquivo `MANUAL.md`
3. Reinicie o bot com `./stop.sh` e `./start.sh`

---

**Desenvolvido para uso educacional e comercial responsável.**

