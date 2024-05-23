<!DOCTYPE html>
<html>
<head>
    <title>DAP: Cancelación de cita</title>
</head>
<body>
    <h1>Hola, {{ $details['psicologo'] }}</h1>
    <p>Te informamos que el alumno {{ $details['name']}} ha cancelado su cita </p>
    <h2>Detalles de la cita</h2>
    <p>Fecha: {{$details['fecha']}}</p>
    <p>Hora: {{$details['hora']}}</p>
</body>
</html>