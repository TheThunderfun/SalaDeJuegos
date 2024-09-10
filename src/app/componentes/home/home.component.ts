import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
