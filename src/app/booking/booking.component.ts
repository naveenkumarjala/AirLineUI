import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { BookflightsData, userData } from '../models/bookingData';
import { BookingService } from '../services/booking.service';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
})
export class BookingComponent implements OnInit {
  status:boolean=false;
   usersDateaModel:userData =new userData();
  // userDataModels:Array<userData>=new Array<userData>();
  userBookingDetailsArray: any=[];
  passengerArray: Array<userData> = [];
  response:string='';
  boarding:string='';
  
  bookflightDataModel: BookflightsData =new BookflightsData() ;

  constructor(public _BookingEvent: BookingService,private route: ActivatedRoute,private _router: Router) {
    debugger;
  
     this.route.queryParamMap.subscribe(data => {
      this.bookflightDataModel.flightNumber=data.get('flightNumber')|| '{}';
      this.bookflightDataModel.fromPlace=data.get('FromPlace')|| '{}';
      this.bookflightDataModel.toPlace=data.get('Toplace')|| '{}';
      this.boarding=data.get('DateofJourny')|| '{}';
      this.bookflightDataModel.dateOfJourney=this.boarding.substring(0,10);
      this.bookflightDataModel.boardingTime=data.get('BoardingTime')|| '{}';
      this.bookflightDataModel.ticketCost=0;
      //this.bookflightDataModel.ticketCost=parseFloat( data.get('TicketCost')||'{}');
      localStorage.setItem('one_ticketPrice',data.get('TicketCost')||'{}')
      this.bookflightDataModel.discount=  data.get('Discount')||'{}';
      this.bookflightDataModel.ticketCoupun=data.get('ticketCoopun')||'{}';
      //localStorage.setItem('discount', data.get('discount')|| '{}');
      //localStorage.setItem('coupon', data.get('ticketCoopun')|| '{}');
      
     });
     this.bookflightDataModel.emailID=localStorage.getItem('email') || '{}';
   }
   AddCoupon(Coupon:string){
     
     var actual_coupon=this.bookflightDataModel.ticketCoupun;
    
     
     if(Coupon.toUpperCase()==actual_coupon.toUpperCase())
     {
      this.bookflightDataModel.ticketCoupun="xx";
      var actual_discount=parseFloat( this.bookflightDataModel.discount);
      var one_ticketPrice=this.bookflightDataModel.ticketCost;
      this.bookflightDataModel.ticketCost=one_ticketPrice-(one_ticketPrice/actual_discount);
      
     }
     else
     {
      //this.bookflightDataModel.ticketCost=parseFloat( localStorage.getItem('one_ticketPrice') || '{}');
      Swal.fire('Invalid Couponcode');
     }
    //calculate discount
   }
  PostBookingDetails() {
    if(this.passengerArray.length==0)
    {
      return alert('Please Enter Passenger details')
    }
    if(this.bookflightDataModel.flightNumber=='')
    {
      return this._router.navigate(['/Searchflights'])
    }
    if(Number(this.bookflightDataModel.seattype)==0)
    {
      
      return alert('Select Seat Type')
    }
    debugger;
    var flightDetails = {
      flightNumber: this.bookflightDataModel.flightNumber,
      dateOfJourney: this.bookflightDataModel.dateOfJourney,
      fromPlace: this.bookflightDataModel.fromPlace,
      toPlace: this.bookflightDataModel.toPlace,
      boardingTime: this.bookflightDataModel.boardingTime,
      emailID: this.bookflightDataModel.emailID,
      createdBy: localStorage.getItem('userID'),
      seattype: Number(this.bookflightDataModel.seattype),
      ticketCost:Number( this.bookflightDataModel.ticketCost),
      discount:Number(parseFloat( this.bookflightDataModel.discount )),
      bookingUsers:this.passengerArray
    }
    console.log(flightDetails);
    this.userBookingDetailsArray.push(flightDetails);
    console.log(this.userBookingDetailsArray);
    this._BookingEvent.PostBookingDetails(this.userBookingDetailsArray).subscribe(res => this.SuccessGet(res), res => this.ErrorGet(res))

  }
  SuccessGet(res: any) {
    console.log(res);
    if(res.pnr !=null || res.pnr!='')
    {
    this.response="Ticket Booked Successfully Save PNR:"+res.pnr+"  For future use ";
    Swal.fire(this.response);
    this._router.navigate(['/ticket'], { queryParams: { pnr:res.pnr} }); 
    }
    this.bookflightDataModel = new BookflightsData();
    debugger;

  }
  ErrorGet(res: any) {
    debugger;
    Swal.fire('Something went Wrong try After Some time');
    console.log(res);
    
  }
  ngOnInit(): void {
   
    
  }
  
  AddPassenger() {
    this.bookflightDataModel.ticketCost=this.bookflightDataModel.ticketCost+parseFloat( localStorage.getItem('one_ticketPrice') || '{}');
    debugger;
    var userDetails={
      userName:this.usersDateaModel.userName,
      passportNumber:this.usersDateaModel.passportNumber,
      age:Number(this.usersDateaModel.age)
    }

    this.passengerArray.push(userDetails);
    if(this.passengerArray.length>0)
    {
      this.status=true;
    }
    this.usersDateaModel = new userData();
  }
  EditCustomer(input: userData) {

    this.usersDateaModel = input;
  }

  hasError(typeofvalidator: string, controlname: string): boolean {
    return this.bookflightDataModel.formbookingGroup.controls[controlname].hasError(typeofvalidator);
  }
  DeleteCustomer(input: userData) {
    this.bookflightDataModel.ticketCost=this.bookflightDataModel.ticketCost-parseFloat( localStorage.getItem('one_ticketPrice') || '{}');
    this.passengerArray = this.passengerArray.filter(item => item.passportNumber!=input.passportNumber)
  }



}


