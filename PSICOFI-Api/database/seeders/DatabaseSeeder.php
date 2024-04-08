<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;
use App\Models\Curso;
use App\Models\Alumno;
use App\Models\CarrerasPsico;
use App\Models\EstadoCita;
use App\Models\Psicologo;
use App\Models\PsicologoExterno;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Alumno::factory(10)->create();
        PsicologoExterno::factory(3)->create();
        CarrerasPsico::create(['carrera' => 'Licenciatura en psicopedagogia']);
        CarrerasPsico::create(['carrera' => 'Licenciatura en psicologia']);
        EstadoCita::create(['estado' => 'Asistencia confirmada']);
        EstadoCita::create(['estado' => 'Asistencia sin confirmar']);
        EstadoCita::create(['estado' => 'En atención']);
        EstadoCita::create(['estado' => 'Atendida']);
        EstadoCita::create(['estado' => 'No atendida']);
        EstadoCita::create(['estado' => 'Cancelada']);
        EstadoCita::create(['estado' => 'Libre']);
        Psicologo::factory(3)->create();
    }
}
