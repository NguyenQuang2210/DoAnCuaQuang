import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import $ from 'jquery';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-informationclient',
  templateUrl: './informationclient.component.html',
  styleUrl: './informationclient.component.scss'
})
export class InformationclientComponent implements OnInit {
  currentStep: number = 1;
  isQRShown: boolean = false;
  isInternetBanking: boolean = false;
  isButtonSelected: string = '';
  data: any;
  id: any;
  timestart: any
  timeend: any
  selectedlist: any
  lisencePlate: any
  totalprice: any
  showsuccess: boolean
  loader: boolean = true
  buttons = [
    { id: 'button1', imageUrl: 'https://xevananh.com/_next/image?url=https%3A%2F%2Fcms.mobihome.vn%2Fpaymentv2%2Fimages%2Fbank%2FTECHCOMBANK_logo.png&w=128&q=75' },
    { id: 'button2', imageUrl: 'https://xevananh.com/_next/image?url=https%3A%2F%2Fcms.mobihome.vn%2Fpaymentv2%2Fimages%2Fbank%2FMBBANK_logo.png&w=128&q=75' },
    { id: 'button3', imageUrl: 'https://xevananh.com/_next/image?url=https%3A%2F%2Fcms.mobihome.vn%2Fpaymentv2%2Fimages%2Fbank%2FACB_logo.png&w=128&q=75' },
    { id: 'button4', imageUrl: 'https://xevananh.com/_next/image?url=https%3A%2F%2Fcms.mobihome.vn%2Fpaymentv2%2Fimages%2Fbank%2FMSBANK_logo.png&w=128&q=75' },
    { id: 'button5', imageUrl: 'https://xevananh.com/_next/image?url=https%3A%2F%2Fcms.mobihome.vn%2Fpaymentv2%2Fimages%2Fbank%2Fbidv_logo.png&w=128&q=75' },
    { id: 'button6', imageUrl: 'https://xevananh.com/_next/image?url=https%3A%2F%2Fcms.mobihome.vn%2Fpaymentv2%2Fimages%2Fbank%2FSEABANK_logo.png&w=128&q=75' },
    { id: 'button7', imageUrl: 'https://xevananh.com/_next/image?url=https%3A%2F%2Fcms.mobihome.vn%2Fpaymentv2%2Fimages%2Fbank%2FVIB_logo.png&w=128&q=75' },
    { id: 'button8', imageUrl: 'https://xevananh.com/_next/image?url=https%3A%2F%2Fcms.mobihome.vn%2Fpaymentv2%2Fimages%2Fbank%2FSHB_logo.png&w=128&q=75' },
    { id: 'button9', imageUrl: 'https://xevananh.com/_next/image?url=https%3A%2F%2Fcms.mobihome.vn%2Fpaymentv2%2Fimages%2Fbank%2Fvietcombank_logo.png&w=128&q=75' },
    { id: 'button10', imageUrl: 'https://xevananh.com/_next/image?url=https%3A%2F%2Fcms.mobihome.vn%2Fpaymentv2%2Fimages%2Fbank%2FOCB_logo.png&w=128&q=75' },
    { id: 'button11', imageUrl: 'https://xevananh.com/_next/image?url=https%3A%2F%2Fcms.mobihome.vn%2Fpaymentv2%2Fimages%2Fbank%2Fsacombank_logo.png&w=128&q=75' },
    { id: 'button12', imageUrl: 'https://xevananh.com/_next/image?url=https%3A%2F%2Fcms.mobihome.vn%2Fpaymentv2%2Fimages%2Fbank%2FAGRIBANK_logo.png&w=128&q=75' },
    { id: 'button13', imageUrl: 'https://xevananh.com/_next/image?url=https%3A%2F%2Fcms.mobihome.vn%2Fpaymentv2%2Fimages%2Fbank%2Fvietinbank_logo.png&w=128&q=75' },
    { id: 'button14', imageUrl: 'https://xevananh.com/_next/image?url=https%3A%2F%2Fcms.mobihome.vn%2Fpaymentv2%2Fimages%2Fbank%2FVIETBANK_logo.png&w=128&q=75' },
    { id: 'button15', imageUrl: 'https://xevananh.com/_next/image?url=https%3A%2F%2Fcms.mobihome.vn%2Fpaymentv2%2Fimages%2Fbank%2FVPBANK_logo.png&w=128&q=75' },
    // Thêm các thông tin cho các button khác tương tự
  ];
  list = [
    {
      level: 1,
      width: '0%'
    },
    {
      level: 2,
      width: '50%'
    },
    {
      level: 3,
      width: '100%'
    },
  ];
  constructor(private toastr: ToastrService, private router: Router, private route: ActivatedRoute, private buidr: FormBuilder) {
    // const showSuccess:any = this.router.getCurrentNavigation()?.extras.state
    // if (showSuccess) {
    //   this.data = showSuccess.data
    //   this.showsuccess = this.data.state
    //   console.log(this.showsuccess);
    //   // this.showSuccess();
    // }

    // const statedata:any = this.router.getCurrentNavigation()?.extras.state
    // if (statedata) {
    //   this.data = statedata.data;
    //   this.id = this.data.id;
    //   this.timestart = this.data.timeStart;
    //   this.timeend = this.data.timeEnd;
    //   this.selectedlist = this.data.listselected;
    //   this.lisencePlate = this.data.lisenceplate
    //   this.totalprice = this.selectedlist.length * 380000
    // }
   
    const routeState: any = this.router.getCurrentNavigation()?.extras.state;    
    if (routeState) {
      
      if (routeState.data) {
        // Data from the first page
        this.data = routeState.data;
     
      } 
      else{
        console.log("Xin chào");
        
      
      }


      // Extracting data
      this.id = this.data.id;
      this.timestart = this.data.timeStart;
      this.timeend = this.data.timeEnd;
      this.selectedlist = this.data.listselected;
      this.lisencePlate = this.data.lisenceplate;
      this.totalprice = this.selectedlist.length * 380000;

      // Save data to local storage
      localStorage.setItem('timestart', this.timestart);
      localStorage.setItem('timeend', this.timeend);
      localStorage.setItem('selectedlist', JSON.stringify(this.selectedlist));
      localStorage.setItem('lisencePlate', this.lisencePlate);
      localStorage.setItem('totalprice', this.totalprice);

      
      
    }
    else{
      this.currentStep = 3
    }




  }
  ngOnInit(): void {
    this.timestart = new Date(localStorage.getItem('timestart'));
    this.timeend = new Date(localStorage.getItem('timeend'));
    this.selectedlist = JSON.parse(localStorage.getItem('selectedlist'));
    this.lisencePlate = localStorage.getItem('lisencePlate');
    this.totalprice = localStorage.getItem('totalprice');
    setTimeout(() => {
      this.loader = false;
    }, 2000)
  }

