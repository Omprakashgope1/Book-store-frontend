import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCartAddressComponent } from './edit-cart-address.component';

describe('EditCartAddressComponent', () => {
  let component: EditCartAddressComponent;
  let fixture: ComponentFixture<EditCartAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCartAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCartAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
