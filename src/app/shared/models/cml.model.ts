export class CML {
    Status: string;
    JobCardNo: string;
    TaskID: string;
    Task_Description: string;
    SupplierNumber: string;
    SupplierName: string;
    LineNo: number;
    InvoiceNo: string;
    Site:string;
    Job_Rowid:number;
    Cml_row_id: number;
    LaborCost: number;
    PartsCost: number;
    Discount:number;
    TotalCost:number;
    VAT: number;
    TotalCostWithVAT:number;
    AccountType:string;
    Invoiced: string;

  
    constructor(
      Status: string,
      JobCardNo: string,
      TaskID: string,
      Task_Description: string,
      SupplierNumber: string,
      SupplierName: string,
      LineNo:number,
      InvoiceNo: string,
      Site:string,
      Job_Rowid:number,
      Cml_row_id: number,
      LaborCost: number,
      PartsCost: number,
      Discount: number,
      TotalCost: number,
      VAT: number,
      TotalCostWithVAT: number,
      AccountType: string,     
      Invoiced: string   
    ) {
      this.Status = Status;
      this.JobCardNo = JobCardNo;
      this.TaskID=TaskID;
      this.Task_Description=Task_Description;
      this.SupplierNumber =SupplierNumber;
      this.SupplierName = SupplierName;
      this.LineNo = LineNo;
      this.InvoiceNo =InvoiceNo;
      this.Site=Site;
      this.Job_Rowid =Job_Rowid;
      this.Cml_row_id=Cml_row_id;
      this.LaborCost = LaborCost;
      this.PartsCost =PartsCost;
      this.Discount=Discount;
      this.TotalCost=TotalCost;
      this.VAT=VAT;
      this.TotalCostWithVAT=TotalCostWithVAT;
      this.AccountType=AccountType;
      this.Invoiced=Invoiced;
    }
  }
  
  export default CML;
  