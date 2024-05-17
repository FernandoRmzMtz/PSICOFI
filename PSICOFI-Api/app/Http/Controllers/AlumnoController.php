<?php

namespace App\Http\Controllers;

use App\Models\Alumno;
use App\Models\Cita;
use Illuminate\Http\Request;


class AlumnoController extends Controller
{
    public function obtenerAlumno($claveUnica) {
        $alumno = Alumno::where('claveUnica', $claveUnica)->first();
        return response()->json($alumno);
    }

    public function obtainAlumno(Request $request){
        $clave = $request->input('clave');

        $clave_unica = (int) $clave; 
        $location = 'https://servicios.ing.uaslp.mx/ws_psico/ws_psico.svc';
        $request = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
                        <s:Body>
                        <alumno xmlns="http://tempuri.org/">
                            <key_sw>461E-ABD0-252D79762A23</key_sw>
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

    public function getAlumno(Request $request){
        $id = $request->input('id',null);

        try{
            if(strlen($id) == 6){
                $alumno = Alumno::where('claveUnica', $id)
                ->select('claveUnica',
                    'nombres',
                    'apellidoPaterno',
                    'apellidoMaterno',
                    'area',
                    'carrera',
                    'semestre',
                    'asesor',
                    'condicionAcademica',
                    'promedioGral',
                    'creditosAprobados',
                    'creditosInscritos',
                    'sexo',
                    'edad'
                )
                ->first();
                if($alumno){
                    return json_encode($alumno);
                }else{
                    $respuesta = ['Error' => 'Alumno NO encontrado'];
                    return json_encode($respuesta);
                }
            }else{
                $respuesta = ['Error' => 'ID invalida'];
                return json_encode($respuesta);
            }
        }catch(\Exception $e){
            $respuesta = ['Error' => 'Consulta incorrecta'];
            return json_encode($respuesta);
        }
    }

    public function getRecord(Request $request){
        $id = $request->input('id',null);
        
        try{
            if(strlen($id) == 6){

                $Record = [];

                $citas = Cita::where('claveUnica', $id)
                ->where('estadoCita', 4)
                ->select(
                    'idCita',
                    'clavePsicologo',
                    'clavePsicologoExterno'
                )
                ->get();

                if($citas->isNotEmpty()){
                    foreach ($citas as $cita) {
                        if (is_null($cita->clavePsicologo) && !is_null($cita->clavePsicologoExterno)) {
                            $detalleCita = Cita::where('idCita', $cita->idCita)
                                ->join('psicologoexterno', 'cita.clavePsicologoExterno', '=', 'psicologoexterno.curp')
                                ->join('estadocita', 'cita.estadoCita', '=', 'estadocita.idEstadoCita')
                                ->select(
                                    'cita.idCita',
                                    'cita.hora',
                                    'cita.fecha',
                                    'estadocita.estado AS estado',
                                    'cita.claveUnica',
                                    'psicologoexterno.nombres as Nombres psicologo',
                                    'psicologoexterno.apellidoPaterno as Apellido Pat psicologo',
                                    'psicologoexterno.apellidoMaterno as Apellido Mat psicologo'
                                )
                                ->first();

                                if ($detalleCita) {
                                    $Record[] = $detalleCita;
                                }
                        }else if(!is_null($cita->clavePsicologo) && is_null($cita->clavePsicologoExterno)){
                            $detalleCita = Cita::where('idCita', $cita->idCita)
                                ->join('psicologo', 'cita.clavePsicologo', '=', 'psicologo.claveUnica')
                                ->join('estadocita', 'cita.estadoCita', '=', 'estadocita.idEstadoCita')
                                ->select(
                                    'cita.idCita',
                                    'cita.hora',
                                    'cita.fecha',
                                    'estadocita.estado AS estado',
                                    'cita.claveUnica',
                                    'psicologo.nombres as Nombres psicologo',
                                    'psicologo.apellidoPaterno as Apellido Pat psicologo',
                                    'psicologo.apellidoMaterno as Apellido Mat psicologo'
                                )
                                ->first();

                                if ($detalleCita) {
                                    $Record[] = $detalleCita;
                                }
                        }
                    }

                    return json_encode($Record);
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
                $cita = Cita::where('claveUnica', $id)
                ->whereIn('estadoCita', [1, 2])
                ->select(
                    'idCita',
                    'clavePsicologo',
                    'clavePsicologoExterno'
                )
                ->first();

                if($cita != null){
                    if (is_null($cita->clavePsicologo) && !is_null($cita->clavePsicologoExterno)) {
                        $detalleCita = Cita::where('idCita', $cita->idCita)
                            ->join('psicologoexterno', 'cita.clavePsicologoExterno', '=', 'psicologoexterno.curp')
                            ->join('estadocita', 'cita.estadoCita', '=', 'estadocita.idEstadoCita')
                            ->select(
                                'cita.idCita',
                                'cita.hora',
                                'cita.fecha',
                                'estadocita.estado AS estado',
                                'cita.claveUnica',
                                'psicologoexterno.nombres as Nombres psicologo',
                                'psicologoexterno.apellidoPaterno as Apellido Pat psicologo',
                                'psicologoexterno.apellidoMaterno as Apellido Mat psicologo'
                            )
                            ->first();

                            if ($detalleCita) {
                                return json_encode($detalleCita);
                            }else{
                                $respuesta = ['Cita no encontrada'];
                                return json_encode($respuesta);
                            }
                    }else if(!is_null($cita->clavePsicologo) && is_null($cita->clavePsicologoExterno)){
                        $detalleCita = Cita::where('idCita', $cita->idCita)
                            ->join('psicologo', 'cita.clavePsicologo', '=', 'psicologo.claveUnica')
                            ->join('estadocita', 'cita.estadoCita', '=', 'estadocita.idEstadoCita')
                            ->select(
                                'cita.idCita',
                                'cita.hora',
                                'cita.fecha',
                                'estadocita.estado AS estado',
                                'cita.claveUnica',
                                'psicologo.nombres as Nombres psicologo',
                                'psicologo.apellidoPaterno as Apellido Pat psicologo',
                                'psicologo.apellidoMaterno as Apellido Mat psicologo'
                            )
                            ->first();

                            if ($detalleCita) {
                                return json_encode($detalleCita);
                            }else{
                                $respuesta = ['Cita no encontrada'];
                                return json_encode($respuesta);
                            }
                    }else{
                        $respuesta = ['Error' => 'Ocurrio un error'];
                        return json_encode($respuesta);
                    }
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
