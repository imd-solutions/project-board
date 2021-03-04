<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Foundation\Testing\WithFaker;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication, WithFaker;

    public function setUp(): void
    {
        parent::setUp();

        $this->artisan("migrate:fresh");
        $this->artisan("db:seed --class=PassportTableSeeder");

    }

    public function encodeJsonResult($resp)
    {
//        $results = echo json_encode($resp);
//
//        return $results;
        echo json_encode($resp);
    }

}
