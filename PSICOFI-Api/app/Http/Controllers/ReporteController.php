<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ReporteController extends Controller
{
    public function getReporte(Request $request){
        $tipo = $request->input('tipo_reporte',null);
        $inicio = $request->input('fecha_inicio',null);
        $final = $request->input('fecha_final',null);

        $total_alumnos = DB::select('SELECT count(distinct claveUnica) AS "totalPersonasAtendidas"
                    FROM view_reportes
                    WHERE carrera LIKE "%%"
                    AND areaConsulta LIKE "%%";');
        
        $total_citas = DB::select('SELECT COUNT(*) AS "total" FROM view_reportes;');

        $horario_atencion = DB::select('SELECT horarioAtencion, COUNT(*) AS "total"
                                        FROM view_reportes
                                        WHERE estado = "Atendida"
                                        GROUP BY horarioAtencion;');

        $horarios = [];
        foreach ($horario_atencion as $hora) {
            array_push($horarios,[$hora->horarioAtencion,$hora->total]);
        }
        
        $semestre_atencion = DB::select('SELECT semestre, COUNT(*) AS "total"
                                        FROM (SELECT DISTINCT claveUnica, semestre FROM view_reportes) AS dt
                                        GROUP BY semestre;');

        $semestres = [];
        foreach ($semestre_atencion as $semestre) {
            array_push($semestres,[$semestre->semestre,$semestre->total]);
        }

        $motivo_consulta = DB::select('SELECT motivoConsulta, COUNT(*) AS "total" FROM view_reportes GROUP BY motivoConsulta;');

        $motivos = [];
        foreach ($motivo_consulta as $motivo) {
            array_push($motivos,[$motivo->motivoConsulta,$motivo->total]);
        }

        $departamento_consulta = DB::select('SELECT AREA, COUNT(*) AS "total" FROM view_reportes GROUP BY AREA;');

        $departamentos = [];
        foreach ($departamento_consulta as $departamento) {
            array_push($departamentos,[$departamento->Area,$departamento->total]);
        }

        $result = [
            'totalCitas' => $total_citas[0]->total,
            'totalPersonasAtendidas' => $total_alumnos[0]->totalPersonasAtendidas,
            'horarioAtencion' => $horarios,
            'semestre' => $semestres,
            'motivoConsulta' => $motivos,
            'areaConsulta' => $departamentos
        ];

        return $result;
    }
}

// {
//   "totalPersonasAtendidas": 50,
//   "totalCitas": 90,
//   "horarioAtencion": [
//     ["9:00", 30],
//     ["10:00", 45],
//     ["11:00", 15]
//   ],
//   "semestre": [
//     ["1°", 20],
//     ["9°", 30]
//   ],
//   "areaConsulta": {
//     "Psicologica": 20,
//     "Pedagogica": 30
//   },
//   "motivoConsulta": {
//     "Academica": 30,
//     "Emocional": 40,
//     "Social": 15,
//     "Otra": 5
//   }
// }