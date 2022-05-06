import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // passwordLength: string = '';
  passwordCopy: boolean = false;
  showCopy: boolean = false;
  // isAlphabetChecked: boolean = true;
  // isNumberChecked: boolean = true;
  // isCharChecked: boolean = true;
  passwordValue: string = '';
  boxUnchecked: boolean = false;
  // alphabetList: number[] = [...this.getAsciiList(65,90), ...this.getAsciiList(97,122)];
  // numberList: number[] = this.getAsciiList(48, 57);
  // specialCharList: number[] = [...this.getAsciiList(33,47), 
  //                              ...this.getAsciiList(58,64),
  //                             ...this.getAsciiList(91, 96),
  //                             ...this.getAsciiList(123, 126)] 
  alphabetString: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  numberString: string = '0123456789';
  specialCharString: string = '@#!$%^&*()' 
  passwordForm = new FormGroup({
    isAlphabetChecked: new FormControl(true),
    isNumberChecked: new FormControl(true),
    isCharChecked: new FormControl(true),
    passwordLength: new FormControl('', [Validators.required])
  });  
  // imagesList: string[] = ['https://via.placeholder.com/180', 'https://via.placeholder.com/200', 
  //                         'https://via.placeholder.com/220', 'https://via.placeholder.com/240', 
  //                         'https://via.placeholder.com/260'];
  // currentImageURL: string = "https://via.placeholder.com/180";
  // currentImageIndex: number = 0;
  

  // selectImg(dir: number) {
  //   if(dir === 1) {
  //     console.log("currentImage index", this.currentImageIndex);
  //     this.currentImageIndex = this.currentImageIndex + 1;
  //     if(this.currentImageIndex < this.imagesList.length) {
  //       this.currentImageURL = this.imagesList[this.currentImageIndex]
  //     } else {
  //       this.currentImageIndex = 0;
  //       this.currentImageURL = this.imagesList[0]
  //     }
  //   } else {
  //     this.currentImageIndex = this.currentImageIndex - 1;
  //     if(this.currentImageIndex < 0) {
  //       this.currentImageIndex = this.imagesList.length - 1;
  //       this.currentImageURL = this.imagesList[this.imagesList.length - 1]
  //     } else {
  //       this.currentImageURL = this.imagesList[this.currentImageIndex]
  //     }
  //   }  
  // }

  onSubmit() {
    let passFormVal = this.passwordForm.value;
    if(!passFormVal.isAlphabetChecked && !passFormVal.isCharChecked && !passFormVal.isNumberChecked) {
      this.boxUnchecked = true;
    } else {
      this.boxUnchecked = false;
    }
    // let finalCharCode: number[] = [];
    let finalCharCode: string = '';
    if((passFormVal.isAlphabetChecked || passFormVal.isCharChecked || passFormVal.isNumberChecked)) {
      if(passFormVal.isAlphabetChecked) {
        finalCharCode = finalCharCode + this.alphabetString;
      }
      if(passFormVal.isNumberChecked) {
        finalCharCode = finalCharCode + this.numberString;
      }
      if(passFormVal.isCharChecked) {
        finalCharCode = finalCharCode + this.specialCharString;
      }
      let passLengthVal: number = parseFloat(passFormVal.passwordLength);
      let passwordCharCodeList: string[] = [];

      //crypto function generates a better random number which is spread over bigger range than Math.random()
      // console.log("crypto", crypto.getRandomValues(new Uint32Array(passLengthVal)))
      // passwordCharCodeList = Array.from(crypto.getRandomValues(new Uint32Array(passLengthVal)))
      // .map((x) => finalCharCode[x % finalCharCode.length]);
      // const passwordCharList: string[] = passwordCharCodeList.map((charCode) => String.fromCharCode(charCode));
      // this.passwordValue = passwordCharList.join('');
      for(var i = 0; i < passLengthVal; i++) {
        let randomChar = Math.floor(Math.random()*finalCharCode.length);
        passwordCharCodeList.push(finalCharCode[randomChar])
      }
      this.showCopy = true;
      this.passwordValue = passwordCharCodeList.join('');
    }
  }

  // getAsciiList(first: number, last: number) {
  //   let categoryList: number[] = [];
  //   for(let i:number = first; i<=last; i++) {
  //     categoryList.push(i);
  //   }
  //   return categoryList;
  // }

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
