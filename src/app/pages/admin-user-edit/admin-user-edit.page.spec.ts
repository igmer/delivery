import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminUserEditPage } from './admin-user-edit.page';

describe('AdminUserEditPage', () => {
  let component: AdminUserEditPage;
  let fixture: ComponentFixture<AdminUserEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminUserEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
