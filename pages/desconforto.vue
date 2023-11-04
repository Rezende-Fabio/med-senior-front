<template>
    <Sidebar />
    <v-main>
        <Appbar />
        <div v-if="alert === true" class="alert">
            <v-alert :type="typeAlert" :title="titleAtlert" :text="textAlert"></v-alert>
        </div>
        <v-container class="container-desconforto">
            <v-form @submit.prevent="save">
                <v-radio-group>
                    <v-row>
                        <h3>Sintoma/desconforto:</h3>
                    </v-row>
                    <v-row>
                        <v-radio label="Dor de cabeça" value="Dor de cabeça" v-model="sintoma" @change="updateSintoma"></v-radio>
                    </v-row>
                    <v-row>
                        <v-radio label="Febre" value="Febre" v-model="sintoma" @change="updateSintoma"></v-radio>
                    </v-row>
                    <v-row>
                        <v-radio label="Fadiga" value="Fadiga" v-model="sintoma" @change="updateSintoma"></v-radio>
                    </v-row>
                    <v-row>
                        <v-radio label="Tontura" value="Tontura" v-model="sintoma" @change="updateSintoma"></v-radio>
                    </v-row>
                    <v-row>
                        <v-radio label="Náusea" value="Náusea" v-model="sintoma" @change="updateSintoma"></v-radio>
                    </v-row>
                    <v-row>
                        <v-radio label="Vômito" value="Vômito" v-model="sintoma" @change="updateSintoma"></v-radio>
                    </v-row>
                    <v-row>
                        <v-radio label="Diarreia" value="Diarreia" v-model="sintoma" @change="updateSintoma"></v-radio>
                    </v-row>
                    <v-row>
                        <v-radio label="Dores musculares" value="Dores musculares" v-model="sintoma" @change="updateSintoma"></v-radio>
                    </v-row>
                    <v-row>
                        <v-radio label="Dores articulares" value="Dores articulares" v-model="sintoma" @change="updateSintoma"></v-radio>
                    </v-row>
                    <v-row>
                        <v-radio label="Dor abdominal" value="Dor abdominal" v-model="sintoma" @change="updateSintoma"></v-radio>
                    </v-row>
                    <v-row>
                        <v-radio label="Falta de ar" value="Falta de ar" v-model="sintoma" @change="updateSintoma"></v-radio>
                    </v-row>
                </v-radio-group>
                <v-row class="btns">
                    <v-btn type="submit">Cadastar Sintoma</v-btn>
                </v-row>
            </v-form>
        </v-container>
    </v-main>
</template> 

<script setup>
const URL_SERVER = "http://localhost:5000/";
import Sidebar from '../components/sidebar.vue';
import Appbar from '../components/appbar.vue';
import { convertDateToDatetime } from "../utils/convertDateToDateTime";

const sintoma = ref(null);
const titleAtlert = ref("");
const textAlert = ref("");
const typeAlert = ref("");
const alert = ref(false);

function updateSintoma(newValue) {
  sintoma.value = newValue.target.value;
}

async function save() {
    let data;
    const cookie = useCookie('idUsuario');
    const idosoId = cookie.value;
    if (sintoma.value == null) {
        showAlert("warning", "Alerta", "Selecione um sintoma!");
    } else {
        data = {
            idosoId: idosoId,
            descricao: sintoma.value,
            ocorrencia: convertDateToDatetime(new Date().toLocaleString())
        }
        console.log(data);
        const res = await fetch(URL_SERVER + `sintoma`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if (res.status == 201 || res.status == 200) {
            showAlert("success", "Sucesso", "Sintoma incluido com sucesso!");
        }

        if (res.status == 400) {
            showAlert("error", "Erro", "Alguma informação pode estar inválida, por favor tente novamente!");
        }

        if (res.status == 500) {
            showAlert("error", "Erro", "Houve um erro ao processar sua solicitação, tente novamente mais tarde!");
        }
    }
}


function showAlert(categoria, titulo, mensagem) {
    alert.value = true;
    typeAlert.value = categoria;
    titleAtlert.value = titulo;
    textAlert.value = mensagem;
    dismissAlert();
}

function dismissAlert() {
    setTimeout(() => {
        typeAlert.value = "";
        titleAtlert.value = "";
        textAlert.value = "";
        alert.value = false;
    }, 5000);
}
</script>

<style>
.container-desconforto {
    border: 1px solid #000000 !important;
    padding: 25px !important;
    margin-top: 1.2rem !important;
    border-radius: 15px !important;
}

.btns {
    display: flex;
    width: 100%;
    justify-content: flex-end;
}
</style>