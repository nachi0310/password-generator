import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  passwordLength: string = '';
  passwordCopy: boolean = false;
  isAlphabetChecked: boolean = true;
  isNumberChecked: boolean = true;
  isCharChecked: boolean = true;
  passwordValue: string = '';
  isLengthEmpty: boolean = false;
  boxUnchecked: boolean = false;
  alphabetList: number[] = [...this.getAsciiList(65,90), ...this.getAsciiList(97,122)];
  numberList: number[] = this.getAsciiList(48, 57);
  specialCharList: number[] = [...this.getAsciiList(33,47), 
                               ...this.getAsciiList(58,64),
                              ...this.getAsciiList(91, 96),
                              ...this.getAsciiList(123, 126)] 


  onSubmit() {
    console.log("this.alphabetChecked", this.isAlphabetChecked);
    console.log("this.ischarchecked", this.isCharChecked);
    console.log("isnumbercheck", this.isNumberChecked);
    if(!this.isAlphabetChecked && !this.isCharChecked && !this.isNumberChecked) {
      this.boxUnchecked = true;
    } else {
      this.boxUnchecked = false;
    }
    if(this.passwordLength === '') {
      this.isLengthEmpty = true;
    } else {
      this.isLengthEmpty = false;
    }
    let finalCharCode: number[] = [];
    if((this.isAlphabetChecked || this.isCharChecked || this.isNumberChecked) && !this.isLengthEmpty) {
      if(this.isAlphabetChecked) {
        finalCharCode = finalCharCode.concat(this.alphabetList);
      }
      if(this.isNumberChecked) {
        finalCharCode = finalCharCode.concat(this.numberList);
      }
      if(this.isCharChecked) {
        finalCharCode = finalCharCode.concat(this.specialCharList);
      }
      let passLengthVal: number = parseFloat(this.passwordLength);
      let passwordCharCodeList: number[]= [];

      //crypto function generates a better random number which is spread over bigger range than Math.random()

      passwordCharCodeList = Array.from(crypto.getRandomValues(new Uint32Array(passLengthVal)))
      .map((x) => finalCharCode[x % finalCharCode.length]);
      const passwordCharList: string[] = passwordCharCodeList.map((charCode) => String.fromCharCode(charCode));
      this.passwordValue = passwordCharList.join('');
    }
  }

  getAsciiList(first: number, last: number) {
    let categoryList: number[] = [];
    for(let i:number = first; i<=last; i++) {
      categoryList.push(i);
    }
    return categoryList;
  }

  copyCode() {
    if (window.navigator && window.navigator['clipboard']) {
      window.navigator['clipboard'].writeText(this.passwordValue);
      this.passwordCopy = true;
      setTimeout(() => {
        this.passwordCopy = false;
      }, 3000)
    }  
  }
}
