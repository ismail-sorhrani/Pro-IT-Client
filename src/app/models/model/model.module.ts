export interface Zone{
  id:number,
  zoneName:string,
  aeroportName:string
}
export interface Aeroport{
  id:number,
  aeroportName:string
}

export interface Compagnie{
  id:number,
  compagnieName:string
}
export interface AeroportDTO {
  id: number;
  aeroportName: string;
  compagnieNames: string[];
}
export interface ComptoireDTO {
  id: number;
  comptoireName: string;
  zoneName: string;
  aeroportName: string;
  zoneId: number;
}
