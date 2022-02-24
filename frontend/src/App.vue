<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'
import { ref } from 'vue'

const keyApi = ref('')
const valueApi = ref('')

const myApi = async () => {
  const response = await axios.get('http://127.0.0.1:8000/api')
  console.log(response.data);

  keyApi.value = Object.keys(response.data)[0],
  valueApi.value = Object.values(response.data)[0]

}

</script>

<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Hello Vue 3 + Vite" />
    <button @click="myApi">test</button>
    <p>key is: {{ keyApi }}</p>
    <p>value is: {{ valueApi }}</p>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
