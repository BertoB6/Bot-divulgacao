# 📖 Manual Completo - Bot de Divulgação WhatsApp

## 🎯 Índice

1. [Instalação no Termux](#instalação-no-termux)
2. [Configuração Inicial](#configuração-inicial)
3. [Primeiros Passos](#primeiros-passos)
4. [Comandos Detalhados](#comandos-detalhados)
5. [Dicas e Truques](#dicas-e-truques)
6. [Solução de Problemas](#solução-de-problemas)
7. [Perguntas Frequentes](#perguntas-frequentes)

---

## 📱 Instalação no Termux

### Pré-requisitos
- Android 7.0 ou superior
- Termux instalado (Google Play Store ou F-Droid)
- WhatsApp instalado e funcionando

### Passo a Passo

1. **Abra o Termux**
2. **Navegue até a pasta dos arquivos do bot:**
   ```bash
   cd /caminho/para/whatsapp-divulgacao-bot
   ```
3. **Execute a instalação:**
   ```bash
   ./install-termux.sh
   ```
4. **Aguarde a instalação das dependências (pode demorar alguns minutos)**

---

## ⚙️ Configuração Inicial

### 1. Configurar Número do Dono

Edite o arquivo `bot.js` na linha 8:

```javascript
OWNER_NUMBER: '5511999999999@c.us', // ALTERE AQUI!
```

**Como descobrir seu número:**
1. Inicie o bot temporariamente
2. Veja no terminal o formato correto do seu número
3. Pare o bot e configure corretamente

### 2. Personalizar Configurações (Opcional)

Edite o arquivo `config.js`:

```javascript
BOT_NAME: '🤖 Meu Bot',        // Nome personalizado
PREFIX: '!',                   // Prefixo dos comandos
MESSAGE_DELAY: 3000,           // 3 segundos entre mensagens
```

---

## 🚀 Primeiros Passos

### 1. Iniciar o Bot

```bash
./start.sh
```

### 2. Conectar WhatsApp

1. **Aparecerá um QR Code no terminal**
2. **Abra o WhatsApp no seu celular**
3. **Vá em: Menu > Dispositivos conectados > Conectar dispositivo**
4. **Escaneie o QR Code**
5. **Aguarde a mensagem "Bot conectado com sucesso!"**

### 3. Adicionar Bot aos Grupos

1. **Adicione o número do bot aos grupos desejados**
2. **O bot detectará automaticamente os grupos**
3. **Use `!grupos` para verificar**

---

## 📋 Comandos Detalhados

### 📢 Comandos de Divulgação

#### `!divulgar <mensagem>`
Envia mensagem para todos os grupos conectados.

**Exemplo:**
```
!divulgar 🔥 OFERTA ESPECIAL!
Produtos com 70% de desconto!
Válido até amanhã!
Link: www.exemplo.com
```

**Resultado:**
- Mensagem enviada para todos os grupos
- Relatório de sucessos/erros
- Delay automático entre envios

#### `!grupos`
Lista todos os grupos onde o bot está presente.

**Informações mostradas:**
- Nome do grupo
- Número de participantes
- ID do grupo

### 💾 Comandos de Mensagens Salvas

#### `!salvar <mensagem>`
Salva mensagem para uso posterior.

**Exemplo:**
```
!salvar 🎉 Promoção de fim de semana!
Descontos imperdíveis em toda loja!
```

#### `!mensagens`
Lista todas as mensagens salvas com preview.

#### `!usar <número>`
Usa mensagem salva para divulgação.

**Exemplo:**
```
!usar 1
```
(Usa a primeira mensagem salva)

#### `!deletar <número>`
Remove mensagem salva.

**Exemplo:**
```
!deletar 2
```
(Remove a segunda mensagem)

### ℹ️ Comandos de Informação

#### `!menu`
Mostra menu principal com todos os comandos.

#### `!status`
Exibe informações detalhadas do bot:
- Tempo ativo
- Número de grupos
- Mensagens salvas
- Status da conexão

#### `!ajuda`
Mostra ajuda detalhada com exemplos.

---

## 💡 Dicas e Truques

### 1. Mensagens Eficazes
- Use emojis para chamar atenção
- Mantenha mensagens concisas
- Inclua call-to-action claro
- Teste antes de divulgar

### 2. Gerenciamento de Grupos
- Verifique regularmente com `!grupos`
- Remova bot de grupos inativos
- Respeite regras dos grupos

### 3. Uso de Mensagens Salvas
- Crie templates para diferentes ocasiões
- Organize por categorias (promoções, avisos, etc.)
- Atualize regularmente

### 4. Horários Ideais
- Evite horários de madrugada
- Teste diferentes horários
- Respeite fuso horário dos grupos

---

## 🔧 Solução de Problemas

### Bot não conecta
1. Verifique conexão com internet
2. Reinicie o Termux
3. Execute `./stop.sh` e `./start.sh`
4. Gere novo QR Code

### Comandos não funcionam
1. Verifique se o número do dono está correto
2. Confirme o formato: `5511999999999@c.us`
3. Use comandos apenas no privado inicialmente

### Mensagens não são enviadas
1. Verifique se o bot está nos grupos
2. Confirme permissões nos grupos
3. Verifique logs na pasta `logs/`

### Bot para sozinho
1. Mantenha Termux ativo
2. Evite fechar o aplicativo
3. Configure para não hibernar

### Erro de instalação
1. Atualize Termux: `pkg update && pkg upgrade`
2. Reinstale Node.js: `pkg install nodejs`
3. Execute novamente `./install-termux.sh`

---

## ❓ Perguntas Frequentes

### O bot funciona 24/7?
Sim, desde que o Termux permaneça ativo e com internet.

### Posso usar em quantos grupos?
Não há limite, mas recomenda-se até 50 grupos para melhor performance.

### É seguro?
Sim, o bot roda localmente no seu dispositivo. Nenhum dado é enviado para servidores externos.

### Posso personalizar as mensagens?
Sim, edite o arquivo `config.js` para personalizar mensagens do sistema.

### Como fazer backup?
Copie os arquivos `grupos.json` e `mensagens.json` regularmente.

### Posso usar múltiplos donos?
Atualmente suporta apenas um dono. Para múltiplos, edite o código.

### O WhatsApp pode banir?
Use com moderação e respeite os termos do WhatsApp. Evite spam excessivo.

---

## 📞 Suporte Técnico

### Logs
Verifique sempre os logs em `logs/` para diagnosticar problemas.

### Comandos de Diagnóstico
```bash
# Verificar se Node.js está instalado
node --version

# Verificar dependências
npm list

# Verificar processos
ps aux | grep node
```

### Reinicialização Completa
```bash
./stop.sh
rm -rf session/
./start.sh
```

---

**📝 Nota:** Este manual cobre o uso básico e avançado do bot. Para modificações no código, consulte a documentação do Node.js e whatsapp-web.js.

