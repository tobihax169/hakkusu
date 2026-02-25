<script setup>
import { ref, watch, nextTick, computed } from 'vue';
import { useRouter } from 'vue-router';

// State
import { io } from 'socket.io-client';
import { useToast } from '../composables/useToast';
import { useAuth } from '../composables/useAuth';

const { addToast } = useToast();
const { userName, token } = useAuth();
const router = useRouter();
const isOpen = ref(false);
const step = ref('login'); // 'login', 'waiting', 'chat'
const customerName = ref('');
const isLoggedIn = computed(() => !!userName.value);
const isSupporterTyping = ref(false);
let typingTimeout = null;

const goToLogin = () => {
  closeChat();
  router.push('/login');
};

const ticketIdState = ref('');
const supporterNameState = ref('');
const messages = ref([]);
const inputMessage = ref('');
const messagesContainer = ref(null);

// Âm thanh thông báo tin nhắn mới
const chatAudio = typeof Audio !== 'undefined' ? new Audio('https://raw.githubusercontent.com/IONAudio/ion-sound/master/sounds/button_tiny.mp3') : null;

let socket = null;

const initSocket = () => {
  if (!socket) {
    socket = io(import.meta.env.VITE_API_URL || 'http://localhost:3000');
    
    // Nhận thông báo đã tạo ticket thành công từ Server (Bot Discord đã post yêu cầu)
    socket.on('ticket_created', (data) => {
      ticketIdState.value = data.ticketId;
    });

    // Nhận lời báo "Supporter đã ấn nút nhận"
    socket.on('ticket_accepted', (data) => {
      step.value = 'chat';
      supporterNameState.value = data.supporterName;
      messages.value.push({
        id: Date.now(),
        sender: 'system',
        text: `Nhân viên ${data.supporterName} đã tham gia phiên hỗ trợ.`
      });
      scrollToBottom();
      
      if (chatAudio) {
        chatAudio.currentTime = 0;
        chatAudio.play().catch(() => {});
      }
    });

    // Nhận tin nhắn từ Discord gửi về Web
    socket.on('receive_message', (data) => {
      isSupporterTyping.value = false; // Tắt lúc nhận tin
      messages.value.push({
        id: data.id,
        sender: 'supporter', // Ai đó đang chat lại
        authorName: data.authorName, // Tên người trả lời trên discord
        text: data.text,
        imageUrl: data.imageUrl
      });
      scrollToBottom();
      
      if (chatAudio) {
        chatAudio.currentTime = 0;
        chatAudio.play().catch(() => {});
      }
      
      // Bật Toast Notifications nếu người dùng đang ẩn chat
      if (!isOpen.value) {
        addToast(`Tin nhắn mới từ ${data.authorName}`, 'info');
      }
    });
    
    // Nhận thông báo đang gõ
    socket.on('supporter_typing', () => {
      isSupporterTyping.value = true;
      scrollToBottom();
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        isSupporterTyping.value = false;
      }, 3000);
    });

    // Bị Đóng ticket từ Discord
    socket.on('ticket_closed', () => {
      closeChat();
      
      // Reset lại ngay trạng thái để khách hàng có thể mở chat phiên mới nếu muốn
      setTimeout(() => {
        step.value = 'login';
        customerName.value = '';
        ticketIdState.value = '';
        supporterNameState.value = '';
        messages.value = [];
      }, 300); // Đợi hiệu ứng đóng Widget kết thúc
    });
  }
};

const closeChat = () => {
  isOpen.value = false;
};

const openChat = () => {
  isOpen.value = true;
  if (isLoggedIn.value) {
    customerName.value = userName.value;
  }
};

const fileInput = ref(null);

const triggerFileInput = () => {
  if (fileInput.value) fileInput.value.click();
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    addToast('Kích thước ảnh không được vượt quá 5MB.', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const base64Image = e.target.result;
    
    // Đẩy ảnh vào giao diện Chat
    messages.value.push({
      id: Date.now(),
      sender: 'user',
      imageUrl: base64Image
    });

    // Bắn thẳng lên Server (sẽ được Queue nếu supporter chưa nhận)
    socket.emit('send_message', { 
      ticketId: ticketIdState.value, 
      image: base64Image
    });
    
    scrollToBottom();
  };
  reader.readAsDataURL(file);
};

