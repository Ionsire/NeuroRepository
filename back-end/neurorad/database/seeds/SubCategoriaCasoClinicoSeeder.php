<?php

use Illuminate\Database\Seeder;

class SubCategoriaCasoClinicoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            // Tumores
            ['DS_DESCRICAO' => 'Tumores Gliais'],
            ['DS_DESCRICAO' => 'Tumores do Epêndima'],
            ['DS_DESCRICAO' => 'Tumores Neuronais e Mistos'],
            ['DS_DESCRICAO' => 'Tumores da Região da Pineal'],
            ['DS_DESCRICAO' => 'Tumores da Fossa Posterior'],
            ['DS_DESCRICAO' => 'Tumores Embrionários e Euroblásticos'],
            ['DS_DESCRICAO' => 'Tumores de Nervos Cranianos e Nervos Periféricos'],
            ['DS_DESCRICAO' => 'Tumores Vasculares e Hematopoiéticos'],
            ['DS_DESCRICAO' => 'Tumores de Células Germinativas'],
            ['DS_DESCRICAO' => 'Tumores Metastáticos'],
            // Infecções
            ['DS_DESCRICAO' => 'Meningites'],
            ['DS_DESCRICAO' => 'Abscesso'],
            ['DS_DESCRICAO' => 'Encefalites'],
            ['DS_DESCRICAO' => 'Doenças Granulomatosas'],
            ['DS_DESCRICAO' => 'Doenças Parasitárias'],
            ['DS_DESCRICAO' => 'Doença Priônica'],
            // Patologias Vasculares
            ['DS_DESCRICAO' => 'Aneurismas e Hemorragia Subaracnoídea'],
            ['DS_DESCRICAO' => 'Acidentes Vasculares Encefálicos'],
            ['DS_DESCRICAO' => 'Malformações Vasculares'],
            ['DS_DESCRICAO' => 'Angiopatia Amilóide'],
            // Doenças Degenarativas
            ['DS_DESCRICAO' => 'Encefalopatia Hipertensiva Crônica'],
            ['DS_DESCRICAO' => 'Doença de Alzheimer'],
            ['DS_DESCRICAO' => 'Demência Multi-Infarto'],
            ['DS_DESCRICAO' => 'Demência Frontotemporal'],
            ['DS_DESCRICAO' => 'Doença de Parkinson'],
            ['DS_DESCRICAO' => 'Atrofia de Múltiplos Sistemas'],
            ['DS_DESCRICAO' => 'Esclerose Lateral Amiotrófica'],
            ['DS_DESCRICAO' => 'Degeneração Walleriana'],
            ['DS_DESCRICAO' => 'Degeneração Corticobasal'],
            // Doenças Desmielizantes
            ['DS_DESCRICAO' => 'Leucodistrofias'],
            ['DS_DESCRICAO' => 'Esclerose Múltipla'],
            ['DS_DESCRICAO' => 'ADEM'],
            ['DS_DESCRICAO' => 'Neuromielite Óptica'],
            // Malformações
            ['DS_DESCRICAO' => 'Malformações de Chiari'],
            ['DS_DESCRICAO' => 'Malformações de Dandy-Walker'],
            ['DS_DESCRICAO' => 'Holoprosencefalia'],
            ['DS_DESCRICAO' => 'Displasia Septo-optica'],
            ['DS_DESCRICAO' => 'Malformações do Desenvolvimento Cortical'],
            ['DS_DESCRICAO' => 'Síndromes Neurocutâneas'],
            // Traumas
            ['DS_DESCRICAO' => 'Traumas Penetrantes'],
            ['DS_DESCRICAO' => 'Hematomas Epidurais'],
            ['DS_DESCRICAO' => 'Hematomas Subdurais'],
            ['DS_DESCRICAO' => 'Hemorragia Subaracnoídea Traumática'],
            ['DS_DESCRICAO' => 'Contusões Cerebrais'],
            ['DS_DESCRICAO' => 'Lesão Axonal Difusa'],
        ];
        DB::table('TB_SUBCATEGORIA_CASO_CLINICO')->insert($data);
    }
}
