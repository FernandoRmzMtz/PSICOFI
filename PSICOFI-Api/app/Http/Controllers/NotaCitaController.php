<?php

namespace App\Http\Controllers;

use App\Models\Cita;
use App\Models\NotaCita;
use Illuminate\Http\Request;

class NotaCitaController extends Controller
{

    // public function getReporteCita(Request $request){
    //     $cita = Cita::where('idCita', $request->idCita)->first();
    //     $idCita = $cita->idCita;
    //     if($idCita){
    //         $notaCita = NotaCita::where('idCita', $idCita)->first();
    //         if($notaCita){
    //             return response()->json(['notaCita' => $notaCita]);
    //         }else{
    //             $notaCita = new NotaCita();
    //             $notaCita->tipoIntervencion = 1;
    //             $notaCita->notas = "Observaciones:";     
    //             $notaCita->idCita = $idCita;
    //             $notaCita->save();
    //             return response()->json(['notaCita' => $notaCita]);
    //         }
    //     }
    //     else{
    //         return response()->json(['message' => 'Error, el reporte de la cita que busca no existe.'], 404);
    //     }
    // }

    public function getCita($idCita){
        // dd($idCita);
        $cita = Cita::where('idCita', $idCita)->first();
        return $cita;
        // return response()->json(['cita' => $cita]);
    }
    public function getNotaCita($idCita){
        // dd($idCita);
        $notaCita = NotaCita::where('idCita', $idCita)->first();
        return $notaCita;
        // return response()->json(['cita' => $cita]);
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
                $notaCita->notas = "Observaciones:";
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
        return response()->json(['idCita' => $cita->id], 201);
    }

    public function store(Request $request)
    {
        // Crear una nueva instancia del modelo NotaCita y asignar los valores
        $notaCita = new NotaCita();
        $notaCita->tipoIntervencion = $request->tipoIntervencion;
        $notaCita->notas = $request->notas;
        if($request->departamento){
            $notaCita->departamento = $request->departamento;
            $notaCita->detalleCanalizacion = $request->detalleCanalizacion;
        }else{
            $notaCita->departamento = "";
            $notaCita->detalleCanalizacion = "";
        }        
        $notaCita->idCita = $request->idCita;
        $notaCita->foraneo = $request->foraneo;

        // Guardar la nota de cita en la base de datos
        $notaCita->save();

        // Retorna una respuesta adecuada (puedes personalizarla según tus necesidades)
        return response()->json(['message' => 'Nota de cita creada correctamente'], 201);
    }
}
