<template>
    <v-app-bar :elevation="7">
        <NuxtLink to="/desconforto" class="link-home">
            <v-btn prepend-icon="mdi-emoticon-sick-outline" class="btn-desconforto">
                Está com algum desconforto?
            </v-btn>
        </NuxtLink>
        <NuxtLink to="/desconforto" class="link-home">
            <v-btn prepend-icon="mdi-phone" class="btn-emergencia">
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

.btn-desconforto{
    background-color: #F0F0F0;
    font-weight: bold;
    margin-right: 10px;
}

.btn-emergencia{
    background-color: #b81414;
    color: white;
}

</style>