<template>
    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-card text="...">
                <v-form v-model="valid">
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="email" :rules="emailRules" label="E-mail" hide-details
                                    required></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="lastname" :rules="nameRules" :counter="10" label="Last name"
                                    hide-details required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card>
        </v-layout>
        <NuxtLink to="/cadastro">Home</NuxtLink>
    </v-container>
</template>

<script setup>

</script>

<style></style>