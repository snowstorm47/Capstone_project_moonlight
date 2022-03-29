<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\notificationController;


Route::post('register',[AuthController::class, 'register']);
Route::post('login',[AuthController::class, 'login']);

Route::post('postNotification',[notificationController::class, 'postNotification']);
Route::delete('deleteNotification/{id}',[notificationController::class, 'deleteNotification']);
Route::get('viewNotification',[notificationController::class, 'viewNotification']);
Route::put('updateNotification',[notificationController::class, 'updateNotification']);


Route::middleware(['auth:sanctum'])->group(function() {
    Route::post('logout',[AuthController::class, 'logout']);

});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
