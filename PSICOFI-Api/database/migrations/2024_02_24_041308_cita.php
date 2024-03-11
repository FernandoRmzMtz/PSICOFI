<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('Cita',function(Blueprint $table){
            $table->bigInteger('idCita')->primary();
            $table->dateTime('fechaHora');
            $table->bigInteger('claveUnica');
            $table->integer('estadoCita');
            $table->bigInteger('clavePsicologo');
            $table->string('clavePsicologoExterno',18);

            // Foreign keys
            $table->foreign('estadoCita')->references('idEstadoCita')->on('EstadoCita');
            $table->foreign('clavePsicologo')->references('claveUnica')->on('Psicologo');
            $table->foreign('clavePsicologoExterno')->references('CURP')->on('PsicologoExterno');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('Cita', function (Blueprint $table) {
            $table->dropForeign(['estadoCita']);
            $table->dropForeign(['clavePsicologo']);
            $table->dropForeign(['clavePsicologoExterno']);
        });
        Schema::dropIfExists('Cita');
    }
};
