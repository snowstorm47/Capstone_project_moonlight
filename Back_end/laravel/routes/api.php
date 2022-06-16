<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\NewsController;
use App\Http\Controllers\API\searchController;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\notificationController;
use App\Http\Controllers\API\profileController;
use App\Http\Controllers\API\instructorProfileController;
use App\Http\Controllers\API\institutionRegistration;
use App\Http\Controllers\API\hiringCompanyController;
use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\recommendationController;

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
Route::delete('deletePost/{id}',[PostController::class,'destroy']);
Route::post('createNews',[NewsController::class,'store']);
Route::get('newsfeed',[NewsController::class,'show']);
Route::delete('deleteNews/{id}',[NewsController::class,'destroy']);
Route::post('register',[AuthController::class, 'register']);
Route::post('login',[AuthController::class, 'login']);
Route::post('postNotification',[notificationController::class, 'postNotification']);
Route::delete('deleteNotification/{id}',[notificationController::class, 'deleteNotification']);
Route::delete('deleteHiringCompany',[AdminController::class, 'destroyHiringCompany']);
Route::delete('deleteInstitution',[AdminController::class, 'destroyInstitution']);
Route::delete('deleteVerifyNotification',[AdminController::class, 'deleteVerifyNotification']);
Route::get('viewInstitutionNotification/{id}',[AdminController::class, 'showNotificationInstitution']);
Route::get('hiring',[AdminController::class,'showHiring']);
Route::get('aboutus',[AdminController::class,'showAboutus']);
Route::put('editaboutus/{id}',[AdminController::class,'editAboutus']);
Route::put('editcontact/{id}',[AdminController::class,'editContact']);
Route::put('verifyInstitution',[AdminController::class,'acceptInstitution']);
Route::get('admincontact',[AdminController::class,'showAdminContact']);
Route::post('sendcontactus',[AdminController::class,'sendMessage']);
Route::delete('deletemessage',[AdminController::class,'deleteMessage']);
Route::get('showmessage',[AdminController::class,'showMessage']);
Route::get('viewNotification/{id}',[notificationController::class, 'viewNotificationUser']);
Route::get('viewNotificationRecieved/{id}',[notificationController::class, 'viewNotificationRecieved']);
Route::get('viewSeenNotification/{id}',[notificationController::class, 'viewSeenNotification']);
Route::put('seenNotification/{id}',[notificationController::class, 'seenNotification']);
Route::post('forgotPassword',[AuthController::class,"forgotPassword"])->middleware('guest')->name('password.email');
Route::post('resetPassword',[AuthController::class,"resetPassword"]);
Route::put('updateNotification/{id}',[notificationController::class, 'updateNotification']);
Route::get('showNotification/{id}',[notificationController::class, 'showNotification']);
Route::get('showInstitutionNotification/{id}',[notificationController::class, 'showInstitutionNotification']);
Route::get('showInstructorNotification/{id}',[notificationController::class, 'showInstructorNotification']);
Route::get('showHiringCompanyNotification/{id}',[notificationController::class, 'showHiringCompanyNotification']);
Route::get('profile/{id}',[profileController::class,'profile']);
Route::get('instructorprofile/{id}',[instructorProfileController::class,'profile']);
Route::get('hiringCompanyprofile/{id}',[hiringCompanyController::class,'profile']);
Route::get('institutionprofile/{id}',[institutionRegistration::class,'profile']);
Route::get('getProfilePicture/{id}',[profileController::class,'getProfilePicture']);
Route::get('getInstructorProfilePicture/{id}',[instructorProfileController::class,'getProfilePicture']);
Route::get('getInstitutionProfilePicture/{id}',[institutionRegistration::class,'getProfilePicture']);
Route::get('getHiringCompanyProfilePicture/{id}',[hiringCompanyController::class,'getProfilePicture']);
Route::post('addProfile/{id}',[profileController::class,'addStudentProfile']);
Route::post('addInstitutionProfile/{id}',[institutionRegistration::class,'addInstitutionProfile']);
Route::post('addInstructorProfile/{id}',[instructorProfileController::class,'addInstructorProfile']);
Route::post('addHiringCompanyProfile/{id}',[hiringCompanyController::class,'addHiringCompanyProfile']);
Route::get('getSocialMediaLink/{id}',[profileController::class,'getSocialMediaLink']);
Route::get('filterStudent/{id}',[recommendationController::class,'filterStudent']);
Route::get('getInstructorInstitutionId/{id}',[recommendationController::class,'instructorInstitutionId']);
Route::get('getSocialMediaLinkSingle/{id}',[profileController::class,'getSocialMediaLinkSingle']);
Route::get('getEmploymentHistory/{id}',[profileController::class,'getEmploymentHistory']);
Route::put('updateProfile/{id}',[profileController::class,'profileEdit']);
Route::put('updateInstructorProfile/{id}',[instructorProfileController::class,'profileEdit']);
Route::put('updateInstitutionProfile/{id}',[institutionRegistration::class,'profileEdit']);
Route::put('updateHiringCompanyProfile/{id}',[hiringCompanyController::class,'profileEdit']);
Route::post('sendRecommendation',[recommendationController::class,'sendRecommendation']);
Route::post('updateProfilePicture/{id}',[profileController::class,'editProfilePicture']);
Route::post('updateInstructorProfilePicture/{id}',[InstructorProfileController::class,'editProfilePicture']);
Route::post('updateInstitutionProfilePicture/{id}',[institutionRegistration::class,'editProfilePicture']);
Route::post('updateHiringCompanyProfilePicture/{id}',[hiringCompanyController::class,'editProfilePicture']);
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
Route::get('advancedSearch',[searchController::class, 'AdvancedSearch']);
Route::get('institutions',[searchController::class, 'getInstitutions']);
Route::get('Department',[searchController::class, 'getDepartment']);
Route::get('College',[searchController::class, 'getCollege']);
Route::get('showMyNews',[NewsController::class,'showMyInstitution']);




// Route::get('all-department',[institutionRegistration::class, 'allDepartment']);
// Route::get('all-college',[institutionRegistration::class, 'allcollege']);

Route::delete('deleteInstitution/{id}',[institutionRegistration::class,'deleteInstitution']);

Route::middleware(['auth:sanctum'])->group(function() {
Route::post('logout',[AuthController::class, 'logout']);

});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
