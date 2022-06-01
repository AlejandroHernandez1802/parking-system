<template>
    <v-layout>
        <v-layout row wrap justify-center align-center class="main" v-if="hasAccount">
            <v-card color="red">
                    <v-card-title primary-title>
                        <h2 class="white--text">Log in into your account</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field color="white" label="Email" v-model="loginData.email"></v-text-field>
                        <v-text-field color="white" label="Password" type="password" v-model="loginData.password"></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-layout row wrap justify-center>
                            <v-btn color="success" @click="login()">Log in</v-btn>
                            <v-btn color="warning" @click="hasAccount = false">Register</v-btn>
                        </v-layout>
                    </v-card-actions>
            </v-card>
        </v-layout>


        <v-layout row wrap justify-center align-center class="main" v-else>
            <v-card color="red">
                    <v-card-title primary-title>
                        <h2 class="white--text">Create your account</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field color="white" label="Name" v-model="registerData.name"></v-text-field>
                        <v-text-field color="white" label="Phone" v-model="registerData.phone"></v-text-field>
                        <v-text-field color="white" label="Email" v-model="registerData.email"></v-text-field>
                        <v-text-field color="white" label="Password" type="password" v-model="registerData.password"></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-layout row wrap justify-center>
                            <v-btn color="warning" @click="register()">Create account</v-btn>
                            <v-btn color="success"  @click="hasAccount = true">Log in</v-btn>
                        </v-layout>
                    </v-card-actions>
            </v-card>
        </v-layout>
    </v-layout>
</template>


<script>

import axios from 'axios';


    export default{
        data(){
            return{
                hasAccount: true,
                loginData: new Object(),
                registerData: new Object(),
            }
        },
        methods:{
            login(){
                var data = {
                    email: this.loginData.email,
                    password: this.loginData.password
                }

                axios.post('http://localhost:3000/api/login', data)
                .then((res)=>{
                    var admin = res.data.admin;
                    if(admin != null){
                        localStorage.setItem('admin', JSON.stringify(admin));
                        this.$router.push('/admin');
                    }
                    else{
                        alert("Sorry, admin account not found.");
                    }
                })

            },

            register(){
                var data = {
                    name : this.registerData.name,
                    phone : this.registerData.phone,
                    email : this.registerData.email,
                    password : this.registerData.password
                }

                axios.post('http://localhost:3000/api/admins', data)
                .then((res) => {
                    console.log(res.data.admin);
                })
            }
        }
    }
</script>


<style scoped>
    .main{
        min-height: 100%;
        background-color: black;
    }
</style>