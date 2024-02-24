import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistOrderlistComponent } from './wishlist-orderlist.component';

describe('WishlistOrderlistComponent', () => {
  let component: WishlistOrderlistComponent;
  let fixture: ComponentFixture<WishlistOrderlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistOrderlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistOrderlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
