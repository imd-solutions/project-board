<?php

namespace Tests\Unit\GraphQL\Query;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Auth\Passwords\PasswordBroker;
use Illuminate\Support\Facades\Notification;
use Tests\Fragments;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use MarvinRabe\LaravelGraphQLTest\TestGraphQL;
use DB;
use App\Models\User;
use App\Models\Profile;

class UserTest extends TestCase
{
    use RefreshDatabase, TestGraphQL, Fragments;

    public $user;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = factory(User::class)->create();

        $this->assertCount(1, $this->user::all());

        $name = explode(' ', $this->user->name);

        $this->user->profile()->save(factory(Profile::class)->create([
            'user_id' => $this->user->id,
            'firstname' => $name[0],
            'lastname' => $name[1]
        ]));
    }

    /**
     * Test Case: Can get all the users from the database.
     * @test
     * @group
     * @return void
     */
    public function canGetUsersFromDatabase()
    {
        $users = factory(User::class, 2)->create();

        $this->assertCount(3, User::all());

        $nameA = explode(' ', $users[0]->name);
        $nameB = explode(' ', $users[1]->name);

        $users[0]->profile()->create([
            'firstname' => $nameA[0],
            'lastname' => $nameA[1]
        ]);

        $users[1]->profile()->create([
            'firstname' => $nameB[0],
            'lastname' => $nameB[1]
        ]);

        $response = $this->query('users', $this->userFragment())
            ->assertJsonStructure([
                'data' => [
                    'users' => [
                        [
                            'name',
                            'email'
                        ]
                    ]
                ]
            ]);

        $response->assertSee($this->encodeJsonResult($response['data']['users']));
    }

    /**
     * Test Case: Can get a single user from the database.
     * @test
     * @group
     * @return void
     */
    public function canGetSingleUserFromDatabase()
    {
        $name = explode(' ', $this->user->name);

        $this->assertCount(1, Profile::all());

        $response = $this->query('user', ['id' => $this->user->id], $this->userFragment())
            ->assertJsonStructure([
                'data' => [
                    'user' => [
                        'name',
                        'email',
                        'profile' => [
                            'firstname',
                            'lastname'
                        ]
                    ]
                ]
            ]);

        $response->assertSee($this->encodeJsonResult($response['data']['user']));
    }

    /**
     * Test Case: User can request a password reset link.
     * @test
     * @group
     * @return void
     */
    public function canRequestPasswordReset()
    {
        $response = $this->mutation('forgotPassword', ['input' => ['email' => $this->user->email]], $this->messageFragment())
            ->assertJsonStructure([
                'data' => [
                    'forgotPassword' => [
                        'status',
                        'message'
                    ]
                ]
            ]);

        $response->assertSee($this->encodeJsonResult($response['data']['forgotPassword']));

        $this->assertCount(1, DB::table('password_resets')->get());

    }

    /**
     * Test Case: Users password request token is valid.
     * @test
     * @group
     * @return void
     */
    public function passwordTokenIsValid()
    {
        Notification::fake();

        $token = app(PasswordBroker::class)->createToken($this->user);

        $this->assertCount(1, DB::table('password_resets')->get());

        $response = $this->query('validPasswordResetToken', ['input' => ['token' => $token, 'email' => $this->user->email]], $this->messageFragment())
            ->assertJsonStructure([
                'data' => [
                    'validPasswordResetToken' => [
                        'status',
                        'message'
                    ]
                ]
            ]);

        $response->assertSee($this->encodeJsonResult($response['data']['validPasswordResetToken']));

    }
}
