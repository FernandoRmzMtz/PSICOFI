@extends('layouts.plantilla')

@section('title','Curso '. $curso->name)

@section('content')
    <h1>Bienvenidos al curso {{ $curso->name }}</h1>
    <a href="{{ route('cursos.index') }}">Volver a cursos</a>
    <p><strong>Categoría </strong>{{ $curso->categoria }}</p>
    <p>{{ $curso->descripcion }}</p>
@endsection