import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserEditProfilePage } from './user-edit-profile.page';

describe('UserEditProfilePage', () => {
  let component: UserEditProfilePage;
  let fixture: ComponentFixture<UserEditProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEditProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserEditProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
