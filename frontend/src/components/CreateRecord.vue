<template>
    <v-layout>
        <v-layout row wrap justify-center align-center class="main">
            <v-card color="red">
                    <v-card-title primary-title>
                        <h2 class="white--text">Registrar un nuevo vehículo</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field color="white" label="Nombre del propietario" v-model="createRecordData.username"></v-text-field>
                        <v-text-field color="white" label="Identificación del propietario"  v-model="createRecordData.userid"></v-text-field>
                        <v-text-field color="white" label="Placa del vehículo" v-model="createRecordData.vehiclenumber"></v-text-field>
                        <v-text-field color="white" label="Tipo de vehículo"  v-model="createRecordData.vehicletype"></v-text-field>
                        <v-text-field color="white" label="Breve descripción del vehículo" v-model="createRecordData.vehicledescription"></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-layout row wrap justify-center>
                            <v-btn color="success" @click="createRecord()">Registrar vehículo</v-btn>
                        </v-layout>
                    </v-card-actions>
            </v-card>
        </v-layout>
    </v-layout>
</template>







<script>
import axios from 'axios'

    export default{
        data(){
            return{
                admin: new Object(),
                createRecordData: new Object()
            }
        },
        mounted() {
            this.admin = JSON.parse(localStorage.getItem('admin'));
        },
        methods:{
            createRecord(){

                var today = new Date();

                var data = {
                    username: this.createRecordData.username,
                    userid: this.createRecordData.userid,
                    vehiclenumber: this.createRecordData.vehiclenumber,
                    vehicletype: this.createRecordData.vehicletype,
                    vehicledescription: this.createRecordData.vehicledescription,
                    admininchargee: this.admin._id,
                    checkindate: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
                    checkintime: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
                }
                axios.post('http://localhost:3000/api/createRecord', data)
                .then((res)=>{
                    console.log(res.data.record)
                })

                this.$router.push('/records');
            }
        }
    }
</script>

