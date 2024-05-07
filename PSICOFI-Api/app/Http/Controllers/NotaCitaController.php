<?php

namespace App\Http\Controllers;

use App\Models\NotaCita;
use Illuminate\Http\Request;

class NotaCitaController extends Controller
{
    public function store(Request $request)
    {
        // Validación de datos
        $validatedData = $request->validate([
            'tipoIntervencion' => 'required',
            'notas' => 'required',
            // Agrega otras reglas de validación según sea necesario
        ]);

        // Crear una nueva instancia del modelo NotaCita y asignar los valores
        $notaCita = new NotaCita();
        $notaCita->tipoIntervencion = $request->input('tipoIntervencion');
        $notaCita->notas = $request->input('notas');
        $notaCita->departamento = $request->input('departamento');
        $notaCita->detalleCanalizacion = $request->input('detalleCanalizacion');
        $notaCita->idCita = $request->input('idCita');
        // Asigna otros campos según sea necesario

        // Guardar la nota de cita en la base de datos
        $notaCita->save();

        // Retorna una respuesta adecuada (puedes personalizarla según tus necesidades)
        return response()->json(['message' => 'Nota de cita creada correctamente'], 201);
    }
}
