<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Alumno;
use App\Models\CarrerasPsico;
use App\Models\Psicologo;
use App\Models\PsicologoExterno;

class PsicoController extends Controller
{
    public function searchPsicologo(Request $request){
        $clave = $request->input('clave',null);
        $curp = $request->input('curp',null);

        if($clave == null){
            $psicologo = PsicologoExterno::where('CURP', $curp)
            ->select('psicologoexterno.CURP',
                    'psicologoexterno.nombres',
                    'psicologoexterno.apellidoPaterno',
                    'psicologoexterno.apellidoMaterno',
                    'psicologoexterno.semestre',
                    'psicologoexterno.correo',
                    'psicologoexterno.activo',
                    'psicologoexterno.carrera',
            )
            ->first();
            if($psicologo == null){
                $psicologo = ['Error' => 'Psicologo no encontrado'];
                return json_encode($psicologo);
            }else{
                return json_encode($psicologo);
            }
        }else if($curp == null){
            $resultado = Psicologo::where('claveUnica', $clave)
                ->join('carreraspsico', 'psicologo.idCarrera', '=', 'carreraspsico.idCarrera')
                ->select('psicologo.claveUnica',
                    'psicologo.nombres',
                    'psicologo.apellidoPaterno',
                    'psicologo.apellidoMaterno',
                    'psicologo.semestre',
                    'psicologo.correo',
                    'psicologo.activo',
                    'carreraspsico.carrera',
                )
                ->first();
            if($resultado == null){
                $respuesta = ['Error' => 'Psicologo no encontrado'];
                return json_encode($respuesta);
            }else{
                return json_encode($resultado);
            }
        }else if($clave !== null && $curp !== null){
            $respuesta = ['Error' => 'Psicologo no encontrado'];
            return json_encode($respuesta);
        }
    }

    protected function getPsico($clave, $curp){
        if($clave == null){
            $psicologo = PsicologoExterno::where('CURP', $curp)
            ->select('psicologoexterno.CURP',
                    'psicologoexterno.nombres',
                    'psicologoexterno.apellidoPaterno',
                    'psicologoexterno.apellidoMaterno',
                    'psicologoexterno.activo',
            )
            ->first();
            return json_encode($psicologo);
        }
    }

    public function getPsicologos(){
        $psicologosExternos = PsicologoExterno::select(
                'CURP as identificador',
                'nombres',
                'apellidoPaterno',
                'apellidoMaterno',
                'activo',
                'created_at'
            )
            ->get();

        foreach ($psicologosExternos as $psicologo) {
            $psicologo->formatted_created_at = $psicologo->created_at->format('Y-m-d');
            $psicologo->makeHidden(['created_at']);
        }
    
        $psicologosInternos = Psicologo::select(
                'claveUnica as identificador',
                'nombres',
                'apellidoPaterno',
                'apellidoMaterno',
                'activo',
                'created_at'
            )
            ->get();

        foreach ($psicologosInternos as $psicologo) {
            $psicologo->formatted_created_at = $psicologo->created_at->format('Y-m-d');
            $psicologo->makeHidden(['created_at']);
        }  

        $resultados = array_merge($psicologosExternos->toArray(), $psicologosInternos->toArray());

        return json_encode($resultados);
    
        return json_encode($resultados);
    }

    public function updatePsicologo(Request $request){
        $clave = $request->input('clave',null);
        $curp = $request->input('curp',null);
        $nombres = $request->input('nombres',null);
        $apellidoPaterno = $request->input('apellidoPaterno',null);
        $apellidoMaterno = $request->input('apellidoMaterno',null);
        $activo = $request->input('activo',null);

        if($clave == null){
            $psicologoMod = PsicologoExterno::find($curp);

            $psicologoMod->nombres = $nombres;
            $psicologoMod->apellidoPaterno = $apellidoPaterno;
            $psicologoMod->apellidoMaterno = $apellidoMaterno;
            $psicologoMod->activo = $activo;
            
            try {
                if ($psicologoMod->save()) {
                    return true;
                }else{
                    return 0;
                }
            } catch (\Exception $e) {
                return 0;
            }

        }else if($curp == null){
            $psicologoMod = Psicologo::find($clave);

            $psicologoMod->nombres = $nombres;
            $psicologoMod->apellidoPaterno = $apellidoPaterno;
            $psicologoMod->apellidoMaterno = $apellidoMaterno;
            $psicologoMod->activo = $activo;
            
            try {
                if ($psicologoMod->save()) {
                    return true;
                }else{
                    return 0;
                }
            } catch (\Exception $e) {
                return 0;
            }
        }else if($curp == null && $clave == null){
            return 0;
        }
        
    }

    public function registerPsicologo(Request $request){
        $clave = $request->input('claveUnica',null);
        $curp = $request->input('curp',null);

        if($clave == null){
            $psicologo = new PsicologoExterno;

            $psicologo -> CURP = $request->CURP;
            $psicologo -> nombres = $request->nombres;
            $psicologo -> apellidoPaterno = $request->apellidoPaterno;
            $psicologo -> apellidoMaterno = $request->apellidoMaterno;
            $psicologo -> Carrera = $request->Carrera;
            $psicologo -> semestre = $request->semestre;
            $psicologo -> activo = $request->activo;
            $psicologo -> correo = $request->correo;
            $psicologo -> contrasena = $request->contrasena;

            if($psicologo->save()){
                return true;
            }else{
                return 0;
            }
        }else if($curp == null){
            $psicologo = new Psicologo;

            $psicologo -> claveUnica = $request->claveUnica;
            $psicologo -> nombres = $request->nombres;
            $psicologo -> apellidoPaterno = $request->apellidoPaterno;
            $psicologo -> apellidoMaterno = $request->apellidoMaterno;
            $psicologo -> idCarrera = $request->idCarrera;
            $psicologo -> semestre = $request->semestre;
            $psicologo -> activo = $request->activo;
            $psicologo -> correo = $request->correo;

            try {
                if ($psicologo->save()) {
                    return true;
                }else{
                    return 0;
                }
            } catch (\Exception $e) {
                return 0;
            }
        }else if($clave !== null && $curp !== null){
            return 0;
        }
    }
}
