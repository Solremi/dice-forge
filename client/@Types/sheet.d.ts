// src/@Types/sheet.d.ts
export interface Characteristic {
  id: string;
  name: string;
  value: string;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  quantity: number;
}

declare module 'uuid' {
  export function v4(): string;
}
