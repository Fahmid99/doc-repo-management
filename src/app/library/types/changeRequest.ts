// src/app/library/types/changeRequest.ts

export interface ChangeRequest {
  id: string;
  created: {
    on: string;
    by: {
      id: string;
      name: string;
      email: string;
    };
  };
  favourite?: boolean;
  title: string;
  data: {
    assignedto: string;
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
  };
}
export interface CatalogEntry {
  id: string;
  label: string;
  value: string;
}

export interface ChangeRequestFormData {
  assignedTo: string;
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

export interface DCREntryTabFormData{
  scopeOfChange: string;
  documents: CatalogEntry[];
  newDocument: boolean;
  Functionality: CatalogEntry;
  Requestor: string;
  requestorEmail: string;
}