const startChat = () => {
  if (!customerName.value.trim()) return;
  
  step.value = 'chat'; // Chuyển thẳng tới chat để khách có thể gửi sẵn tin nhắn / hình ảnh
  
  // Mở Socket nếu chưa mở
  initSocket();

  messages.value.push({
    id: Date.now(),
    sender: 'system',
    text: 'Yêu cầu của bạn đang được kết nối... Bạn có thể để lại tin nhắn hoặc hình ảnh trước lúc này!'
  });

  // Báo cho Server Node.js phát thông báo lên Discord
  socket.emit('create_ticket', { customerName: customerName.value });
};

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

const sendMessage = () => {
  if (!inputMessage.value.trim()) return;
  
  messages.value.push({
    id: Date.now(),
    sender: 'user',
    text: inputMessage.value
  });
  
  // Emit Lên server bắn vào Thread Discord
  socket.emit('send_message', { 
    ticketId: ticketIdState.value, 
    text: inputMessage.value 
  });
  
  inputMessage.value = '';
  scrollToBottom();
};

// Chat header title dựa trên trạng thái
const chatTitle = () => {
  if (step.value === 'login') return 'Hỗ trợ khách hàng';
  if (step.value === 'chat') {
    if (supporterNameState.value) return `${ticketIdState.value} - ${supporterNameState.value}`;
    return 'Đang chờ nhân viên...';
  }
  return 'Chat';
};
</script>

<template>
  <div class="chat-container">
    <!-- Chat Launcher Button (Only show if logged in and not open) -->
    <button v-if="!isOpen && isLoggedIn" @click="openChat" class="chat-launcher animate-fade-in">
      <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    </button>

    <div v-if="isOpen" class="chat-widget animate-slide-up">
    <!-- Header -->
    <div class="chat-header">
      <div class="chat-header-info">
        <div class="status-dot" :class="{ 'connected': supporterNameState, 'waiting': step === 'chat' && !supporterNameState }"></div>
        <h3 class="chat-title">{{ chatTitle() }}</h3>
      </div>
      <button @click="closeChat" class="close-btn">&times;</button>
    </div>

    <!-- Body -->
    <div class="chat-body">
      
      <!-- Bước 1: Nhập tên (Đăng nhập) -->
      <div v-if="step === 'login'" class="step-login">
        <template v-if="isLoggedIn">
          <div class="welcome-icon">👋</div>
          <h4>Chào mừng, {{ customerName }}!</h4>
          <p>Bạn cần hỗ trợ? Hãy kết nối với bộ phận chăm sóc khách hàng.</p>
          <button @click="startChat" class="btn-primary w-100 mt-3">
            Bắt đầu Chat
          </button>
        </template>
        <template v-else>
          <div class="welcome-icon">🔒</div>
          <h4>Yêu cầu đăng nhập</h4>
          <p>Vui lòng đăng nhập tài khoản để có thể sử dụng chức năng chat hỗ trợ.</p>
          <button @click="goToLogin" class="btn-primary w-100 mt-3">
            Đăng nhập ngay
          </button>
        </template>
      </div>

      <!-- Bước 3: Đang chat (Có thể là chờ hoặc đã có ng nhận) -->
      <div v-else-if="step === 'chat'" class="step-chat">
        <div class="messages-container" ref="messagesContainer">
          <div 
            v-for="msg in messages" 
            :key="msg.id" 
            class="message-wrapper"
            :class="{ 'mine': msg.sender === 'user', 'system': msg.sender === 'system' }"
          >
            <div v-if="msg.sender === 'system'" class="system-message">
              {{ msg.text }}
            </div>
            <div v-else class="message-bubble">
              <span v-if="msg.text">{{ msg.text }}</span>
              <img v-if="msg.imageUrl" :src="msg.imageUrl" class="chat-image-preview" alt="Đã gửi một ảnh" />
            </div>
          </div>
        </div>
        
        <!-- Hiệu ứng Typing -->
        <div v-if="isSupporterTyping" class="message-wrapper">
          <div class="typing-indicator">
            <span></span><span></span><span></span>
          </div>
        </div>
        
        <div class="chat-input-area">
          <input 
            type="file" 
            ref="fileInput" 
            @change="handleFileUpload" 
            accept="image/*" 
            style="display: none;" 
          />
          <button @click="triggerFileInput" class="attach-btn" title="Gửi hình ảnh">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
          </button>
          
          <input 
            v-model="inputMessage" 
            @keyup.enter="sendMessage"
            type="text" 
            placeholder="Nhập tin nhắn..." 
            class="chat-input-field"
          />
          <button @click="sendMessage" class="send-btn">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<style scoped>
