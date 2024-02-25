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
        Schema::create('PsicologoExterno',function(Blueprint $table){
            $table->string('CURP',18)->primary();
            $table->string('nombres',60);
            $table->string('apellidoPaterno',60);
            $table->string('apellidoMaterno',60);
            $table->string('Carrera');
            $table->string('semestre');
            $table->boolean('activo');
            $table->string('contrasena',20);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('PsicologoExterno');
    }
};
