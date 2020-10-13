import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoreProductsPage } from './store-products.page';

describe('StoreProductsPage', () => {
  let component: StoreProductsPage;
  let fixture: ComponentFixture<StoreProductsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreProductsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StoreProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
