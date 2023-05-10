import { MbsDossierTypeDto } from "./dossier-type-dto.class";
import { MbsElaborateGroupDto } from "./elaborate-group-dto.class";
import { MbsAssetDto } from "./asset-dto.class";
import { MbsRelifDto } from "./relif-dto.class";
import { MbsOperationDto } from "./operation-dto.class";

export class MbsDossierDto {
	id?: number;

	description: string;

	typeId?: number | null;
	type: MbsDossierTypeDto;
	elaborateGroupId?: number | null;
	elaborateGroup: MbsElaborateGroupDto;
	assetId?: number | null;
	asset: MbsAssetDto;
	relifId?: number | null;
	relif: MbsRelifDto;
	operationId?: number | null;
	operation: MbsOperationDto;

}