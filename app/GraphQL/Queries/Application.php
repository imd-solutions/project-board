<?php

namespace App\GraphQL\Queries;

use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Support\Facades\DB;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class Application
{
    /**
     * Return a value for the field.
     *
     * @param null $rootValue Usually contains the result returned from the parent field. In this case, it is always `null`.
     * @param array $args The arguments that were passed into the field.
     * @param GraphQLContext|null $context Arbitrary data that is shared between all fields of a single query.
     * @param ResolveInfo $resolveInfo Information about the query itself, such as the execution state, the field name, path to the field from the root, and more.
     *
     * @return mixed
     */
    public function resolve($rootValue, array $args, GraphQLContext $context = null, ResolveInfo $resolveInfo)
    {
        $settings = DB::table('settings')->where(['group' => 'site'])->get();

        $info = [];

        foreach ($settings as $setting) {
            if ($setting->key === 'site.address_1') {
                $info['address_1'] = $setting->value;
            }
            if ($setting->key === 'site.address_2') {
                $info['address_2'] = $setting->value;
            }
            if ($setting->key === 'site.city') {
                $info['city'] = $setting->value;
            }
            if ($setting->key === 'site.county') {
                $info['county'] = $setting->value;
            }
            if ($setting->key === 'site.postcode') {
                $info['postcode'] = $setting->value;
            }
            if ($setting->key === 'site.phone') {
                $info['phone'] = $setting->value;
            }
            if ($setting->key === 'site.email') {
                $info['email'] = $setting->value;
            }

        }
        $data = [
            'name' => config('app.name'),
            'url' => url('/'),
            'version' => config('app.version'),
            'environment' => config('app.env'),
            'year' => date('Y'),
            'address_1' => $info['address_1'],
            'address_2' => $info['address_2'],
            'city' => $info['city'],
            'county' => $info['county'],
            'postcode' => $info['postcode'],
            'phone' => $info['phone'],
            'email' => $info['email'],
        ];

        return $data;
    }
}
