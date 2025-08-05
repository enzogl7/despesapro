import { Component, OnInit } from '@angular/core';
import { ConviteService } from '../services/convite-service';
import { ActivatedRoute } from '@angular/router';
import { Convite } from './convite'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aceitar-convite',
  imports: [CommonModule],
  templateUrl: './aceitar-convite.html',
  styleUrl: './aceitar-convite.css'
})
export class AceitarConvite implements OnInit {
  token: string = "";
  conviteObj : Convite;
  warn: boolean = false;
  mensagemWarn: string = "";
  erroInterno: boolean = false;
  
  constructor(private conviteService : ConviteService, private route: ActivatedRoute) {
    this.conviteObj = new Convite();
  }

  ngOnInit(): void {
    this.validarConvite()
  }

  validarConvite() {
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token') ?? "";
      if (this.token === "") {
        return;
      }

      this.conviteService.validarConvite(this.token).subscribe({
        next: (response) => {
          this.warn = false;
          this.erroInterno = false;
          this.conviteObj = response
        },
        error: (erro) => {
          switch (erro.status) {
            case 404:
              this.warn = true;
              this.mensagemWarn = `Convite com o token '${this.token}' não encontrado.`
              break;
            case 410:
              this.warn = true;
              this.mensagemWarn = `Convite com o token '${this.token}' expirado ou já utilizado.`
              break;
            default:
              this.erroInterno = true;
          }
        }
      });
    });
  }


}
