<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Emprunter extends Model
{
    protected $table = 'emprunters';
    protected $primaryKey = 'id';
    protected $guarded = [];

    public function ouvrage()
    {
        return $this->belongsTo('App\Ouvrage');
    }
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
