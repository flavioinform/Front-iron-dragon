<template>
  <div class="chatbot-wrapper">
    <!-- Burbuja Flotante del Chat con efecto de pulso de agua -->
    <div
      @click="toggleChat"
      class="chat-bubble shadow-lg"
      title="¿Necesitas ayuda? Chatea con MocheBot"
    >
      <div class="bubble-inner">
        <i class="bi bi-chat-dots-fill bubble-icon animate-bounce-slow text-white"></i>
        <span class="pulse-ring"></span>
      </div>
    </div>

    <!-- Ventana del Chat -->
    <div
      v-if="isOpen"
      class="chat-window shadow-2xl glass-ice"
    >
      <!-- Cabecera del Chat -->
      <div class="chat-header">
        <div class="d-flex align-items-center gap-2">
          <span class="header-bot-icon"><i class="bi bi-droplet-fill text-white fs-5"></i></span>
          <div>
            <h6 class="fw-bold mb-0 text-white">MocheBot</h6>
            <span class="status-indicator">
              <span class="status-dot"></span> En línea
            </span>
          </div>
        </div>
        <button @click="toggleChat" class="close-chat-btn">✕</button>
      </div>

      <!-- Historial de Mensajes -->
      <div ref="messagesContainer" class="chat-messages-container">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          class="message-row"
          :class="{ 'user-row': msg.from === 'user' }"
        >
          <div class="message-bubble" :class="msg.from">
            <div v-html="formatMessage(msg.text)"></div>
            <div class="message-time">{{ formatTime(msg.timestamp) }}</div>
          </div>
        </div>

        <!-- Indicador de Escribiendo... -->
        <div v-if="isTyping" class="message-row">
          <div class="message-bubble bot typing">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </div>

      <!-- Botones de Respuestas Rápidas -->
      <div class="quick-replies-container">
        <button
          @click="sendQuickMessage('¿Qué productos ofrecen?')"
          class="btn-quick-reply"
          :disabled="isTyping"
        >
          <i class="bi bi-grid-fill me-1"></i> Catálogo
        </button>
        <button
          @click="sendQuickMessage('¿Cómo son las entregas a domicilio?')"
          class="btn-quick-reply"
          :disabled="isTyping"
        >
          <i class="bi bi-truck me-1"></i> Despachos
        </button>
        <button
          @click="sendQuickMessage('¿Cuáles son los métodos de pago?')"
          class="btn-quick-reply"
          :disabled="isTyping"
        >
          <i class="bi bi-credit-card me-1"></i> Métodos de Pago
        </button>
        <button
          @click="openWhatsAppOrder"
          class="btn-quick-reply whatsapp-reply"
          :disabled="isTyping"
        >
          <i class="bi bi-whatsapp me-1"></i> Pedido por WhatsApp
        </button>
      </div>

      <!-- Entrada de Texto de Mensajes -->
      <div class="chat-input-area">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          :disabled="isTyping"
          placeholder="Escribe tu consulta aquí..."
          class="chat-input"
        />
        <button
          @click="sendMessage"
          :disabled="isTyping || !newMessage.trim()"
          class="chat-send-btn"
        >
          Enviar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from "vue"

const isOpen = ref(false)
const newMessage = ref("")
const isTyping = ref(false)
const messagesContainer = ref(null)

const messages = ref([
  { 
    from: "bot", 
    text: "¡Hola! 👋 Soy **MocheBot** 💧, tu asistente virtual en Agua Moche.<br><br>¿En qué puedo ayudarte hoy?<br>Puedes consultar sobre nuestro catálogo de agua purificada, hielo en cubos y escamas, o despacho a domicilio.",
    timestamp: new Date()
  }
])

const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    nextTick(() => {
      scrollToBottom()
    })
  }
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const sendMessage = () => {
  if (newMessage.value.trim() === "" || isTyping.value) return

  const userMessage = newMessage.value
  
  messages.value.push({ 
    from: "user", 
    text: userMessage,
    timestamp: new Date()
  })
  
  newMessage.value = ""
  nextTick(() => scrollToBottom())
  
  isTyping.value = true

  // Simulamos una respuesta automatizada inteligente local del bot
  setTimeout(() => {
    let reply = "Disculpa, no logré comprender tu consulta. Puedes comunicarte directamente con nuestro equipo de atención por WhatsApp para asistirte de inmediato. 📞"
    const text = userMessage.toLowerCase()

    if (text.includes("producto") || text.includes("catálogo") || text.includes("venden") || text.includes("agua") || text.includes("hielo")) {
      reply = "Ofrecemos:<br>🔹 **Bidones de Agua Purificada** (20L y 10L) por Ósmosis Inversa.<br>🔹 **Hielo Premium en Cubos** (Sacos de 2kg, 5kg y 10kg).<br>🔹 **Hielo en Escamas** ideal para conservar alimentos y coctelería.<br>🔹 **Dispensadores de mesa y pedestales** fríos/calientes.<br><br>¡Puedes explorar todo en nuestra sección de **Productos**!"
    } else if (text.includes("despacho") || text.includes("envío") || text.includes("domicilio") || text.includes("reparto") || text.includes("entregas")) {
      reply = "🚚 **Despachos a Domicilio**:<br>Repartimos de Lunes a Sábado de 8:00 AM a 8:00 PM.<br><br>📍 **Zonas**: Toda la ciudad de Trujillo.<br>🔹 *El despacho es totalmente gratis* por la compra de 2 bidones de 20L o compras superiores a $15. ¡Garantizamos entregas súper veloces!"
    } else if (text.includes("pago") || text.includes("pagar") || text.includes("transferencia") || text.includes("tarjeta")) {
      reply = "💳 **Métodos de Pago aceptados**:<br>1️⃣ Tarjetas de Crédito / Débito (Webpay/Pos móvil al entregar).<br>2️⃣ Transferencia Electrónica bancaria.<br>3️⃣ Yape / Plin.<br>4️⃣ Efectivo contra entrega."
    } else if (text.includes("hola") || text.includes("buenos dias") || text.includes("buenas tardes")) {
      reply = "¡Hola! Un gusto saludarte. ¿Cómo va tu día? 😊 ¿En qué te puedo asesorar hoy respecto a tu provisión de agua purificada o hielo?"
    } else if (text.includes("whatsapp") || text.includes("pedido") || text.includes("comprar")) {
      reply = "¡Excelente! Puedes hacer un pedido rápido haciendo clic en el botón **Pedido por WhatsApp** abajo en la ventana de chat, o escribirnos directamente al 📞 **+51 961 745 295**."
    }

    messages.value.push({
      from: "bot",
      text: reply,
      timestamp: new Date()
    })
    isTyping.value = false
    nextTick(() => scrollToBottom())
  }, 1000)
}

