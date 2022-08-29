<template>
  <template v-if="colView">
    <div class="row q-gutter-md q-my-md">
      <div class="col" v-for="item in data" :key="item">
        <q-card>
          <q-card-section>
            <div class="row">
              <div class="col"></div>
              <div class="col" v-if="showName">{{item.name}}</div>
              <div class="col text-h6">{{ item.value }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </template>

  <template v-else>
    <div class="row" v-for="item in data" :key="item">
      <div class="col q-my-sm">
        <q-card>
          <q-card-section>
            <div class="row items-center justify-between">
              <div class="col-auto"></div>
              <div class="col-auto" v-if="showName">{{item.name}}</div>
              <div class="col-auto text-h6 text-positive">{{ item.value }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </template>

</template>

<script setup>
  const props = defineProps({
    data: {
      type: Array,
    },
    showName: {
      type: Boolean,
      default: true
    },
    colView: {
      type: Boolean,
      default: false
    }
  })
</script>

<style scoped>

</style>