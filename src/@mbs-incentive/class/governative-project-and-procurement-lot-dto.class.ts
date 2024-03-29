import { MbsGovernativeProjectDto } from "./governative-project-dto.class";
import { MbsGovernativeProcurementLotDto } from "./governative-procurement-lot-dto.class";

export class MbsGovernativeProjectAndProcurementLotDto {
	id?: number;

	amount: any;

	governativeProjectId?: number | null;
	governativeProject: MbsGovernativeProjectDto;
	governativeProcurementLotId?: number | null;
	governativeProcurementLot: MbsGovernativeProcurementLotDto;

}