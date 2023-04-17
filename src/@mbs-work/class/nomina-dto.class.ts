import { MbsIncaricoDto } from "./incarico-dto.class";
import { MbsFaseDto } from "./fase-dto.class";
import { MbsProgettoDto } from "./progetto-dto.class";
import { MbsTecnicoDto } from "./tecnico-dto.class";
import { MbsAziendaDto } from "./azienda-dto.class";

export class MbsNominaDto {
	id?: number;

	ie: boolean;

	incaricoId?: number;
	incarico: MbsIncaricoDto;
	faseId?: number;
	fase: MbsFaseDto;
	progettoId?: number;
	progetto: MbsProgettoDto;
	tecnicoId?: number;
	tecnico: MbsTecnicoDto;
	aziendaId?: number;
	azienda: MbsAziendaDto;

}