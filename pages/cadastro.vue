<template>
    <v-sheet class="d-flex flex-wrap container-main">
        <v-sheet class="flex-1-0 ma-2 pa-2 container-image align-center">
            <img class="img" src="~/assets/cadastro_img.png">
        </v-sheet>

        <v-sheet class="flex-1-0 ma-2 pa-2 container-form">
            <v-form @submit.prevent="handlePostNewUser" class="form-cadastro">

                <h1 style="margin-bottom: 15px;">
                    Cadastro
                </h1>

                <v-col cols="10" md="8">
                    <v-text-field label="Nome" v-model="form.nome" :rules="[rules.required,]" />
                </v-col>



                <v-col cols="12" md="8">
                    <v-text-field label="Data de nascimento" messages="Formato: dd/mm/yyyy" v-model="form.dataNasc"
                        :rules="[rules.required, rules.date]" />
                </v-col>



                <v-col cols="12" md="8">
                    <v-text-field label="E-mail" :rules="[rules.required, rules.email]" v-model="form.email" />
                </v-col>


                <v-col cols="12" md="8">
                    <v-text-field label="Telefone" messages="Formato: XXXXXXX-XXXX"
                        :rules="[rules.required, rules.telefone]" v-model="form.telefone" />
                </v-col>


                <div class="container-row-cadastro">
                    <v-col cols="6" md="4">
                        <v-combobox label="Você é Cuidador ou Idoso?" v-model="form.tipo" :items="['Cuidador', 'Idoso']"
                            :rules="[rules.required]" />
                    </v-col>
                    <v-col cols="6" md="4">
                        <v-text-field label="Código" :rules="form.tipo == 'Cuidador' ? [rules.required,] : ''"
                            :disabled="form.tipo == 'Idoso' ? true : false" v-model="form.codigo" />
                    </v-col>
                </div>


                <v-col cols="12" md="8">
                    <v-text-field label="Senha" :rules="[rules.required, rules.min]" v-model="form.senha"
                        :append-inner-icon="form.visible ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="form.visible ? 'text' : 'password'" @click:append-inner="form.visible = !form.visible" />
                </v-col>



                <v-col cols="12" md="8">
                    <v-text-field label="Confirmar senha" :rules="[rules.required,]" v-model="form.confirmarSenha"
                        :append-inner-icon="form.visible ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="form.visible ? 'text' : 'password'" @click:append-inner="form.visible = !form.visible" />
                </v-col>



                <v-col cols="12" md="8">
                    <v-btn type="submit" class="btn btn-cadastar" rounded="lg" color="#585555">Cadastrar</v-btn>
                </v-col>



            </v-form>
        </v-sheet>
    </v-sheet>
</template>

<script>
import { convertDateToDate } from "../utils/convertDateToDate";

export default {
    data: function () {
        return {
            form: {
                nome: null,
                email: null,
                telefone: null,
                dataNasc: null,
                tipo: null,
                codigo: null,
                senha: null,
                confirmarSenha: null,
                visible: false,
            },
            rules: {
                required: value => !!value || 'Campo obrigatório',
                min: value => value.length >= 8 || 'Minimo de 8 caracteres',
                date: value => /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/.test(value) || 'Data inválida',
                email: value => /.+@.+\..+/.test(value) || 'E-mail deve ser valido',
                telefone: value => /\d{7}-\d{4}$/.test(value) || 'Telefone deve ser válido'
            }
        }
    },

    methods: {
        handlePostNewUser: async function () {
            let endpoint = "cuidador";
            let data;

            if (this.form.tipo == 'Idoso') {
                endpoint = 'idoso';

                data = {
                    nome: this.form.nome,
                    telefone: this.form.telefone,
                    dataNasc: convertDateToDate(this.form.dataNasc),
                    email: this.form.email,
                    senha: this.form.senha
                }
            } else {
                data = {
                    nome: this.form.nome,
                    telefone: this.form.telefone,
                    dataNasc: convertDateToDate(this.form.dataNasc),
                    codigoIdoso: this.form.codigo,
                    email: this.form.email,
                    senha: this.form.senha
                }
            }

            const res = await fetch(`http://localhost:5000/${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });

            const resp = await res.json();
            const cookie = useCookie('idUsuario');
            
            cookie.value = resp.id;

            if (res.status == 201) {
                alert("Cadastro realizado com sucesso");
                this.$router.push("/login");
            }

            if (res.status == 400) {
                alert("Alguma informação pode estar inválida, por favor tente novamente");
            }

            if (res.status == 500) {
                alert("Houve um erro ao processar sua solicitação, tente novamente mais tarde");
            }

        }
    }
}


</script>

<style>
.container-main {
    height: 100%;
}

.container-image {
    padding: 100px !important;
    display: flex;
    justify-content: center;
}

.container-row-cadastro {
    display: flex;
}

.container-form {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.btn {
    width: 1000px;
    height: 55px !important;
}</style>