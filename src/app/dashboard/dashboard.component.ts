import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {User} from "../model/User";
import {HttpErrorResponse} from "@angular/common/http";
import {Asset} from "../wallet/state/asset";
import {AssetService} from "../wallet/service/asset.service";
import {Currency} from "../explorer/state/currency";
import {CurrencyService} from "../explorer/service/currency.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currencies!: Currency[];
  user!: User;
  assets!: Asset[];
  walletAmount: number = 0;

  constructor(private userService: UserService, private assetService: AssetService,
              private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.getUser();
    this.getAssets();
    this.getAllCurrency();
  }

  public getUser(): void {
    this.userService.getCurrentUser().subscribe({
        next: (response: User) => {
          this.user = response;
        },
        error: (error: HttpErrorResponse) => {
          alert(error);
        }
      }
    )
  }

  public getAssets(): void {
    this.assetService.getAssets().subscribe({
        next: (response: Asset[]) => {
          this.assets = response;
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
        complete: () => this.getAmountWallet()
      }
    );
  }

  public getAllCurrency(): void {
    this.currencyService.getAllCurrencies().subscribe({
        next: (response: Currency[]) => {
          this.currencies = response || [];
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
      }
    );
  }

  public getAmountWallet(){
   this.assets?.forEach(
     element => {
       this.walletAmount += element.amount
     },
   );
  }

}