  nextpage(): void {
    console.log(this.currentStep);

    if (this.currentStep < this.list.length) {
      if (this.currentStep === 1) {
        console.log(this.myform.value);
        this.currentStep++;
      }
      else if (this.currentStep === 2) {
        if (this.isQRShown === false && this.isInternetBanking === false) {
          this.toastr.warning('Bạn chưa chọn hình thức thanh toán', 'Lỗi thanh toán')
        }
        else if (this.isInternetBanking === true) {
          this.toastr.error('Hiện tại dịch vụ thanh toán InterBanking đang gặp vấn đế', 'Lỗi thanh toán', {
            closeButton: true,
            positionClass: 'toast-top-right'
          })
        }
        else {
          const data = {
            totalPrice: this.totalprice,
            listSeatDetail: this.selectedlist,
            name: this.myform.value.name,
            pickUpLoc: this.myform.value.pick_up_loc,
            phoneNumber: this.myform.value.phone_number,
            dropDownLoc: this.myform.value.drop_down_loc,
            note: this.myform.value.note,

          };

          this.router.navigate(['/bill'], { state: { data } }).then();

          // this.router.navigate(['/bill']);
        }

      }

    }
  }

  previouspage(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  getCurrentPage(): any {
    return this.list[this.currentStep - 1];
  }
  showQR(event: any): void {
    this.isQRShown = event.target.checked;
    this.isInternetBanking = false
    this.isButtonSelected = ''
  }
  showIB(event: any): void {
    this.isInternetBanking = event.target.checked;
    this.isQRShown = false
  }

  gettimexuatphat(time: Date): Date {
    return new Date(time.getTime() - 15 * 60000); // Trừ đi 15 phút (15 * 60000 milliseconds)
  }

  selectBank(buttonId: string): void {
    this.isButtonSelected = buttonId;
    this.isInternetBanking = true
    console.log(this.isInternetBanking);

  }
  getNameSeat(id: number) {
    switch (id) {
      case 1: return "A1"
      case 2: return "A2"
      case 3: return "A3"
      case 4: return "A4"
      case 5: return "A5"
      case 6: return "A6"
      case 7: return "A7"
      case 8: return "A8"
      case 9: return "A9"
      case 10: return "A10"
      case 11: return "A11"
      case 12: return "A12"
      case 13: return "A13"
      case 14: return "A14"
      case 15: return "A15"
      case 16: return "A16"
      case 17: return "A17"
      case 18: return "A18"
      case 19: return "A19"
      case 20: return "A20"
      case 21: return "A21"
      case 22: return "A22"
      case 23: return "A23"
      case 24: return "A24"
      default:
        return "Khong xac dinh"
    }
  }
  myform = this.buidr.group({
    name: this.buidr.control('Nguyễn Văn A'),
    phone_number: this.buidr.control('0945788745'),
    note: this.buidr.control('Không'),
    pick_up_loc: this.buidr.control('Trống'),
    drop_down_loc: this.buidr.control('Trống')
  })
  showSuccess() {
    this.currentStep = 3
  }



}