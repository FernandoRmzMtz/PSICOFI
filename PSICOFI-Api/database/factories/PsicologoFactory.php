<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Psicologo;

class PsicologoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'claveUnica' => $this->faker->randomNumber(6,true),
            'nombres' => $this->faker->name(), 
            'apellidoPaterno' => $this->faker->lastName(), 
            'apellidoMaterno' => $this->faker->lastName(),
            'idCarrera' => $this->faker->numberBetween(1,2),
            'semestre' => $this->faker->numberBetween(1,9),
            'correo' => $this->faker->email(),
            'activo' => $this->faker->boolean(),
            'contrasena' => 12345
        ];
    }
}
