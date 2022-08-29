<template>
  <q-page>
    <div class="row q-gutter-md q-pa-md">
<!--      Info-->
      <div class="col">
        <Manage-herd :active-farm="activeFarm" />
      </div>

<!--      Health-->
      <div class="col">
        <Health :active-farm="activeFarm" />
      </div>

<!--      Reproduction-->
      <div class="col">
        <Reproduction :active-farm="activeFarm" />
      </div>
    </div>
<!--    {{activeFarm}}-->
  </q-page>

</template>

<script setup>
import ManageHerd from 'components/ManageHerd.vue';
import Health from 'components/Health.vue';
import Reproduction from 'components/Reproduction.vue';

const props = defineProps({
  activeFarm: Object
})

</script>

<style scoped>

</style>
