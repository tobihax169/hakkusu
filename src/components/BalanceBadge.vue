<script setup>
import { onMounted, ref, watch } from 'vue'
import { useAuth } from '../composables/useAuth'

const { token } = useAuth()
const userBalance = ref(null)

const fetchBalance = async () => {
  if (!token.value) {
    userBalance.value = null
    return
  }
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/auth/me`, {
      headers: { 'Authorization': `Bearer ${token.value}` }
    });
    const data = await res.json();
    if (data.success && data.user) {
      userBalance.value = data.user.balance;
    }
  } catch (e) {
    console.error('Balance fetch error:', e)
  }
}

watch(token, () => {
  fetchBalance()
})

onMounted(() => {
  fetchBalance()
})

// Expose refresh for other components if needed
defineExpose({ refresh: fetchBalance })
</script>

<template>
  <router-link v-if="userBalance !== null" to="/deposit" class="balance-badge" title="Nạp tiền">
    <span>{{ userBalance.toLocaleString('vi-VN') }}đ</span>
    <span class="material-symbols-outlined plus-icon">add_circle</span>
  </router-link>
</template>

<style scoped>
.balance-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.3);
  padding: 6px 14px;
  border-radius: 20px;
  color: #10b981 !important;
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
  margin-right: 15px;
  transition: all 0.3s;
}

.balance-badge:hover {
  background: rgba(16, 185, 129, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.plus-icon {
  font-size: 1.1rem;
}

@media (max-width: 576px) {
  .balance-badge {
    padding: 4px 10px;
    font-size: 0.85rem;
    margin-right: 10px;
  }
}
</style>
