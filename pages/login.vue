<template>
    <v-sheet class="d-flex flex-wrap container-main">
        <v-sheet class="flex-1-0 ma-2 pa-2 container-image align-center">
            <img class="img" src="~/assets/cadastro_img.png">
        </v-sheet>

        <v-sheet class="flex-1-0 ma-2 pa-2 container-form">
            <v-form @submit.prevent="handleLogin" class="form-cadastro">

                <h1 style="margin-bottom: 15px;">
                    Login
                </h1>
                <v-col cols="12" md="8">
                    <v-text-field label="E-mail" :rules="[rules.required, rules.email]" v-model="form.email" />
                </v-col>

                <v-col cols="12" md="8">
                    <v-text-field label="Senha" :rules="[rules.required, rules.min]" v-model="form.senha"
                        :append-inner-icon="form.visible ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="form.visible ? 'text' : 'password'" @click:append-inner="form.visible = !form.visible" />
                </v-col>

                <v-col cols="12" md="8">
                    <v-btn type="submit" class="btn btn-cadastar" rounded="lg" color="#585555">Entrar</v-btn>
                </v-col>
            </v-form>
        </v-sheet>
    </v-sheet>
</template>

<script>
export default {
    data: function () {
        return {
            form: {
                email: null,
                senha: null,
                visible: false,
            },
            rules: {
                required: value => !!value || 'Campo obrigatório',
                min: value => value.length >= 8 || 'Minimo de 8 caracteres',
                email: value => /.+@.+\..+/.test(value) || 'E-mail deve ser valido',
            }
        }
    },

    methods: {
        handleLogin: async function () {
            const res = await fetch(`http://localhost:5001/authentication/login/${this.form.email}/${this.form.senha}`, {
                method: "GET"
            });
            
            const resp = await res.json();

            if (res.status == 200) {
                const userId = useCookie('idUsuario');
                const token = useCookie('access_token')

                userId.value = resp.data.idUsuario;
                token.value = resp.data.access_token;

                this.$router.push("/home");
            } else {
                alert("Email ou senha incorretos");
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
}
</style>