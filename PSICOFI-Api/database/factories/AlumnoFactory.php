<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Alumno;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Alumno>
 */
class AlumnoFactory extends Factory
{

    protected $model = Alumno::class;
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
            'edad' => $this->faker->numberBetween(0,90), 
            'sexo' => $this->faker->randomElement(['F','M']), 
            'area' => $this->faker->randomElement(["Agroindustrial",
                                                "Ciencias de la computación",
                                                "Ciencias de la Tierra",
                                                "Civil",
                                                "Formación humanistica",
                                                "Mécanica y eléctrica"]),
            'carrera' => $this->faker->randomElement(["Ing. en computación",
                                                "Ing. en sistemas inteligentes",
                                                "Ing. Agroindustrial",
                                                "Ing. Ambiental",
                                                "Ing. en geología",
                                                "Ing. Civil",
                                                "Ing. en geoinformatica",
                                                "Ing. en topografía y construcción",
                                                "Mecanica",
                                                "Mecatronica",
                                                "Mecanica electrica",
                                                "Mecanica administrativa",
                                                "Electricidad y automatización"]),
            'semestre' => $this->faker->numberBetween(1,9),
            'condicionAcademica' => $this->faker->randomElement(["INSCRITO","BAJA"]),
            'creditosAprobados' => $this->faker->numberBetween(0,405),
            'creditosInscritos' => $this->faker->numberBetween(0,50),
            'promedioGral' => $this->faker->randomFloat(2,4,10),
            'asesor' => $this->faker->name(),
            'contrasena' => $this->faker->bothify('###???###???'),
            'habilitado' => $this->faker->boolean()
        ];
    }
}
