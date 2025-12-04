export const DateTransformer = {
  to(value: Date | string): string | null {
    if (typeof value === 'string') {
      value = new Date(value);
      return value.toISOString().split('T')[0];
    } else if (value instanceof Date) {
      return value.toISOString().split('T')[0];
    } else {
      return null;
    }
  },
  from (value: string): Date {
    return new Date(value);
  }
}