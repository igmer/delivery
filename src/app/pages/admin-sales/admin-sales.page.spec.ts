import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminSalesPage } from './admin-sales.page';

describe('AdminSalesPage', () => {
  let component: AdminSalesPage;
  let fixture: ComponentFixture<AdminSalesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSalesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
