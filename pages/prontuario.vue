<template>
    <Sidebar />
    <v-main>
        <Appbar/>
        <div class="div-main-prontuario">
            <div class="container-prontuario">
                <div class="content-pront">
                    <h2>Dados Pessoais</h2>
                    <hr>
                    <p>Nome: </p>
                    <p>Idade: </p>
                    <p>Doenças: </p>
                    <p>Cuidador Responsável: </p>
                </div>
                <div class="content-pront">
                    <h2>Medicamentos em Uso</h2>
                    <hr>
                    <p>Nome: </p>
                    <p>Idade: </p>
                    <p>Doenças: </p>
                    <p>Cuidador Responsável: </p>
                </div>
                <div class="content-pront">
                    <h2>Medicamentos Consumidos</h2>
                    <hr>
                    <p>Nome: </p>
                    <p>Idade: </p>
                    <p>Doenças: </p>
                    <p>Cuidador Responsável: </p>
                </div>
                <div class="content-pront">
                    <h2>Consultas realizadas</h2>
                    <hr>
                    <p>Nome: </p>
                    <p>Idade: </p>
                    <p>Doenças: </p>
                    <p>Cuidador Responsável: </p>
                    <p>Nome: </p>
                    <p>Idade: </p>
                    <p>Doenças: </p>
                </div>
            </div>
        </div>
    </v-main>
</template> 

<script setup>
import Sidebar from '../components/sidebar.vue';
import Appbar from '../components/appbar.vue';
</script>

<style>
.div-main-prontuario {
    padding-left: 50px;
    padding-right: 50px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.container-prontuario{
    width:80%;
    padding: 60px;
    margin-top: 80px;
    border: 1px solid #000;
    border-radius: 10px;
}
hr {
    border-top: 3px solid #000; 
    margin-top: 5px;
    margin-bottom: 15px;
    border-radius: 10px;
}
.content-pront{
    margin-bottom: 40px;
}

</style>