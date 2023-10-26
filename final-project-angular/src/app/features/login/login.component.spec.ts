import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  const mockFb = { group: jest.fn() } as any;
  const mockRouter = {} as any;
  const mockHttp = {
    get: jest.fn().mockReturnValue(of([])),
  } as any;
  const mockAuth = { login: jest.fn() } as any;
  const mockCdr = {} as any;
  let component = new LoginComponent(
    mockFb,
    mockRouter,
    mockHttp,
    mockAuth,
    mockCdr
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should create a form', () => {
      component.ngOnInit();
      expect(mockFb.group).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should call get method to http://localhost:3000/users', () => {
      component.loginForm = {
        value: {
          email: 'email',
          password: 'password',
        },
      } as any;

      component.login();
      expect(mockHttp.get).toHaveBeenCalled();
    });
    it('should call authorization login method if user is found', () => {
      mockHttp.get.mockReturnValue(
        of([{ email: 'email', password: 'password' }])
      );

      component.loginForm = {
        value: {
          email: 'email',
          password: 'password',
        },
      } as any;

      component.login();

      expect(mockAuth.login).toHaveBeenCalled();
    });
  });
});
