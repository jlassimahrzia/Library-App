<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class emprunter extends Model
{
    protected $table = 'emprunters';
    protected $primaryKey = 'id';
    protected $guarded = [];

    public function ouvrage()
    {
        return $this->hasOne('App\Ouvrage');
    }
    public function user()
    {
        return $this->hasOne('App\User');
    }
}
