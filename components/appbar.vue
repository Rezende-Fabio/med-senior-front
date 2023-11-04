<template>
    <v-app-bar :elevation="7">
        <NuxtLink to="/desconforto" class="link-home">
            <v-btn prepend-icon="mdi-emoticon-sick-outline">
                Está com algum desconforto?
            </v-btn>
        </NuxtLink>
        <NuxtLink to="/desconforto" class="link-home">
            <v-btn prepend-icon="mdi-phone">
                Emergência
            </v-btn>
        </NuxtLink>
    </v-app-bar>
</template>

<script>
export default {
    data() {
        return {
        };
    },
};
</script>

<style>
.v-toolbar__content {
    display: flex !important;
    justify-content: flex-end !important;
    width: 100% !important;    
}
</style>