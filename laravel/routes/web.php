<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*Route::get('/', function () {
    return view('welcome');
});*/

Auth::routes();

Route::get('/', [App\Http\Controllers\FrontEndController::class, 'index'])->name('home');

Route::get('/home', [App\Http\Controllers\FrontEndController::class, 'index'])->name('home');


// Patient Routes
Route::group(['middleware' => ['auth', 'patient']], function () {
    Route::match(['get', 'post'],'/book/appointment',[\App\Http\Controllers\FrontEndController::class,'create'])->name('booking.add.new');
    Route::match(['get', 'post'],'/my-booking',[\App\Http\Controllers\FrontEndController::class,'myBookings'])->name('my.booking');
    Route::match(['get', 'post'],'/booking/status/{id}',[\App\Http\Controllers\FrontEndController::class,'update_status'])->name('booking.update_status');
});

// Doctor Routes
Route::group(['middleware' => ['auth', 'doctor']], function () {
    //Route::resource('appointment', 'App\Http\Controllers\AppointmentController');

    Route::match(['get', 'post'],'/appointment',[\App\Http\Controllers\AppointmentController::class,'index'])->name('appointment.index');
    Route::match(['get', 'post'],'/appointment/status/{id}',[\App\Http\Controllers\AppointmentController::class,'update_status'])->name('appointment.action');

});