.chat-launcher {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--primary-hover));
  color: white;
  border: none;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10000;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.chat-launcher:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 8px 30px rgba(99, 102, 241, 0.6);
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

.chat-widget {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 350px;
  height: 500px;
  background: var(--bg-card);
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 9999;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-family: 'Inter', sans-serif;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out forwards;
}

.chat-header {
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(10px);
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.chat-header-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #64748b; /* default / login */
}
.status-dot.waiting { background: #eab308; box-shadow: 0 0 8px #eab308; }
.status-dot.connected { background: #10b981; box-shadow: 0 0 8px #10b981; }

.chat-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-main);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

.close-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: color 0.2s;
}

.close-btn:hover {
  color: white;
}

.chat-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgba(15, 23, 42, 0.5);
  overflow: hidden; /* Hide scrollbars outside messages container */
}

/* Common Input styles */
.chat-input-field {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px 15px;
  color: white;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
}

.chat-input-field:focus {
  border-color: var(--primary);
}

.w-100 { width: 100%; }
.mt-3 { margin-top: 1rem; }
.text-muted { color: var(--text-muted); }

/* Step: Login */
.step-login {
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  text-align: center;
  justify-content: center;
  height: 100%;
}

.welcome-icon {
  font-size: 3rem;
  margin-bottom: 10px;
}

.step-login h4 { margin: 0 0 10px 0; font-size: 1.25rem; }
.step-login p { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 25px; }

/* Step: Waiting */
.step-waiting {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  text-align: center;
}

.loader {
  border: 3px solid rgba(255,255,255,0.1);
  border-top: 3px solid var(--primary);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

/* Step: Chat */
.step-chat {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.messages-container {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Custom scrollbar */
.messages-container::-webkit-scrollbar { width: 6px; }
.messages-container::-webkit-scrollbar-track { background: transparent; }
.messages-container::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }

.message-wrapper {
  display: flex;
  width: 100%;
}

.message-wrapper.mine {
  justify-content: flex-end;
}

.message-bubble {
  max-width: 80%;
  padding: 10px 14px;
  border-radius: 14px;
  font-size: 0.9rem;
  line-height: 1.4;
}

.message-wrapper:not(.mine) .message-bubble {
  background: rgba(255, 255, 255, 0.1);
  border-bottom-left-radius: 4px;
}

.message-wrapper.mine .message-bubble {
  background: var(--primary);
  color: white;
  border-bottom-right-radius: 4px;
}

.system-message {
  width: 100%;
  text-align: center;
  font-size: 0.8rem;
  color: var(--accent);
  margin: 10px 0;
  padding: 5px;
  background: rgba(16, 185, 129, 0.1);
  border-radius: 4px;
}

.chat-input-area {
  padding: 15px;
  display: flex;
  gap: 10px;
  background: rgba(30, 41, 59, 0.8);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.send-btn {
  background: var(--primary);
  border: none;
  min-width: 45px;
  border-radius: 8px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.send-btn:hover { background: var(--primary-hover); }

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Hiệu ứng gõ chữ (..."typing") */
.typing-indicator {
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 16px;
  border-radius: 14px;
  border-bottom-left-radius: 4px;
  display: flex;
  gap: 4px;
  align-items: center;
  width: fit-content;
  margin-top: 5px;
}

.typing-indicator span {
  width: 6px;
  height: 6px;
  background: var(--text-muted);
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out both;
}

.typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
.typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
.typing-indicator span:nth-child(3) { animation-delay: 0s; }

@keyframes typing {
  0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
  40% { transform: scale(1); opacity: 1; }
}

.attach-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.attach-btn:hover {
  color: var(--primary);
}

.chat-image-preview {
  max-width: 100%;
  border-radius: 8px;
  margin-top: 5px;
  max-height: 180px;
  object-fit: contain;
  background: rgba(0,0,0,0.2);
}
</style>
