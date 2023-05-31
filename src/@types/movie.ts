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

export interface Genre {
  id: number;
  name: string;
}
