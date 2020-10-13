import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminProductListPage } from './admin-product-list.page';

describe('AdminProductListPage', () => {
  let component: AdminProductListPage;
  let fixture: ComponentFixture<AdminProductListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProductListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminProductListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
