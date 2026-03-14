import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HttpClient } from '@angular/common/http';

@Component({
selector:'app-root',
standalone:true,
imports:[CommonModule,FormsModule,HttpClientModule],
templateUrl:'./app.html',
styleUrls:['./app.css']
})

export class AppComponent{

constructor(private http:HttpClient){}

productApi="https://localhost:7285/api/Products";
categoryApi="https://localhost:7285/api/Category";
loginApi="https://localhost:7285/api/Users/login";
registerApi="https://localhost:7285/api/Users/register";

products:any[]=[];
filteredProducts:any[]=[];
categories:any[]=[];
locations:any[]=[];
wishlist:any[]=[];

selectedProduct:any=null;
showDetail=false;

searchText="";
selectedCategory="";
selectedLocation="";

showLogin=false;
showRegister=false;
showWishlist=false;

email="";
password="";

registerName="";
registerEmail="";
registerPassword="";

isLoggedIn=false;
userName="";

groupedProducts:any = {};
showCategorymenu=false;
ngOnInit(){
this.loadProducts();
this.loadCategories();
}

loadProducts(){

this.http.get<any[]>(this.productApi)
.subscribe(res=>{

this.products=res;
this.filteredProducts=res;

this.locations=[...new Set(res.map(x=>x.location))];

});

}

loadCategories(){

this.http.get<any[]>(this.categoryApi)
.subscribe(res=>{
this.categories=res;
});

}

search(){
this.applyFilters();
}

applyFilters(){

this.filteredProducts=this.products.filter(p=>

(this.searchText=="" || p.title?.toLowerCase().includes(this.searchText.toLowerCase()))
&&
(this.selectedCategory=="" || p.categoryId==this.selectedCategory)
&&
(this.selectedLocation=="" || p.location==this.selectedLocation)

);

}

selectCategory(id:any){
this.selectedCategory=id;
this.applyFilters();
}


openProduct(product:any){
this.selectedProduct=product;
this.showDetail=true;
}
showAll(){

this.selectedCategory = "";
this.filteredProducts = this.products;

}





closeDetail(){
this.showDetail=false;
}

toggleWishlist(product:any){

const index=this.wishlist.findIndex(x=>x.id==product.id);

if(index>-1){
this.wishlist.splice(index,1);
}
else{
this.wishlist.push(product);
}

}

isWishlisted(product:any){
return this.wishlist.some(x=>x.id==product.id);
}

login(){

const data={
email:this.email,
password:this.password
};

this.http.post<any>(this.loginApi,data)
.subscribe(res=>{
this.isLoggedIn=true;
this.userName=res.name;
this.showLogin=false;
});

}

logout(){
this.isLoggedIn=false;
this.userName="";
}

register(){

const data={
name:this.registerName,
email:this.registerEmail,
password:this.registerPassword
};

this.http.post(this.registerApi,data)
.subscribe(res=>{
alert("Registration successful");
this.showRegister=false;
this.showLogin=true;

this.registerName="";
this.registerEmail="";
this.registerPassword="";
});

}

sellProduct(){
alert("Sell Product Page");
}
}