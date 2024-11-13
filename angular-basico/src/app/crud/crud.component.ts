import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pessoa } from './modelo/Pessoa';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
export class CrudComponent {
  // OBJETO DE FORMULÁRIO

  formulario = new FormGroup({
    nome  : new FormControl('', [Validators.required, Validators.minLength(3)]),
    idade : new FormControl(null, [Validators.required, Validators.min(0), Validators.max(120)]),
    cidade: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  //visibilidade dos botões
  btnCadastrar: boolean = true;

  //Vetor
  vetor:Pessoa[] = [];

// Armazenar indice da pessoas selecionada
  indice:number = -1;

  //Função cadastrar

  cadastrar(){
  //  Cadastra no vetor
  this.vetor.push(this.formulario.value as Pessoa);

  // Limpeza dos inputs
    this.formulario.reset();

  // Visualização via console
    // console.table(this.vetor);
  }

  selecionar(indice:number){
    // Atribuir o indice da Pessoa
    this.indice = indice;

    //Atribuir os dados da pessoa no formulario
    this.formulario.setValue({
      nome : this.vetor[indice].nome,
      idade : this.vetor[indice].idade,
      cidade : this.vetor[indice].cidade
    });

    this.btnCadastrar = false;
  }

  // Função de alteração
  alterar(){
    this.vetor[this.indice] = this.formulario.value as Pessoa;

    //Limpar inputs
    this.formulario.reset();

    // Alterar visibilidade dos botões
    this.btnCadastrar = true;
  }

  remover(){
    //Removendo Pessoa do vetor
    this.vetor.splice(this.indice, 1);

    //Limpeza dos inputs
    this.formulario.reset();

    //visibilidade dos botões
    this.btnCadastrar = true;
  }

  //função de cancelamento
  cancelar(){
    // limpeza dos inputs
    this.formulario.reset();

    //limpeza dos botões
    this.btnCadastrar = true;
  }
}
