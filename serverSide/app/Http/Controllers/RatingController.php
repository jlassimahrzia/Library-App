<?php

namespace App\Http\Controllers;

use App\Rating;
use App\Ouvrage;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Response;
class RatingController extends Controller
{
    public function store(Request $request){
        $validator = Validator::make($request->json()->all(), [
            'rate'=> 'required',
            'user_id'=> 'required',
            'ouvrage_id'=> 'required',
        ]);
        $rating = Rating::where('user_id','=',$request->json()->get('user_id'))
        ->where('ouvrage_id','=',$request->json()->get('ouvrage_id'))->first();
        $ouvrage= Ouvrage::find($request->json()->get('ouvrage_id'));
        $user = User::find($request->json()->get('ouvrage_id'));
        if ($validator->fails()) {
            return response(["test"=> false , "errors"=>$validator->errors()->all()], 200);
        }
        else if(!isset($ouvrage)){
            return response()->json([ 'msg' => "Book not found"], 200);
        }
        else if(!isset($user)){
            return response()->json([ 'msg' => "Book not found"], 200);
        }
        if(isset($rating)){
            $rating->update([
                'rate'=> $request->json()->get('rate'),
                'user_id'=> $request->json()->get('user_id'),
                'ouvrage_id'=> $request->json()->get('ouvrage_id'),
            ]);
            return response()->json([
                'test'=> true ,
                'msg' => 'Rate successfully updated',
                'rating' => $rating
            ], 200);
        }
        else{
            $rating = Rating::Create([
                'rate'=> $request->json()->get('rate'),
                'user_id'=> $request->json()->get('user_id'),
                'ouvrage_id'=> $request->json()->get('ouvrage_id'),
            ]);
            return response()->json([
                'test'=> true ,
                'msg' => 'Rate successfully stored',
                'rating' => $rating
            ], 200);
        }
    }

    public function get_all(){
        return Rating::with('user','ouvrage')->get();
    }

}
