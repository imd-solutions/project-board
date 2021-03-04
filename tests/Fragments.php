<?php

namespace Tests;

trait Fragments
{
    /**
     * Function Case: User auth GraphQL fragment.
     * @return array
     */
    public function authFragment()
    {
        return [
            'access_token',
            'user' => $this->userFragment()
        ];
    }

    /**
     * Function Case: User GraphQL fragment.
     * @return array
     */
    public function userFragment()
    {
        return [
            'id',
            'name',
            'email',
            'profile' => $this->profileFragment()
        ];
    }

    /**
     * Function Case: Profile GraphQL fragment.
     * @return array
     */
    public function profileFragment()
    {
        return [
            'firstname',
            'lastname'
        ];
    }

    /**
     * Function Case: Message GraphQL fragment.
     * @return array
     */
    public function messageFragment()
    {
        return [
            'status',
            'message'
        ];
    }
}
