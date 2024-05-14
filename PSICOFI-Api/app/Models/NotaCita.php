<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotaCita extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'NotaCita'; // Nombre de la tabla en la base de datos

    protected $primaryKey = 'idNotaCita'; // Nombre de la clave primaria en la tabla

    protected $fillable = [ // Lista de campos que pueden ser asignados masivamente (mediante el método create, por ejemplo)
        'tipoIntervencion',
        'notas',
        'departamento',
        'detalleCanalizacion',
        'idCita',
        // Agrega otros campos según sea necesario
    ];
}
