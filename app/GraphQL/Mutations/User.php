<?php

namespace App\GraphQL\Mutations;

use App\Events\User\Created;
use App\Models\Profile;
use App\Models\User as UserModel;
use Carbon\Carbon;
use GraphQL\Error\Error;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class User
{
    /**
     * Return a value for the field.
     *
     * @param null $rootValue Usually contains the result returned from the parent field. In this case, it is always `null`.
     * @param mixed[] $args The arguments that were passed into the field.
     * @param \Nuwave\Lighthouse\Support\Contracts\GraphQLContext $context Arbitrary data that is shared between all fields of a single query.
     * @param \GraphQL\Type\Definition\ResolveInfo $resolveInfo Information about the query itself, such as the execution state, the field name, path to the field from the root, and more.
     * @return mixed
     */

    public function create($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        // Create the new users.
        $user = UserModel::create([
            'name' => $args['input']['firstname'] . ' ' . $args['input']['lastname'],
            'email' => $args['input']['email'],
            'role_id' => 2,
            'password' => isset($args['input']['password']) ? Hash::make($args['input']['password']) : Hash::make('P455w0Rd!')
        ]);

        // Create the users profile.
        Profile::create([
            'user_id' => $user->id,
            'firstname' => $args['input']['firstname'],
            'lastname' => $args['input']['lastname']
        ]);

        $user->save();

        return $user;
    }

    public function resend($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        try {
            $user = UserModel::where(['email' => $args['email']])->first();

            if (!$user) {
                throw new Error('That user does not exist.');
            }

            event(new Created($user));

            return [
                'status' => 200,
                'title' => 'Success',
                'css' => 'is-success',
                'message' => 'That has been re-sent for you.'
            ];


        } catch (\Exception $e) {
            return [
                'status' => 400,
                'title' => 'Error',
                'css' => 'is-danger',
                'message' => $e->getMessage()
            ];
        }
    }

    public function email($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        try {

            // Get the users email address.
            $confirm = Crypt::decrypt($args['code']);

            // Find the user with the email code.
            $user = UserModel::where(['email' => $confirm["email"]])->firstOrFail();

            // Check to see if the account has been verified.
            if ($user->email_verified_at) {
                $data = [
                    "css" => "is-warning",
                    "title" => "Warning!",
                    "message" => "Your account has already been verified."
                ];

                return $data;
            }

            // Update the users email verified date.
            $user->email_verified_at = Carbon::now();
            $user->save();

            $data = [
                "css" => "is-success",
                "title" => "Success!",
                "message" => "Your account has been verified. Please log into your account."
            ];

            return $data;


        } catch (DecryptException $exception) {

            $data = [
                "css" => "is-danger",
                "title" => "Error!",
                "message" => "Sorry. That is not a valid link. Please check and try again."
            ];

            return $data;
        }
    }

    public function update($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        // Get the user from the id.
        $user = UserModel::find($args['id']);

        // Update the user details.
        $user->name = $args['input']['firstname'] . ' ' . $args['input']['lastname'];
        $user->email = $args['input']['email'];

        // Update the user profile.
        $user->profile()->update([
            'firstname' => $args['input']['firstname'],
            'lastname' => $args['input']['lastname']
        ]);

        // Save the user.
        $user->save();

        // Return the user object.
        return $user;

    }

}
