<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Administrador;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Alumno>
 */
class AdministradorFactory extends Factory
{

    protected $model = Administrador::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'idUsuario' => $this->faker->randomNumber(6,true),
            'nombres' => $this->faker->name(), 
            'apellidoPaterno' => $this->faker->lastName(), 
            'apellidoMaterno' => $this->faker->lastName(),
            'correo' => $this->faker->email(),
            'telefono' => $this->faker->phoneNumber(),
            'contrasena' => "12345",
        ];
    }
}
