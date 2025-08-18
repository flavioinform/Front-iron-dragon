<template>
  <div>
    <!-- Botón burbuja -->
    <div
      @click="toggleChat"
      class="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg cursor-pointer flex items-center justify-center bg-white border hover:scale-105 transition-transform duration-200 z-50"
    >
      <img src="/chatbot.png" alt="Bot" class="w-12 h-12 rounded-full" />
    </div>

    <!-- Ventana de Chat -->
    <div
      v-if="isOpen"
      class="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50"
    >
      <!-- Header -->
      <div class="bg-black text-white p-3 rounded-t-2xl flex justify-between items-center">
        <span class="font-bold">🐲 Iron Dragon AI</span>
        <div class="flex items-center gap-2">
          <div :class="isConnected ? 'w-2 h-2 bg-green-400 rounded-full' : 'w-2 h-2 bg-red-400 rounded-full'"></div>
          <button @click="toggleChat" class="text-white hover:text-red-400 transition-colors">✖</button>
        </div>
      </div>

      <!-- Mensajes -->
      <div ref="messagesContainer" class="flex-1 p-3 overflow-y-auto bg-gray-100">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          class="mb-2"
        >
          <div
            :class="msg.from === 'bot'
              ? 'bg-black text-white p-2 rounded-lg max-w-xs'
              : 'bg-green-500 text-white p-2 rounded-lg max-w-xs ml-auto'">
            <div v-html="formatMessage(msg.text)"></div>
            <div class="text-xs opacity-70 mt-1">{{ formatTime(msg.timestamp) }}</div>
          </div>
        </div>

        <!-- Indicador de typing -->
        <div v-if="isTyping" class="mb-2">
          <div class="bg-gray-300 text-gray-600 p-2 rounded-lg max-w-xs flex items-center">
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <!-- Error de conexión -->
        <div v-if="connectionError" class="mb-2">
          <div class="bg-red-100 text-red-600 p-2 rounded-lg max-w-xs border border-red-300">
            ⚠️ {{ connectionError }}
          </div>
        </div>
      </div>

      <!-- Input -->
      <div class="p-3 border-t flex">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          :disabled="isTyping"
          placeholder="Escribe tu mensaje..."
          class="flex-1 border rounded-lg px-3 py-2 mr-2 disabled:bg-gray-200"
        />
        <button
          @click="sendMessage"
          :disabled="isTyping || !newMessage.trim()"
          class="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
        >
          {{ isTyping ? '...' : 'Enviar' }}
        </button>
      </div>

      <!-- Botones rápidos -->
      <div class="p-2 bg-gray-50 flex gap-1 flex-wrap">
        <button
          @click="sendQuickMessage('¿Qué productos tienen?')"
          class="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
          :disabled="isTyping"
        >
          🏪 Productos
        </button>
        <button
          @click="sendQuickMessage('¿Cómo son los envíos?')"
          class="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
          :disabled="isTyping"
        >
          🚚 Envíos
        </button>
        <button
          @click="sendQuickMessage('Métodos de pago')"
          class="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
          :disabled="isTyping"
        >
          💳 Pagos
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from "vue";

const isOpen = ref(false);
const newMessage = ref("");
const isTyping = ref(false);
const messagesContainer = ref(null);
const isConnected = ref(false);
const connectionError = ref("");

// URL de tu backend Django
const API_URL = "http://localhost:8000/api/chatbot/"; // ⚠️ CAMBIA ESTA URL

const messages = ref([
  { 
    from: "bot", 
    text: "¡Hola! 👋 Soy tu asistente de Iron Dragon 🐲<br>Puedo ayudarte con productos, envíos, pagos y más.<br>¿En qué puedo ayudarte hoy?",
    timestamp: new Date()
  }
]);

// Verificar conexión al montar
onMounted(async () => {
  await checkConnection();
});

const checkConnection = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mensaje: "test"
      })
    });
    
    if (response.ok) {
      isConnected.value = true;
      connectionError.value = "";
    } else {
      isConnected.value = false;
      connectionError.value = "Error de conexión con el servidor";
    }
  } catch (error) {
    isConnected.value = false;
    connectionError.value = "No se puede conectar con el backend";
    console.error('Error de conexión:', error);
  }
};

const toggleChat = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    nextTick(() => {
      scrollToBottom();
    });
  }
};

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

const sendMessage = async () => {
  if (newMessage.value.trim() === "" || isTyping.value) return;

  const userMessage = newMessage.value;
  
  // Agregar mensaje del usuario
  messages.value.push({ 
    from: "user", 
    text: userMessage,
    timestamp: new Date()
  });
  
  newMessage.value = "";
  nextTick(() => scrollToBottom());
  
  // Mostrar indicador de typing
  isTyping.value = true;
  connectionError.value = "";

  try {
    // Llamar a tu backend Django
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mensaje: userMessage
      })
    });

    if (response.ok) {
      const data = await response.json();
      
      // Agregar respuesta del bot
      messages.value.push({ 
        from: "bot", 
        text: data.respuesta,
        timestamp: new Date()
      });
      
      isConnected.value = true;
    } else {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
  } catch (error) {
    console.error('Error:', error);
    
    // Mensaje de error
    messages.value.push({ 
      from: "bot", 
      text: "Lo siento, hay un problema con la conexión. 😔<br>Puedes contactarnos directamente al:<br>📞 +56 9 1234 5678<br>📧 contacto@irondragon.cl",
      timestamp: new Date()
    });
    
    isConnected.value = false;
    connectionError.value = "Error de conexión";
  } finally {
    isTyping.value = false;
    nextTick(() => scrollToBottom());
  }
};

const sendQuickMessage = (message) => {
  newMessage.value = message;
  sendMessage();
};

const formatMessage = (text) => {
  return text.replace(/\n/g, '<br>');
};

const formatTime = (timestamp) => {
  return timestamp.toLocaleTimeString('es-CL', {
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script>

<style scoped>
/* Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Indicador typing */
.typing-indicator {
  display: flex;
  gap: 2px;
}
.typing-indicator span {
  height: 8px;
  width: 8px;
  background-color: #666;
  border-radius: 50%;
  animation: typing 1.4s infinite;
}
.typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
.typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

@keyframes typing {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-8px); }
}

/* Responsive */
@media (max-width: 768px) {
  .fixed.bottom-24.right-6 {
    width: calc(100vw - 2rem);
    right: 1rem;
    left: 1rem;
  }
}
</style>