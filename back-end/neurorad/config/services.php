<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Stripe, Mailgun, SparkPost and others. This file provides a sane
    | default location for this type of information, allowing packages
    | to have a conventional place to find your various credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'sparkpost' => [
        'secret' => env('SPARKPOST_SECRET'),
    ],

    'stripe' => [
        'model' => App\User::class,
        'key' => env('STRIPE_KEY'),
        'secret' => env('STRIPE_SECRET'),
        'webhook' => [
            'secret' => env('STRIPE_WEBHOOK_SECRET'),
            'tolerance' => env('STRIPE_WEBHOOK_TOLERANCE', 300),
        ],
    ],
    'sabia' => [
        'client_id' => env('SABIA_CLIENT_ID', '3orJIiJPrREl1MG2CH3ZwEe3havvoDKjhMXet47M'),
        'client_secret' => env('SABIA_CLIENT_SECRET','rlQyqLlunAqZlinp3z0oV6o8f0waFsyK3WkaWybdCH9e68LgWC7PssPyIDxBplQZggKP7tUaL3enoxd1W7ErpxVZxsHNLtudDPUI0kmMxrCE0JK1miq4fbWqTuPJxwS8'),
        'redirect' => env('APP_URL', 'http://localhost:8000').'/sabia/callback',
        'client_url' => env('SABIA_REDIRECT_HOST', env('APP_URL')),
    ],

];
