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

class DateController extends Controller
{
    public function getAllDates(Request $request){
        $id = $request->input('id',null);

        try{
            if(strlen($id) == 18){
                $citas = Cita::where('clavePsicologoExterno', $id)
                ->join('estadocita', 'cita.estadoCita', '=', 'estadocita.idEstadoCita')
                ->where('cita.clavePsicologoExterno', $id)
                ->select('idCita',
                        'cita.clavePsicologoExterno',
                        'cita.hora',
                        'cita.fecha',
                        'estadocita.estado AS estado',
                        'cita.claveUnica',
                )
                ->get();
            }else if(strlen($id) == 6){
                $citas = Cita::where('clavePsicologo', $id)
                ->join('estadocita', 'cita.estadoCita', '=', 'estadocita.idEstadoCita')
                ->where('cita.clavePsicologo', $id)
                ->select('idCita',
                        'cita.clavePsicologo',
                        'cita.hora',
                        'cita.fecha',
                        'estadocita.estado AS estado',
                        'cita.claveUnica',
                )
                ->get();
            } else {
                return response()->json(['error' => 'ID inválido'], 400);
            }
            return json_encode($citas);
        }catch(\Exception $e){
            return $e;
        }
    }

    public function getDates(Request $request){
        $id = $request->input('id',null);

        try{
            if(strlen($id) == 18){
                $citas = Cita::where('clavePsicologoExterno', $id)
                ->join('estadocita', 'cita.estadoCita', '=', 'estadocita.idEstadoCita')
                ->where('cita.clavePsicologoExterno', $id)
                ->where('cita.estadoCita', 7)
                ->select('idCita',
                        'cita.clavePsicologoExterno',
                        'cita.hora',
                        'cita.fecha',
                        'estadocita.estado AS estado',
                        'cita.claveUnica',
                )
                ->get();
            }else if(strlen($id) == 6){
                $citas = Cita::where('clavePsicologo', $id)
                ->join('estadocita', 'cita.estadoCita', '=', 'estadocita.idEstadoCita')
                ->where('cita.clavePsicologo', $id)
                ->where('cita.estadoCita', 7)
                ->select('idCita',
                        'cita.clavePsicologo',
                        'cita.hora',
                        'cita.fecha',
                        'estadocita.estado AS estado',
                        'cita.claveUnica',
                )
                ->get();
            } else {
                return response()->json(['error' => 'ID inválido'], 400);
            }
            return json_encode($citas);
        }catch(\Exception $e){
            return $e;
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

                        Mail::to($details['email'])->send(new scheduleDateMail($details));

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

                        Mail::to($details['email'])->send(new scheduleDateMail($details));

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

    public function cancelDate(Request $request){
        $id = $request->input('id',null);
        $idCita = $request->input('idCita', null);

        $citaInfo = Cita::where('idCita', $idCita)
            ->select('fecha','hora','clavePsicologoExterno','clavePsicologo','claveUnica')
            ->first();

        if($citaInfo->clavePsicologo == null){
            $psicologo = PsicologoExterno::where('CURP', $citaInfo->clavePsicologoExterno)
                ->selectRaw("CONCAT(nombres, ' ', apellidoPaterno, ' ', apellidoMaterno) AS nombreCompleto")
                ->first();
        }else if($citaInfo->clavePsicologoExterno == null){
            $psicologo = Psicologo::where('claveUnica', $citaInfo->clavePsicologo)
                ->selectRaw("CONCAT(nombres, ' ', apellidoPaterno, ' ', apellidoMaterno) AS nombreCompleto")
                ->first();
        }
        
        $alumno = Alumno::where('claveUnica', $citaInfo->claveUnica)
                    ->selectRaw("CONCAT(nombres, ' ', apellidoPaterno, ' ', apellidoMaterno) AS nombreCompleto")
                    ->first();

        $details = [
            'email' => $_ENV['DESTINATARIO_CORREO'],
            'hora' => $citaInfo->hora,
            'fecha' => $citaInfo->fecha,
            'name' => $alumno->nombreCompleto,
            'psicologo' => $psicologo->nombreCompleto
        ];

        try{
            if(strlen($id) == 18){
                $cita = Cita::where('idCita', $idCita)
                ->where('clavePsicologoExterno', $id)
                ->value('estadoCita');

                if($cita == 2){
                    $confirm = Cita::where('idCita', $idCita)
                    ->update(['estadoCita' => '6']);

                    if($confirm > 0){
                        Mail::to($details['email'])->send(new cancelMailPsicologo($details));
                        $respuesta = ['Cita cancelada correctamente'];
                        return json_encode($respuesta);
                    }
                }else{
                    $respuesta = ['Error' => 'Cita NO cancelada'];
                    return json_encode($respuesta);
                }
            }else if(strlen($id) == 6){
                $cita = Cita::where('idCita', $idCita)
                    ->where('clavePsicologo', $id)
                    ->value('estadoCita');

                if($cita == 2){
                    $confirm = Cita::where('idCita', $idCita)
                    ->where('clavePsicologo', $id)
                    ->update(['estadoCita' => '6']);

                    if($confirm > 0){
                        Mail::to($details['email'])->send(new cancelMailPsicologo($details));
                        $respuesta = ['Cita cancelada correctamente'];
                        return json_encode($respuesta);
                    }else{
                        $respuesta = ['Error' => 'Cita NO cancelada'];
                        return json_encode($respuesta);
                    }
                }else{
                    $cita = Cita::where('idCita', $idCita)
                    ->where('claveUnica', $id)
                    ->value('estadoCita');

                    if($cita == 2){
                        $confirm = Cita::where('idCita', $idCita)
                        ->where('claveUnica', $id)
                        ->update(['estadoCita' => '7',
                                'claveUnica' => null]);

                        if($confirm > 0){
                            Mail::to($details['email'])->send(new cancelMail($details));
                            $respuesta = ['Cita cancelada correctamente'];
                            return json_encode($respuesta);
                        }else{
                            $respuesta = ['Error' => 'Cita NO cancelada'];
                            return json_encode($respuesta);
                        }
                    }else{
                        $respuesta = ['Error' => 'Cita NO cancelada'];
                        return json_encode($respuesta);
                    }
                }
            }else if(strlen($id) != 18 && strlen($id) != 6){
                $respuesta = ['Error' => 'ID incorrecto'];
                return json_encode($respuesta);
            }
        }catch(\Exception $e){
            $respuesta = ['Error' => 'Cita NO cancelada'];
            return json_encode($respuesta);
        }
    }

    public function confirmDate(Request $request){
        $id = $request->input('id',null);
        $idCita = $request->input('idCita', null);

        $citaInfo = Cita::where('idCita', $idCita)
            ->select('fecha','hora','clavePsicologoExterno','clavePsicologo','claveUnica')
            ->first();

        if($citaInfo->clavePsicologo == null){
            $psicologo = PsicologoExterno::where('CURP', $citaInfo->clavePsicologoExterno)
                ->selectRaw("CONCAT(nombres, ' ', apellidoPaterno, ' ', apellidoMaterno) AS nombreCompleto")
                ->first();
        }else if($citaInfo->clavePsicologoExterno == null){
            $psicologo = Psicologo::where('claveUnica', $citaInfo->clavePsicologo)
                ->selectRaw("CONCAT(nombres, ' ', apellidoPaterno, ' ', apellidoMaterno) AS nombreCompleto")
                ->first();
        }
        
        $alumno = Alumno::where('claveUnica', $citaInfo->claveUnica)
                    ->selectRaw("CONCAT(nombres, ' ', apellidoPaterno, ' ', apellidoMaterno) AS nombreCompleto")
                    ->first();

        $details = [
            'email' => $_ENV['DESTINATARIO_CORREO'],
            'hora' => $citaInfo->hora,
            'fecha' => $citaInfo->fecha,
            'name' => $alumno->nombreCompleto,
            'psicologo' => $psicologo->nombreCompleto
        ];

        try{
            if(strlen($id) == 6){
                $cita = Cita::where('idCita', $idCita)
                ->where('claveUnica', $id)
                ->value('estadoCita');

                if($cita == 2){
                    $confirm = Cita::where('idCita', $idCita)
                    ->where('claveUnica', $id)
                    ->update(['estadoCita' => '1']);

                    if($confirm > 0){
                        Mail::to($details['email'])->send(new confirmDateMail($details));
                        $respuesta = ['Cita confirmada correctamente'];
                        return json_encode($respuesta);
                    }
                }else{
                    $respuesta = ['Error' => 'Cita NO confirmada'];
                    return json_encode($respuesta);
                }
            }
        }catch(\Exception $e){
            $respuesta = ['Error' => 'Cita NO confirmada'];
            return json_encode($respuesta);
        }
    }
}
