export interface Movie {
  id: number;
  actor: string;
  director: string;
  distributor: string;
  genreDTOList: Pick<Genre, 'name'>[];
  imgUrl: string;
  introduction: string;
  length: string | number;
  name: string;
  rating: 'All' | '12+' | '15+' | '18+';
  staff: string;
}

export type RequestMovie = Pick<
  Movie,
  | 'actor'
  | 'director'
  | 'distributor'
  | 'genreDTOList'
  | 'imgUrl'
  | 'introduction'
  | 'length'
  | 'name'
  | 'rating'
  | 'staff'
>;

export type RequestUpdateMovie = Pick<
  Movie,
  | 'actor'
  | 'director'
  | 'distributor'
  | 'genreDTOList'
  | 'imgUrl'
  | 'introduction'
  | 'length'
  | 'rating'
  | 'staff'
>;

export interface Genre {
  id: number;
  name: string;
}

export type RequestGenre = Pick<Genre, 'name'>;
