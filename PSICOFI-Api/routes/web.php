<?php

use App\Http\Controllers\CursoController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
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

Route::get('psicologo/searchPsicologo',[PsicoController::class,'searchPsicologo'])->name('psicologo.searchPsicologo');

Route::post('psicologo/registerPsicologo',[PsicoController::class,'registerPsicologo'])->name('psicologo.registerPsicologo');

Route::get('psicologo/getPsicologos',[PsicoController::class,'getPsicologos'])->name('psicologo.getPsicologos');

Route::put('psicologo/updatePsicologo',[PsicoController::class,'updatePsicologo'])->name('psicologo.updatePsicologo');

Route::put('psicologo/updatePassword',[PsicoController::class,'updatePassword'])->name('psicologo.updatePassword');





