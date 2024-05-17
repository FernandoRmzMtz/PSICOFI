<?php

use App\Http\Controllers\CursoController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NotaCitaController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DateController;
use App\Http\Controllers\PsicoController;
use App\Http\Controllers\AlumnoController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', HomeController::class);

Route::post('login',[AuthController::class,'login'])->name('login');

Route::post('alumno/getAlumno',[AlumnoController::class,'getAlumno'])->name('getAlumno');

Route::post('alumno/getDate',[AlumnoController::class,'getDate'])->name('getDate');

Route::post('alumno/getRecord',[AlumnoController::class,'getRecord'])->name('getRecord');

Route::post('psicologo/searchPsicologo',[PsicoController::class,'searchPsicologo'])->name('psicologo.searchPsicologo');

Route::post('psicologo/registerPsicologo',[PsicoController::class,'registerPsicologo'])->name('psicologo.registerPsicologo');

Route::get('psicologo/getPsicologos',[PsicoController::class,'getPsicologos'])->name('psicologo.getPsicologos');

Route::post('psicologo/getPatients',[PsicoController::class,'getPatients'])->name('psicologo.getPatients');

Route::put('psicologo/updatePsicologo',[PsicoController::class,'updatePsicologo'])->name('psicologo.updatePsicologo');

Route::put('psicologo/updatePassword',[PsicoController::class,'updatePassword'])->name('psicologo.updatePassword');

Route::post('cita/generateDates',[DateController::class,'generateDates'])->name('cita.generateDates');

Route::put('cita/scheduleDate',[DateController::class,'scheduleDate'])->name('cita.scheduleDate');

Route::get('cita/getDates',[DateController::class,'getDates'])->name('cita.getDates');

Route::post('cita/createDates',[DateController::class,'createDates'])->name('cita.createDates');

Route::post('cita/cancelDate',[DateController::class,'cancelDate'])->name('cita.cancelDate');

Route::post('cita/confirmDate',[DateController::class,'confirmDate'])->name('cita.confirmDate');

Route::post('/api/nota-cita', [NotaCitaController::class, 'store']);

Route::get('/csrf-token', function() {
    return response()->json(['csrf_token' => csrf_token()]);
});


