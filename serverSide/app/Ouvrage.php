<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ouvrage extends Model
{
    protected $table = 'ouvrages';
    protected $primaryKey = 'id';
    protected $guarded = [];

    public function categorie()
    {
        return $this->belongsTo('App\Categorie');
    }

    public function emprunters()
    {
        return $this->hasMany('App\Emprunter');
    }

    public function rating()
    {
        return $this->hasMany('App\Rating');
    }

}
