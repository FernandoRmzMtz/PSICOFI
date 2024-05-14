<?php

use App\Http\Controllers\CursoController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\NotaCitaController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DateController;
use App\Http\Controllers\PsicoController;

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

Route::post('psicologo/searchPsicologo',[PsicoController::class,'searchPsicologo'])->name('psicologo.searchPsicologo');

Route::post('psicologo/registerPsicologo',[PsicoController::class,'registerPsicologo'])->name('psicologo.registerPsicologo');

Route::get('psicologo/getPsicologos',[PsicoController::class,'getPsicologos'])->name('psicologo.getPsicologos');

Route::put('psicologo/updatePsicologo',[PsicoController::class,'updatePsicologo'])->name('psicologo.updatePsicologo');

Route::put('psicologo/updatePassword',[PsicoController::class,'updatePassword'])->name('psicologo.updatePassword');

Route::post('cita/generateDates',[DateController::class,'generateDates'])->name('cita.generateDates');

Route::put('cita/scheduleDate',[DateController::class,'scheduleDate'])->name('cita.scheduleDate');

Route::get('cita/getDates',[DateController::class,'getDates'])->name('cita.getDates');

Route::post('/api/nota-cita', [NotaCitaController::class, 'store']);

// aa

Route::get('/csrf-token', function() {
    return response()->json(['csrf_token' => csrf_token()]);
});


