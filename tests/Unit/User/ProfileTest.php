<?php

namespace Tests\Unit\User;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class ProfileTest extends TestCase
{
    use RefreshDatabase;

    public $user;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = factory(User::class)->create();

        $this->assertCount(1, $this->user::all());

    }

    /**
     * Test Case: User has a firstname.
     * @test
     * @group
     * @return void
     */
    public function userHasProfileFirstname()
    {
        $name = explode(' ', $this->user->name);

        $this->user->profile()->create([
            'firstname' => $name[0],
            'lastname' => $name[1],
        ]);

        $this->assertEquals($this->user->profile->firstname, $name[0]);
    }

    /**
     * Test Case: User has a lastname.
     * @test
     * @group
     * @return void
     */
    public function userHasProfileLastname()
    {
        $name = explode(' ', $this->user->name);

        $this->user->profile()->create([
            'firstname' => $name[0],
            'lastname' => $name[1],
        ]);

        $this->assertEquals($this->user->profile->lastname, $name[1]);

    }
}
