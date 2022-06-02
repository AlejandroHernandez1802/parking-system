<template>
    <v-layout row wrap align-center id="main">
        <v-app-bar app color="indigo">
            <v-btn color="red" @click="logOut()" icon>
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <h2 class="white--text">Un saludo, {{admin.name}}</h2>
            <v-btn color="green" @click="createRecord()" class="ml-16" icon>
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <h4 class="white--text">Registrar nuevo vehículo</h4>
        </v-app-bar>

        <v-layout row wrap>
            <v-layout class="mx-5">
                <v-btn color="warning" v-if="this.buttonChanger" @click="getAllRecords()">Ver todos los registros</v-btn>
                <v-btn color="success" v-else @click="getActiveRecords()">Ver registros activos</v-btn>
            </v-layout>
        </v-layout>
        
        <v-layout row wrap justify-center align-start v-if="this.buttonChanger">
            <v-card v-for="(record, index) in records" :key="index">
                <v-card-title primary-title>
                    <h2>Activo</h2>
                </v-card-title>
                <v-card-text>
                    <h3>{{record.vehiclenumber}} - {{record.vehicletype}}</h3>
                    <h4>Descripción del vehículo: {{record.vehicledescription}}</h4>
                    <h4>Dueño: {{record.username}}</h4>
                    <h4>Fecha de llegada: {{record.checkindate}}</h4>
                    <h4>Hora de llegada: {{record.checkintime}}</h4>
                    <v-btn color="success" class="mr-2" @click="finishTime(record._id, record.checkindate, record.checkintime, record.vehicletype)">Terminar</v-btn>
                </v-card-text>
            </v-card>
        </v-layout>

        <v-layout row wrap justify-center align-start v-else>
            <v-card v-for="(record, index) in records" :key="index">
                <v-card-text>
                    <h3>{{record.vehiclenumber}} - {{record.vehicletype}}</h3>
                    <h4>Descripción del vehículo: {{record.vehicledescription}}</h4>
                    <h4>Dueño: {{record.username}}</h4>
                    <h4>Fecha de llegada: {{record.checkindate}}</h4>
                    <h4>Hora de llegada: {{record.checkintime}}</h4>
                    <h4>Fecha de salida: {{record.departuredate}}</h4>
                    <h4>Hora de salida: {{record.departuretime}}</h4>
                    <v-btn color="success" class="mr-2" @click="hideRecord(record._id)">Ocultar</v-btn>
                </v-card-text>
            </v-card>
        </v-layout>
    </v-layout>
</template>

<script>

    import axios from 'axios';
    import * as moment from 'moment';
    import 'moment-precise-range-plugin';

    export default{
        data(){
            return{
                buttonChanger: true,
                admin : new Object(),
                records: [],
            }
        },
        mounted() {
            this.admin = JSON.parse(localStorage.getItem('admin'));
            this.getAllRecords();
        },
        methods:{
            getActiveRecords(){

                this.buttonChanger = true;

                axios.get('http://localhost:3000/api/activeRecords')
                .then((res)=>{
                    this.records = res.data.records;
                })
            },
            getAllRecords(){

                this.buttonChanger = false;

                axios.get('http://localhost:3000/api/allRecords')
                .then((res)=>{
                    this.records = res.data.records;
                })
            },
            finishTime(recordId, checkInDate, checkInTime, vehicletype){
                var today = new Date();
                var departuredate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                var departuretime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                const data = {
                    status:false,
                    departuredate: departuredate,
                    departuretime: departuretime
                }
                axios.put(`http://localhost:3000/api/userExit/${recordId}`, data)
                .then((res)=>{
                    console.log(res.data.record)
                })
                
                this.getFinalPrice(checkInDate, checkInTime, departuredate, departuretime, vehicletype);
            },
            getFinalPrice(checkInDate, checkInTime, departuredate, departuretime, vehicletype){

                var separatedCheckInDate = checkInDate.split("-");
                var separatedCheckInTime = checkInTime.split(":");

                var separatedDepartureDate = departuredate.split("-");
                var separatedDepartureTime = departuretime.split(":");

                var datesAndTimes={
                    checkInYear: separatedCheckInDate[0],
                    checkInMonth: separatedCheckInDate[1],
                    checkInDay: separatedCheckInDate[2].slice(0,2),
                    checkInHour: separatedCheckInTime[0],
                    checkInMinute: separatedCheckInTime[1],
                    checkInSecond: separatedCheckInTime[2],
                    departureYear: separatedDepartureDate[0],
                    departureMonth: separatedDepartureDate[1],
                    departureDay: separatedDepartureDate[2],
                    departureHour: separatedDepartureTime[0],
                    departureMinute: separatedDepartureTime[1],
                    departureSecond: separatedDepartureTime[2],
                }


                var entryMoment = moment(`${datesAndTimes.checkInYear}-${datesAndTimes.checkInMonth}-${datesAndTimes.checkInDay} ${datesAndTimes.checkInHour}:${datesAndTimes.checkInMinute}:${datesAndTimes.checkInSecond}`);
                var departureMoment =  moment(`${datesAndTimes.departureYear}-${datesAndTimes.departureMonth}-${datesAndTimes.departureDay} ${datesAndTimes.departureHour}:${datesAndTimes.departureMinute}:${datesAndTimes.departureSecond}`);

                var diff = moment.preciseDiff(entryMoment,departureMoment,true);

                var userTime = {
                    totalYears: parseInt(diff.years),
                    totalMonths: parseInt(diff.months),
                    totalDays: parseInt(diff.days),
                    totalHours: parseInt(diff.hours),
                    totalMinutes: parseInt(diff.minutes),
                    totalSeconds: parseInt(diff.seconds)
                }

                console.log(`${userTime.totalYears}-${userTime.totalMonths}-${userTime.totalDays} ${userTime.totalHours}:${userTime.totalMinutes}:${userTime.totalSeconds}`)
                
                var totalCost;
                switch(vehicletype){
                    case "Bicicleta":
                        totalCost = (userTime.totalYears*(31536000 * 0.10)) + (userTime.totalMonths*(2628000 * 0.10)) + (userTime.totalDays*(86400 * 0.10)) + (userTime.totalHours*(3600 * 0.10)) + (userTime.totalMinutes*(60 * 0.10)) + (userTime.totalSeconds*0.10);
                        break;
                    case "Moto":
                        totalCost = (userTime.totalYears*(31536000 * 0.20)) + (userTime.totalMonths*(2628000 * 0.20)) + (userTime.totalDays*(86400 * 0.20)) + (userTime.totalHours*(3600 * 0.20)) + (userTime.totalMinutes*(60 * 0.20)) + (userTime.totalSeconds*0.20);
                        break;
                    case "Carro":
                        totalCost = (userTime.totalYears*(31536000 * 0.40)) + (userTime.totalMonths*(2628000 * 0.40)) + (userTime.totalDays*(86400* 0.40)) + (userTime.totalHours*(3600 * 0.40)) + (userTime.totalMinutes*(60 * 0.40)) + (userTime.totalSeconds * 0.40);
                        break;
                }

                alert(`El usuario debe pagar: $${totalCost} pesos`);

                this.getAllRecords();
            },
            hideRecord(recordId){

                var data = {
                    hide: true
                }

                axios.put(`http://localhost:3000/api/hideRecord/${recordId}`, data)
                .then((res) => {
                    console.log(res.data.record);
                })

                this.getActiveRecords();
            },
            logOut(){
                this.$router.push('/');
            },
            createRecord(){
                this.$router.push('/createRecord');
            }
        }
    }
</script>

<style scoped>
    .main{
        min-height: 100%;
    }
</style>