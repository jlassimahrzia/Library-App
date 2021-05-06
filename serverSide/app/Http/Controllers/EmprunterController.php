<?php

namespace App\Http\Controllers;

use App\Emprunter;
use App\Ouvrage;
use App\User;
use Illuminate\Support\Facades\Validator;
use DateTime;
use Illuminate\Http\Request;

class EmprunterController extends Controller
{
    public function getEmpruntsEnCours(){
        $CurrentDay = new DateTime();
        $CurrentDay = $CurrentDay->format('Y-m-d');
        return Emprunter::with('ouvrage.categorie','user')->where('rendu','=','non')->where('dateFin','>=',$CurrentDay)->get();
    }
    public function getEmpruntsEnRetards(){
        $CurrentDay = new DateTime();
        $CurrentDay = $CurrentDay->format('Y-m-d');
        return Emprunter::with('ouvrage.categorie','user')->where('rendu','=','non')->where('dateFin','<',$CurrentDay)->get();
    }
    public function getEmpruntsEnArchives(){
        return Emprunter::with('ouvrage.categorie','user')->where('rendu','=','oui')->get();
    }
    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'user_id' => ['required'],
            'ouvrage_id' => ['required'],
            'dateDebut' => "required|date_format:Y-m-d",
            'dateFin' => "required|date_format:Y-m-d",
        ]);
        $ouvrage = Ouvrage::find($request->json()->get('ouvrage_id'));

        $user = User::where('id','=',$request->json()->get('user_id'))
        ->where('type','=','1')->get();
        if ($validator->fails()) {
            return response(["test"=> false , "errors"=>$validator->errors()->all()], 200);
        }
        else if (!$ouvrage) {
            return response()->json([
                "test"=> false , "errors"=>["Book not found"]
            ], 200);
        }
        else if (!$user) {
            return response()->json([
                "test"=> false , "errors"=>["User not found"]
            ], 200);
        }
        else if($ouvrage->nbrExemplaire === $ouvrage->nbrEmprunter){
            return response()->json([
                "test"=> false , "errors"=>["Ouvrage N'est plus disponible"]
            ], 200);
        }
        $ouvrage->update(["nbrEmprunter" => $ouvrage->nbrEmprunter+1]);
        $emprunt = Emprunter::create([
            'ouvrage_id' => $request->json()->get('ouvrage_id'),
            'user_id' => $request->json()->get('user_id'),
            'dateDebut' => $request->json()->get('dateDebut'),
            'dateFin' => $request->json()->get('dateFin'),
            'rendu' => 'non',
        ]);
        return response()->json([
            'test'=> true ,
            'msg' => 'Emprunt successfully created',
            'User' => $emprunt
        ], 200);
    }

    public function setRendu(Request $request){
        $emprunt = Emprunter::find($request->json()->get('id'));
        $ouvrage = Ouvrage::find($emprunt->ouvrage_id);
        if(isset($emprunt)){
            $ouvrage->update(["nbrEmprunter" => $ouvrage->nbrEmprunter - 1]);
            $emprunt->update([
                'rendu' => 'oui'
            ]);
            return response()->json([ 'msg' => "Emprunt terminée"], 200);
        }
        else {
            return response()->json([ 'msg' => "Emprunt not found"], 200);
        }
    }

    public function delete($id){
        $emprunt = Emprunter::find($id);
        $ouvrage = Ouvrage::find($emprunt->ouvrage_id);
        if(isset($emprunt)){
            $ouvrage->update(["nbrEmprunter" => $ouvrage->nbrEmprunter - 1]);
            $emprunt->delete();
            return response()->json([ 'msg' => "Emprunt supprimée avec succée"], 200);
        }
        else {
            return response()->json([ 'msg' => "Emprunt not found"], 200);
        }
    }

    public function update($id,Request $request){
        $emprunt = Emprunter::find($id);
        if(isset($emprunt)){
            $validator = Validator::make($request->all(), [
                'user_id' => ['required'],
                'ouvrage_id' => ['required'],
                'dateDebut' => "required|date_format:Y-m-d",
                'dateFin' => "required|date_format:Y-m-d",
            ]);
            $ouvrage = Ouvrage::find($request->json()->get('ouvrage_id'));

            $user = User::where('id','=',$request->json()->get('user_id'))
            ->where('type','=','1')->get();
            if ($validator->fails()) {
                return response(["test"=> false , "errors"=>$validator->errors()->all()], 200);
            }
            else if (!$ouvrage) {
                return response()->json([
                    "test"=> false , "errors"=>["Book not found"]
                ], 200);
            }
            else if (!$user) {
                return response()->json([
                    "test"=> false , "errors"=>["User not found"]
                ], 200);
            }
            else if($ouvrage->nbrExemplaire === $ouvrage->nbrEmprunter){
                return response()->json([
                    "test"=> false , "errors"=>["Ouvrage N'est plus disponible"]
                ], 200);
            }
            if($emprunt->ouvrage_id !== $request->json()->get('ouvrage_id') ){
                $old_ouvrage= Ouvrage::find($emprunt->ouvrage_id);
                $old_ouvrage->update(["nbrEmprunter" => $old_ouvrage->nbrEmprunter - 1]);
                $ouvrage->update(["nbrEmprunter" => $ouvrage->nbrEmprunter+1]);
            }
            $emprunt->update([
                'ouvrage_id' => $request->json()->get('ouvrage_id'),
                'user_id' => $request->json()->get('user_id'),
                'dateDebut' => $request->json()->get('dateDebut'),
                'dateFin' => $request->json()->get('dateFin'),
            ]);
            return response()->json([
                'test'=> true ,
                'msg' => 'Emprunt modifiée avec succée',
                'User' => $emprunt
            ], 200);
        }
        else {
            return response()->json([ 'msg' => "Emprunt not found"], 200);
        }
    }
    function search(Request $request){
        $s = $request->json()->get('search');
        return Emprunter::with('ouvrage','user')
        ->where('dateDebut', 'LIKE', "%$s%")
        ->orWhere('dateFin', 'LIKE', "%$s%")->get();
    }
}
