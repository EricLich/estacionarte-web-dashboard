<template>
    {{user}}
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'


export default defineComponent({
    setup() {
        const store:any = inject('store') //injecting store
        const user = store.getters.getUser()


        return{
            user,
        }

    },
})
</script>

<style scoped>

</style>
