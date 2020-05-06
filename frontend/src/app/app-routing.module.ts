import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductsComponent } from './products/products.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ProvidersListComponent } from './providers-list/providers-list.component';
import { ProviderEditComponent } from './provider-edit/provider-edit.component';


const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'providers', component: ProvidersListComponent },
  { path: 'provider/:id', component: ProviderEditComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'newProduct', component: NewProductComponent },
  { path: '**', component: ProductsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
