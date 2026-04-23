// Temporary in-memory store for multi-step forms
export const tempRegistrationStore: {
  idFile: File | null;
  phone: string;
} = {
  idFile: null,
  phone: '',
};
