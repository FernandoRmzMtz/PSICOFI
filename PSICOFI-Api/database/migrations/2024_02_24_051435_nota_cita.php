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
        Schema::create('NotaCita',function(Blueprint $table){
            $table->id('idNotaCita');
            $table->unsignedBigInteger('tipoIntevencion');
            $table->text('notas');
            $table->bigInteger('idCita');

            // Foreign keys
            $table->foreign('tipoIntevencion')->references('idTipoIntervencion')->on('TipoIntervencion');
            $table->foreign('idCita')->references('idCita')->on('Cita');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('NotaCita', function (Blueprint $table) {
            $table->dropForeign(['tipoIntevencion']);
            $table->dropForeign(['idCita']);
        });
        Schema::dropIfExists('NotaCita');
    }
};
