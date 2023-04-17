export interface Movie {
  id: number;
  name: string;
  length: string;
  rating: 'All' | '12+' | '15+' | '18+';
  director: string;
  distributor: string;
  imgUrl: string;
  actors: Actor[];
  genres: Genre[];
  staff: Staff[];
}

export interface Actor {
  id: number;
  name: string;
}

export interface Genre {
  id: number;
  value: string;
}

export interface Staff {
  id: number;
  name: string;
}

