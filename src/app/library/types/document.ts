export interface Document {
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
    audience: CatalogEntry;
    category: CatalogEntry;
    classification: string;
    documentStatus: CatalogEntry;
    external: boolean;
    name: string;
    publishdate: Date;
    releasedate: Date;
    reviewdate: Date;
    type: CatalogEntry;
    version: number;
    versionstatus: CatalogEntry;
    downloadoriginalfiletype: boolean;
    showindocumentrepository: boolean;
  };
}

export interface CatalogEntry {
  id: string;
  label: string;
  value: string;
}
