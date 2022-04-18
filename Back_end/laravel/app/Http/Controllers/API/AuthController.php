<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    //
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'email'=>'required|email|max:191|unique:users,email',
            'password'=>'required|min:8',
            'name'=>'required|max:191',
            'position'=>'required'

        ]);
 
        if($validator->fails())
        {
            return response()->json([
                'validation_errors'=> $validator->messages(),
            ]);
        }
        else{
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
       $validator = Validator::make($request->all(),[
            'email'=>'required|max:191',
            'password'=>'required'
       ]);

       if($validator->fails())
       {
            return response()->json([
                'validation_errors'=> $validator->messages(),
            ]);
       }
       else
       {
        $user = User::where('email', $request->email)->first();
 
        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 401,
                'message' => "Invalid Credentials"
            ]);
           
        }
        else
        {
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
}
