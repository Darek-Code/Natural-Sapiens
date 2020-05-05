import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  frmRegistrarProducto: FormGroup;
  mensaje: string = null;
  guardando: boolean;
  guardadoOK: boolean;
  categorias: any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  async ngOnInit() {
    /*
        {
      "nombre": "Open Project",
      "localidad": "topSecret",
      "telefono": "123",
      "mail": "openproject@mail.com",
      "contraseña": "topSecret",
      "fecha_inscripcion": "01/01/2020",
      "fk_productos": 2
    }
    */
    this.frmRegistrarProducto = this.formBuilder.group(
      {
        nombre: "",
        localidad: "",
        telefono: "",
        mail: "",
        contraseña: "",

      });
    //await this.getCategorias();
  }

  async getCategorias() {
    this.categorias = await this.http.get("http://localhost:3000/products").toPromise();
  }

  async guardarProveedor() {
    this.guardando = true;
    console.log("guardando...");
    this.mensaje = "Validando datos....";
    let nombre: string = this.frmRegistrarProducto.controls["nombre"].value;
    let localidad: string = this.frmRegistrarProducto.controls["localidad"].value;
    let telefono: string = this.frmRegistrarProducto.controls["telefono"].value;
    let mail: string = this.frmRegistrarProducto.controls["mail"].value;
    let contraseña: string = this.frmRegistrarProducto.controls["contraseña"].value;
    let body = {
      "nombre": nombre,
      "localidad": localidad,
      "telefono": telefono,
      "mail": mail,
      "contraseña": contraseña,
      "fecha_inscripcion": "01/01/2020",
      "fk_productos": 2
    };
    let url = "http://localhost:3000/newProvider";
    let datos: any = await this.http.post(url, body, {}).toPromise();
    console.log("fin");

    if (datos && datos.message && datos.ID) {
      this.guardadoOK = true;
      this.mensaje = "Datos guardados con éxito!!";
    } else {
      this.guardadoOK = false;
      this.mensaje = "Error guardando";
    }
    this.guardando = false;

  }




}
