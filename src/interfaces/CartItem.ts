export interface Cartitem  {
    "itemid" : number;
    "productid" : number;
    "packageid" : number;
    "name" : string;
    "img":string;
    "qty":number;
    "unit":string;
    "price":number;
    "cartqty" : number;
    selected_pack?:any;
    packs?:any[];
    packoption?:any;
  }
