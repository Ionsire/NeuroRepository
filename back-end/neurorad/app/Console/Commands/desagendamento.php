<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class desagendamento extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'neurorad:desagendamento';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Comando criado para remover os casos clinicos automaticamente';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        // $scheduleController = new ScheduleController;
        // $scheduleController -> busca();
    }
}
