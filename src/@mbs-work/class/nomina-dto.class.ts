import { MbsProgettoDto } from "./progetto-dto.class";
import { MbsIncaricoDto } from "./incarico-dto.class";
import { MbsFaseDto } from "./fase-dto.class";
import { MbsTecnicoDto } from "./tecnico-dto.class";
import { MbsAziendaDto } from "./azienda-dto.class";

export class MbsNominaDto {
	id?: number;

	ie: boolean;

	progettoId?: number | null;
	progetto: MbsProgettoDto;
	incaricoId?: number | null;
	incarico: MbsIncaricoDto;
	faseId?: number | null;
	fase: MbsFaseDto;
	tecnicoId?: number | null;
	tecnico: MbsTecnicoDto;
	aziendaId?: number | null;
	azienda: MbsAziendaDto;

}