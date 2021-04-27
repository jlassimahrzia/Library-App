<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Categorie;

class CategorieController extends Controller
{
    function index(){
        return Categorie::with('ouvrages')->get();
    }

    function get_cat_by_id($id){
        $cat = Categorie::find($id);
        if (!$cat) {
            return response()->json([
                'msg' => "Category not found"
            ], 200);
        }
        else return $cat ;
    }

    function store(Request $request){
        $validator = Validator::make($request->json()->all(), [
            'libelle' => 'required|string',
            'description' => 'string|nullable',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $category = Categorie::create([
            'libelle' =>  $request->json()->get('libelle'),
            'description' =>  $request->json()->get('description'),
        ]);

        return response()->json([
            'msg' => 'Catégorie créée avec succès',
            'category' => $category
        ], 200);
    }

    function update(Request $request, $id){
        $category = Categorie::find($id);
        if (isset($category)) {
            $validator = Validator::make($request->json()->all(), [
                'libelle' => 'required|string',
                'description' => 'string|nullable',
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            }

            $category->update([
                'libelle' =>  $request->json()->get('libelle'),
                'description' =>  $request->json()->get('description'),
            ]);
            return response()->json([
                'msg' => 'Category successfully updated',
                'category' => $category
            ], 200);
        }
        else return response()->json([ 'msg' => "Category not found"], 200);
    }

    function delete($id){
        $category = Categorie::find($id);
        if (isset($category)) {
            $category->delete();
            return response()->json([ 'msg' => "Category successfully deleted"], 200);
        }
        else return response()->json([ 'msg' => "Category not found"], 200);
    }

    function search(Request $request){
        $s = $request->json()->get('search');
        return Categorie::with('ouvrages')->where('libelle', 'LIKE', "%$s%")->get();
    }
}
