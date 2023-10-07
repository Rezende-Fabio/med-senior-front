<template>
    <v-navigation-drawer>
        <v-list-item title="My Application" subtitle="Vuetify"></v-list-item>
        <v-divider></v-divider>
        <v-list style="height: 80%;" class="d-flex flex-column justify-space-between" nav>
            <v-list-item prepend-icon="mdi-pill" title="MEDICAMENTOS" value=""></v-list-item>
            <v-list-item prepend-icon="mdi-calendar" title="CONSULTAS" value=""></v-list-item>
            <v-list-item prepend-icon="mdi-file" title="PRONTUÁRIO" value=""></v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-main>
        <v-app-bar :elevation="3">
            <v-btn prepend-icon="mdi-sick">
                Está com algum desconforto?
            </v-btn>
            <v-btn prepend-icon="mdi-phone">
                Emergência
            </v-btn>
        </v-app-bar>
        <div class="div-main">
            <div class="d-flex flex-column mb-6">
                <v-sheet class="ma-2 pa-2">
                    <h2>Agendar Medicamento</h2>
                </v-sheet>
                <div v-if="alert === true" class="alert">
                    <v-alert :type="typeAlert" :title="titleAtlert" :text="textAlert"></v-alert>
                </div>

                <div class="d-flex justify-center mb-6 bg-surface-variant">
                    <v-data-table :headers="headers" :items="desserts" :sort-by="[{ key: 'calories', order: 'asc' }]"
                        class="elevation-1">
                        <template v-slot:top>
                            <v-toolbar flat class="elevation-1 custom-header">
                                <v-spacer></v-spacer>
                                <v-dialog v-model="dialog" max-width="500px">
                                    <template v-slot:activator="{ props }">
                                        <v-btn prepend-icon="mdi-plus" class="mb-2 btn-new" v-bind="props">
                                            <template v-slot:prepend>
                                                <v-icon color="success"></v-icon>
                                            </template>
                                            Agendar Medicamento
                                        </v-btn>
                                    </template>
                                    <v-card style="padding: 20px;">
                                        <v-card-title>
                                            <span class="text-h5">{{ formTitle }}</span>
                                        </v-card-title>

                                        <v-card-text>
                                            <v-container>
                                                <v-col>
                                                    <v-row cols="12" sm="6" md="4">
                                                        <v-autocomplete v-model="usoMedicacao.medId"
                                                        label="Nome do Medicamento"
                                                        :items="items"
                                                        item-title="nome"
                                                        item-value="id"></v-autocomplete>
                                                    </v-row>
                                                    <v-row cols="12" sm="6" md="4">
                                                        <v-text-field v-model="usoMedicacao.dosagem" type="number" min="1"
                                                            label="Dosagem"></v-text-field>
                                                    </v-row>
                                                    <v-row cols="12" sm="6" md="4">
                                                        <v-text-field v-model="usoMedicacao.intervalo" type="number" min="1"
                                                            label="Intervalo de horas"></v-text-field>
                                                    </v-row>
                                                    <v-row cols="12" sm="6" md="4">
                                                        <v-text-field v-model="usoMedicacao.horaInicial" messages="Formato: hh:mm"
                                                            :rules="[rules.time]"
                                                            label="Hora do primeiro consumo"></v-text-field>
                                                    </v-row>
                                                    <v-row cols="12" sm="6" md="4">
                                                        <v-text-field messages="Formato: dd/mm/yyyy"
                                                            v-model="usoMedicacao.dataFinal" :rules="[rules.date]"
                                                            label="Data final"></v-text-field>
                                                    </v-row>

                                                </v-col>
                                            </v-container>
                                        </v-card-text>

                                        <v-card-actions>
                                            <div class="d-flex justify-space-between mb-4" style="width: 100%;">
                                                <v-sheet>
                                                    <v-btn color="blue-darken-1" class="btn-bk-cancel" variant="text"
                                                        @click="close">
                                                        Cancelar
                                                    </v-btn>
                                                </v-sheet>
                                                <v-sheet>
                                                    <v-btn color="blue-darken-1" variant="text" class="btn-bk-new"
                                                        @click="save">
                                                        Salvar
                                                    </v-btn>
                                                </v-sheet>
                                            </div>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                                <v-dialog v-model="dialogDelete" max-width="550px">
                                    <v-card class="card-delete">
                                        <v-sheet>
                                            <v-card-text class="text-h5 mb-10 break-title">
                                                <div>
                                                    <h5>Tem certeza que deseja excluir o esse horario?
                                                    </h5>
                                                </div>
                                            </v-card-text>
                                        </v-sheet>
                                        <v-sheet class="ma-2 pa-2">
                                            <div class="d-flex justify-space-between mb-4">
                                                <v-sheet>
                                                    <v-btn color="blue-darken-1 btn-bk-cancel" variant="text"
                                                        @click="closeDelete">Cancelar</v-btn>
                                                </v-sheet>
                                                <v-sheet>
                                                    <v-btn color="blue-darken-1 btn-bk-delete" variant="text"
                                                        @click="deleteItemConfirm">Excluir</v-btn>
                                                </v-sheet>
                                            </div>
                                        </v-sheet>
                                    </v-card>
                                </v-dialog>
                            </v-toolbar>
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <v-icon size="small" class="me-2" @click="editItem(item)">
                                mdi-pencil
                            </v-icon>
                            <v-icon size="small" @click="deleteItem(item)">
                                mdi-delete
                            </v-icon>
                        </template>
                    </v-data-table>
                </div>
            </div>
        </div>

    </v-main>
