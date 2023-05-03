export interface Movie {
  id: number;
  name: string;
  length: string;
  rating: 'All' | '12+' | '15+' | '18+';
  director: string;
  introduction: string;
  distributor: string;
  imgUrl: string;
  actors: string;
  genres: Genre[];
  staff: string;
}

export interface Genre {
  id: number;
  value: string;
}
