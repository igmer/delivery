import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoreHomePage } from './store-home.page';

describe('StoreHomePage', () => {
  let component: StoreHomePage;
  let fixture: ComponentFixture<StoreHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StoreHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
