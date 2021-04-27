<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\User;

class UserController extends Controller
{
    public function logout(Request $request) {
        $accessToken = $request->user()->token();
        DB::table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update([
                'revoked' => true
            ]);
        $accessToken->revoke();
        $response = ['message' => 'You have been successfully logged out!'];
        return response($response, 200);
    }

    // For External User
    public function register (Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
            'type' => ['required'],
        ]);
        if ($validator->fails())
        {
            return response(['errors'=>$validator->errors()->all()], 422);
        }
        $user = User::create([
            'name' => $request->json()->get('name'),
            'email' => $request->json()->get('email'),
            'password' => Hash::make($request->json()->get('password')),
            'type' => $request->json()->get('type')
        ]);
        $response = ['message' => 'You have been successfully signing up!'];
        return response($response, 200);
    }

    // For internal User
    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
            'photo' => ['required', 'string'],
            'cin' => "required|digits:8|unique:users",
            'numCarte' => "required|digits:8|unique:users",
            'numInscription' => "required|string|unique:users",
            'DateNaissance' => "required|date",
            'telephone' => "required|digits:8",
            'adresse' => 'required|string',
            'appartement' => 'required|string',
            'ville' => 'required|string',
            'codePostal' => 'required|digits:4',
            'niveau' => 'required|string',
            'classe' => 'required|string',
            'annee_universiatire' => 'required|string',
            'type' => ['required'],
        ]);
        if ($validator->fails())
        {
            return response(['errors'=>$validator->errors()->all()], 422);
        }
        $user = User::create([
            'name' => $request->json()->get('name'),
            'email' => $request->json()->get('email'),
            'password' => Hash::make($request->json()->get('password')),
            'photo' => $request->json()->get('photo'),
            'cin' => $request->json()->get('cin'),
            'numCarte' => $request->json()->get('numCarte'),
            'numInscription' => $request->json()->get('numInscription'),
            'DateNaissance' => $request->json()->get('DateNaissance'),
            'telephone' => $request->json()->get('telephone'),
            'adresse' => $request->json()->get('adresse'),
            'appartement' => $request->json()->get('appartement'),
            'ville' => $request->json()->get('ville'),
            'codePostal' => $request->json()->get('codePostal'),
            'niveau' => $request->json()->get('niveau'),
            'classe' => $request->json()->get('classe'),
            'annee_universiatire' => $request->json()->get('annee_universiatire'),
            'type' => $request->json()->get('type')
        ]);
        return response()->json([
            'msg' => 'User successfully created',
            'User' => $user
        ], 200);
    }

    function update(Request $request , $id){
        $user = User::find($id);
        if (isset($user)) {
            $validator = Validator::make($request->json()->all(), [
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,'.$user->id],
                'password' => ['required', 'string', 'min:8'],
                'photo' => ['required', 'string'],
                'cin' => "required|digits:8|unique:users,cin,".$user->id,
                'numCarte' => "required|digits:8|unique:users,numCarte,".$user->id,
                'numInscription' => "required|string|unique:users,numInscription,".$user->id,
                'DateNaissance' => "required|date",
                'telephone' => "required|digits:8",
                'adresse' => 'required|string',
                'appartement' => 'required|string',
                'ville' => 'required|string',
                'codePostal' => 'required|digits:4',
                'niveau' => 'required|string',
                'classe' => 'required|string',
                'annee_universiatire' => 'required|string',
                'type' => ['required']
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            }

            $user->update([
                'name' => $request->json()->get('name'),
                'email' => $request->json()->get('email'),
                'password' => Hash::make($request->json()->get('password')),
                'photo' => $request->json()->get('photo'),
                'cin' => $request->json()->get('cin'),
                'numCarte' => $request->json()->get('numCarte'),
                'numInscription' => $request->json()->get('numInscription'),
                'DateNaissance' => $request->json()->get('DateNaissance'),
                'telephone' => $request->json()->get('telephone'),
                'adresse' => $request->json()->get('adresse'),
                'appartement' => $request->json()->get('appartement'),
                'ville' => $request->json()->get('ville'),
                'codePostal' => $request->json()->get('codePostal'),
                'niveau' => $request->json()->get('niveau'),
                'classe' => $request->json()->get('classe'),
                'annee_universiatire' => $request->json()->get('annee_universiatire'),
                'type' => $request->json()->get('type')
            ]);
            return response()->json([
                'msg' => 'User successfully updated',
                'user' => $user
            ], 200);
        }
        else return response()->json([ 'msg' => "User not found"], 200);
    }

    function delete($id){
        $user = User::find($id);
        if (isset($user)) {
            $user->delete();
            return response()->json([ 'msg' => "User successfully deleted"], 200);
        }
        else return response()->json([ 'msg' => "User not found"], 200);
    }
}
