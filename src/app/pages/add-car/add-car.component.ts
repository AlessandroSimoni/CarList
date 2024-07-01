import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  carForm : FormGroup;
  currentYear = new Date().getFullYear().toString();
  currencyInput: number = 0;
  constructor(private fb: FormBuilder) {
    this.carForm = this.fb.group({
      brand: [''],
      model: [''],
      year: [''],
      length: [''],
      width: [''],
      height: [''],
      price: ['']
    });
  }

  ngOnInit(): void {
  }
}
