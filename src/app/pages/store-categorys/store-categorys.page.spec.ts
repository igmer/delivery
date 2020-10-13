import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoreCategorysPage } from './store-categorys.page';

describe('StoreCategorysPage', () => {
  let component: StoreCategorysPage;
  let fixture: ComponentFixture<StoreCategorysPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCategorysPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StoreCategorysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
