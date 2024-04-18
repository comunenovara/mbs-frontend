import { MbsGovernativeProjectDto } from "./governative-project-dto.class";
import { MbsGovernativeProcurementLotDto } from "./governative-procurement-lot-dto.class";

export class MbsGovernativeProjectProcurementLotDto {
	id?: number;

	amount: any;

	projectId?: number | null;
	project: MbsGovernativeProjectDto;
	procurementLotId?: number | null;
	procurementLot: MbsGovernativeProcurementLotDto;

}