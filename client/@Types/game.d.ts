export interface IInputField {
  id: number;
  name: string;
  placeholder: string;
  value: string;
}

export interface ILicenceOption {
  id: number;
  name: string;
}

export interface IGames {
  id: number;
  name: string;
  music: string | null;
  note: string | null;
  event: string | null;
  license_name: string;
}
