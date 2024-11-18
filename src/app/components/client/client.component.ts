import { Component, inject, OnInit } from '@angular/core';
import { Client } from '../../model/class/Class';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponseModel } from '../../model/interface/role';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit{
  
  clientObj: Client = new Client();
  
  clientList: Client[] = [];
  clientService = inject(ClientService);
  
  ngOnInit(): void {
    this.loadClient();
  }
  
  onSaveClient() {
    this.clientService.addUpdate(this.clientObj).subscribe((res: APIResponseModel)=>{
      if(res.result) {
        alert("Client Created Success")
        this.loadClient();
        this.clientObj = new Client();
      }else {
        alert(res.message)
      }
    })
  }
  
  loadClient() {
    this.clientService.getAllClients().subscribe((res: APIResponseModel)=>{
      this.clientList = res.data;
    })
  }
  
  reset() {
    this.clientObj= new Client();
  }
  
  onDelete(ClientId: number) {
    const isDelete = confirm("Are you sure want to delete");
    if(isDelete) {
      this.clientService.deleteClientById(ClientId).subscribe((res: APIResponseModel) => {
        if(res.result) {
          alert("Client Delete Success");
          this.loadClient();
        } else {
          alert(res.message);
        }
        
      });
    }
  }

  onEdit(data: Client) {
    this.clientObj = data;
  }

  
}
