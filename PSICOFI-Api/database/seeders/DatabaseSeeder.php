<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;
use App\Models\Curso;
use App\Models\Alumno;
use App\Models\EstadoCita;
use App\Models\PsicologoExterno;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Alumno::factory(10)->create();
        PsicologoExterno::factory(6)->create();
        EstadoCita::factory(3)->create();
    }
}
