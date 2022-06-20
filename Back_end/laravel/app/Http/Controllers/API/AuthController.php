<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Contracts\Auth\PasswordBroker\RESET_LINK_SENT;
use Illuminate\Auth\Events\PasswordReset;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    //
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'=>'required|email|max:191|unique:users,email',
            'password'=>'required|min:8',
            'name'=>'required|max:191',
            'position'=>'required'

        ]);
 
        if ($validator->fails()) {
            return response()->json([
                'validation_errors'=> $validator->messages(),
            ]);
        } else {
            $user = User::create([
                'name'=> $request->name,
                'password'=> Hash::make($request->password),
                'email'=> $request->email,
                'position'=> $request->position
            ]);

            $token = $user->createToken($user->email.'_Token')->plainTextToken;
            
            return response()->json([
                'status'=>200,
                'email'=> $user->email,
                'token'=> $token,
                'name'=>$user->name,
                'position'=>$user->position,
                'id'=>$user->id,
                'message'=>'Registered Successfully'
            ]);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'=>'required|max:191',
            'password'=>'required'
       ]);

        if ($validator->fails()) {
            return response()->json([
                'validation_errors'=> $validator->messages(),
            ]);
        } else {
            $user = User::where('email', $request->email)->first();
 
            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response()->json([
                'status' => 401,
                'message' => "Invalid Credentials"
            ]);
            } else {
                $token = $user->createToken($user->email.'_Token')->plainTextToken;
            
                return response()->json([
                'status'=>200,
                'email'=> $user->email,
                'token'=> $token,
                'id'=> $user->id,
                'name'=>$user->name,
                'position'=>$user->position,
                'message'=>'Logged in Successfully'
            ]);
            }
        }
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Logged out Successfully'
        ]);
    }
    
    
    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'=>'required|max:191',
       ]);
        $request->validate(['email' => 'required|email']);
 
        $status = Password::sendResetLink(
            $request->only('email')
        );
        Log::info('works');
 
        if($status === Password::RESET_LINK_SENT){
            return response()->json([
                'status'=>200,
                'message'=>'An email has been sent to your account.'
            ]);
        }
        else {
            return response()->json([
                'status'=>400,
                'message'=>'Please try again.'
            ]);
        }
                
    }


    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);
     
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));
     
                $user->save();
     
                event(new PasswordReset($user));
            }
        );
       
        if(Password::PASSWORD_RESET){ return response()->json(['status'=>200,'message'=>'Password has been reset']);}
        else{return response()->json([
            'message'=>'Password not reset please try again.',
        ]);}
        return response()->json(['status'=>'message','message'=> 'Your password has been changed!']);
    }
}
