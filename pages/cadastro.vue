<template>
    <v-img :width="300" src="../assets/cadastro_img.jpeg"></v-img>
    <v-container>
        

        <v-form @submit.prevent>
            <text>Cadastro</text>

            <v-container>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field label="Nome" v-model="nome" required />
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field label="Data de nascimento" v-model="dataNasc" required />
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field label="E-mail" v-model="email" required />
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="2">
                        <v-combobox label="Você é Cuidador ou Idoso?" v-model="tipo" :items="['Cuidador', 'Idoso']"
                            required />
                    </v-col>
                    <v-col cols="12" md="2">
                        <v-text-field label="Código" v-model="codigo"/>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field label="Senha" v-model="senha" required />
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field label="Confirmar senha" v-model="confirmarSenha" required />
                    </v-col>
                </v-row>
            </v-container>

            <v-col cols="12" md="4">
                <v-btn type="submit" rounded="lg" color="#585555"> Cadastrar </v-btn>
            </v-col>
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
    }),
}


</script>

<style></style>