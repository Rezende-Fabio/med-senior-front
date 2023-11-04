<template>
    <Sidebar />
    <v-main>
        <Appbar />
        <v-container class="container-desconforto">
            <v-row>
                <h3>Sintoma/desconforto:</h3>
            </v-row>
            <v-row>
                <v-checkbox value="1" label="Dor de cabeça" type="checkbox"></v-checkbox>
            </v-row>
            <v-row>
                <v-checkbox value="1" label="Option" type="checkbox"></v-checkbox>
            </v-row>
            <v-row>
                <v-checkbox value="1" label="Option" type="checkbox"></v-checkbox>
            </v-row>
            <v-row>
                <v-checkbox value="1" label="Option" type="checkbox"></v-checkbox>
            </v-row>
            <v-row>
                <v-checkbox value="1" label="Option" type="checkbox"></v-checkbox>
            </v-row>
            <v-row>
                <v-col cols="24" md="12">
                    <v-label>Descrição:</v-label>
                    <v-textarea></v-textarea>
                </v-col>
            </v-row>
            <v-row class="btns">
                <v-btn>Cadastar Sintoma</v-btn>
            </v-row>
        </v-container>
    </v-main>
</template> 

<script setup>
import Sidebar from '../components/sidebar.vue';
import Appbar from '../components/appbar.vue';
</script>

<style>
.container-desconforto{
    border: 1px solid #000000 !important;
    padding: 25px !important;
    margin-top: 1.2rem !important;
    border-radius: 15px !important;
}

.btns{
    display: flex;
    width: 100%;
    justify-content: flex-end;
}
</style>