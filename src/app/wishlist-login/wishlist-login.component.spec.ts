import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistLoginComponent } from './wishlist-login.component';

describe('WishlistLoginComponent', () => {
  let component: WishlistLoginComponent;
  let fixture: ComponentFixture<WishlistLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
