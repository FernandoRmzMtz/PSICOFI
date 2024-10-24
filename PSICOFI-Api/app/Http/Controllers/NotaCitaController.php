<?php

namespace App\Http\Controllers;

use App\Models\Cita;
use Illuminate\Http\Request;
use App\Models\NotaCita;

class NotaCitaController extends Controller
{
    public function getCita($idCita){
        $cita = Cita::where('idCita', $idCita)->first();
        return $cita;
    }
    public function getNotaCita($idCita){
        $notaCita = NotaCita::where('idCita', $idCita)->first();
        return $notaCita;
    }

    public function getReporteCita($idCita)
    {
        $cita = Cita::where('idCita', $idCita)->first();
        if ($cita) {
            $notaCita = NotaCita::where('idCita', $idCita)->first();
            if ($notaCita) {
                return response()->json(['notaCita' => $notaCita]);
            } else {
                $notaCita = new NotaCita();
                $notaCita->tipoIntervencion = 1;
                // $notaCita->notas = "Observaciones:";
                $notaCita->idCita = $idCita;
                $notaCita->save();
                return response()->json(['notaCita' => $notaCita]);
            }
        } else {
            return response()->json(['message' => 'Error, el reporte de la cita que busca no existe.'], 404);
        }
    }

    public function crearCita(Request $request)
    {
        // Crea una nueva cita
        $cita = new Cita();
        $cita->fecha = $request->fecha;
        $cita->hora = $request->hora;
        $cita->estadoCita = $request->estadoCita;
        $cita->claveUnica = $request->claveUnica;
        if($request->clavePsicologo != -1)
            $cita->clavePsicologo = $request->clavePsicologo;
        if($request->clavePsicologoExterno != "-1")
            $cita->clavePsicologoExterno = $request->clavePsicologoExterno;
        // Guarda la cita en la base de datos
        $cita->save();

        // Devuelve la cita creada
        return response()->json(['idCita' => $cita->idCita], 201);
    }

    public function store(Request $request)
    {
        // Crear una nueva instancia del modelo NotaCita y asignar los valores
        $notaCita = new NotaCita();
        $notaCita->tipoIntervencion = $request->tipoIntervencion;
        // $notaCita->notas = $request->notas;
        if($request->departamento){
        // if($request->departamento && $request->detalleCanalizacion){
            $notaCita->departamento = $request->departamento;
            // $notaCita->detalleCanalizacion = $request->detalleCanalizacion;
        }else{
            $notaCita->departamento = null;
            // $notaCita->detalleCanalizacion = "";
        }        
        $notaCita->idCita = $request->idCita;
        $notaCita->foraneo = $request->foraneo;

        // Guardar la nota de cita en la base de datos
        $notaCita->save();

        // Retorna una respuesta adecuada (puedes personalizarla según tus necesidades)
        return response()->json(['message' => 'Nota de cita creada correctamente'], 201);
    }

    public function updateCita(Request $request, $id)
    {
        // Validar los datos entrantes
        $validatedData = $request->validate([
            'tipoIntervencion' => 'required|integer',
            // 'notas' => 'required|string',
            'departamento' => 'nullable|integer',
            // 'detalleCanalizacion' => 'nullable|string',
            'foraneo' => 'nullable|boolean',
        ]);

        try {
            // Encontrar la nota de cita por ID
            $notaCita = NotaCita::where('idCita', $id)->first();
            
            // Actualizar los campos de la nota de cita
            $notaCita->tipoIntervencion = $validatedData['tipoIntervencion'];
            // $notaCita->notas = $validatedData['notas'];
            $notaCita->departamento = $validatedData['departamento'] ?? null;
            // $notaCita->detalleCanalizacion = $validatedData['detalleCanalizacion'] ?? null;
            $notaCita->foraneo = $validatedData['foraneo'] ?? null;

            // Guardar los cambios
            $notaCita->save();

            // Devolver una respuesta exitosa
            return response()->json(['message' => 'Nota de cita actualizada correctamente.', 'notaCita' => $notaCita], 200);

        } catch (\Exception $e) {
            // Manejar cualquier error que ocurra
            return response()->json(['message' => 'Error al actualizar la nota de cita.', 'error' => $e->getMessage()], 500);
        }
    }
}
