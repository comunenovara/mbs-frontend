import { MbsProgettoDto } from "./progetto-dto.class";
import { MbsIncaricoDto } from "./incarico-dto.class";
import { MbsFaseDto } from "./fase-dto.class";
import { MbsTecnicoDto } from "./tecnico-dto.class";
import { MbsAziendaDto } from "./azienda-dto.class";

export class MbsNominaDto {
	id?: number;

	ie: boolean;

	progettoId?: number;
	progetto: MbsProgettoDto;
	incaricoId?: number;
	incarico: MbsIncaricoDto;
	faseId?: number;
	fase: MbsFaseDto;
	tecnicoId?: number;
	tecnico: MbsTecnicoDto;
	aziendaId?: number;
	azienda: MbsAziendaDto;

}