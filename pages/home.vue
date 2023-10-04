<template>
    <v-navigation-drawer>
        <v-list-item title="My Application" subtitle="Vuetify"></v-list-item>
        <v-divider></v-divider>
        <v-list style="height: 80%;" class="d-flex flex-column justify-space-between" nav>
            <NuxtLink to="/medicamentos">
                <v-list-item prepend-icon="mdi-pill" title="MEDICAMENTOS" value=""></v-list-item>
            </NuxtLink>
            <v-list-item prepend-icon="mdi-calendar" title="CONSULTAS" value=""></v-list-item>
            <v-list-item prepend-icon="mdi-file" title="PRONTUÁRIO" value=""></v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-main>
        <v-app-bar :elevation="7">
            <v-btn prepend-icon="mdi-sick">
                Está com algum desconforto?
            </v-btn>
            <v-btn prepend-icon="mdi-phone">
                Emergência
            </v-btn>
        </v-app-bar>
        <h1>TESTE</h1>
    </v-main>
</template>

<script setup>

</script>

<style></style>