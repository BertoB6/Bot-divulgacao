#!/bin/bash

echo "🚀 Instalando Bot de Divulgação WhatsApp no Termux..."
echo ""

# Atualizar pacotes
echo "📦 Atualizando pacotes do Termux..."
pkg update -y && pkg upgrade -y

# Instalar Node.js
echo "📱 Instalando Node.js..."
pkg install nodejs -y

# Verificar instalação
echo "✅ Verificando instalação..."
node --version
npm --version

# Instalar dependências
echo "📋 Instalando dependências do bot..."
npm install

# Criar diretórios necessários
mkdir -p session
mkdir -p logs

# Configurar permissões
chmod +x start.sh
chmod +x stop.sh

echo ""
echo "✅ Instalação concluída!"
echo ""
echo "📋 Próximos passos:"
echo "1. Edite o arquivo bot.js e configure seu número na linha OWNER_NUMBER"
echo "2. Execute: ./start.sh"
echo "3. Escaneie o QR Code com seu WhatsApp"
echo ""
echo "📞 Para suporte, consulte o arquivo MANUAL.md"

