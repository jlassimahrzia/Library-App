<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Categorie;
use App\Ouvrage;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
class OuvrageController extends Controller
{
    public function index(){
        return Ouvrage::with('categorie','rating','rating.user')->get();
    }

    public function displayImage($filename)
    {
        $path = public_path('photos_couverture/' . $filename);

        if (!File::exists($path)) {
            abort(404);
        }

        $file = File::get($path);

        $type = File::mimeType($path);

        $response = Response::make($file, 200);

        $response->header("Content-Type", $type);

        return $response;
    }
    public function displayPDF($filename)
    {
        $path = public_path('files/' . $filename);

        if (!File::exists($path)) {
            abort(404);
        }

        $file = File::get($path);

        $type = File::mimeType($path);

        $response = Response::make($file, 200);

        $response->header("Content-Type", $type);

        return $response;
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

    public function upload_pdf(Request $request){
        $fileName = time().'.'.$request->file->extension();
        $request->file->move(public_path('files'), $fileName);
        return $fileName ;
    }

    public function store(Request $request){

        $validator = Validator::make($request->json()->all(), [
            'codeIsbn' => 'required|string|unique:ouvrages',
            'titre' => 'required|string|unique:ouvrages',
            'auteur' => 'required|string',
            'edition' => 'required|string',
            'prix' => 'required',
            'resumer'=> 'string|nullable',
            'langue'=> 'required|string',
            'dateCreation' => 'required|date',
            'nbrExemplaire'=> 'required|numeric',
            'type'=> 'required|numeric',
            'categorie_id'=> 'required',
        ]);

        $cat = Categorie::find($request->json()->get('categorie_id'));
        if ($validator->fails()) {
            return response(["test"=> false , "errors"=>$validator->errors()->all()], 200);
        }
        else if (!$cat) {
            return response()->json([
                'msg' => "Category not found"
            ], 200);
        }
        if($request->json()->get('photoCouverture'))
        {
           $image = $request->json()->get('photoCouverture');
           $name = time().'.'. explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
           Image::make($request->json()->get('photoCouverture'))->save(public_path('photos_couverture/').$name);
        }
        else{
            $name = "default_cover.png" ;
        }
        if($request->json()->get('pdfVersion')){
            $pdf = $request->json()->get('pdfVersion');
        }
        else {
            $pdf = null;
        }
        $ouvrage = Ouvrage::create([
            'codeIsbn' => $request->json()->get('codeIsbn'),
            'titre' => $request->json()->get('titre'),
            'auteur' => $request->json()->get('auteur'),
            'edition' => $request->json()->get('edition'),
            'prix' => $request->json()->get('prix'),
            'photoCouverture' => $name,
            'resumer' => $request->json()->get('resumer'),
            'langue' => $request->json()->get('langue'),
            'dateCreation' => $request->json()->get('dateCreation'),
            'nbrExemplaire' => $request->json()->get('nbrExemplaire'),
            'nbrEmprunter' => 0,
            'type' => $request->json()->get('type'),
            'pdfVersion' => $pdf ,
            'categorie_id' => $request->json()->get('categorie_id'),
        ]);

        return response()->json([
            'test'=> true ,
            'msg' => 'Book successfully created',
            'ouvrage' => $ouvrage
        ], 200);
    }

    function update(Request $request , $id){
        $ouvrage = Ouvrage::find($id);
        if (isset($ouvrage)) {

        $validator = Validator::make($request->json()->all(), [
            'codeIsbn' => 'required|string|unique:ouvrages,codeIsbn,'.$ouvrage->id,
            'titre' => 'required|string|unique:ouvrages,titre,'.$ouvrage->id,
            'auteur' => 'required|string',
            'edition' => 'required|string',
            'prix' => 'required',
            'resumer'=> 'string|nullable',
            'langue'=> 'required|string',
            'dateCreation' => 'required|date',
            'nbrExemplaire'=> 'required|numeric',
            'type'=> 'required|numeric',
            'categorie_id'=> 'required',
        ]);

        $cat = Categorie::find($request->json()->get('categorie_id'));
        if ($validator->fails()) {
            return response(["test"=> false , "errors"=>$validator->errors()->all()], 200);
        }
        else if (!$cat) {
            return response()->json([
                'msg' => "Category not found"
            ], 200);
        }
        if($request->json()->get('photoCouverture'))
        {
           $image = $request->json()->get('photoCouverture');
           $name = time().'.'. explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
           Image::make($request->json()->get('photoCouverture'))->save(public_path('photos_couverture/').$name);
           if($ouvrage->photoCouverture !=="default_cover.png"){
                if(File::exists(public_path('photoCouverture/'.$ouvrage->photoCouverture))){
                    File::delete(public_path('photoCouverture/'.$ouvrage->photoCouverture));}
           }
        }
        else{
            $name = $ouvrage->photoCouverture ;
        }
        if($request->json()->get('pdfVersion')){
            $pdf = $request->json()->get('pdfVersion');
            if(File::exists(public_path('files/'.$ouvrage->pdfVersion))){
                File::delete(public_path('files/'.$ouvrage->pdfVersion));}
        }
        else {
            $pdf = $ouvrage->pdfVersion;
        }
        $ouvrage->update([
            'codeIsbn' => $request->json()->get('codeIsbn'),
            'titre' => $request->json()->get('titre'),
            'auteur' => $request->json()->get('auteur'),
            'edition' => $request->json()->get('edition'),
            'prix' => $request->json()->get('prix'),
            'photoCouverture' => $name,
            'resumer' => $request->json()->get('resumer'),
            'langue' => $request->json()->get('langue'),
            'dateCreation' => $request->json()->get('dateCreation'),
            'nbrExemplaire' => $request->json()->get('nbrExemplaire'),
            'nbrEmprunter' => $ouvrage->nbrEmprunter,
            'type' => $request->json()->get('type'),
            'pdfVersion' => $pdf ,
            'categorie_id' => $request->json()->get('categorie_id'),
        ]);

        return response()->json([
            'test'=> true ,
            'msg' => 'Book successfully updated',
            'ouvrage' => $ouvrage
        ], 200);
        }
        else return response()->json([ 'msg' => "Book not found"], 200);
    }

    function delete($id){
        $ouvrage = Ouvrage::find($id);
        if (isset($ouvrage)) {
            if($ouvrage->photoCouverture !=="default_cover.png"){
                if(File::exists(public_path('photoCouverture/'.$ouvrage->photoCouverture))){
                    File::delete(public_path('photoCouverture/'.$ouvrage->photoCouverture));}
            }
            if(File::exists(public_path('files/'.$ouvrage->pdfVersion))){
                File::delete(public_path('files/'.$ouvrage->pdfVersion));}
            $ouvrage->delete();
            return response()->json([ 'msg' => "Ouvrage successfully deleted"], 200);
        }
        else return response()->json([ 'msg' => "Ouvrage not found"], 200);
    }

    function search(Request $request){
        $s = $request->json()->get('search');
        return Ouvrage::with('categorie')->where('codeIsbn', 'LIKE', "%$s%")->orWhere('titre', 'LIKE', "%$s%")
        ->orWhere('auteur', 'LIKE', "%$s%")->orWhere('edition', 'LIKE', "%$s%")->get();
    }
}
