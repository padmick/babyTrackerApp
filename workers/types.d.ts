export interface Env {
  FAMILY_TRACKING: DurableObjectNamespace;
  AUTH_EMAIL: string;
  R2_BUCKET: R2Bucket;
}

export interface FamilyState {
  members: string[];
  children: string[];
  tasks: string[];
}