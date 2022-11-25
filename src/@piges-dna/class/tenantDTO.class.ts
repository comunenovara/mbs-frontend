
import { PigesOrganizationDTO } from "./organizationDTO.class";
export class PigesTenantDTO {

    id?: number;

    tenantCode: String;
    name: String;

    organization: PigesOrganizationDTO;
}