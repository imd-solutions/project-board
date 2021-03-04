<?php

use Illuminate\Database\Seeder;

class PassportTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Insert data for passport.
        DB::table('oauth_clients')->insert([
            'name' => 'jXKZDBmQJMdoswuvEta6iSXwtqwffTrMShgpYVRq',
            'secret' => 'Zvtbah23xeGv8e0yzNEPsBmOyJTkK3qn7KPHh0x5',
            'redirect' => 'http://localhost',
            'personal_access_client' => 1,
            'password_client' => 0,
            'revoked' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Insert data for passport.
        DB::table('oauth_clients')->insert([
            'name' => 'Project Board Personal Access Client',
            'secret' => 'QEZBvRwvYFgZqKSg0mhe5ZbUlKLwwKE2ojjKW3MC',
            'redirect' => 'http://localhost',
            'personal_access_client' => 0,
            'password_client' => 1,
            'revoked' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
