import { MbsDossierTypeDto } from "./dossier-type-dto.class";
import { MbsAssetDto } from "./asset-dto.class";
import { MbsRelifDto } from "./relif-dto.class";
import { MbsOperationDto } from "./operation-dto.class";

export class MbsDossierDto {
	id?: number;

	description: string;

	type: MbsDossierTypeDto;
	asset: MbsAssetDto;
	relif: MbsRelifDto;
	operation: MbsOperationDto;

}