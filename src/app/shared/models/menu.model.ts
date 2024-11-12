export class Menu {
    label: string;
    icon: string;
    route: string;
    title:string;
    
    constructor(
      label: string,
      icon: string,
      route: string,
      title:string     
    ){
      this.label = label;
      this.icon = icon;
      this.route = route;  
      this.title =title;    
    }
  }
  
  export default Menu;
  