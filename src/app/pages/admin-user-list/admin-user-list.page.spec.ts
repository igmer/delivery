import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminUserListPage } from './admin-user-list.page';

describe('AdminUserListPage', () => {
  let component: AdminUserListPage;
  let fixture: ComponentFixture<AdminUserListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminUserListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