</template>

<script setup >
import {
    VDataTable,
    VDataTableServer,
    VDataTableVirtual,
} from "vuetify/labs/VDataTable";
import { ref } from 'vue';
import { convertDateToDatetime } from "~/utils/convertDateToDateTime";
import { convertDateTimeToDate } from "~/utils/convertDateTimeToDate";
import { convertStringToTime } from "~/utils/convertStringToTime";

const URL_SERVER = "http://localhost:5000/";
const idosoId = "09c278d0-5791-43d1-aac0-cd3ba76321f3"; 
const { data } = await useAsyncData('', () => $fetch(URL_SERVER + 'medicacao/uso/todos/' + idosoId));

const nomesMedicamento = async () => {
    const names = await $fetch(URL_SERVER + 'medicacao/todos/' + idosoId)
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

const dialog = ref(false);
const dialogDelete = ref(false);
const titleAtlert = ref("");
const textAlert = ref("");
const typeAlert = ref("");
const alert = ref(false);

const headers = [
    {
        title: "ID",
        key: "id",
        align: ' d-none'
    },
    {
        title: "ID Medicação",
        key: "medId",
        align: ' d-none'
    },
    {
        title: 'Nome Medicamento',
        align: 'start',
        key: 'nome',
    },
    { title: 'Dosagem', key: 'dosagem' },
    { title: 'Intervalo de horas', key: 'intervalo' },
    { title: 'Hora do primeiro consumo', key: 'horaInicial' },
    { title: 'Data final', key: 'dataFinal' },
    { title: 'Ações', key: 'actions', sortable: false },
];

const desserts = ref([]);

const editedIndex = ref(-1);
const usoMedicacao = ref({
    id: "",
    dosagem: null,
    intervalo: null,
    horaInicial: "",
    dataFinal: null,
    idosoId: idosoId,
    medId: ""
})

const rules = {
    date: value => /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/.test(value) || 'Data inválida',
    time: value => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value) || 'Formato de hora inválido'
};

const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'Agendar Medicamento' : 'Editar Agendamento do Medicamento';
});

const initialize = () => {
    desserts.value = [];
    data.value.forEach(element => {
        var row = {
            id: element.id,
            medId: element.medicacao.id,
            nome: element.medicacao.nome,
            dosagem: element.dosagem,
            intervalo: element.intervalo,
            horaInicial: convertDateTimeToTime(element.horaInicial),
            dataFinal: convertDateTimeToDate(element.dataFinal)
        }
        desserts.value.push(row);
    });

};

const editItem = (item) => {
    editedIndex.value = desserts.value.indexOf(item);
    usoMedicacao.value = { ...item };
    dialog.value = true;
};

