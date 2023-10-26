import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { of } from 'rxjs';

describe('SignUpComponent', () => {
  const mockFormBuilder = { group: jest.fn() } as any;
  const mockUserDataService = {
    getUsersData: jest.fn(),
    isEmailExists: jest.fn().mockReturnValue(true),
    setUserData: jest.fn(),
  } as any;
  const mockRouter = {} as any;
  const mockCD = { markForCheck: jest.fn() } as any;
  const mockHttpClient = { post: jest.fn().mockReturnValue(of({})) } as any;

  let component = new SignUpComponent(
    mockFormBuilder,
    mockUserDataService,
    mockRouter,
    mockCD,
    mockHttpClient
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUsersData from userDataService', () => {
    expect(mockUserDataService.getUsersData).toHaveBeenCalled();
  });
  it('should create formgroup', () => {
    expect(mockFormBuilder.group).toHaveBeenCalled();
  });

  describe('isPasswordMatched', () => {
    it('should not return an error object if passwords do not match', () => {
      const res = component.isPasswordMatched({
        get: jest.fn().mockReturnValue({ value: 'password' }),
      } as any);
      console.log(res);

      expect(res).toBe(null);
    });
    it('should return an error object if passwords do not match', () => {
      const res = component.isPasswordMatched({
        get: jest
          .fn()
          .mockReturnValue({ value: 'password' })
          .mockReturnValueOnce({ value: 'pas' }),
      } as any);
      console.log(res);

      expect(res?.['passwordMismatch']).toBe(true);
    });
  });

  describe('onSubmit', () => {
    it('should set passwordMatched to false if form has that error', () => {
      component.registrationForm = {
        errors: { passwordMismatch: true },
      } as any;
      component.onSubmit();
      expect(component.passwordMatched).toBe(false);
    });

    it('should set passwordMatched to true if form does not have that error', () => {
      component.registrationForm = {
        errors: null,
        valid: true,
        value: { email: 'email@dot.com' },
      } as any;

      component.onSubmit();
      expect(component.passwordMatched).toBe(true);
    });

    it('should call setUserData from service if emailExists', () => {
      component.registrationForm = {
        errors: null,
        valid: true,
        value: { email: 'email@dot.com' },
        reset: jest.fn(),
      } as any;
      mockUserDataService.isEmailExists.mockReturnValue(false);
      component.onSubmit();
      expect(mockUserDataService.setUserData).toHaveBeenCalled();
    });
  });
});
