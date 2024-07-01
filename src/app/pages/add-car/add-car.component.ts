import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/core/dialog-box/dialog-box.component';
import { CarserviceService } from 'src/services/carservice.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  carForm : FormGroup;
  currentYear = new Date().getFullYear().toString();
  currencyInput: number = 0;
  error = '';
  constructor(private fb: FormBuilder, private carService: CarserviceService, private mat: MatDialog) {
    this.carForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      length: ['', Validators.required],
      width: ['', Validators.required],
      height: ['', Validators.required],
      price: ['', Validators.required],
      image: [null, Validators.required]
    });
  }

  onSubmit(){
    this.error = '';
    if(this.carForm.valid){
      this.carService.addCar(this.carForm.value).subscribe(data => {
        this.carForm.reset();
        this.mat.open(DialogBoxComponent, {
          data: {
            title: 'Success✅',
            message: 'Car added successfully🥰'
          }
        });
      });
    }else{
      this.error = 'Please fill out all the fields';
    }
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.convertToBase64(file).then(base64 => {
        this.carForm.patchValue({
          image: base64
        });
      });
    }
  }
  
  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
  
  

  ngOnInit(): void {
  }
}
