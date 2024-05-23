<!DOCTYPE html>
<html>
<head>
    <title>DAP: Confirmación de cita</title>
</head>
<body>
    <h1>Hola, {{ $details['name'] }}</h1>
    <p>Has confirmado tu cita con el psicologo {{ $details['psicologo']}}</p>
    <h2>Detalles de la cita</h2>
    <p>Fecha: {{$details['fecha']}}</p>
    <p>Hora: {{$details['hora']}}</p>
</body>
</html>