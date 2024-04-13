import { Component, OnInit, inject } from '@angular/core';
import { SettingService } from '../service/setting.service';
import { UserSetting } from '../model/userSetting.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  
  private _settingService = inject(SettingService);
  
  userSetting?: UserSetting;
  menuSelect: String = ''; 
  isCollapsed: boolean = true;

  ngOnInit(): void {
    this._settingService.getUserSetting(this._settingService.getSharedUsername()).subscribe(
      params => {
        this._settingService.setUserSetting(params),
        this.userSetting = params
      },
      error => console.error('error al obtener userSetting', error)
      )
    }
    
    onOption(menuSelect: String) {
      this.menuSelect = menuSelect;
    }
    
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
  }
}
