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
export interface EquipmentDTO {
  id: number;
  equipmentName: string;

}
export interface Probleme {
  id: number;
  libelle: string;
}
export interface Solution {
  id: number;
  libelle: string;
}
export interface Intervention {
  id: number;
  status: string;
  date: Date;
  heureDebut: Date;
  heureFin: Date | null;
  compagnie: number;
  appUser: number;
  comptoire: number;
  equipment: number;
  solution: number;
  probleme: number;
  aeroport: number;
  duration:any;
}
export interface appUser{
  id:number,
  nom:string,
}
export interface DecodedToken {
  exp: number;
  roles: string[];
  sub: string;
}
export interface AppRole{
  id:number,
  roleName:string
}

