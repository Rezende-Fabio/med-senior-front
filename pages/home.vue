<template>
    <Sidebar />
    <v-main>
        <Appbar />
        <div v-if="alert === true" class="alert">
            <v-alert :type="typeAlert" :title="titleAtlert" :text="textAlert"></v-alert>
        </div>
        <v-container class="container-desconforto">
            <h3>Remédios do dia</h3>
            <v-table>
                <thead>
                    <tr>
                        <th class="text-left">
                            Remédio
                        </th>
                        <th class="text-left">
                            Horário
                        </th>
                        <th class="text-left">
                            Tomou o remédio
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in medicamentos">
                        <td>{{ item.nome }}</td>
                        <td>{{ item.hora }}</td>
                        <td>
                            <v-btn variant="tonal" @click="registrarConsumo(item.idMed, item.qtde)">
                                Registrar consumo
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-container>
        <v-container class="container-desconforto">
            <h3>Consultas da semana</h3>
            <v-table>
                <thead>
                    <tr>
                        <th class="text-left">
                            Data
                        </th>
                        <th class="text-left">
                            Especialidade
                        </th>
                        <th class="text-left">
                            Local
                        </th>
                        <th class="text-left">
                            Médico
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in consultas">
                        <td>{{ item.data }} {{ item.hora }}</td>
                        <td>{{ item.especialidade }}</td>
                        <td>{{ item.local }}</td>
                        <td>{{ item.medico }}</td>
                    </tr>
                </tbody>
            </v-table>
        </v-container>
    </v-main>
</template> 

<script setup>
import Sidebar from '../components/sidebar.vue';
import Appbar from '../components/appbar.vue';
import { convertDateTimeToTime } from "~/utils/convertDateTimeToTime";

const URL_SERVER = "http://localhost:5000/";

const cookie = useCookie('idUsuario');
const idosoId = cookie.value;
const token = useCookie("access_token").value;
const titleAtlert = ref("");
const textAlert = ref("");
const typeAlert = ref("");
const alert = ref(false);

const nomesMedicamento = async () => {
    const medicamentos = await $fetch(URL_SERVER + 'medicacao/uso/dia/' + idosoId, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
            const infos = [];

            response.forEach(el => {
                const data = {
                    idMed: el.medicacao.id,
                    nome: el.medicacao.nome,
                    hora: convertDateTimeToTime(el.tomar),
                    qtde: el.dosagem,
                }

                infos.push(data);
            });

            return infos
        });

    return medicamentos;
}

const consultasMarcadas = async () => {
    const consultas = await $fetch(URL_SERVER + 'consulta/semana/' + idosoId, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
            const infos = [];

            response.forEach(el => {
                const data = {
                    data: convertDateTimeToDate(el.dataHoraConsulta),
                    hora: convertDateTimeToTime(el.dataHoraConsulta),
                    especialidade: el.especialidade,
                    local: el.local,
                    medico: el.medico
                }

                infos.push(data);
            });

            return infos
        });

    return consultas;
}

const medicamentos = await nomesMedicamento();
const consultas = await consultasMarcadas();

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

async function registrarConsumo(idMed, qtde) {
    const token = useCookie("access_token").value;

    const res = await fetch(URL_SERVER + `medicacao/uso/${idMed}/${parseInt(qtde)}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    });

    if (res.status == 201 || res.status == 200) {
        showAlert("success", "Sucesso", "Consumo incluido com sucesso!");
    }

    if (res.status == 404) {
        showAlert("error", "Erro", "Não existe estoque para o medicamento!");
    }

    if (res.status == 500) {
        showAlert("error", "Erro", "Houve um erro ao processar sua solicitação, tente novamente mais tarde!");
    }
}

window.Notification.requestPermission();

navigator.serviceWorker.register('serviceWorker.js')
    .then(async (service) => {
        let sub = await service.pushManager.getSubscription();

        if (!sub) {
            const data = await $fetch("http://localhost:5000/notificacao/token", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("token - ", data);

            sub = await service.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: data
            });

            console.log("Sub - ", sub);

            const data2 = await $fetch("http://localhost:5000/notificacao/register/" + idosoId, {
                method: 'POST',
                body: sub,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(data2);
        }
    });

</script>

<style>
.container-desconforto {
    border: 1px solid #000000 !important;
    padding: 25px !important;
    margin-top: 1.2rem !important;
    border-radius: 15px !important;
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

.radio-group {
    display: flex;
    flex-direction: row;
}
</style>