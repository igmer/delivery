import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminDeliveryListPage } from './admin-delivery-list.page';

describe('AdminDeliveryListPage', () => {
  let component: AdminDeliveryListPage;
  let fixture: ComponentFixture<AdminDeliveryListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDeliveryListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDeliveryListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
