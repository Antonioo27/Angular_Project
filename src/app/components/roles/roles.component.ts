import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIResponseModel, IRole } from '../../model/interface/role';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit{
  
  http = inject(HttpClient);//uso la classe HttpClient importata grazie all'inject a livello globale
  //abbiamo creato un istanza del servizio HttpClient
  roleList: IRole[] = [];
  
  ngOnInit(): void {
    this.getAllRoles()
  }

  getAllRoles(){
    this.http.get<APIResponseModel>("https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllRoles").subscribe((res: APIResponseModel)=>{
      this.roleList = res.data;
    });
  }



}
