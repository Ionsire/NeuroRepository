export  class CasoClinico{
    id: number;
    CO_SEQ_CASO_CLINICO: number;
    DS_HISTORIA_CLINICA: string;
    DS_ACHADOS_DAS_IMAGENS: string;
    DS_DIAGNOSTICO: string;
    CO_CATEGORIA: number;
    CO_SUBCATEGORIA: number;
    DS_DISCUSSAO: string;
    DS_REFERENCIAS: string;
    CO_USUARIO: number;
    CO_STATUS: number;
    DT_SEMANA: number;
    images: string[];
    NU_REJEICOES: number;
    DS_CORRECOES: number;
    CO_IMAGEM_CAPA: number;
    DT_CRIACAO: string;
    DT_ATUALIZACAO: string;
    DT_EXCLUSAO: string;
}