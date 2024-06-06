import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private search = new BehaviorSubject<FormGroup>(this.builder.group({
    departure_date: [''],
    id_tour: ['']
  }));
  searchForm = this.search.asObservable();

  constructor(private builder: FormBuilder) {}

  setForm(data: any) {
    this.search.next(this.builder.group(data));
  }

  getForm(): FormGroup {
    return this.search.value;
  }
}
