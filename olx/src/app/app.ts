import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {



  productApi = 'https://localhost:7285/api/Products';

  
  categoryApi = 'https://localhost:7285/api/Category';

  
  loginApi = 'https://localhost:7285/api/Users/login';


  products: any[] = [];
  filteredProducts: any[] = [];
  categories: any[] = [];
  locations: string[] = [];

  selectedProduct: any = null;
  selectedCategory: string = '';

  searchText = '';
  selectedCategoryId = '';
  selectedLocation = '';

  showLogin = false;
  email = '';
  password = '';

  constructor(private http: HttpClient) {
    this.getProducts();
    this.getCategories();
  }

  
  getProducts() {
    this.http.get<any[]>(this.productApi)
      .subscribe({
        next: (res) => {
          this.products = res;
          this.filteredProducts = res;

          
          this.locations = [...new Set(res.map(p => p.location))];
        },
        error: (err) => console.log("Product API Error", err)
      });
  }

 
  getCategories() {
    this.http.get<any[]>(this.categoryApi)
      .subscribe({
        next: (res) => {
          this.categories = res;
        },
        error: (err) => console.log("Category API Error", err)
      });
  }


  applyFilters() {
    this.filteredProducts = this.products.filter(p =>
      (this.searchText === '' ||
        p.title.toLowerCase().includes(this.searchText.toLowerCase())) &&

      (this.selectedCategoryId === '' ||
        p.categoryId == this.selectedCategoryId) &&

      (this.selectedLocation === '' ||
        p.location === this.selectedLocation)
    );
  }

  search() {
    this.applyFilters();
  }

  viewProduct(product: any) {
    this.selectedProduct = product;
  }

  backToList() {
    this.selectedProduct = null;
  }

  sellProduct() {
    alert("Sell page connect later");
  }


isLoggedIn = false;
userName = '';


login() {
  this.http.post<any>(this.loginApi, {
    email: this.email,
    password: this.password
  }).subscribe({
    next: (res) => {

      

      this.isLoggedIn = true;
      this.userName = res.name;

      localStorage.setItem('user', JSON.stringify(res));

      this.showLogin = false;
      alert("Login Successful");

    },
    error: () => {
      alert("Invalid Email or Password");
    }
  });
}



logout() {
  this.isLoggedIn = false;
  this.userName = '';
  localStorage.removeItem('user');
}
}