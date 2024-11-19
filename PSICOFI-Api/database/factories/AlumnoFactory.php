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
            'area' => $area = $this->faker->randomElement(["Agroindustrial",
                                                "Ciencias de la computación",
                                                "Ciencias de la Tierra",
                                                "Civil",
                                                "Mécanica y eléctrica",
                                                "Metalurgia y materiales"]),
            'carrera' => $this->faker->randomElement((function() use ($area){
                switch($area){
                    case "Agroindustrial":
                        return ["Ing. Agroindustrial"];
                    case "Ciencias de la computación":
                        return ["Ing. en Computación", "Ing. en Sistemas Inteligentes"];
                    case "Ciencias de la Tierra":  
                        return ["Ing. Ambiental","Ing. en Geología"];
                    case "Civil":
                        return ["Ing. Civil", "Ing. en Geoinformatica", "Ing. en Topografía y construcción"];
                    case "Mécanica y eléctrica":
                        return ["Ing. Mecanica", "Ing. Mecatrónica", "Ing. Mecanica electrica", "Ing. Mecanica administrativa", "Electricidad y automatización"];
                    case "Metalurgia y materiales":
                        return ["Ing. Metalúrgica y materiales"];
                    default:
                        return [];
                }
            })()),
            'semestre' => $this->faker->numberBetween(1,9),
            'condicionAcademica' => $this->faker->randomElement(["INSCRITO","BAJA"]),
            'creditosAprobados' => $this->faker->numberBetween(0,405),
            'creditosInscritos' => $this->faker->numberBetween(0,50),
            'promedioGral' => $this->faker->randomFloat(2,4,10),
            'asesor' => $this->faker->name(),
            'contrasena' => 12345,
        ];
    }
}
