<?php

namespace Tests\Feature\DB;

use Tests\TestCase;
use Illuminate\Support\Str;
use App\Models\FormStructure;
use App\Models\Utilities\FormAccessToken;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AccessTokenTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_accessToken_belongs_to_a_structure()
    {
        $structure = FormStructure::factory()->create();
        $accessToken = FormAccessToken::create([
            'form_structure_id' => $structure->id,
            'access_token' => Str::random(15)
        ]);
        $this->assertEquals($accessToken->structure->access_token, $structure->access_token);
        $this->assertEquals($accessToken->structure->id, $structure->id);
    }
}
