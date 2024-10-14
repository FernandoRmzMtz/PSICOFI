<?php

namespace App\Http\Controllers;

use App\Models\Administrador;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Alumno;
use App\Models\Psicologo;
use App\Models\PsicologoExterno;

class AuthController extends Controller
{
    private function authUser($clave,$password){
        $location = env('WEB_SERVICE');
        $request = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
                        <s:Body>
                        <valida_alumno xmlns="http://tempuri.org/">
                            <key_sw>'.env('SERVICE_KEY').'</key_sw>
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
            ->where('condicionAcademica', '=', 'INSCRITO')
            ->select('alumno.claveUnica',
                    'alumno.nombres',
                    'alumno.apellidoPaterno',
                    'alumno.apellidoMaterno',
                    'alumno.condicionAcademica',
            )
            ->first();

            $psicologo = Psicologo::where('claveUnica', $id)
            ->where('contrasena', $password)
            ->where('activo', '=', 1)
            ->select('psicologo.claveUnica',
                    'psicologo.nombres',
                    'psicologo.apellidoPaterno',
                    'psicologo.apellidoMaterno'
            )
            ->first();

            $administrador = Administrador::where('idUsuario', $id)
            ->where('contrasena', $password)
            ->select('administrador.idUsuario',
                    'administrador.nombres',
                    'administrador.apellidoPaterno',
                    'administrador.apellidoMaterno',
            )
            ->first();

            if($alumno || $psicologo || $administrador){
                if($alumno){
                    $jsonArray = [
                        'id' => $alumno->claveUnica,
                        'nombre' => $alumno->nombres . ' ' . $alumno->apellidoPaterno . ' ' . $alumno->apellidoMaterno,
                        'validacion' => "USUARIO-VALIDO",
                        'rol' => "Alumno",
                        'situacion' => $alumno->condicionAcademica
                    ];
                }else if($psicologo){
                    $jsonArray = [
                        'id' => $psicologo->claveUnica,
                        'nombre' => $psicologo->nombres . ' ' . $psicologo->apellidoPaterno . ' ' . $psicologo->apellidoMaterno,
                        'validacion' => "USUARIO-VALIDO",
                        'rol' => "Psicologo"
                    ];
                }else if($administrador){
                    $jsonArray = [
                        'id' => $administrador->idUsuario,
                        'nombre' => $administrador->nombres . ' ' . $administrador->apellidoPaterno . ' ' . $administrador->apellidoMaterno,
                        'validacion' => "USUARIO-VALIDO",
                        'rol' => "Administrador"
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

                    $arrayDatos['id'] = $arrayDatos['clave_unica'];
                    unset($arrayDatos['clave_unica']);

                    $arrayDatos['nombre'] = $arrayDatos['nombre_alumno'];
                    unset($arrayDatos['nombre_alumno']);

                    unset($arrayDatos['situacion_alumno']);

                    $arrayDatos['rol'] = "Alumno";
                    $jsonResult = json_encode($arrayDatos);
                    
                    return $jsonResult;
                }
            }
        }else if(strlen($id) == 18){
            $psicologoexterno = PsicologoExterno::where('CURP', $id)
            ->where('contrasena', $password)
            ->where('activo', '=', 1)
            ->select('psicologoexterno.curp',
                    'psicologoexterno.nombres',
                    'psicologoexterno.apellidoPaterno',
                    'psicologoexterno.apellidoMaterno',
            )
            ->first();

            if($psicologoexterno){
                $jsonArray = [
                    'id' => $psicologoexterno->curp,
                    'nombre' => $psicologoexterno->nombres . ' ' . $psicologoexterno->apellidoPaterno . ' ' . $psicologoexterno->apellidoMaterno,
                    'validacion' => "USUARIO-VALIDO",
                    'rol' => "Psicologo externo"
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

    public function getAlumno(Request $request){
        $clave = $request->input('clave');

        if($clave){
            return $clave;
        }else{
            $jsonResult = $this->getUser($clave);

            $arrayDatos = json_decode($jsonResult, true);

            return $arrayDatos;
        }
    }

    public function index(){
        $alumnos = Alumno::all();
        return $alumnos;
    }
}
