import { ComponentFixture, TestBed, ComponentFixtureAutoDetect, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';

// describe('AppComponent', () => {
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [
//         AppComponent
//       ],
//     }).compileComponents();
//   });

//   it('should create the app', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.componentInstance;
//     expect(app).toBeTruthy();
//   });

//   it(`should have as title 'password-generator'`, () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.componentInstance;
//   });

//   it('should render title', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.nativeElement as HTMLElement;
//     expect(compiled.querySelector('.content span')?.textContent).toContain('password-generator app is running!');
//   });
// });

describe('AppComponent (with beforeEach)', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let headerElem: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [AppComponent],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    }); //declaring component to test
    fixture = TestBed.createComponent(AppComponent);  //creating instance of appcomponent
    component = fixture.componentInstance;
    headerElem = fixture.nativeElement.querySelector('h2');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should show header title Secure Password Generator', () => {
    expect(headerElem.textContent).toContain("Secure Password Generator");
  })

  it('should mark form as invalid if password length is not entered', () => {
    fixture.detectChanges();
    const lengthCtrl = component.passwordForm.get("passwordLength");
    lengthCtrl?.setValue('')
    expect(lengthCtrl?.valid).toBeFalsy();
  })

  it('should mark form as valid if valid password length is entered', () => {
    fixture.detectChanges();
    const lengthCtrl = component.passwordForm.get("passwordLength");
    lengthCtrl?.setValue('12')
    expect(lengthCtrl?.valid).toBeTruthy();
  })

  it('should have number checkbox initial values as truthy', () => {
    fixture.detectChanges();
    const numCheck = (fixture.debugElement.query(By.css('#numberCheckbox')).nativeElement) as HTMLInputElement;
    const dummyVal = true;
    expect(numCheck.checked).toEqual(dummyVal);
  })

  it('should have alphabet checkbox initial values as truthy', () => {
    fixture.detectChanges();
    const alphabetCheck = (fixture.debugElement.query(By.css('#alphabetCheckbox')).nativeElement) as HTMLInputElement;
    const dummyVal = true;
    expect(alphabetCheck.checked).toEqual(dummyVal);
  })

  it('should have special character checkbox initial values as truthy', () => {
    fixture.detectChanges();
    const spCharCheck = (fixture.debugElement.query(By.css('#specialCharacterCheck')).nativeElement) as HTMLInputElement;
    const dummyVal = true;
    expect(spCharCheck.checked).toEqual(dummyVal)
  })

  it('should not call the onSubmit method when clicking on submit button without entering password length', () => {
    const btnElem = fixture.debugElement.query(By.css(".generate-btn"));
    const submitFunc = spyOn(component, 'onSubmit');

    (btnElem.nativeElement as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(submitFunc).not.toHaveBeenCalled()
  })

  it('should show error message when form is submitted when all 3 checkboxes are unchecked', () => {
    const dummyData = {
      passwordLength: '12',
      isAlphabetChecked: false,
      isNumberChecked: false,
      isCharChecked: false
    };
    component.passwordForm.patchValue(dummyData);
    fixture.detectChanges();
    component.onSubmit();
    expect(component.boxUnchecked).toEqual(true);
  })

  it('should generate a password of given length and other input values', () => {
    const dummyData = {
      passwordLength: '13',
      isAlphabetChecked: true,
      isNumberChecked: true,
      isCharChecked: true
    };
    component.passwordForm.patchValue(dummyData);
    fixture.detectChanges();
    component.onSubmit();
    const passwordlength = component.passwordValue.length;
    expect(parseFloat(dummyData.passwordLength) === passwordlength).toEqual(true);
  })

  it('should call copy method after clicking on copy button', fakeAsync(() => {
    const dummyData = {
      passwordLength: '13',
      isAlphabetChecked: true,
      isNumberChecked: true,
      isCharChecked: true
    };
    component.passwordForm.patchValue(dummyData);
    component.onSubmit();

    const copyFunc = spyOn(component, 'copyCode');
    fixture.detectChanges();
    const btnElem = fixture.debugElement.query(By.css(".copy-btn"));
    (btnElem.nativeElement as HTMLButtonElement).click();
    tick();
    fixture.whenStable().then(() => {
      expect(copyFunc).toHaveBeenCalled()
    });
  }))
});
