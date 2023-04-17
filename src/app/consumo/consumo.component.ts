import { Component } from '@angular/core';

@Component({
  selector: 'app-consumo',
  templateUrl: './consumo.component.html',
  styleUrls: ['./consumo.component.css']
})
export class ConsumoComponent {
  pessoas!: number; 
  maquinadeLavar!: string; 
  maquinadeSecar!: string; 

  maquina!: boolean; 
  secadora!: boolean; 

  comodos!: number;
  tvs!: number; 
  pcs!: number; 
  consumo: number = 0;
  precoporHora!: number; 
  precoaPagar!: number; 
  resultado!: string; 

  error!: string;

  mediaWatts: any = { 
    'comodos': 10, 
    'maquinadeLavar': 1500, 
    'secadora': 3000, 
    'pc': 300, 
    'tv': 125, 
    'banho': 5000 
  };

  mediaTime: any = {
    'comodos': (4*30), 
    'maquinadeLavar': (2*4), 
    'secadora': (2*4), 
    'pc': (3*30), 
    'tv': (4*30), 
    'banho': ((10/60)*30)
  }

  setErrorMessage(message: string){
    this.error = message;
  }

  validateInputs(): void {
    this.consumo = 0;
    
    if (this.maquinadeLavar === 'false' || this.maquinadeLavar === undefined) {
      this.maquina = false;
      this.maquinadeLavar = 'false';
    }
    else{
      this.maquina = true;
      this.maquinadeLavar = 'true';
    }

    if (this.maquinadeSecar === 'false' || this.maquinadeSecar === undefined) {
      this.secadora = false;
      this.maquinadeSecar = 'false';
    }
    else{
      this.secadora = true;
      this.maquinadeSecar = 'true';
    }

    if (this.pessoas >= 0 && this.tvs >= 0 && this.pcs >= 0 && this.precoporHora >= 0 && this.comodos >= 0) {
      this.resultado = this.getResult();
    }
    else {
      this.setErrorMessage('Preencha os campos corretamente!');
    }
  }

  getResult(): string {
    
    if (this.maquina === true){
      this.consumo += this.mediaWatts['maquinadeLavar'] *  this.mediaTime['maquinadeLavar'];
    }

    if (this.secadora === true){
      this.consumo += this.mediaWatts['secadora'] * this.mediaTime['secadora'];
    }

    this.consumo += (this.mediaWatts['comodos'] * this.mediaTime['comodos']) * this.comodos;
    this.consumo += (this.mediaWatts['pc'] * this.mediaTime['pc']) * this.pcs;
    this.consumo += (this.mediaWatts['tv'] * this.mediaTime['tv']) * this.tvs;
    this.consumo += (this.mediaWatts['banho'] * this.mediaTime['banho']) * this.pessoas;
    
   
    this.consumo /= 1000;

    this.precoaPagar = this.consumo * this.precoporHora;
    
    return `A estimativa é de que você gaste <span class="text-warning">${this.consumo}kWh</span> mensais e pague aproximadamente <span class="text-success">R$${this.precoaPagar.toFixed(2)}</span>.`;
  }
}

