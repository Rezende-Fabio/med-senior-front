<template>
    <Sidebar />
    <v-main>
        <Appbar />
        <div class="div-main">
            <div class="d-flex flex-column mb-6">
                <v-sheet class="ma-2 pa-2">
                    <h2>Medicamentos</h2>
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
                                        <NuxtLink to="/estoque" class="link-home">
                                            <v-btn class="mb-2 btn-new-estoque">
                                                Compra de Medicamento
                                            </v-btn>
                                        </NuxtLink>
                                        <v-btn prepend-icon="mdi-plus" class="mb-2 btn-new" v-bind="props">
                                            <template v-slot:prepend>
                                                <v-icon color="success"></v-icon>
                                            </template>
                                            Cadastrar Medicamento
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
                                                        <v-text-field v-model="medicacao.nome"
                                                            label="Nome do Medicamento"></v-text-field>
                                                    </v-row>
                                                    <v-row cols="12" sm="6" md="4">
                                                        <v-textarea v-model="medicacao.descricao"
                                                            label="Descrição"></v-textarea>
                                                    </v-row>
                                                    <v-row cols="12" sm="6" md="4">
                                                        <v-select v-model="medicacao.modoAdm" :items="items"
                                                            label="Modo de Administração (ml/qtd)"></v-select>
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
                                                    <h5>Tem certeza que deseja excluir o(a) medicação {{ medicacao.nome }}?
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

<script setup>
const URL_SERVER = "http://localhost:5000/";
import {
    VDataTable,
    VDataTableServer,
    VDataTableVirtual,
} from "vuetify/labs/VDataTable";
import { ref } from 'vue';
import Sidebar from '../components/sidebar.vue';
import Appbar from '../components/appbar.vue';

const cookie = useCookie('idUsuario');
const idosoId = cookie.value;
const token = useCookie("access_token").value;

const { data } = await useAsyncData('', async () => {
    const resp = await $fetch(URL_SERVER + 'medicacao/todos/' + idosoId, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return resp;
});

const items = ref(['Comprimido', 'Gotas', 'Líquido', 'Pomada']);
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
        title: 'Nome Medicamento',
        align: 'start',
        key: 'nome',
    },
    { title: 'Descrição', key: 'descricao' },
    { title: 'Ml/Qtd', key: 'modoAdm' },
    { title: 'Ações', key: 'actions', sortable: false },
];

const desserts = ref([]);

const editedIndex = ref(-1);
const medicacao = ref({
    id: "",
    name: "",
    descricao: "",
    modoAdm: "",
    idosoId: idosoId
});

const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'Cadastrar Medicamento' : 'Editar Medicamento';
});

const initialize = () => {
    desserts.value = [];
    data.value.forEach(element => {
        var row = {
            id: element.id,
            nome: element.nome,
            descricao: element.descricao,
            modoAdm: element.modoAdm
        }
        desserts.value.push(row);
    });
};

const editItem = (item) => {
    editedIndex.value = desserts.value.indexOf(item);
    medicacao.value = { ...item };
    dialog.value = true;
};

const deleteItem = (item) => {
    editedIndex.value = desserts.value.indexOf(item);
    medicacao.value = { ...item };
    dialogDelete.value = true;
};

const deleteItemConfirm = () => {
    $fetch(URL_SERVER + `medicacao/${medicacao.value.id}`, {
        method: 'DELETE',
        body: JSON.stringify(medicacao.value),
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
            typeAlert.value = "success";
            titleAtlert.value = "Sucesso";
            textAlert.value = "Medicação excluida com sucesso!";
            alert.value = true;
            dismissAlert();
            updateItemList();
        })
        .catch((error) => {
            typeAlert.value = "error";
            titleAtlert.value = "Erro";
            textAlert.value = "Não foi possível excluir a medicação!";
            alert.value = true;
            console.error(error);
            dismissAlert();
        });
    closeDelete();
};

const close = () => {
    dialog.value = false;
    editedIndex.value = -1;
    medicacao.value = {
        id: "",
        name: "",
        descricao: "",
        modoAdm: "",
        idosoId: idosoId
    }
};

const closeDelete = () => {
    dialogDelete.value = false;
    editedIndex.value = -1;
};

const save = () => {
    if (editedIndex.value > -1) {
        $fetch(URL_SERVER + `medicacao/${medicacao.value.id}`, {
            method: 'PUT',
            body: JSON.stringify(medicacao.value),
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                typeAlert.value = "success";
                titleAtlert.value = "Sucesso";
                textAlert.value = "Medicação alterada com sucesso!";
                alert.value = true;
                dismissAlert();
                updateItemList();
            })
            .catch((error) => {
                typeAlert.value = "error";
                titleAtlert.value = "Erro";
                textAlert.value = "Não foi possível alterar a medicação!";
                alert.value = true;
                console.error(error);
                dismissAlert();
            });
    } else {
        $fetch(URL_SERVER + 'medicacao', {
            method: 'POST',
            body: JSON.stringify(medicacao.value),
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                typeAlert.value = "success";
                titleAtlert.value = "Sucesso";
                textAlert.value = "Medicação incluida com sucesso!";
                alert.value = true;
                dismissAlert();
                updateItemList();
            })
            .catch((error) => {
                typeAlert.value = "error";
                titleAtlert.value = "Erro";
                textAlert.value = "Não foi possível incluir a medicação!";
                alert.value = true;
                console.error(error);
                dismissAlert();
            });
    }
    close();
};

async function updateItemList() {
    const { data } = await useAsyncData('', async () => {
        const resp = await $fetch(URL_SERVER + 'medicacao/todos/' + idosoId, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return resp;
    });

    desserts.value = [];
    data.value.forEach(element => {
        var row = {
            id: element.id,
            nome: element.nome,
            descricao: element.descricao,
            modoAdm: element.modoAdm
        }
        desserts.value.push(row);
    });
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