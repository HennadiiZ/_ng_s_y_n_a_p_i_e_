import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWithButtonComponent } from './login-with-button.component';

describe('LoginWithButtonComponent', () => {
  let component: LoginWithButtonComponent;
  let fixture: ComponentFixture<LoginWithButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginWithButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginWithButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
