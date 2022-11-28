import { MbsOperationTypeDTO } from "./operation-type-dto.class";
import { MbsAssetDTO } from "./asset-dto.class";

export class MbsOperationDTO {
	id?: number;

	description: string;
	value: any;
	creationDate: Date;
	startDate: Date;
	endDate: Date;

	type: MbsOperationTypeDTO;
	asset: MbsAssetDTO;

}