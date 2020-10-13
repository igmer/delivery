import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompleteUserDataPage } from './complete-user-data.page';

describe('CompleteUserDataPage', () => {
  let component: CompleteUserDataPage;
  let fixture: ComponentFixture<CompleteUserDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteUserDataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompleteUserDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
