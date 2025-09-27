export interface IBackupCode {
  version: string;
  checksumSalt: string;
  checksum: string;
  encrypted: string;
}
