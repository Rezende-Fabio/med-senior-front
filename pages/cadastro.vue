<template>
    <v-container>
        <v-form @submit.prevent="handlePostNewUser">
            <v-container>
                <h2>
                    Cadastro
                </h2>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field label="Nome" v-model="form.nome" :rules="[rules.required,]" />
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field label="Data de nascimento" messages="Formato: dd/mm/yyyy" v-model="form.dataNasc"
                            :rules="[rules.required, rules.date]" />
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field label="E-mail" :rules="[rules.required, rules.email]" v-model="form.email" />
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="2">
                        <v-combobox label="Você é Cuidador ou Idoso?" v-model="form.tipo" :items="['Cuidador', 'Idoso']"
                            :rules="[rules.required]" />
                    </v-col>
                    <v-col cols="12" md="2">
                        <v-text-field label="Código" :rules="form.tipo == 'Cuidador' ? [rules.required,] : ''"
                            :disabled="form.tipo == 'Idoso' ? true : false" v-model="form.codigo" />
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field label="Senha" :rules="[rules.required, rules.min]" v-model="form.senha"
                            :append-inner-icon="form.visible ? 'mdi-eye-off' : 'mdi-eye'"
                            :type="form.visible ? 'text' : 'password'" @click:append-inner="form.visible = !form.visible" />
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field label="Confirmar senha" :rules="[rules.required,]" v-model="form.confirmarSenha"
                            :append-inner-icon="form.visible ? 'mdi-eye-off' : 'mdi-eye'"
                            :type="form.visible ? 'text' : 'password'" @click:append-inner="form.visible = !form.visible" />
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="4">
                        <v-btn type="submit" class="btn" rounded="lg" color="#585555">Cadastrar</v-btn>
                    </v-col>
                </v-row>
            </v-container>

        </v-form>
    </v-container>
</template>

<script>
import { convertDateToDatetime } from "../utils/convertDateToDateTime";

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
                    telefone: "11941419565",
                    dataNasc: convertDateToDatetime(this.form.dataNasc),
                    email: this.form.email,
                    senha: this.form.senha
                }
            } else {
                data = {
                    nome: this.form.nome,
                    telefone: this.form.telefone,
                    dataNasc: convertDateToDatetime(this.form.dataNasc),
                    codigoIdoso: this.form.codigo,
                    email: this.form.email,
                    senha: this.form.senha
                }
            }


            console.log(data);


            const res = await fetch(`http://localhost:5000/${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });

            if (res.status == 201) {
                alert("Cadastro realizado com sucesso");
                this.$router.push("/home");
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
.btn {
    width: 1000px;
}
</style>