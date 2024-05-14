<?php

namespace App\Http\Controllers;

use App\Models\Cita;
use Illuminate\Http\Request;
use App\Models\PsicologoExterno;
use App\Models\Psicologo;
use Carbon\Carbon;

class DateController extends Controller
{
    public function getDates(Request $request){
        $id = $request->input('id',null);

        try{
            if(strlen($id) == 18){
                $citas = Cita::where('clavePsicologoExterno', $id)
                ->join('estadocita', 'cita.estadoCita', '=', 'estadocita.idEstadoCita')
                ->where('cita.clavePsicologoExterno', $id)
                ->select('cita.clavePsicologoExterno',
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
                ->select('cita.clavePsicologo',
                        'cita.hora',
                        'cita.fecha',
                        'estadocita.estado AS estado',
                        'cita.claveUnica',
                )
                ->get();
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
        $id = $request->input('id',null);
        $claveUnica = $request->input('claveUnica');
        $fecha = $request->input('fecha');
        $hora = $request->input('hora');

        try {
            if($claveUnica == null || $id == null || $hora == null || $fecha == null){
                return 0;
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
                    return true;
                } else {
                    return 0; 
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
                    return true; 
                } else {
                    return 0;
                }
            }
        }catch (\Exception $e){
            return $e;
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
}
