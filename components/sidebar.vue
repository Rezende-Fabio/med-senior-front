<template>
    <v-navigation-drawer class="bg-grey">
        <v-list-item>
            <NuxtLink to="/home" class="link-home">
                <div class="header-sidebar">
                    <div class="icon-header">
                        <v-icon icon="mdi-account" size="x-large"></v-icon>
                    </div>
                    <h4 class="cl-black">Sarah Ramos</h4>
                    <span class="cl-black">A6789</span>
                </div>
            </NuxtLink>
        </v-list-item>
        <v-list style="height: 55%;" class="d-flex flex-column justify-space-between" nav>
            <NuxtLink to="/home">
                <div class="link-item">
                    <div class="icon-item">
                        <v-icon icon="mdi-home" size="x-large"></v-icon>
                    </div>
                    <span class="text-item">HOME</span>
                </div> 
            </NuxtLink>
            <NuxtLink to="/medicamentos">
                <div class="link-item">
                    <div class="icon-item">
                        <v-icon icon="mdi-pill" size="x-large"></v-icon>
                    </div>
                    <span class="text-item">MEDICAMENTOS</span>
                </div> 
            </NuxtLink>
            <NuxtLink to="/consultas">
                <div class="link-item">
                    <div class="icon-item">
                        <v-icon icon="mdi-calendar" size="x-large"></v-icon>
                    </div>
                    <span class="text-item">CONSULTAS</span>
                </div> 
            </NuxtLink>
            <NuxtLink to="/prontuario">
                <div class="link-item">
                    <div class="icon-item">
                        <v-icon icon="mdi-file" size="x-large"></v-icon>
                    </div>
                    <span class="text-item">PRONTUÁRIO</span>
                </div> 
            </NuxtLink>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>

<style>
.bg-grey{
    background-color: #B0C4DE !important;
    border-radius: 0px 25px 25px 0px;
}

.link-home{
    text-decoration: none;
    color: #000000;
}

.cl-black{
    color: #000000;
}

.header-sidebar{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 3rem;
    margin-top: 2rem;
}

.icon-header{
    background-color: #EFEFEF;
    border-radius: 50%;
    padding: 15px;
    margin-bottom: 0.5rem;
}

.link-item{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
}

.text{
    text-decoration: none;
    font-size: 20px;
    font-weight: bold;
    color: #000000;
}

.icon-item{
    background-color: #708090;
    border-radius: 50%;
    padding: 20px;
    color: #FFFAFA;
    display: block;
}

.text-item{
    width:70%;
    text-decoration: none;
    font-size: 20px;
    font-weight: bold;
    background-color: #708090;
    padding: 10px;
    border-radius: 0px 10px 10px 0px;
    position: absolute;
    margin-left: 3.2rem;
    color: #FFFAFA;
}
.text-item:active{
    color: #585555;
}
</style>