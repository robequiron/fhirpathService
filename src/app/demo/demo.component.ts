import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResourcesService } from '../services/resources.service';
import { FhirpatSer } from '../utils/fhirpatSer';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})
export class DemoComponent implements OnInit {
  
  private fb = inject(FormBuilder);
  private resourceService = inject(ResourcesService);
  resource: any;
  resourceExternal = new Map();

  form: FormGroup = this.fb.group({
    evaluate: ['', Validators.required],
    resource: ['', Validators.required],
    result: [{ value: '', disabled: true }]
  });


  ngOnInit(): void {
    this.resource = this.resourceService.getResource('patient.json').subscribe({
      next: (data)=> {
       console.log(data)
        this.form.get('resource')?.setValue(JSON.stringify(data, null, 2))
      }
    });
    this.resourceService.getResource('condition.json').subscribe({
      next: (data:any)=>{
         if (Array.isArray(data.entry)) {
          data.entry.forEach((resource:any) => {
            if (this.resourceExternal.get(resource.resource.resourceType)) {
              const resoruceE = this.resourceExternal.get(resource.resource.resourceType);
              resoruceE.push(resource)
              this.resourceExternal.set(resource.resource.resourceType, resoruceE);
              return;
            }
            this.resourceExternal.set(resource.resource.resourceType, [resource]);
          });
         }
      }
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      const resource = JSON.parse(this.form.get('resource')?.value);
      const evaluate = this.form.get('evaluate')?.value;
      const context = {
        ca: 1,
        resourceExternal : this.resourceExternal
      }
      
      const result = FhirpatSer.evaluate(resource,evaluate, context);
      this.form.get('result')?.setValue(result)
    }
  }
}
