export class LPO {
    Status: string;
    LPONo: string;
    SupplierNo: string;
    SupplierName: string;
    Returned: string;
    LineNo: number;
    PartNo: string;
    PartSuffix: number;
    PartDescription:string;
    PartKeyword:string;
    QtyReceived: number;
    UnitPrice: number;
    OrderPrice: number;
    VAT: number;
    Reference: number;
    Location: string;
    DateReceived: Date;
    DateInserted: Date;
    Site: string;
    Invoiced: string;
    TotalCost: number;
    TotalCostIncVAT:number;
    RowId:number;
  
    constructor(
      Status: string,
      LPONo: string,
      SupplierNo: string,
      SupplierName: string,
      Returned: string,
      LineNo: number,
      PartNo: string,
      PartSuffix: number,
      PartDescription:string,
      PartKeyword:string,
      QtyReceived: number,
      UnitPrice: number,
      OrderPrice: number,
      VAT: number,
      Reference: number,
      Location: string,
      DateReceived: Date,
      DateInserted: Date,
      Site: string,
      Invoiced: string,
      TotalCost: number,
      TotalCostIncVAT:number,
      RowId:number,
    ) {
      this.Status = Status;
      this.LPONo = LPONo;
      this.SupplierNo = SupplierNo;
      this.SupplierName = SupplierName;
      this.Returned = Returned;
      this.LineNo = LineNo;
      this.PartNo = PartNo;
      this.PartSuffix = PartSuffix;
      this.PartDescription=PartDescription;
      this.PartKeyword=PartKeyword;
      this.QtyReceived = QtyReceived;
      this.UnitPrice = UnitPrice;
      this.OrderPrice = OrderPrice;
      this.VAT = VAT;
      this.Reference = Reference;
      this.Location = Location;
      this.DateReceived = DateReceived;
      this.DateInserted = DateInserted;
      this.Site = Site;
      this.Invoiced = Invoiced;
      this.TotalCost= TotalCost;
      this.TotalCostIncVAT=TotalCostIncVAT;
      this.RowId=RowId;
    }
  }
  
  export default LPO;
  