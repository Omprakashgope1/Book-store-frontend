import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCntComponent } from './order-cnt.component';

describe('OrderCntComponent', () => {
  let component: OrderCntComponent;
  let fixture: ComponentFixture<OrderCntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderCntComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
