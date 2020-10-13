import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoreCartModalPage } from './store-cart-modal.page';

describe('StoreCartModalPage', () => {
  let component: StoreCartModalPage;
  let fixture: ComponentFixture<StoreCartModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCartModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StoreCartModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