const sendQuickMessage = (message) => {
  newMessage.value = message
  sendMessage()
}

const openWhatsAppOrder = () => {
  const number = "51961745295" // Reemplaza por tu número real
  const message = encodeURIComponent("¡Hola Agua Moche! Quisiera hacer una consulta sobre sus productos de agua purificada y hielo. ¿Tienen despacho disponible ahora?")
  window.open(`https://wa.me/${number}?text=${message}`, "_blank")
}

const formatMessage = (text) => {
  return text
}

const formatTime = (timestamp) => {
  return timestamp.toLocaleTimeString('es-PE', {
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.chatbot-wrapper {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 2999;
  font-family: 'Outfit', sans-serif;
}

/* Burbuja Flotante */
.chat-bubble {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s;
}

.chat-bubble:hover {
  transform: scale(1.08) rotate(3deg);
  box-shadow: 0 10px 25px rgba(2, 132, 199, 0.4);
}

.bubble-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.bubble-icon {
  font-size: 1.6rem;
  color: white;
}

/* Anillo de pulso */
.pulse-ring {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #38bdf8;
  border-radius: 50%;
  animation: pulse-ring 2s cubic-bezier(0.215, 0.610, 0.355, 1) infinite;
  z-index: -1;
}

@keyframes pulse-ring {
  0% { transform: scale(0.95); opacity: 0.8; }
  100% { transform: scale(1.4); opacity: 0; }
}

.animate-bounce-slow {
  animation: bounce-slow 4s infinite;
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

/* Ventana de Chat */
.chat-window {
  position: fixed;
  bottom: 96px;
  right: 24px;
  width: 380px;
  height: 520px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  border: 1px solid rgba(14, 165, 233, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* Cabecera */
.chat-header {
  background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
  color: white;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 10px rgba(2, 132, 199, 0.15);
}

.header-bot-icon {
  font-size: 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.status-indicator {
  font-size: 0.75rem;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 4px;
}

.status-dot {
  width: 6px;
  height: 6px;
  background-color: #22c55e;
  border-radius: 50%;
  display: inline-block;
}

.close-chat-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.1rem;
  cursor: pointer;
  transition: color 0.2s;
}

.close-chat-btn:hover {
  color: white;
}

/* Mensajes */
.chat-messages-container {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message-row {
  display: flex;
  justify-content: flex-start;
  width: 100%;
}

.message-row.user-row {
  justify-content: flex-end;
}

.message-bubble {
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 18px;
  font-size: 0.88rem;
  line-height: 1.45;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.message-bubble.bot {
  background-color: #ffffff;
  color: #1e293b;
  border: 1px solid #e2e8f0;
  border-top-left-radius: 4px;
}

.message-bubble.user {
  background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
  color: white;
  border-top-right-radius: 4px;
}

.message-time {
  font-size: 0.7rem;
  opacity: 0.7;
  text-align: right;
  margin-top: 4px;
}

/* Typing */
.typing {
  display: flex;
  gap: 4px;
  padding: 12px 18px;
}

.typing .dot {
  width: 6px;
  height: 6px;
  background-color: #64748b;
  border-radius: 50%;
  animation: wave 1.2s infinite;
}

.typing .dot:nth-child(2) { animation-delay: 0.2s; }
.typing .dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes wave {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

/* Respuestas Rápidas */
.quick-replies-container {
  padding: 10px 16px;
  background-color: #ffffff;
  border-top: 1px solid #f1f5f9;
  display: flex;
  gap: 8px;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none;
}

.quick-replies-container::-webkit-scrollbar {
  display: none;
}

.btn-quick-reply {
  background-color: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;
  padding: 6px 12px;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-quick-reply:hover {
  background-color: #e0f2fe;
  color: #0284c7;
  border-color: #bae6fd;
}

.whatsapp-reply {
  background-color: #dcfce7;
  color: #15803d;
  border-color: #bbf7d0;
}

.whatsapp-reply:hover {
  background-color: #22c55e;
  color: white;
  border-color: #22c55e;
}

/* Área de Entrada */
.chat-input-area {
  padding: 14px 16px;
  background-color: #ffffff;
  border-top: 1px solid #f1f5f9;
  display: flex;
  gap: 8px;
}

.chat-input {
  flex-grow: 1;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  padding: 8px 14px;
  font-size: 0.88rem;
  transition: border-color 0.2s;
}

.chat-input:focus {
  outline: none;
  border-color: #0ea5e9;
}

.chat-send-btn {
  background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.2s;
}

.chat-send-btn:hover {
  background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
}

@media (max-width: 480px) {
  .chat-window {
    width: calc(100vw - 32px);
    height: 480px;
    bottom: 84px;
    right: 16px;
  }
}
</style>