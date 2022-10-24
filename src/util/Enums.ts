export enum StatusKinds {
    requirements = "REQ",
    changes = "CHG",
}

export enum RequirementsStatusEnum {
    cadastrado = "TD",
    implementando = "D",
    implementado = "DN",
    bloqueado = "B",
    deletado = "DEL",
    mudando = "C",
}

export enum ChangesStatusEnum {
    analisando = "AN",
    aprovado = "APR",
    rejeitado = "RJ",
    priorizando = "PR",
    implementando = "ING",
    implementado = "IED",
    verificando = "VE",
    finalizado = "D",
}

export enum UserFunctionEnum {
    usuario = "USUARIO_PADRAO",
    comite = "MEMBRO_COMITE",
    proprietario = "PROPRIETARIO",
}
