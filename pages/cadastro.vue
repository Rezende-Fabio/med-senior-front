<template>
    <v-container>
        <v-form @submit.prevent>


            <v-container>
                <h2>
                    Cadastro
                </h2>

                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field label="Nome" v-model="nome" :rules="[rules.required,]" />
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field label="Data de nascimento" v-model="dataNasc" :rules="[rules.required,]" />
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field label="E-mail" :rules="[rules.required, rules.email]" v-model="email" />
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="2">
                        <v-combobox label="Você é Cuidador ou Idoso?" v-model="tipo" :items="['Cuidador', 'Idoso']"
                            :rules="[rules.required]" />
                    </v-col>
                    <v-col cols="12" md="2">
                        <v-text-field label="Código" :rules="tipo == 'Cuidador' ? [rules.required,] : ''"
                            :disabled="tipo == 'Idoso' ? true : false" v-model="codigo" />
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field label="Senha" :rules="[rules.required, rules.min]" v-model="senha"
                            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                            @click:append-inner="visible = !visible" />
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field label="Confirmar senha" :rules="[rules.required, rules.matchPass]"
                            v-model="confirmarSenha" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                            :type="visible ? 'text' : 'password'" @click:append-inner="visible = !visible" />
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="4">
                        <v-btn type="submit" rounded="lg" color="#585555"> Cadastrar </v-btn>
                    </v-col>
                </v-row>
            </v-container>

        </v-form>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        nome: null,
        email: null,
        dataNasc: null,
        tipo: null,
        codigo: null,
        senha: null,
        confirmarSenha: null,
        visible: false,

        rules: {
            required: value => !!value || 'Campo obrigatório',
            min: value => value.length >= 8 || 'Minimo de 8 caracteres',
            email: value => /.+@.+\..+/.test(value) || 'E-mail deve ser valido',
            matchPass: value => {
                if (value != this.senha) {
                    return 'Senhas não correspondem'
                } else return true
            }
        }
    }),
}


</script>

<style></style>