const deleteItem = (item) => {
    editedIndex.value = desserts.value.indexOf(item);
    usoMedicacao.value = { ...item };
    dialogDelete.value = true;
};

const deleteItemConfirm = () => {
    $fetch(URL_SERVER + `medicacao/uso/${usoMedicacao.value.id}`, {
         method: 'DELETE',
         body: JSON.stringify(usoMedicacao.value)
     })
        .then((response) => {
            typeAlert.value = "success";
            titleAtlert.value = "Sucesso";
            textAlert.value = "Agendamento excluido com sucesso!";
            alert.value = true;
            dismissAlert();
            updateItemList();
        })
        .catch((error) => {
            typeAlert.value = "error";
            titleAtlert.value = "Erro";
            textAlert.value = "Não foi possível excluir o agendamento!";
            alert.value = true;
            console.error(error);
            dismissAlert();
        });
    closeDelete();
};

const close = () => {
    dialog.value = false;
    editedIndex.value = -1;
    usoMedicacao.value = {
        dosagem: null,
        intervalo: null,
        horaInicial: "",
        dataFinal: null,
        idosoId: idosoId,
        medId: ""
    }
};

const closeDelete = () => {
    dialogDelete.value = false;
    editedIndex.value = -1;
};

const formataDados = () => {
    usoMedicacao.value.intervalo = parseFloat(usoMedicacao.value.intervalo);
    usoMedicacao.value.dosagem = parseFloat(usoMedicacao.value.dosagem);
    usoMedicacao.value.horaInicial = convertStringToTime(usoMedicacao.value.horaInicial);
    usoMedicacao.value.dataFinal = convertDateToDatetime(usoMedicacao.value.dataFinal);
};

const save = () => {
    formataDados();
    if (editedIndex.value > -1) {
        $fetch(URL_SERVER + `medicacao/uso/${usoMedicacao.value.id}`, {
            method: 'PUT',
            body: JSON.stringify(usoMedicacao.value)
        })
        .then((response) => {
            typeAlert.value = "success";
            titleAtlert.value = "Sucesso";
            textAlert.value = "Agendamento alterado com sucesso!";
            alert.value = true;
            dismissAlert();
            updateItemList();
        })
        .catch((error) => {
            typeAlert.value = "error";
            titleAtlert.value = "Erro";
            textAlert.value = "Não foi possível alterar o agendamento!";
            alert.value = true;
            console.error(error);
            dismissAlert();
        });
    } else {
        $fetch(URL_SERVER + 'medicacao/uso', {
            method: 'POST',
            body: JSON.stringify(usoMedicacao.value)
        })
        .then((response) => {
            typeAlert.value = "success";
            titleAtlert.value = "Sucesso";
            textAlert.value = "Agendamento incluido com sucesso!";
            alert.value = true;
            dismissAlert();
            updateItemList();
        })
        .catch((error) => {
            typeAlert.value = "error";
            titleAtlert.value = "Erro";
            textAlert.value = "Não foi possível incluir o agendamento!";
            alert.value = true;
            console.error(error);
            dismissAlert();
        });
    }
    close();
};

function updateItemList() {
    window.location.reload();
}

function dismissAlert() {
    setTimeout(() => {
        typeAlert.value = "";
        titleAtlert.value = "";
        textAlert.value = "";
        alert.value = false;
    }, 5000);
}

initialize();
</script>


<style>
.custom-header {
    background-color: white;
}

.div-main {
    padding-left: 50px;
    padding-right: 50px;
}

.btn-new {
    background-color: #565656;
    color: white !important;
}

.btn-new-estoque {
    background-color: #868686;
    color: white !important;
    margin-right: 10px;
}

.card-delete {
    padding: 30px;
}

.btn-bk-cancel {
    border: 1px solid rgb(62, 62, 62);
    color: rgb(62, 62, 62) !important;
}

.btn-bk-delete {
    background-color: rgb(242, 59, 59) !important;
    color: rgb(255, 255, 255) !important;
}

.btn-bk-new {
    background-color: rgb(70, 155, 55) !important;
    color: rgb(255, 255, 255) !important;
}

.break-text {
    white-space: normal;
}

.alert {
    margin: 1rem;
}
</style>