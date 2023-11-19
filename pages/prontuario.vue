<template>
    <Sidebar />
    <v-main>
        <Appbar />
        <div class="div-main-prontuario">
            <div class="container-prontuario">
                <div class="content-pront">
                    <h2>Dados Pessoais</h2>
                    <hr>
                    <p>Nome: {{ idosoInfos.Nome }}</p>
                    <p>Data de nascimento: {{ idosoInfos.DataNasc }}</p>
                    <p>Cuidador Responsável: {{ idosoInfos.NomeCuidador }}</p>
                </div>
                <div class="content-pront">
                    <h2>Medicamentos em Uso</h2>
                    <hr>
                    <div class="content-pront" v-for="usoMedicamento in usoMedicamentos">
                        <p>Nome do medicamento: {{ usoMedicamento.nomeMedicamento }}</p>
                        <p>Dosagem: {{ usoMedicamento.dosagem }}</p>
                        <p>Intervalo: {{ usoMedicamento.intervalo }}</p>
                        <p>Parar de tomar em: {{ usoMedicamento.dataFinal }}</p>
                    </div>
                </div>
                <div class="content-pront">
                    <h2>Medicamentos Consumidos</h2>
                    <hr>
                    <div class="content-pront" v-for="medicamento in medicamentos">
                        <p>Nome: {{ medicamento.nome }}</p>
                        <p>Modo de administracao: {{ medicamento.modoAdm }}</p>
                        <p>Descrição: {{ medicamento.desc }}</p>
                    </div>
                </div>
                <div class="content-pront">
                    <h2>Consultas</h2>
                    <hr>
                    <div class="content-pront" v-for="consulta in consultas">
                        <p>Consulta com: {{ consulta.medico }}</p>
                        <p>Especialidade: {{ consulta.especialidade }}</p>
                        <p>Dia: {{ consulta.diaConsulta }}</p>
                        <p>Hora: {{ consulta.horaConsulta }}</p>
                    </div>
                </div>
                <div class="content-pront">
                    <h2>Sintomas ou desconfortos</h2>
                    <hr>
                    <div class="content-pront" v-for="sintoma in sintomas">
                        <div class="content-sintoma">
                            <p class="title-sintoma">{{ sintoma.descricao }}</p>
                            <ul>
                                <li class="list-sintoma" v-for="data in sintoma.datas">
                                    {{ data }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </v-main>
</template> 

<script setup>
import { ref } from 'vue';

import Sidebar from '../components/sidebar.vue';
import Appbar from '../components/appbar.vue';

const URL_SERVER = "http://localhost:5000/";

const cookie = useCookie('idUsuario');
const idosoId = cookie.value;


const idosoInfos = ref({});
const usoMedicamentos = ref([]);
const medicamentos = ref([]);
const consultas = ref([]);
const sintomas = ref([]);

const searhMedicineName = (medId, medicines) => {
    const medicine = medicines.find(e => e.id == medId);
    return medicine.nome;
}

const initialize = async () => {
    const res = await fetch(URL_SERVER + 'idoso/' + idosoId);
    const data = await res.json()

    idosoInfos.value = {
        Nome: data.Nome,
        DataNasc: convertDateTimeToDate(data.DataNasc),
        NomeCuidador: data.Cuidador.length == 0 ? 'Sem cuidador vinculado' : data.Cuidador.pop().Nome
    };

    usoMedicamentos.value = [];
    data.UsoMedicacao.forEach(element => {
        const row = {
            nomeMedicamento: searhMedicineName(element.medId, data.Medicacao),
            dosagem: element.dosagem,
            intervalo: element.intervalo,
            dataFinal: convertDateTimeToDate(element.dataFinal)
        }

        usoMedicamentos.value.push(row);
    });

    medicamentos.value = [];
    data.Medicacao.forEach(element => {
        const row = {
            nome: element.nome,
            modoAdm: element.modoAdm,
            desc: element.descricao
        }

        medicamentos.value.push(row);
    });

    consultas.value = [];
    data.Consulta.forEach(element => {
        const row = {
            medico: element.medico,
            especialidade: element.especialidade,
            diaConsulta: convertDateTimeToDate(element.dataHoraConsulta),
            horaConsulta: convertDateTimeToTime(element.dataHoraConsulta)
        }
        consultas.value.push(row)
    });

    sintomas.value = [];
    data.Sintoma.forEach(element => {
        const datas = element.ocorrencia.map(item => {
            return `${convertDateTimeToDate(item)} ${convertDateTimeToTime(item)}`;
        });

        const row = {
            descricao: element.descricao,
            datas: datas,
        }

        sintomas.value.push(row)
    });
}

initialize();
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

.container-prontuario {
    width: 80%;
    padding: 60px;
    margin-top: 80px;
    border: 1px solid #000;
    border-radius: 10px;
    margin-bottom: 80px;
}

hr {
    border-top: 3px solid #000;
    margin-top: 5px;
    margin-bottom: 15px;
    border-radius: 10px;
}

.content-pront {
    margin-bottom: 40px;
}

.content-sintoma{
    margin-left: 1.5rem;
}

.title-sintoma{
    font-weight: bold;
    font-size: 16.5px;
}

.list-sintoma{
    margin-left: 2rem;
}
</style>