<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    protected $table = 'categories';
    protected $primaryKey = 'id';
    protected $guarded = [];

    public function ouvrages()
    {
        return $this->hasMany('App\Ouvrage');
    }
}
