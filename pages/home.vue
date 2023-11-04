<template>
    <Sidebar />
    <v-main>
        <Appbar/>
        <div class="div-main-home">
            <NuxtLink to="/medicamentos" class="card">
                <div class="icon">
                    <v-icon icon="mdi-pill" size="x-large"></v-icon>
                </div>
                <div class="text">
                    <span>Deseja cadastrar um novo medicamento?</span>
                </div>
            </NuxtLink>
            <NuxtLink to="/usoMedicacao" class="card">
                <div class="icon">
                    <v-icon icon="mdi-clock" size="x-large"></v-icon>
                </div>
                <div class="text">
                    <span>Deseja cadastrar um horário do seu medicamento?</span>
                </div>
            </NuxtLink>
        </div>
    </v-main>
</template> 

<script setup>
import Sidebar from '../components/sidebar.vue';
import Appbar from '../components/appbar.vue';
</script>

<style>
.div-main-home {
    padding-left: 50px;
    padding-right: 50px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
}

.card {
    text-decoration: none;
    color: #000000;
    width: 25%;
    height: 45%;
    background-color: #d8d8d8;
    border-radius: 15px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.icon {
    display: flex;
    width: 100%;
    justify-content: center;
}

.icon i {
    font-size: 120px;
}

.text {
    display: flex;
    width: 100%;
    justify-content: center;
    text-align: center;
}
</style>