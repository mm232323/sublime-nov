export interface audioTypeType {
  title: string;
  imgUrl: string;
  desc: string;
  color: string;
  textColor: string;
}
export interface reportType {
  reportType: string;
  reportTitle: string;
  reportMessage: string;
}
export interface albumType {
  name: string;
  desc: string;
  audioUrl: string;
  imgUrl: string;
  author: string;
  id: string;
  likes: number;
  views: number;
  links: string[];
}
export interface userType {
  name: string;
  email: string;
  password: string;
  gender: string;
  phone: number;
  followers: number;
  medals: string[];
  jobTitle: string;
  avatarName: string;
  albums: albumType[];
  follows: string[];
  views: number;
  likes: string[];
}
export interface albumInputsType {
  title: string;
  desc: string;
  audio: File;
  photo: File;
  author: string;
  type: string;
  userEmail: string;
}
