<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\NewsController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\notificationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('createNews',[NewsController::class,'store']);
Route::get('newsfeed',[NewsController::class,'show']);
Route::post('register',[AuthController::class, 'register']);
Route::post('login',[AuthController::class, 'login']);
Route::post('postNotification',[notificationController::class, 'postNotification']);
Route::delete('deleteNotification/{id}',[notificationController::class, 'deleteNotification']);
Route::get('viewNotification',[notificationController::class, 'viewNotification']);
Route::post('forgotPassword',[AuthController::class,"forgotPassword"])->middleware('guest')->name('password.email');
Route::post('resetPassword',[AuthController::class,"resetPassword"]);
Route::put('updateNotification',[notificationController::class, 'updateNotification']);
Route::middleware(['auth:sanctum'])->group(function() {
    Route::post('logout',[AuthController::class, 'logout']);

});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
