<template>
    <Sidebar />
    <v-main>
        <Appbar />
        <div v-if="alert === true" class="alert">
            <v-alert :type="typeAlert" :title="titleAtlert" :text="textAlert"></v-alert>
        </div>
        <v-container class="container-stoque">
            <h3>Registrar Estoque:</h3>
            <v-form @submit.prevent="save">
                <v-row cols="12" sm="6" md="4">
                    <v-col>
                        <v-autocomplete v-model="medicacao.id" label="Nome do Medicamento" :items="items" item-title="nome"
                            item-value="id"></v-autocomplete>
                    </v-col>
                </v-row>
                <v-row cols="12" sm="6" md="4">
                    <v-col cols="5">
                        <v-text-field type="number" v-model="medicacao.qtde" label="Quantidade"></v-text-field>
                    </v-col>
                </v-row>
                <v-row class="btns">
                    <v-btn type="submit">Adicionar ao Estoque</v-btn>
                </v-row>
            </v-form>
        </v-container>
    </v-main>
</template> 

<script setup >
import { ref } from 'vue';
import Sidebar from '../components/sidebar.vue';
import Appbar from '../components/appbar.vue';

const URL_SERVER = "http://localhost:5000/";

const cookie = useCookie('idUsuario');
const idosoId = cookie.value;
const token = useCookie("access_token").value

const { data } = await useAsyncData('', async () => {
    const resp = await $fetch(URL_SERVER + 'medicacao/uso/todos/' + idosoId, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return resp;
});

const nomesMedicamento = async () => {
    const names = await $fetch(URL_SERVER + 'medicacao/todos/' + idosoId, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
            const infos = [];

            response.forEach(el => {
                const data = {
                    id: el.id,
                    nome: el.nome
                }

                infos.push(data);
            });

            return infos
        });

    return names;
}

const names = await nomesMedicamento();
const items = ref(names);

const titleAtlert = ref("");
const textAlert = ref("");
const typeAlert = ref("");
const alert = ref(false);

const medicacao = ref({
    id: "",
    qtde: null,
})

function dismissAlert() {
    setTimeout(() => {
        typeAlert.value = "";
        titleAtlert.value = "";
        textAlert.value = "";
        alert.value = false;
    }, 5000);
}

function showAlert(categoria, titulo, mensagem) {
    alert.value = true;
    typeAlert.value = categoria;
    titleAtlert.value = titulo;
    textAlert.value = mensagem;
    dismissAlert();
}

async function save() {
    const cookie = useCookie('idUsuario');
    const idosoId = cookie.value;
    const token = useCookie("access_token").value;

    if (medicacao.value.id.toString().length == 0) {
        showAlert("warning", "Alerta", "Selecione um medicamento!");
    } else if (medicacao.value.qtde == null) {
        showAlert("warning", "Alerta", "Informe uma quantidade!");
    } else {
        const res = await fetch(URL_SERVER + `medicacao/${medicacao.value.id}/${parseInt(medicacao.value.qtde)}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        });

        if (res.status == 201 || res.status == 200) {
            showAlert("success", "Sucesso", "Estoque incluido com sucesso!");
        }

        if (res.status == 400) {
            showAlert("error", "Erro", "Alguma informação pode estar inválida, por favor tente novamente!");
        }

        if (res.status == 500) {
            showAlert("error", "Erro", "Houve um erro ao processar sua solicitação, tente novamente mais tarde!");
        }
    }
}
</script>

<style>
.container-stoque {
    border: 1px solid #000000 !important;
    padding: 25px !important;
    margin-top: 2.2rem !important;
    border-radius: 15px !important;
}

.container-stoque h3 {
    margin-bottom: 1rem;
}

.btns {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    margin-top: 1rem;
}
</style>