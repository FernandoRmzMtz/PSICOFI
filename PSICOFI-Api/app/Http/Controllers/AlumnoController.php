<?php

namespace App\Http\Controllers;

use App\Models\Alumno;
use App\Models\Cita;
use Illuminate\Http\Request;
use DateTime;
use Exception;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AlumnoController extends Controller
{
    public function obtenerAlumno($claveUnica) {
        $alumno = Alumno::where('claveUnica', $claveUnica)->first();
        return response()->json($alumno);
    }

    // Función para obtener la información de un alumno por medio del web service
    private function obtainAlumno($id){
        $clave_unica = (int) $id; 
        $location = env('WEB_SERVICE');
        $request = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
                        <s:Body>
                        <alumno xmlns="http://tempuri.org/">
                            <key_sw>'.env('SERVICE_KEY').'</key_sw>
                            <clave_unica>' . $clave_unica . '</clave_unica>
                        </alumno>
                        </s:Body>
                    </s:Envelope>';
        $headers = [
            'Method: POST',
            'Connection: Keep-Alive',
            'User-Agent: PHP-SOAP-CURL',
            'Content-Type: text/xml',
            'SOAPAction: http://tempuri.org/IService1/alumno'
        ];

        $ch = curl_init($location);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $request);
        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);

        $response = curl_exec($ch);
        $err_status = curl_error($ch);

        $xml = new \SimpleXMLElement($response);
        $datos = $xml->xpath('//TablaMensaje');
        $jsonResult = json_encode($datos[0]);

        return $jsonResult;
    }

    private function calcularEdad($fechaNacimiento) {

        $fechaSinHora = substr($fechaNacimiento, 0, strpos($fechaNacimiento, ' '));
        $fechaCarbon = Carbon::createFromFormat('d/m/Y', $fechaSinHora);
        $edad = $fechaCarbon->age;

        return $edad;
    }

    public function addAlumno($id){
        $alumno = $this->obtainAlumno($id);

        if($alumno){
            $alumno = json_decode($alumno, true);
            $edad = $this->calcularEdad($alumno['fecha_nace']);

            $newAlumno = new Alumno;

            $newAlumno -> claveUnica = intval($alumno['clave_unica']);
            $newAlumno -> nombres = $alumno['nombres_alumno'];
            $newAlumno -> apellidoPaterno = $alumno['primer_apellido_alumno'];
            $newAlumno -> apellidoMaterno = $alumno['segundo_apellido_alumno'];
            $newAlumno -> carrera = $alumno['nombre_carrera'];
            $newAlumno -> edad = $edad;
            $newAlumno->sexo = substr($alumno['genero'], 0, 1);
            $newAlumno -> area = $alumno['nombre_area'];
            $newAlumno -> condicionAcademica = "INSCRITO";
            $newAlumno -> semestre = intval($alumno['semestre']);
            $newAlumno -> creditosAprobados = $alumno['semestre'] * 50;
            $newAlumno -> creditosInscritos = intval($alumno['creditos_inscritos']);
            $newAlumno -> promedioGral = floatval($alumno['promedio_general']);
            $newAlumno -> asesor = $alumno['tutor_academico'];
            $newAlumno -> contrasena = null;
            $newAlumno -> psicologoAsociado = null;
            $newAlumno -> habilitado = 1;
            
            if($newAlumno->save()){
                return true;
            }else{
                return false;
            }
        }else{
            return null;
        }
    }

    public function getAlumno(Request $request){
        $id = $request->input('id',null);

        try{
            if(strlen($id) == 6){
                $alumno = DB::select('call get_info_alumno(?)',[$id]);

                if($alumno){
                    return json_encode($alumno[0]);
                }else{
                    $jsonResult = $this->obtainAlumno($id);
                    $arrayDatos = json_decode($jsonResult, true);

                    if($arrayDatos){
                        $respuesta = [
                            'claveUnica' => $arrayDatos['clave_unica'],
                            'nombres' => $arrayDatos['nombres_alumno'],
                            'apellidoMaterno' => $arrayDatos['segundo_apellido_alumno'],
                            'apellidoPaterno' => $arrayDatos['primer_apellido_alumno'],
                        ];
                        return response($respuesta,200);
                    }else{
                        $respuesta = ['Error' => 'Alumno NO encontrado'];  
                        return response($respuesta,200);
                    }
                }
            }else{
                $respuesta = ['Error' => 'ID invalida'];
                return response($respuesta,200);
            }
        }catch(\Exception $e){
            $respuesta = ['Error' => 'Consulta incorrecta'];
            return response($respuesta,400);
        }
    }

    public function getRecord(Request $request){
        $id = $request->input('id',null);
        
        try{
            if(strlen($id) == 6){
                $Record = [];

                $citas = DB::select('call get_historial_alumno(?)',[$id]);

                $citas = collect($citas);

                if($citas->isNotEmpty()){
                    return json_encode($citas);
                }else{
                    $respuesta = ['Sin historial'];
                    return json_encode($respuesta);
                }
            }else{
                $respuesta = ['Error' => 'ID invalido'];
                return json_encode($respuesta);
            }
        }catch(\Exception $e){
            $respuesta = ['Error' => 'Ocurrio un error'];
            return json_encode($respuesta);
        }
    }

    public function getDate(Request $request){
        $id = $request->input('id',null);
        
        try{
            if(strlen($id) == 6){
                $cita = DB::select('call get_cita_actual(?)',[$id]);

                $cita = collect($cita);

                if($cita->isNotEmpty()){
                    return json_encode($cita[0]);
                }else{
                    $respuesta = ['Sin cita agendada'];
                    return json_encode($respuesta);
                }
            }else{
                $respuesta = ['Error' => 'ID incorrecto'];
                return json_encode($respuesta);
            }
        }catch(\Exception $e){
            $respuesta = ['Error' => 'Ocurrio un error'];
            return json_encode($respuesta);
        }
    }
}
