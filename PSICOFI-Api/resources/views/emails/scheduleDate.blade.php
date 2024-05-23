<!DOCTYPE html>
<html>
<head>
    <title>DAP: Cita agendada</title>
</head>
<body>
    <h1>Hola, {{ $details['name'] }}</h1>
    <p>Tu cita con el psicologo {{ $details['psicologo']}} ha sido agendada </p>
    <h2>Detalles de la cita</h2>
    <p>Fecha: {{$details['fecha']}}</p>
    <p>Hora: {{$details['hora']}}</p>
</body>
</html>