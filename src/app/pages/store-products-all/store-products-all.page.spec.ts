import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoreProductsAllPage } from './store-products-all.page';

describe('StoreProductsAllPage', () => {
  let component: StoreProductsAllPage;
  let fixture: ComponentFixture<StoreProductsAllPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreProductsAllPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StoreProductsAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
