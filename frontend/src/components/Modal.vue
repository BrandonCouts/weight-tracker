<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <slot></slot>
    </div>
  </div>
</template>
