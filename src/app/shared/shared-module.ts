// src/app/shared/shared-module.ts

import { Header } from './header/header';
import { Footer } from './footer/footer';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({

  imports: [
    CommonModule,
    Header,
    Footer,
  ],
  exports: [
    Header,
    Footer,
  ]
})
export class SharedModule { }