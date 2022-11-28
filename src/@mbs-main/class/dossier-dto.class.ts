import { MbsDossierTypeDTO } from "./dossier-type-dto.class";
import { MbsAssetDTO } from "./asset-dto.class";
import { MbsRelifDTO } from "./relif-dto.class";
import { MbsOperationDTO } from "./operation-dto.class";

export class MbsDossierDTO {
	id?: number;

	description: string;
	creationDate: Date;

	type: MbsDossierTypeDTO;
	asset: MbsAssetDTO;
	relif: MbsRelifDTO;
	operation: MbsOperationDTO;

}