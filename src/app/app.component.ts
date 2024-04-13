import { Component, OnInit, inject } from '@angular/core';
import { LoginService } from './service/login.service';
import { SettingService } from './service/setting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent implements OnInit{
  
  
  public _settingService = inject(SettingService);
  public _loginService = inject(LoginService);
  
  nameSystem: string | undefined = '';
  logoSrc: string | null = null;

  ngOnInit(): void {
    
    if(this._loginService.isAuthenticated()) {
      this.getNameSystem();
      this.getLogoSrc();
    }
  }

  getLogoSrc() {
    this.logoSrc = this._settingService.getLogoSrc();
  }

  getNameSystem() {
    this.nameSystem = this._settingService.obtainedUserSetting()?.nameSystem;
  }

    
}
