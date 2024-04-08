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
        $clavePsicologo = $request->input('clavePsicologo',null);
        $curp = $request->input('curp',null);

        if($curp != null && $clavePsicologo == null){
            $citas = Cita::where('clavePsicologoExterno', $curp)
            ->select('cita.hora',
                    'cita.fecha',
                    'cita.estadoCita',
            )
            ->get();
        }else if($clavePsicologo != null && $curp == null){
            
        }

        

        return json_encode($citas);
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

        return $psicologos_externos;
    }

    public function scheduleDate(Request $request){
        $clavePsicologo = $request->input('clavePsicologo',null);
        $claveUnica = $request->input('claveUnica');
        $curp = $request->input('curp',null);
        $fecha = $request->input('fecha',null);
        $hora = $request->input('hora',null);

        if($claveUnica == null){
            return 0;
        }else if($clavePsicologo == null && $curp == null){
            return 0;
        }else if($clavePsicologo != null && $curp == null){
            $cita = Cita::where('clavePsicologo', $clavePsicologo)
            ->where('fecha', $fecha)
            ->where('hora', $hora)
            ->update([
                'claveUnica' => $claveUnica,
                'estadoCita' => 2
            ]);

            if($cita > 0) {
                return true;
            } else {
                return 0; 
            }
        }else if($clavePsicologo == null && $curp != null){
            $cita = Cita::where('clavePsicologoExterno', $curp)
            ->where('fecha', $fecha)
            ->where('hora', $hora)
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
    }
}
