<!DOCTYPE html>
<html>
<head>
    <title>DAP: Cancelación de cita</title>
</head>
<body>
    <h1>Hola, {{ $details['name'] }}</h1>
    <p>Lamentamos informarte que el psicologo {{ $details['psicologo']}} ha cancelado la cita que tenias programada</p>
    <h2>Detalles de la cita</h2>
    <p>Fecha: {{$details['fecha']}}</p>
    <p>Hora: {{$details['hora']}}</p>
</body>
</html>