<template>
  <q-header elevated height-hint="98">
<!--    Header-->
    <q-toolbar class="bg-primary text-white">
      <q-toolbar-title>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
        </q-avatar>
        Управление фермами
      </q-toolbar-title>

      <q-space />

      <q-btn stretch flat label="служба поддержки" />

      <q-btn-dropdown stretch flat label="Язык">
        <q-list>
          <q-item clickable>
            <q-item-section>
              <q-item-label>Русский</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>
              <q-item-label>English</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <q-btn-dropdown stretch flat label="аккаунт">
        <q-list>
          <q-item to="/user/confirm" exact>
            <q-item-section>
              <q-item-label>Личный кабинет</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable @click="logout">
            <q-item-section>
              <q-item-label v-if="!loadingLogout">Выйти</q-item-label>
              <q-spinner color="primary" :thickness="2" v-else />
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

    </q-toolbar>

<!--    Menu-->
    <div class="row items-start q-col-gutter-x-sm q-pa-md">
      <div class="col col-auto">
        <!--      Choose farm-->
        <q-select
            :options="farmList"
            label="Выберите ферму"
            v-model="initFarmModel"
            outlined
            style="min-width: 250px; max-width: 300px"
            bg-color="blue-1"
            @update:model-value="farmChange"
            option-value="id"
            option-label="name"
        >
          <template v-slot:append>
            <q-btn round dense flat icon="add" @click.stop="newFarm" />
          </template>
        </q-select>
      </div>

      <div class="col">
        <q-tabs align="left">
          <!--        Приборы-->
          <q-route-tab to="/" label="панель приборов" />

          <!--        Сообщения-->
          <q-route-tab to="/messages" label="сообщения">
            <q-badge color="green" floating>4</q-badge>
          </q-route-tab>

          <!--        Животные-->
          <q-btn-group outline>
            <q-route-tab to="/animals" label="животные"></q-route-tab>
            <q-btn class="primary" round color="primary" icon="add" @click="newAnimal" />
          </q-btn-group>

          <!--        Группы-->
          <q-btn-group outline>
            <q-route-tab to="/groups" label="группы" />
            <q-btn class="primary" round color="primary" icon="add" @click="newGroup" />
          </q-btn-group>

          <!--        Болюсы-->
          <q-btn-group outline>
            <q-route-tab to="/boluses" label="болюсы" />
            <q-btn class="primary" round color="primary" icon="add" @click="newBolus" />
          </q-btn-group>

        </q-tabs>
      </div>

    </div>

  </q-header>
</template>

<script setup>

const props = defineProps({
  farmList: Array,
  initFarmModel: Object,
  loadingLogout: Boolean
})

const emit = defineEmits(['farmChange', 'newFarm', 'newAnimal', 'newGroup', 'newBolus', 'logout'])

const farmChange = (farm) => {
  emit('farmChange', farm)
}
const newFarm = () => {
  emit('newFarm', )
}
const newAnimal = () => {
  emit('newAnimal', )
}
const newGroup = () => {
  emit('newGroup', )
}
const newBolus = () => {
  emit('newBolus', )
}

const logout = () => {
  emit('logout', )
}


</script>

<style scoped>

</style>
