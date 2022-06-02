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
                            <v-btn color="success" @click="login()" class="mr-3">Log in</v-btn>
                            <v-btn color="warning" @click="hasAccount = false" class="ml-3">Register</v-btn>
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
                            <v-btn color="warning" @click="register()" class="mr-3">Create account</v-btn>
                            <v-btn color="success"  @click="hasAccount = true" class="ml-3">Log in</v-btn>
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

                if(data.email == undefined || data.password == undefined){
                        alert("Sorry, you have to fill all the fields");
                }
                else{
                        axios.post('http://localhost:3000/api/login', data)
                        .then((res)=>{
                            var admin = res.data.admin;
                            if(admin != null){
                                localStorage.setItem('admin', JSON.stringify(admin));
                                this.$router.push('/records');
                            }
                            else{
                                alert("Sorry, admin account not found.");
                            }
                        })
                    }
            },

            register(){
                var data = {
                    name : this.registerData.name,
                    phone : this.registerData.phone,
                    email : this.registerData.email,
                    password : this.registerData.password
                }

                if(data.name == undefined || data.phone == undefined || data.email == undefined || data.password == undefined){
                    alert("Sorry, you have to fill all the fields");
                }
                else{
                    axios.post('http://localhost:3000/api/admins', data)
                    .then((res) => {
                        console.log(res.data.admin);

                        alert("Admin account successfully created");

                    })
                }
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