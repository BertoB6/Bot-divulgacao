# 📋 Lista de Comandos - Bot Divulgação

## 🚀 Comandos Principais

### 📢 DIVULGAÇÃO
| Comando | Descrição | Exemplo |
|---------|-----------|---------|
| `!divulgar <mensagem>` | Enviar mensagem para todos os grupos | `!divulgar Promoção especial!` |
| `!grupos` | Listar grupos conectados | `!grupos` |

### 💾 MENSAGENS SALVAS
| Comando | Descrição | Exemplo |
|---------|-----------|---------|
| `!salvar <mensagem>` | Salvar mensagem | `!salvar Oferta de fim de semana` |
| `!mensagens` | Listar mensagens salvas | `!mensagens` |
| `!usar <número>` | Usar mensagem salva | `!usar 1` |
| `!deletar <número>` | Deletar mensagem salva | `!deletar 2` |

### ℹ️ INFORMAÇÕES
| Comando | Descrição | Exemplo |
|---------|-----------|---------|
| `!menu` | Mostrar menu principal | `!menu` |
| `!status` | Status e estatísticas | `!status` |
| `!ajuda` | Ajuda detalhada | `!ajuda` |

---

## 📱 Exemplos Práticos

### Divulgação Simples
```
!divulgar 🔥 LIQUIDAÇÃO!
Tudo com 50% de desconto!
Aproveite: www.loja.com
```

### Salvar Template
```
!salvar 🎉 Novidades da semana!
Confira os lançamentos em nossa loja.
```

### Usar Template Salvo
```
!usar 1
```

---

## ⚡ Comandos de Sistema

### Iniciar/Parar Bot
```bash
./start.sh    # Iniciar bot
./stop.sh     # Parar bot
```

### Instalação
```bash
./install-termux.sh  # Instalar no Termux
```

---

## 🔧 Configuração Rápida

1. **Editar número do dono:**
   ```javascript
   // No arquivo bot.js, linha 8:
   OWNER_NUMBER: '5511999999999@c.us'
   ```

2. **Personalizar bot:**
   ```javascript
   // No arquivo config.js:
   BOT_NAME: '🤖 Meu Bot'
   PREFIX: '!'
   ```

---

## ⚠️ Regras Importantes

- ✅ Apenas o dono pode usar comandos
- ✅ Bot precisa estar nos grupos para divulgar
- ✅ Delay automático de 2s entre mensagens
- ✅ Use comandos no privado ou grupos onde é admin

---

## 📊 Status e Monitoramento

### Verificar Status
```
!status
```

**Informações mostradas:**
- Tempo ativo
- Grupos conectados
- Mensagens salvas
- Status da conexão

### Logs
- Logs salvos em: `logs/bot-YYYYMMDD-HHMMSS.log`
- Verificar erros e atividades

---

## 🎯 Fluxo de Uso Típico

1. **Configurar bot** → Editar `OWNER_NUMBER`
2. **Iniciar** → `./start.sh`
3. **Conectar** → Escanear QR Code
4. **Adicionar aos grupos** → Manualmente
5. **Verificar grupos** → `!grupos`
6. **Divulgar** → `!divulgar <mensagem>`

---

**💡 Dica:** Mantenha este arquivo como referência rápida durante o uso do bot!

