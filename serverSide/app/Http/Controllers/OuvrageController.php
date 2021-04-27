<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Categorie;
use App\Ouvrage;
class OuvrageController extends Controller
{
    public function index(){
        return Ouvrage::with('categorie','emprunters.user')->get();
    }

    function get_ouvrage_by_id($id){
        $ouvrage = Ouvrage::with('categorie','emprunters.user')->where('id','=',$id)->get();
        if (!$ouvrage) {
            return response()->json([
                'msg' => "Book not found"
            ], 200);
        }
        else return $ouvrage ;
    }

    public function store(Request $request){

        $validator = Validator::make($request->json()->all(), [
            'codeIsbn' => 'required|string|unique:ouvrages',
            'titre' => 'required|string|unique:ouvrages',
            'auteur' => 'required|string',
            'edition' => 'required|string',
            'prix' => 'required',
            'photoCouverture'=> 'required|string',
            'resumer'=> 'string|nullable',
            'langue'=> 'required|string',
            'dateCreation' => 'required|date',
            'nbrExemplaire'=> 'required|numeric',
            'nbrEmprunter'=> 'required|numeric',
            'type'=> 'required|numeric',
            'pdfVersion'=> 'required|string',
            'categorie_id'=> 'required',
        ]);

        $cat = Categorie::find($request->json()->get('categorie_id'));
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        else if (!$cat) {
            return response()->json([
                'msg' => "Category not found"
            ], 200);
        }

        $ouvrage = Ouvrage::create([
            'codeIsbn' => $request->json()->get('codeIsbn'),
            'titre' => $request->json()->get('titre'),
            'auteur' => $request->json()->get('auteur'),
            'edition' => $request->json()->get('edition'),
            'prix' => $request->json()->get('prix'),
            'photoCouverture' => $request->json()->get('photoCouverture'),
            'resumer' => $request->json()->get('resumer'),
            'langue' => $request->json()->get('langue'),
            'dateCreation' => $request->json()->get('dateCreation'),
            'nbrExemplaire' => $request->json()->get('nbrExemplaire'),
            'nbrEmprunter' => $request->json()->get('nbrEmprunter'),
            'type' => $request->json()->get('type'),
            'pdfVersion' => $request->json()->get('pdfVersion'),
            'categorie_id' => $request->json()->get('categorie_id'),
        ]);

        return response()->json([
            'msg' => 'Book successfully created',
            'ouvrage' => $ouvrage
        ], 200);
    }

    function update(Request $request , $id){
        $ouvrage = Ouvrage::find($id);
        if (isset($ouvrage)) {
            $validator = Validator::make($request->json()->all(), [
                'codeIsbn' => 'required|string',
                'titre' => 'required|string',
                'auteur' => 'required|string',
                'edition' => 'required|string',
                'prix' => 'required',
                'photoCouverture'=> 'required|string',
                'resumer'=> 'string|nullable',
                'langue'=> 'required|string',
                'dateCreation' => 'required|date',
                'nbrExemplaire'=> 'required|numeric',
                'nbrEmprunter'=> 'required|numeric',
                'type'=> 'required|numeric',
                'pdfVersion'=> 'required|string',
                'categorie_id'=> 'required',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            }

            $ouvrage->update([
                'codeIsbn' => $request->json()->get('codeIsbn'),
                'titre' => $request->json()->get('titre'),
                'auteur' => $request->json()->get('auteur'),
                'edition' => $request->json()->get('edition'),
                'prix' => $request->json()->get('prix'),
                'photoCouverture' => $request->json()->get('photoCouverture'),
                'resumer' => $request->json()->get('resumer'),
                'langue' => $request->json()->get('langue'),
                'dateCreation' => $request->json()->get('dateCreation'),
                'nbrExemplaire' => $request->json()->get('nbrExemplaire'),
                'nbrEmprunter' => $request->json()->get('nbrEmprunter'),
                'type' => $request->json()->get('type'),
                'pdfVersion' => $request->json()->get('pdfVersion'),
                'categorie_id' => $request->json()->get('categorie_id'),
            ]);
            return response()->json([
                'msg' => 'Book successfully updated',
                'ouvrage' => $ouvrage
            ], 200);
        }
        else return response()->json([ 'msg' => "Book not found"], 200);
    }

    function delete($id){
        $ouvrage = Ouvrage::find($id);
        if (isset($ouvrage)) {
            $ouvrage->delete();
            return response()->json([ 'msg' => "Ouvrage successfully deleted"], 200);
        }
        else return response()->json([ 'msg' => "Ouvrage not found"], 200);
    }
}
