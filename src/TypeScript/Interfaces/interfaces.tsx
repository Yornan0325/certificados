interface UserType {
  id: number
  title: string;
  surnames: string;
  age: string;
  weight: string;
  email: string;
  img: string;
  content: string;
  phone: string;
  registrationDate: string;
}
const InitialUserData: UserType = {
  id: 0,
  title: '',
  surnames: '',
  age: '',
  weight: '',
  email: '',
  img: '',
  content: '',
  phone: '',
  registrationDate: '',
   
};
 
export { InitialUserData }