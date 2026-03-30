export interface RateModification {
  RateModificationId: number;
  Name: string;
  Description: string | null;
  RateModificationType: string;
  IsPercentage: boolean;
  IsRequired: boolean;
  ScopeId: number;
  Cost: number;
  CostDisplay: string;
  CostCalcType: number;
  CostCalcDescription: string;
}

export interface RateModificationResponse {
  IsSuccess: boolean;
  Message: string;
  Result: RateModification[];
  InnerException: null;
  StatusCode: number;
}

export interface SelectedModification {
  modificationId: number;
  name: string;
  cost: number;
  scopeId: number;
  quantity?: number;
}
