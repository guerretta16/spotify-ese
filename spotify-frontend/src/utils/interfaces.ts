export interface AuthState {
    access_token?: string,
    refresh_token?: string
}

export interface UserState {
    id?: string,
}

export interface RequiredParams {
    code?: string,
    refresh_token?: string
}

export interface SearchParams {
    grant_type: string
    redirect_uri: string
    client_id: string
    client_secret: string
    code?: string
    refresh_token?: string
}

export interface ItemInter {
    album: AlbumInter;
}

export interface AlbumInter {
    album_type:             string;
    artists:                ArtistInter[];
    available_markets:      string[];
    external_urls:          ExternalUrls;
    href:                   string;
    id:                     string;
    images:                 ImageInter[];
    name:                   string;
    release_date:           string;
    release_date_precision: string;
    total_tracks:           number;
    type:                   string;
    uri:                    string;
}

export interface AlbumRef {
    album_type:             string;
    artists:                string;
    id_album:               string;
    image_url:              string;
    name:                   string;
    release_date:           string;
    total_tracks:           number;
    url:                    string;
    user_id?:               string;
    isSaved?:               boolean;
}

export interface ArtistInter {
    external_urls: ExternalUrls;
    href:          string;
    id:            string;
    name:          string;
    type:          string;
    uri:           string;
}

export interface ExternalUrls {
    spotify: string;
}

export interface ImageInter {
    height: number;
    url:    string;
    width:  number;
}