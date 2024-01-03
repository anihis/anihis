/**
 * API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { Gender } from './gender';

export interface CreateAnimalCommand { 
    personalNumber?: string;
    name?: string;
    breedUid?: string;
    gender?: Gender;
    color?: string;
    birthDateTime?: Date;
    passportNumber?: string;
    viIssuesAPassport?: string;
    ownerUid?: string;
    warning?: string;
    identification?: string;
    markingDateTimeUtc?: Date;
    pedigree?: string;
    sterilized?: boolean;
    sterilizedDateTimeUtc?: Date;
    lastModifiedDateTimeUtc?: Date;
}