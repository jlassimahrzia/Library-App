<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use App\User;

class UserController extends Controller
{
    public function displayImage($filename)
    {
        $path = public_path('images/' . $filename);

        if (!File::exists($path)) {
            abort(404);
        }

        $file = File::get($path);

        $type = File::mimeType($path);

        $response = Response::make($file, 200);

        $response->header("Content-Type", $type);

        return $response;
    }

    public function get_intern_user(){
        return User::where('type','=','1')->get();
    }

    public function get_extern_user(){
        return User::where('type','=','2')->get();
    }
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
            //'photo' => 'required',
            'cin' => "required|digits:8|unique:users",
            'numCarte' => "required|digits:8|unique:users",
            'DateNaissance' => "required|date_format:Y-m-d",
            'telephone' => "required|digits:8",
            'adresse' => 'required|string',
            'appartement' => 'required|string',
            'ville' => 'required|string',
            'codePostal' => 'required|digits:4',
            'profession' => 'required|string',
            'type' => ['required'],
        ]);

        if ($validator->fails())
        {
            return response(["test"=> false , "errors"=>$validator->errors()->all()], 200);
        }
        if($request->json()->get('photo'))
        {
           $image = $request->json()->get('photo');
           $name = time().'.'. explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
           Image::make($request->json()->get('photo'))->save(public_path('images/').$name);
        }
        else{
            $name="avatar.png";
        }

        $user = User::create([
            'name' => $request->json()->get('name'),
            'email' => $request->json()->get('email'),
            'password' => Hash::make($request->json()->get('password')),
            'photo' => $name,
            'cin' => $request->json()->get('cin'),
            'numCarte' => $request->json()->get('numCarte'),
            'DateNaissance' => $request->json()->get('DateNaissance'),
            'telephone' => $request->json()->get('telephone'),
            'adresse' => $request->json()->get('adresse'),
            'appartement' => $request->json()->get('appartement'),
            'ville' => $request->json()->get('ville'),
            'codePostal' => $request->json()->get('codePostal'),
            'profession' => $request->json()->get('profession'),
            'type' => $request->json()->get('type')
        ]);
        return response()->json([
            'test'=> true ,
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
                'cin' => "required|digits:8|unique:users,cin,".$user->id,
                'DateNaissance' => "required|date",
                'telephone' => "required|digits:8",
                'adresse' => 'required|string',
                'appartement' => 'required|string',
                'ville' => 'required|string',
                'codePostal' => 'required|digits:4',
                'profession' => 'required|string'
            ]);

            if ($validator->fails()) {
                return response(["test"=> false , "errors"=>$validator->errors()->all()], 200);
            }
            if($request->json()->get('photo'))
            {
                $image = $request->json()->get('photo');
                $name = time().'.'. explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
                Image::make($request->json()->get('photo'))->save(public_path('images/').$name);
                if($user->photo != "avatar.png"){
                    if(File::exists(public_path('images/'.$user->photo))){
                        File::delete(public_path('images/'.$user->photo));
                    }
                }
            }
            else{
                $name=$user->photo;
            }

            $user->update([
                'name' => $request->json()->get('name'),
                'email' => $request->json()->get('email'),
                'photo' => $name,
                'cin' => $request->json()->get('cin'),
                'DateNaissance' => $request->json()->get('DateNaissance'),
                'telephone' => $request->json()->get('telephone'),
                'adresse' => $request->json()->get('adresse'),
                'appartement' => $request->json()->get('appartement'),
                'ville' => $request->json()->get('ville'),
                'codePostal' => $request->json()->get('codePostal'),
                'profession' => $request->json()->get('profession')
            ]);
            return response()->json([
                'test'=> true ,
                'msg' => 'User successfully updated',
                'user' => $user
            ], 200);
        }
        else return response()->json([ 'msg' => "User not found"], 200);
    }

    function delete($id){
        $user = User::find($id);
        if (isset($user)) {
            if($user->photo != "avatar.png"){
                if(File::exists(public_path('images/'.$user->photo))){
                    File::delete(public_path('images/'.$user->photo));
                }
            }
            $user->delete();
            return response()->json([ 'msg' => "User successfully deleted"], 200);
        }
        else return response()->json([ 'msg' => "User not found"], 200);
    }
    function search(Request $request){
        $s = $request->json()->get('search');
        return User::where('name', 'LIKE', "%$s%")
        ->orWhere('email', 'LIKE', "%$s%")
        ->orWhere('cin', 'LIKE', "%$s%")
        ->orWhere('numCarte', 'LIKE', "%$s%")
        ->orWhere('profession', 'LIKE', "%$s%")->get();
    }
}
