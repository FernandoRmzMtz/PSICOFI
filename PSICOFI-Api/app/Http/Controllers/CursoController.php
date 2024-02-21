<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Curso;

class CursoController extends Controller
{
    public function index(){

        $cursos = Curso::paginate();

        return view("cursos.index",compact('cursos'));
    }

    public function create(){
        return view("cursos.create");
    }
    public function getCurso(){
        $curso = Curso::inRandomOrder()->first();
        return $curso;
    }

    public function store(){
        
    }

    public function show($id){

        $curso = Curso::find($id);

        return view("cursos.show",compact('curso'));
    }
}
