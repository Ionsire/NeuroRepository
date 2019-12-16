<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        'App\Console\Commands\agendamento',
        'App\Console\Commands\desagendamento',
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('neurorad:agendamento')
                    ->everyMinute(); // ->weeklyOn(2, '0:00'); executa na terça feira às 0 horas 


        // crontab -e * * * * * php /Users/inamar/Desktop/testCron/schedule/artisan schedule:run 1>> /dev/null 2>&1
        // caminho absoluto do arquivo artisan
        //sair e salvar crontab: :wq


        // $schedule->command('neurorad:desagendamento')
        //             ->everyMinute();

        
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
