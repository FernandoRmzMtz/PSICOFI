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
    private function authWebAdmin($rpe,$password){
        $location = env('WEB_SERVICE');
        $request = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
                        <s:Body>
                            <valida_usuario xmlns="http://tempuri.org/">
                            <key_sw>461E-ABD0-252D79762A23</key_sw>
                            <rpe_usuario>'. $rpe .'</rpe_usuario>
                            <contrasena>'. $password .'</contrasena>
                            </valida_usuario>
                        </s:Body>
                    </s:Envelope>';
        $headers = [
            'Method: POST',
            'Connection: Keep-Alive',
            'User-Agent: PHP-SOAP-CURL',
            'Content-Type: text/xml',
            'SOAPAction: http://tempuri.org/IService1/valida_usuario'
        ];

        $ch = curl_init($location);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $request);
        curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);

        $response = curl_exec($ch);

        $xml = new \SimpleXMLElement($response);
        $datos = $xml->xpath('//TablaMensaje');
        $jsonResult = json_encode($datos[0]);

        $response = json_decode($jsonResult, true);

        return $response;
    }

    private function authWebStudent($clave,$password){
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

        $xml = new \SimpleXMLElement($response);
        $datos = $xml->xpath('//TablaMensaje');
        $jsonResult = json_encode($datos[0]);

        $response = json_decode($jsonResult, true);

        return $response;
    }

    private function auth_student($id,$password){
        $lenID = strlen($id);

        if($lenID != 6){
            return null;
        }

        $alumno = Alumno::where('claveUnica', $id)
            ->where('contrasena', $password)
            ->where('condicionAcademica', '=', 'INSCRITO')
            ->select('alumno.claveUnica',
                    'alumno.nombres',
                    'alumno.apellidoPaterno',
                    'alumno.apellidoMaterno'
            )
            ->first();
        
            if(!$alumno){
                $arrayDatos = $this->authWebStudent($id,$password);

                if($arrayDatos['validacion'] == 'USUARIO-INVALIDO'){
                    //$respuesta = ['validacion' => $arrayDatos['validacion']];
                    return null;
                }else if($arrayDatos['validacion'] == 'USUARIO-VALIDO'){
                    //$arrayDatos = json_decode($jsonResult, true);

                    $arrayDatos['id'] = $arrayDatos['clave_unica'];
                    unset($arrayDatos['clave_unica']);

                    $arrayDatos['nombre'] = $arrayDatos['nombre_alumno'];
                    unset($arrayDatos['nombre_alumno']);

                    unset($arrayDatos['situacion_alumno']);

                    $arrayDatos['rol'] = "Alumno";
                    $jsonResult = json_encode($arrayDatos);
                    
                    return $jsonResult;
                }

                return $arrayDatos;
            }else{
                $jsonArray = [
                    'id' => $alumno->claveUnica,
                    'nombre' => $alumno->nombres . ' ' . $alumno->apellidoPaterno . ' ' . $alumno->apellidoMaterno,
                    'validacion' => "USUARIO-VALIDO",
                    'rol' => "Alumno"
                ];

                return $jsonArray;
            }
        return null;
    }

    private function auth_psico($id,$password){
        $lenID = strlen($id);

        if($lenID != 6 && $lenID != 18){
            return null;
        }

        if($lenID == 6){
            $psicologo = Psicologo::where('claveUnica', $id)
            ->where('contrasena', $password)
            ->where('activo', '=', 1)
            ->select('psicologo.claveUnica',
                    'psicologo.nombres',
                    'psicologo.apellidoPaterno',
                    'psicologo.apellidoMaterno'
            )
            ->first();
            
            if(!$psicologo){
                $arrayDatos = $this->authWebStudent($id,$password);

                if($arrayDatos['validacion'] == 'USUARIO-INVALIDO'){
                    return null;
                }else if($arrayDatos['validacion'] == 'USUARIO-VALIDO'){
                    $arrayDatos['id'] = $arrayDatos['clave_unica'];
                    unset($arrayDatos['clave_unica']);

                    $arrayDatos['nombre'] = $arrayDatos['nombre_alumno'];
                    unset($arrayDatos['nombre_alumno']);

                    unset($arrayDatos['situacion_alumno']);

                    $arrayDatos['rol'] = "Psicologo";
                    $jsonResult = json_encode($arrayDatos);
                    
                    return $jsonResult;
                }
            }else{
                $jsonArray = [
                    'id' => $psicologo->claveUnica,
                    'nombre' => $psicologo->nombres . ' ' . $psicologo->apellidoPaterno . ' ' . $psicologo->apellidoMaterno,
                    'validacion' => "USUARIO-VALIDO",
                    'rol' => "Psicologo"
                ];

                return $jsonArray;
            }
        }else if($lenID == 18){
            $psicologoexterno = PsicologoExterno::where('CURP', $id)
            ->where('contrasena', $password)
            ->where('activo', '=', 1)
            ->select('psicologoexterno.curp',
                    'psicologoexterno.nombres',
                    'psicologoexterno.apellidoPaterno',
                    'psicologoexterno.apellidoMaterno',
            )
            ->first();

            if(!$psicologoexterno){
                return null;
            }else{
                $jsonArray = [
                    'id' => $psicologoexterno->curp,
                    'nombre' => $psicologoexterno->nombres . ' ' . $psicologoexterno->apellidoPaterno . ' ' . $psicologoexterno->apellidoMaterno,
                    'validacion' => "USUARIO-VALIDO",
                    'rol' => "Psicologo"
                ];

                return $jsonArray;
            }
        }
    }

    private function auth_admin($id,$password){
        $administrador = Administrador::where('idUsuario', $id)
            ->where('contrasena', $password)
            ->select('administrador.idUsuario',
                    'administrador.nombres',
                    'administrador.apellidoPaterno',
                    'administrador.apellidoMaterno',
            )
            ->first();
        
        if(!$administrador){
            $arrayDatos = $this->authWebAdmin($id,$password);
            
            if($arrayDatos['validacion'] == 'USUARIO-INVALIDO'){
                return null;
            }else if($arrayDatos['validacion'] == 'USUARIO-VALIDO'){
                $arrayDatos['id'] = $arrayDatos['rpe_usuario'];
                unset($arrayDatos['clave_unica']);

                $arrayDatos['rol'] = "Administrador";
                $jsonResult = json_encode($arrayDatos);
                
                return $jsonResult;
            }
        }else{
            $jsonArray = [
                'id' => $administrador->idUsuario,
                'nombre' => $administrador->nombres . ' ' . $administrador->apellidoPaterno . ' ' . $administrador->apellidoMaterno,
                'validacion' => "USUARIO-VALIDO",
                'rol' => "Administrador"
            ];
            return $jsonArray;
        }
    }

    public function loginAdmin(Request $request){
        $id = $request->input('id',null);
        $password = $request->input('password',null);

        $lenID = strlen($id);

        if(($lenID != 6) || $id == null){
            return response()->json(['validacion' => 'USUARIO-INVALIDO'], 200);
        }

        $admin = $this->auth_admin($id,$password);
            
        if(!$admin || $admin['validacion'] == 'USUARIO-INVALIDO'){
            return response()->json(['validacion' => 'USUARIO-INVALIDO'], 200);
        }else if($admin['validacion'] == 'USUARIO-VALIDO'){
            return response($admin,200);
        }
    }

    public function login(Request $request){
        $id = $request->input('id',null);
        $password = $request->input('password',null);

        $lenID = strlen($id);

        if(($lenID != 6 && $lenID != 18) || $id == null){
            return response()->json(['validacion' => 'USUARIO-INVALIDO'], 200);
        }

        $alumno = $this->auth_student($id,$password);
    
        if(!$alumno || $alumno['validacion'] == 'USUARIO-INVALIDO'){
            $psicologo = $this->auth_psico($id,$password);

            if(!$psicologo){
                return response()->json(['validacion' => 'USUARIO-INVALIDO'], 200);
            }else{
                return response($psicologo,200);
            }
        }else if($alumno['validacion'] == 'USUARIO-VALIDO'){
            return response($alumno,200);
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
