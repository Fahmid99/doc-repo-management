// src/app/library/types/changeRequest.ts

export interface ChangeRequest {
  id: string;
  changeAuthority: string;
  changePriority: CatalogEntry;
  changeRequestNumber: number;
  changeRequestStatus: string;
  changeType: CatalogEntry;
  contributors: string;
  contributorsPrincipal: string;
  description: string;
  dueDateComplete: Date;
  identity: string;
  participants: string[];
  preapproved: boolean;
  principleContributor: string;
  reasonForChange: CatalogEntry;
  reasonForChangeOther: string;
  rejectionReason: CatalogEntry;
  rejectionReasonComments: string;
  relatedFolder: string;
  releaseAuthority: string;
  reviewers: string;
  scopeOfChange: string;
  title: string;
}

export interface CatalogEntry {
  id: string;
  label: string;
  value: string;
}

export interface ChangeRequestFormData {
  changeAuthority: string;
  changePriority: string;
  changeRequestStatus: string;
  changeType: string;
  contributors: string;
  contributorsPrincipal: string;
  description: string;
  dueDateComplete: string;
  identity: string;
  participants: string[];
  preapproved: boolean;
  principleContributor: string;
  reasonForChange: string;
  reasonForChangeOther: string;
  relatedFolder: string;
  releaseAuthority: string;
  reviewers: string;
  scopeOfChange: string;
  title: string;
}
