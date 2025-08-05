import { Component, OnInit } from '@angular/core';
import { ConviteService } from '../services/convite-service';
import { ActivatedRoute } from '@angular/router';
import { Convite } from './convite'; 
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheckCircle, faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-aceitar-convite',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './aceitar-convite.html',
  styleUrl: './aceitar-convite.css'
})
export class AceitarConvite implements OnInit {
  token: string = "";
  mensagemWarn: string = "";
  warn: boolean = false;
  erroInterno: boolean = false;
  conviteAceito: boolean = false;
  conviteRecusado: boolean = false;
  conviteObj : Convite;
  faCheckCircle = faCheckCircle
  faX = faX;
  
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
          this.conviteAceito = false;
          this.conviteObj = response
        },
        error: (erro) => {
          this.conviteAceito = false;
          switch (erro.status) {
            case 404:
              this.warn = true;
              this.mensagemWarn = `Convite com o token '${this.token}' não encontrado.`
              break;
            case 410:
              this.warn = true;
              this.mensagemWarn = `Convite com o token '${this.token}' expirado ou já utilizado.`
              break;
            case 401:
              this.warn = true;
              this.mensagemWarn = `Você não possui autorização para acessar essa página.`
              break;
            default:
              this.erroInterno = true;
          }
        }
      });
    });
  }

  aceitarConvite() {
    this.conviteService.aceitarConvite(this.token).subscribe({
      next: (response) => {
        this.conviteAceito = true;
        console.log("Aceito: " + response)
      },
      error: (erro) => {
        switch (erro.status) {
          default:
            console.log("erro ao aceitar: " + erro);
        }
      }
    })
  }

  recusarConvite() {
    this.conviteService.recusarConvite(this.token).subscribe({
      next: (response) => {
        this.conviteAceito = false;
        this.conviteRecusado = true;
        console.log("Recusado: " + response)
      },
      error: (erro) => {
        switch (erro.status) {
          default:
            console.log("erro ao recusar: " + erro);
        }
      }
    })
  }


}
