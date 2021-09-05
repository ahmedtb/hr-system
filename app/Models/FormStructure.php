<?php

namespace App\Models;

use App\Casts\ArrayOfFields as CastsArrayOfFields;
use App\Models\Utilities\FormAccessToken;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FormStructure extends Model
{
    use HasFactory;

    protected $casts = [
        'array_of_fields' => CastsArrayOfFields::class
    ];

    protected $guarded = [];

    protected $appends = ['copies_count'];

    public function formable()
    {
        return $this->morphTo();
    }

    public function forms()
    {
        return $this->hasMany(Form::class);
    }

    public function accessTokens()
    {
        return $this->hasMany(FormAccessToken::class);
    }

    public function deleteInvalidAccessTokens()
    {
        $this->accessTokens()->where('copies', '<=', 0)->orWhereDate('expiration_date', '<=', Carbon::today())->delete();
    }

    public function getCopiesCountAttribute()
    {
        return $this->copiesCount();
    }

    public function copiesCount()
    {
        return $this->accessTokens()->sum('copies');
    }
}
