<template>
    <v-app-bar :elevation="7">
        <div class="div-sair">
            <NuxtLink to="/" class="link-home">
                <v-btn prepend-icon="mdi-exit-to-app" class="btn-emergencia">
                    Sair
                </v-btn>
            </NuxtLink>
        </div>
        <div class="btns">
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
        </div>
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
.btns {
    display: flex !important;
    justify-content: flex-end !important;
    width: 100% !important;
}

.div-sair{
    margin-left: 1rem;
}

.btn-desconforto {
    background-color: #F0F0F0;
    font-weight: bold;
    margin-right: 10px;
}

.btn-emergencia {
    background-color: #b81414;
    color: white;
}
</style>