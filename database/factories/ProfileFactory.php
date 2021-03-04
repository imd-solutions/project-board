<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Profile;
use Faker\Generator as Faker;

$factory->define(Profile::class, function (Faker $faker) {
    return [
        'user_id' => $faker->randomNumber(),
        'firstname' => $faker->firstName,
        'lastname' => $faker->lastName
    ];
});
