<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\NewsController;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\notificationController;
use App\Http\Controllers\API\profileController;
use App\Http\Controllers\API\institutionRegistration;

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
Route::post('createPost',[PostController::class,'store']);
Route::get('posts',[PostController::class,'show']);
Route::post('createNews',[NewsController::class,'store']);
Route::get('newsfeed',[NewsController::class,'show']);
Route::post('register',[AuthController::class, 'register']);
Route::post('login',[AuthController::class, 'login']);
Route::post('postNotification',[notificationController::class, 'postNotification']);
Route::delete('deleteNotification/{id}',[notificationController::class, 'deleteNotification']);
Route::get('viewNotification/{id}',[notificationController::class, 'viewNotificationUser']);
Route::post('forgotPassword',[AuthController::class,"forgotPassword"])->middleware('guest')->name('password.email');
Route::post('resetPassword',[AuthController::class,"resetPassword"]);
Route::put('updateNotification',[notificationController::class, 'updateNotification']);
Route::get('profile/{id}',[profileController::class,'profile']);
Route::get('getEmploymentHistory/{id}',[profileController::class,'getEmploymentHistory']);
Route::put('updateProfile/{id}',[profileController::class,'profileEdit']);
Route::put('editEmploymentHistory/{id}',[profileController::class,'editEmployment']);
Route::put('editSocialMediaLink/{id}',[profileController::class,'editsocialMediaLink']);
Route::delete('deleteEmployment/{id}',[profileController::class,'deleteEmployment']);
Route::delete('deleteInstitution/{id}',[institutionRegistrationController::class,'deleteInstitution']);
Route::delete('deleteSkill/{id}',[profileController::class,'deleteSkill']);
Route::delete('deleteSocialMediaLink/{id}',[profileController::class,'deleteSocialMediaLink']);
Route::delete('deleteCertificate/{id}',[profileController::class,'deleteCertificate']);
Route::post('addEmploymentHistory',[profileController::class,'addEmploymentHistory']);
Route::post('addCertificate',[profileController::class,'addCertificate']);
Route::post('addSkill',[profileController::class,'addSkill']);
Route::post('addSocialMediaLink',[profileController::class,'addsocialMediaLink']);
Route::get('all-institution',[institutionRegistration::class, 'allinstitution']);
// Route::get('all-department',[institutionRegistration::class, 'allDepartment']);
// Route::get('all-college',[institutionRegistration::class, 'allcollege']);

Route::delete('deleteInstitution/{id}',[institutionRegistration::class,'deleteInstitution']);

Route::middleware(['auth:sanctum'])->group(function() {
Route::post('logout',[AuthController::class, 'logout']);

});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
