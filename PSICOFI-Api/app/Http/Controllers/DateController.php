<?php

namespace App\Http\Controllers;

use App\Models\Cita;
use Illuminate\Http\Request;
use App\Models\PsicologoExterno;
use App\Models\Psicologo;
use Carbon\Carbon;
use App\Mail\confirmDateMail;
use App\Mail\cancelMail;
use App\Mail\cancelMailPsicologo;
use App\Mail\scheduleDateMail;
use App\Models\Alumno;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use App\Jobs\SendEmail;

class DateController extends Controller
{
    public function getAllDates(Request $request){
        $id = $request->input('id',null);

        try{
            if(strlen($id) == 18){
                $citas = DB::select('SELECT idCita, idPsicologo AS clavePsicologoExterno,
                                                hora,fecha,estado,claveUnica
                                        FROM view_citas 
                                        WHERE idPsicologo = ?', [$id]);
            }else if(strlen($id) == 6){
                $citas = DB::select('SELECT idCita, idPsicologo AS clavePsicologo,
                                                hora,fecha,estado,claveUnica
                                        FROM view_citas 
                                        WHERE idPsicologo = ?', [$id]);
            } else {
                return response()->json(['error' => 'ID inválido'], 400);
            }
            $citas = collect($citas);
            if($citas->isNotEmpty()){
                return json_encode($citas);
            }
        }catch(\Exception $e){
            return $e;
        }
    }

    public function getDates(Request $request){
        $id = $request->input('id',null);
        //Validación de que $id tenga un valor
        if($id != null){

            $citas = DB::select('SELECT * FROM view_citas WHERE idPsicologo = ? AND estado = ?', [$id,"libre"]);

            if(!empty($citas)){
                $citasPsicologo = collect($citas);

                if($citasPsicologo->isNotEmpty()){
                    return response()->json($citasPsicologo,200);
                }else{
                    return response()->json(['error' => 'ID inválido'], 400);
                }
            }else{
                // return response([]);
                return response()->json(['error' => 'No se encontraron citas disponibles'], 404);
            }
        }
        else{
            return response()->json(['error' => 'ID no proporcionado, valor nulo encontrado'], 400);
        }
    }

    public function generateDates(){
        $psicologos_externos = PsicologoExterno::pluck('curp');
        $psicologos = Psicologo::pluck('claveUnica');

        $fechas = array();
        $fechaActual = Carbon::now();

        for ($i = 0; count($fechas) < 5; $i++) {
            if ($fechaActual->dayOfWeek != Carbon::SATURDAY && $fechaActual->dayOfWeek != Carbon::SUNDAY) {
                $fechas[] = $fechaActual->toDateString();
            }

            $fechaActual->addDay();
        }

        try{
            foreach ($psicologos_externos as $curp) {
                foreach ($fechas as $fecha) {
                    $horaInicio = Carbon::createFromTime(9, 0, 0);
                    $horaFin = Carbon::createFromTime(14, 0, 0);
    
                    while ($horaInicio < $horaFin) {
                        $cita = new Cita;
    
                        $cita->fecha = $fecha; 
                        $cita->hora = $horaInicio->toTimeString();
                        $cita->estadoCita = 7;
                        $cita->clavePsicologo = null;
                        $cita->clavePsicologoExterno = $curp;
                        
                        $cita->save();
    
                        $horaInicio->addHour();
                    }
                }
            }
    
            foreach ($psicologos as $claveUnica) {
                foreach ($fechas as $fecha) {
                    $horaInicio = Carbon::createFromTime(9, 0, 0);
                    $horaFin = Carbon::createFromTime(14, 0, 0);
    
                    while ($horaInicio < $horaFin) {
                        $cita = new Cita;
    
                        $cita->fecha = $fecha; 
                        $cita->hora = $horaInicio->toTimeString();
                        $cita->estadoCita = 7;
                        $cita->clavePsicologo = $claveUnica;
                        $cita->clavePsicologoExterno = null;
                        
                        $cita->save();
    
                        $horaInicio->addHour();
                    }
                }
            }

            return true;
        }catch(\Exception $e){
            return $e;
        }
    }

    public function scheduleDate(Request $request){
        $id = $request->input('id');
        $claveUnica = $request->input('claveUnica');
        $fecha = $request->input('fecha');
        $hora = $request->input('hora');

        $details = [
            'email' => $_ENV['DESTINATARIO_CORREO'],
            'fecha' => $fecha,
            'hora' => $hora
        ];

        $AlumnoController = app(\App\Http\Controllers\AlumnoController::class);

        $data = ['id' => $claveUnica];
        $request = new Request($data);
        $alumno = $AlumnoController->getAlumno($request);

        $alumno = json_decode($alumno, true);
        
        if (!isset($alumno['Error'])) {
            $res = true;
        }else if (isset($alumno['Error'])){
            $res = $AlumnoController->addAlumno($claveUnica);
        }

        if($res == true){
            $alumno = Alumno::where('claveUnica', $claveUnica)
                ->selectRaw("CONCAT(nombres, ' ', apellidoPaterno, ' ', apellidoMaterno) AS nombreCompleto")
                ->first();
            
            $details['name'] = $alumno->nombreCompleto;

            try {
                if($claveUnica == null || $id == null || $hora == null || $fecha == null){
                    $respuesta = ['Error' => 'Consulta invalida'];
                    return json_encode($respuesta);
                }else if(strlen($id) == 6){
                    $cita = Cita::where('clavePsicologo', $id)
                    ->where('fecha', $fecha)
                    ->where('hora', $hora)
                    ->where('estadoCita', 7)
                    ->update([
                        'claveUnica' => $claveUnica,
                        'estadoCita' => 2
                    ]);
        
                    if($cita > 0) {
                        $psicologo = Psicologo::where('claveUnica', $id)
                            ->selectRaw("CONCAT(nombres, ' ', apellidoPaterno, ' ', apellidoMaterno) AS nombreCompleto")
                            ->first();

                        $details['psicologo'] = $psicologo->nombreCompleto;

                        
                        SendEmail::dispatch($details['email'],new scheduleDateMail($details));

                        $respuesta = ['Cita agendada correctamente'];
                        return json_encode($respuesta);
                    } else {
                        $respuesta = ['Cita NO agendada'];
                        return json_encode($respuesta);
                    }
                }else if(strlen($id) == 18){
                    $cita = Cita::where('clavePsicologoExterno', $id)
                    ->where('fecha', $fecha)
                    ->where('hora', $hora)
                    ->where('estadoCita', 7)
                    ->update([
                        'claveUnica' => $claveUnica,
                        'estadoCita' => 2
                    ]);
        
                    if($cita > 0) {
                        $psicologo = PsicologoExterno::where('CURP', $id)
                            ->selectRaw("CONCAT(nombres, ' ', apellidoPaterno, ' ', apellidoMaterno) AS nombreCompleto")
                            ->first();

                        $details['psicologo'] = $psicologo->nombreCompleto;

                        SendEmail::dispatch($details['email'],new scheduleDateMail($details));

                        $respuesta = ['Cita agendada correctamente'];
                        return json_encode($respuesta);
                    } else {
                        $respuesta = ['Cita NO agendada'];
                        return json_encode($respuesta); 
                    }
                }else {
                    $respuesta = ['Error' => 'ID incorrecto'];
                    return json_encode($respuesta);
                }
            }catch (\Exception $e){
                $respuesta = ['Error' => 'Ocurrio un error'];
                return json_encode($e); 
            }
        }else{
            $respuesta = ['Error' => 'Alumno invalido'];
            return json_encode($respuesta); 
        }
    }

    public function createDates(Request $request){
        $id = $request->input('id',null);
        $fecha = $request->input('fecha',null);
        $horas = $request->input('horas', []);

        try{
            if(strlen($id) == 18){
                if($fecha != null && $horas != null){
                    try{
                        foreach($horas as $hora){
                            // Comprobación para verificar que la cita no existe
                            $citaExistente = Cita::where('fecha', date('Y-m-d', strtotime($fecha)))
                            ->where('hora', $hora)
                            ->where('clavePsicologoExterno', $id)
                            ->exists();
                            
                            if(!$citaExistente){
                                $cita = new Cita;

                                $cita->fecha = date('Y-m-d', strtotime($fecha));
                                $cita->hora = $hora;
                                $cita->estadoCita = 7;
                                $cita->clavePsicologo = null;
                                $cita->clavePsicologoExterno = $id;

                                $cita->save();
                            }
                        }

                        $respuesta = ['Citas creadas correctamente'];
                        return json_encode($respuesta);
                    }catch(\Exception $e){
                        $respuesta = ['Error' => 'Citas NO creadas'];
                        return json_encode($respuesta);
                    }
                }
            }else if(strlen($id) == 6){
                if($fecha != null && $horas != null){
                    try{
                        foreach($horas as $hora){
                            // Comprobación para verificar que la cita no existe
                            $citaExistente = Cita::where('fecha', date('Y-m-d', strtotime($fecha)))
                            ->where('hora', $hora)
                            ->where('clavePsicologo', $id)
                            ->exists();
                            
                            if(!$citaExistente){
                                $cita = new Cita;

                                $cita->fecha = date('Y-m-d', strtotime($fecha));
                                $cita->hora = $hora;
                                $cita->estadoCita = 7;
                                $cita->clavePsicologo = $id;
                                $cita->clavePsicologoExterno = null;

                                $cita->save();
                            }
                        }
                        $respuesta = ['Citas creadas correctamente'];
                        return json_encode($respuesta);
                    }catch(\Exception $e){
                        $respuesta = ['Error' => 'Citas NO creadas'];
                        return json_encode($respuesta);
                    }
                }
            }else if(strlen($id) != 18 && strlen($id) != 6){
                $respuesta = ['Error' => 'ID incorrecto'];
                return json_encode($respuesta);
            }
        }catch(\Exception $e){
            $respuesta = ['Error' => 'Citas NO creadas'];
            return json_encode($respuesta);
        }
    }

    public function deleteDate($idCita){
    // public function deleteDate(Request $request){
        // $idCita = $request->input('idCita', null);
        // dd($request);
    
        $citaInfo = Cita::where('idCita', $idCita)
            ->select('fecha','hora','clavePsicologoExterno','clavePsicologo','claveUnica')
            ->first();
    
        if (!$citaInfo) {
            return response()->json(['error' => 'No se encontró la cita con el ID proporcionado ('+$idCita+')'], 404);
        }

        // Eliminar la cita de la base de datos
        try {
            Cita::where('idCita', $idCita)->delete();
        return response()->json(['message' => 'Cita eliminada correctamente'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al eliminar la cita'], 500);
        }
    }
    

    public function cancelDate(Request $request){
        $id = $request->input('id',null);
        $idCita = $request->input('idCita', null);

        if(strlen($id) == 18 || strlen($id) == 6){
            $citaInfo = DB::select('SELECT * FROM view_citas WHERE idCita = ?', [$idCita]);

            $cita = collect($citaInfo);

            if($cita->isNotEmpty()){

                $alumno = DB::select('call get_info_alumno(?)',[$cita[0]->claveUnica]);

                $alumno = collect($alumno);

                // Datos del correo electronico
                $details = [
                    'email' => $_ENV['DESTINATARIO_CORREO'],
                    'hora' => $cita[0]->hora,
                    'fecha' => $cita[0]->fecha,
                    'name' => $alumno[0]->nombres . ' ' . $alumno[0]->apellidoPaterno . ' ' . $alumno[0]->apellidoMaterno,
                    'psicologo' => $cita[0]->{'Nombres psicologo'} . ' ' . $cita[0]->{'Apellido Pat psicologo'} . ' ' . $cita[0]->{'Apellido Mat psicologo'}
                ];

                $cancel = DB::select('SELECT cancelar_cita(?) AS resultado',[$idCita]);

                if($cancel[0]->resultado == 1){
                    if($alumno->isNotEmpty() && $alumno[0]->claveUnica == $id){
                        // Envío de correo en segundo plano
                        SendEmail::dispatch($details['email'],new cancelMail($details));
                        $respuesta = ['Cita cancelada correctamente'];
                        return json_encode($respuesta);
                    }else if($cita[0]->isPsicologo = $id) {
                        // Envío de correo en segundo plano
                        SendEmail::dispatch($details['email'],new cancelMailPsicologo($details));
                        $respuesta = ['Cita cancelada correctamente'];
                        return json_encode($respuesta);
                    }else{
                        $respuesta = ['Error' => 'ID incorrecto'];
                        return json_encode($respuesta);
                    }
                }else{
                    $respuesta = ['Error' => 'Cita NO cancelada'];
                    return json_encode($respuesta);
                }
            }else{
                $respuesta = ['Sin cita agendada'];
                return json_encode($respuesta);
            }
        }else{
            $respuesta = ['Error' => 'Cita NO cancelada'];
            return json_encode($respuesta);
        }
    }

    public function confirmDate(Request $request){
        $id = $request->input('id',null);
        $idCita = $request->input('idCita', null);

        if(strlen($id) == 18 || strlen($id) == 6){
            $citaInfo = DB::select('SELECT * FROM view_citas WHERE idCita = ?', [$idCita]);

            $cita = collect($citaInfo);

            if($cita->isNotEmpty()){

                $alumno = DB::select('call get_info_alumno(?)',[$cita[0]->claveUnica]);

                $alumno = collect($alumno);

                // Datos del correo electronico
                $details = [
                    'email' => $_ENV['DESTINATARIO_CORREO'],
                    'hora' => $cita[0]->hora,
                    'fecha' => $cita[0]->fecha,
                    'name' => $alumno[0]->nombres . ' ' . $alumno[0]->apellidoPaterno . ' ' . $alumno[0]->apellidoMaterno,
                    'psicologo' => $cita[0]->{'Nombres psicologo'} . ' ' . $cita[0]->{'Apellido Pat psicologo'} . ' ' . $cita[0]->{'Apellido Mat psicologo'}
                ];

                $confirm = DB::select('SELECT confirmar_cita(?) AS resultado',[$idCita]);

                if($confirm[0]->resultado == 1){
                    if($alumno->isNotEmpty() && $alumno[0]->claveUnica == $id){
                        // Envío de correo en segundo plano
                        SendEmail::dispatch($details['email'],new confirmDateMail($details));
                        $respuesta = ['Cita confirmada correctamente'];
                        return json_encode($respuesta);
                    }else{
                        $respuesta = ['Error' => 'ID incorrecto'];
                        return json_encode($respuesta);
                    }
                }else{
                    $respuesta = ['Error' => 'Cita NO confirmada'];
                    return json_encode($respuesta);
                }
            }else{
                $respuesta = ['Sin cita agendada'];
                return json_encode($respuesta);
            }
        }else{
            $respuesta = ['Error' => 'Cita NO confirmada'];
            return json_encode($respuesta);
        }
    }
}
