<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\API\ScheduleController;
class agendamento extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'neurorad:agendamento';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Comando criado para agendar os casos clinicos automaticamente';

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
        $scheduleController = new ScheduleController;
          $scheduleController -> busca();
    }
}
