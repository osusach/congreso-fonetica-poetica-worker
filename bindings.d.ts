type Bindings = {
  TURSO_URL: string;
  TURSO_TOKEN: string;
  ARE_EMAILS_WORKING: boolean;
  MAILERSEND_TOKEN: string;
  AUTH_TOKEN: string
  PDF_BUCKET: R2Bucket;
  COMMITTEE: commitee[]
};

type committee = {
  email: string,
  name: string
}
