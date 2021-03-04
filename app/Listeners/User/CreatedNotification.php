<?php

namespace App\Listeners\User;

use App\Events\User\Created;
use App\Mail\UserConfirmEmail;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Mail;

class CreatedNotification implements ShouldQueue
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  Created  $event
     * @return void
     */
    public function handle(Created $event)
    {
        // Encrypt the users email.
        $encrypt = Crypt::encrypt([
            'type' => "mobile",
            'email' => $event->user->email,
        ]);

        // Create an array of the users details.
        $data = [
            'name' => $event->user->name,
            'encrypt' => $encrypt
        ];

        // Send the users an email with the data array.
        Mail::to($event->user->email)->queue(new UserConfirmEmail($data));
    }
}
