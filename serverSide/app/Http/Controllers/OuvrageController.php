<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Categorie;
use App\Ouvrage;
class OuvrageController extends Controller
{
    public function store(Request $request){

        $validator = Validator::make($request->json()->all(), [
            'codeIsbn' => 'required|string|unique:ouvrages',
            'titre' => 'required|string|unique:ouvrages',
            'auteur' => 'required|string',
            'edition' => 'required|string',
            'prix' => 'required',
            'photoCouverture'=> 'required|string',
            'resumer'=> 'required|string|nullable',
            'langue'=> 'required|string',
            'dateCreation'=> 'required|string',
            'nbrExemplaire'=> 'required|numeric',
            'nbrExemplaire'=> 'required|numeric',
            'type'=> 'required|numeric',
            'pdfVersion'=> 'required|string',
            'idCategorie'=> 'required',
        ]);

        $cat = Categorie::find($request->json()->get('idCategorie'));
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        else if (!$cat) {
            return response()->json([
                'msg' => "Categorie not found"
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
            'nbrExemplaire' => $request->json()->get('nbrExemplaire'),
            'nbrEmprunter' => $request->json()->get('nbrEmprunter'),
            'type' => $request->json()->get('type'),
            'pdfVersion' => $request->json()->get('pdfVersion'),
            'idCategorie' => $request->json()->get('idCategorie'),
        ]);

        return response()->json([
            'msg' => 'Ouvrage crée avec succées',
            'ouvrage' => $ouvrage
        ], 200);
    }
}
