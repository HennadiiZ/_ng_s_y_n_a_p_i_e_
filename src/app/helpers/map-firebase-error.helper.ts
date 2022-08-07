export function mapFirebaseError(err: any): string {
  return err.charAt(0).toUpperCase() + err.replace('-', ' ').slice(1) + '.';
}
