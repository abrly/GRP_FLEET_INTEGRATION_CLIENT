export class User {
  
    UserID: string;
    FullName: string;
    RoleID:number;
    RoleName:string;
  
    constructor(
      UserID: string,
      FullName: string,
      RoleID: number,
      RoleName: string  
    ) {
      this.UserID = UserID;
      this.FullName = FullName;
      this.RoleID = RoleID;
      this.RoleName = RoleName;     
    }
  }
  
  export default User;
  