import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookIntroComponent } from './book-intro.component';

describe('BookIntroComponent', () => {
  let component: BookIntroComponent;
  let fixture: ComponentFixture<BookIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookIntroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
