import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminProductEditPage } from './admin-product-edit.page';

describe('AdminProductEditPage', () => {
  let component: AdminProductEditPage;
  let fixture: ComponentFixture<AdminProductEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProductEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminProductEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
