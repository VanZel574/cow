<template>
  <q-page>
    <!--    Table-->
    <div class="row q-gutter-md q-pa-md">
      <q-table
          :title="title"
          :rows="rowData"
          :columns="columns"
          row-key="id"
          selection="multiple"
          v-model:selected="selected"
          class="w-100"
          @selection="onSelect"
          :loading="loading"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn round color="info" icon="info" flat @click="onModal(props)" />
          </q-td>
        </template>
        <template v-slot:bottom>
          <q-btn color="negative" label="Удалить" :disable="disableDelete" @click="deleteData"></q-btn>
        </template>
      </q-table>
    </div>

  </q-page>
</template>

<script setup>
import {watch, ref} from "vue";

const props = defineProps({
  title: String,
  rowData: Array,
  headers: Array,
  loading: Boolean
})

const emit = defineEmits(['onSelect', 'onModal', 'onDelete'])

const selected = ref([])
const columns = ref(props.headers)
const disableDelete = ref(true)


// selected
const onSelect = (value) => {
  emit('onSelect', value)
}

// show info
const onModal = ({row}) => {
  emit('onModal', row)
}

const deleteData = async () => {
  emit('onDelete', selected.value)
  // reset selected
  selected.value = []
}

// watch selected
watch(selected, (newVal, oldVal) => {
  disableDelete.value = newVal.length === 0;
})


</script>

<style scoped lang="scss">
.w-100 {
  width: 100%;
}

</style>

