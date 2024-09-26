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
}
