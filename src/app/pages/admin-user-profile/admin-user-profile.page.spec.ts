import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminUserProfilePage } from './admin-user-profile.page';

describe('AdminUserProfilePage', () => {
  let component: AdminUserProfilePage;
  let fixture: ComponentFixture<AdminUserProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminUserProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
