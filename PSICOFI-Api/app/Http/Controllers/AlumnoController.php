<?php

namespace App\Http\Controllers;

use App\Models\Alumno;
use Illuminate\Http\Request;

class AlumnoController extends Controller
{
    //
    public function obtenerAlumno($claveUnica) {
        $alumno = Alumno::where('claveUnica', $claveUnica)->first();
        return response()->json($alumno);
    }
}
