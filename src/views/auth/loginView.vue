<script setup lang="ts">
import BrandShowcase from '@/components/auth/brandShowcase.vue'
import LoginForm from '@/components/auth/loginForm.vue'
</script>

<template>
  <main class="w-full min-h-screen bg-background flex flex-col justify-center items-center font-body">
    <div class="flex flex-col w-full">
      <div class="w-full min-h-screen flex flex-col lg:flex-row bg-surfaceCanvas">
        <BrandShowcase />
        <LoginForm />
      </div>
    </div>
  </main>
</template>