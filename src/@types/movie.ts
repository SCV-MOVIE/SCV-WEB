export interface Movie {
  id: number;
  actor: string;
  director: string;
  distributor: string;
  genreDTOList: Genre[];
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

export interface RequestUpdateMovie {
  movieId: number;
  genreDTOList: Pick<Genre, 'name'>[];
  newActor: string;
  newDirector: string;
  newStaff: string;
  newDistributor: string;
  newImgUrl: string;
  newIntroduction: string;
  newLength: number;
  newRating: 'ALL' | '12+' | '15+' | '18+';
}

export interface Genre {
  id: number;
  name: string;
}

export type RequestGenre = Pick<Genre, 'name'>;
export type RequestUpdateGenre = Pick<Genre, 'id'> & {
  newName: string;
};
