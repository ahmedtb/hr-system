<?php

namespace Tests\Feature\DB;

use App\Models\Employee;
use App\Models\Head;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class HeadsTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_head_could_point_to_a_employee()
    {
        $employee = Employee::factory()->create();
        $head = Head::factory()->create(['employee_id' => $employee->id]);
        $this->assertNotEmpty($head->employee_id);
    }
}
