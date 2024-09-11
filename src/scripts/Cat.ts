export interface Breed {
  id: string;
  name: string;
  temperament: string;
  origin: string;
  description: string;
  life_span: string;
}

export default interface Cat {
  breeds: Breed[];
  id: string;
  url: string;
}
