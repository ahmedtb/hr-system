<?php

namespace Tests\Feature\DB;

use Tests\TestCase;
use Illuminate\Support\Str;
use App\Models\FormStructure;
use App\Models\Utilities\FormAccessToken;
use Carbon\Carbon;
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

    public function test_access_token_should_have_expiration_date()
    {
        $accessToken = FormAccessToken::factory()->create([
            'expiration_date' => Carbon::today()
        ]);
        $this->assertTrue($accessToken->isExpired());
        $this->assertFalse($accessToken->stillValid());

        $accessToken = FormAccessToken::factory()->create([
            'expiration_date' => Carbon::today()->addDay()
        ]);
        $this->assertFalse($accessToken->isExpired());
        $this->assertTrue($accessToken->stillValid());
    }

    public function test_access_token_have_max_number_of_submits()
    {
        $accessToken = FormAccessToken::factory()->create([
            'copies' => 5
        ]);
        // dd($accessToken->hasCopies());
        $this->assertTrue($accessToken->hasCopies());
        $this->assertTrue($accessToken->stillValid());

        $accessToken = FormAccessToken::factory()->create([
            'copies' => 0
        ]);
        $this->assertFalse($accessToken->hasCopies());
        $this->assertFalse($accessToken->stillValid());

        $accessToken = FormAccessToken::factory()->create([
            'copies' => 2
        ]);
        $accessToken->deleteCopy();
        $accessToken->deleteCopy();
        $this->assertEquals(FormAccessToken::all()->count(), 2);
    }

    public function test_form_structure_could_has_many_tokens()
    {
        $structure = FormStructure::factory()->create();
        $accessToken = FormAccessToken::factory(5)->create([
            'form_structure_id' => $structure->id,
        ]);

        $this->assertEquals($structure->accessTokens()->count(),5);
    }
}
