import { TypePrestation } from '../models/type_prestation';

export class Type_prestation implements TypePrestation {
  id: number;
  title: string;
  description: string;
  duration: number;
  price: number;
  type: string;

  // Ajoutez un constructeur si nécessaire
  constructor(typePrestationData: TypePrestation) {
    this.id = typePrestationData.id;
    this.title = typePrestationData.title;
    this.description = typePrestationData.description;
    this.duration = typePrestationData.duration;
    this.price = typePrestationData.price;
    this.type = typePrestationData.type;
  }
}
