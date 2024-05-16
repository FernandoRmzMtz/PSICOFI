<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Auth;
use RicorocksDigitalAgency\Soap\Facades\Soap;
use App\Models\Alumno;
use App\Models\Psicologo;
use App\Models\PsicologoExterno;

class AuthController extends Controller
{
    private function authUser($clave,$password){
        $location = 'https://servicios.ing.uaslp.mx/ws_psico/ws_psico.svc';
        $request = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
                        <s:Body>
                        <valida_alumno xmlns="http://tempuri.org/">
                            <key_sw>461E-ABD0-252D79762A23</key_sw>
                            <clave_unica>'. $clave .'</clave_unica>
                            <contrasena>'. $password .'</contrasena>
                        </valida_alumno>
                        </s:Body>
                    </s:Envelope>';
        $headers = [
            'Method: POST',
            'Connection: Keep-Alive',
            'User-Agent: PHP-SOAP-CURL',
            'Content-Type: text/xml',
            'SOAPAction: http://tempuri.org/IService1/valida_alumno'
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

    public function login(Request $request){
        $id = $request->input('id',null);
        $password = $request->input('password');

        if(strlen($id) == 6){
            $alumno = Alumno::where('claveUnica', $id)
            ->where('contrasena', $password)
            ->select('alumno.claveUnica',
                    'alumno.nombres',
                    'alumno.apellidoPaterno',
                    'alumno.apellidoMaterno',
                    'alumno.condicionAcademica',
            )
            ->first();

            $psicologo = Psicologo::where('claveUnica', $id)
            ->where('contrasena', $password)
            ->select('psicologo.claveUnica',
                    'psicologo.nombres',
                    'psicologo.apellidoPaterno',
                    'psicologo.apellidoMaterno',
            )
            ->first();

            if($alumno || $psicologo){
                $token = csrf_token();
                if($alumno){
                    $jsonArray = [
                        'clave_unica' => $alumno->claveUnica,
                        'nombre_alumno' => $alumno->nombres . ' ' . $alumno->apellidoPaterno . ' ' . $alumno->apellidoMaterno,
                        'validacion' => "USUARIO-VALIDO",
                        'situacion_alumno' => $alumno->condicionAcademica,
                        'token' => $token
                    ];
                }else if($psicologo){
                    $jsonArray = [
                        'clave_unica' => $psicologo->claveUnica,
                        'nombre_psicologo' => $psicologo->nombres . ' ' . $psicologo->apellidoPaterno . ' ' . $psicologo->apellidoMaterno,
                        'validacion' => "USUARIO-VALIDO",
                        'token' => $token
                    ];
                }
                
                return json_encode($jsonArray);
            }else{
                $jsonResult = $this->authUser($id,$password);

                $arrayDatos = json_decode($jsonResult, true);

                if($arrayDatos['validacion'] == 'USUARIO-INVALIDO'){
                    $respuesta = ['validacion' => $arrayDatos['validacion']];
                    return json_encode($respuesta);
                }else{
                    $arrayDatos = json_decode($jsonResult, true);

                    $token = csrf_token();

                    $arrayDatos['token'] = $token;

                    $jsonResult = json_encode($arrayDatos);
                    
                    return $jsonResult;
                }
            }
        }else if(strlen($id) == 18){
            $psicologoexterno = PsicologoExterno::where('CURP', $id)
            ->where('contrasena', $password)
            ->select('psicologoexterno.curp',
                    'psicologoexterno.nombres',
                    'psicologoexterno.apellidoPaterno',
                    'psicologoexterno.apellidoMaterno',
            )
            ->first();

            if($psicologoexterno){
                $token = csrf_token();
                $jsonArray = [
                    'curp' => $psicologoexterno->curp,
                    'nombre_psicologo' => $psicologoexterno->nombres . ' ' . $psicologoexterno->apellidoPaterno . ' ' . $psicologoexterno->apellidoMaterno,
                    'validacion' => "USUARIO-VALIDO",
                    'token' => $token
                ];

                return json_encode($jsonArray);
            }else{
                $respuesta['validacion'] = 'USUARIO-INVALIDO';
                return json_encode($respuesta);
            }

        }else if($id != 6 || $id != 18){
            $respuesta = ['validacion' => 'USUARIO-INVALIDO'];
            return json_encode($respuesta);
        }
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
        $clave = $request->input('clave');

        return $clave;
    }

    public function index(){
        $alumnos = Alumno::all();
        return $alumnos;
    }
}
